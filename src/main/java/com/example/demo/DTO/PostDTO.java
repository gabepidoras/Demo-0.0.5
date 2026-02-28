package com.example.demo.DTO;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class PostDTO {
    private Long id;
    private Long threadId;
    private String content;
    private String authorName;
    private int postNumber;
    private String createdAt;

    public PostDTO(Long id, Long threadId, String content, String authorName, int postNumber, LocalDateTime createdAt) {
        this.id = id;
        this.threadId = threadId;
        this.content = content;
        this.authorName = authorName;
        this.postNumber = postNumber;

        this.createdAt = createdAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }

    public Long getId() {
        return id;
    }

    public Long getThreadId() {
        return threadId;
    }

    public String getContent() {
        return content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public int getPostNumber() {
        return postNumber;
    }

    public String getCreatedAt() {
        return createdAt;
    }
}
