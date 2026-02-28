package com.example.demo.config;

import com.example.demo.model.Post;
import com.example.demo.model.Thread;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PageService {

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private PostRepository postRepository;

    public void prepareThreadModel(Model model, Principal principal) {
        List<Thread> threads = threadRepository.findAllByOrderByCreatedAtDesc();
        model.addAttribute("threads", threads);

        model.addAttribute("username", principal != null ? principal.getName() : null);

        Map<Long, List<Post>> postsByThreadId = new HashMap<>();
        for (Thread thread : threads) {
            List<Post> posts = postRepository.findByThreadIdOrderByPostNumberAsc(thread.getId());
            postsByThreadId.put(thread.getId(), posts);
        }
        model.addAttribute("postsMap", postsByThreadId);

        if (!model.containsAttribute("thread")) {
            model.addAttribute("thread", new Thread());
        }

        if (!model.containsAttribute("post")) {
            model.addAttribute("post", new Post());
        }
    }
}