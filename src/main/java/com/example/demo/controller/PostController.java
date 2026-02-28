package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.ui.Model;

import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.HashMap;
import java.util.Map;

import java.security.Principal;

import jakarta.validation.Valid;

import com.example.demo.model.User;
import com.example.demo.model.Post;
import com.example.demo.model.Thread;

import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ThreadRepository;
import com.example.demo.repository.PostRepository;

import com.example.demo.DTO.PostDTO;

import com.example.demo.config.PageService;

@Controller
public class PostController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private PageService pageService;

    @PostMapping("/threads/{threadId}/post")
    public String createPost(@PathVariable Long threadId, @Valid @ModelAttribute("post") Post post, BindingResult result, Principal principal, Model model){
        if (principal == null) {
            return "redirect:/";
        }

        if (result.hasErrors()) {
            pageService.prepareThreadModel(model, principal);

            return "threads";
        }

        Thread thread = threadRepository.findById(threadId).orElse(null);
        User user = userRepository.findByUsername(principal.getName());

        if (thread != null && user != null) {
            Integer maxPostNumber = postRepository.findMaxPostNumberByThreadId(threadId);
            int newPostNumber = (maxPostNumber == null) ? 1 : maxPostNumber + 1;

            post.setThread(thread);
            post.setAuthor(user);
            post.setPostNumber(newPostNumber);
            Post savedPost = postRepository.save(post);

            PostDTO dto = new PostDTO(
                    savedPost.getId(),
                    threadId,
                    savedPost.getContent(),
                    user.getUsername(),
                    newPostNumber,
                    java.time.LocalDateTime.now()
            );

            messagingTemplate.convertAndSend("/topic/posts", dto);
        }

        return "redirect:/threads";
    }

    @PostMapping("/post/delete/{id}")
    public String deletePost(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return "redirect:/";
        }

        Post post = postRepository.findById(id).orElse(null);

        if (post != null) {
            if (post.getAuthor().getUsername().equals(principal.getName())) {

                postRepository.delete(post);

                messagingTemplate.convertAndSend("/topic/posts/delete", id);
            }
        }

        return "redirect:/threads";
    }

    @PostMapping("/post/edit/{id}")
    @ResponseBody
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestParam String content, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        if (content == null || content.isBlank()) {
            return ResponseEntity.badRequest().body("blank");
        }

        if (content.length() > 300) {
            return ResponseEntity.badRequest().body("post_too_long");
        }

        Post post = postRepository.findById(id).orElse(null);

        if (post != null && post.getAuthor().getUsername().equals(principal.getName())) {
            post.setContent(content);
            postRepository.save(post);

            Map<String, Object> payload = new HashMap<>();
            payload.put("id", id);
            payload.put("content", content);

            messagingTemplate.convertAndSend("/topic/posts/edit", (Object) payload);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(403).build();
    }
}
