package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import org.springframework.ui.Model;

import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.HashMap;
import java.util.Map;

import java.security.Principal;

import jakarta.validation.Valid;

import com.example.demo.model.User;
import com.example.demo.model.Thread;
import com.example.demo.model.Post;

import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ThreadRepository;

import com.example.demo.DTO.ThreadDTO;

import com.example.demo.config.PageService;

@Controller
public class ThreadController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private PageService pageService;

    @GetMapping("/threads")
    public String showThreads(Model model, Principal principal) {

        pageService.prepareThreadModel(model, principal);

        model.addAttribute("post", new Post());

        return "threads";
    }

    @PostMapping("/threads/create")
    public String createThread(@Valid @ModelAttribute("thread") Thread thread,
                               BindingResult result,
                               Principal principal,
                               RedirectAttributes redirectAttributes,
                               Model model) {
        if (principal == null) {

            redirectAttributes.addFlashAttribute("message", "投稿できるようになるためにまずログインして下さい");

            return "redirect:/";
        }

        if (result.hasErrors()) {
            pageService.prepareThreadModel(model, principal);

            return "threads";
        }

        User user = userRepository.findByUsername(principal.getName());

        thread.setAuthor(user);
        Thread savedThread = threadRepository.save(thread);

        ThreadDTO dto = new ThreadDTO (
            savedThread.getId(),
            savedThread.getTitle(),
            savedThread.getAuthor().getUsername()
        );

        messagingTemplate.convertAndSend("/topic/threads", dto);

        return "redirect:/threads";
    }

    @PostMapping("/threads/delete/{id}")
    public String deleteThread(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return "redirect:/";
        }

        Thread thread = threadRepository.findById(id).orElse(null);

        if (thread != null) {
            if (thread.getAuthor().getUsername().equals(principal.getName())) {
                threadRepository.delete(thread);

                messagingTemplate.convertAndSend("/topic/threads/delete", id);
            }
        }

        return "redirect:/threads";
    }

    @PostMapping("/threads/edit/{id}")
    @ResponseBody
    public ResponseEntity<?> updateThread(@PathVariable Long id, @RequestParam String title, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        if (title == null || title.isBlank()) {
            return ResponseEntity.badRequest().body("blank");
        }

        if (title.length() > 30) {
            return ResponseEntity.badRequest().body("thread_too_long");
        }

        Thread thread = threadRepository.findById(id).orElse(null);

        if (thread != null && thread.getAuthor().getUsername().equals(principal.getName())) {
            thread.setTitle(title);
            threadRepository.save(thread);

            Map<String, Object> payload = new HashMap<>();
            payload.put("id", id);
            payload.put("title", title);

            messagingTemplate.convertAndSend("/topic/threads/edit", (Object) payload);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(403).build();
    }
}