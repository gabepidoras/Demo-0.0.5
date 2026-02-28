package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;


@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/")
    public String showPage() {
        return "index";
    }

    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam String confirmPassword,
                           Model model) {

        if (username.length() < 3 || username.length() > 15) {
            model.addAttribute ("usernameError", "3から15までの字が入力しなければならない！");
            return "index";
        }
        if (password.length() < 6) {
            model.addAttribute ("passwordError", "パスワードが短すぎます (最小6字)");
            return "index";
        }
        if (!password.equals(confirmPassword)) {
            model.addAttribute ("confirmError", "パスワードが一致しません");
            return "index";
        }
        if (userRepository.findByUsername(username) != null) {
            model.addAttribute ("usernameError", "そんなウイーザー名がもう存在しています");
            return "index";
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        userRepository.save(newUser);

        model.addAttribute("message", "登録完成です!");
        return "index";
    }
}