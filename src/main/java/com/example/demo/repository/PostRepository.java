package com.example.demo.repository;

import com.example.demo.model.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
    List<Post> findByThreadIdOrderByPostNumberAsc(Long threadId);

    @Query("SELECT MAX(p.postNumber) FROM Post p WHERE p.thread.id = ?1")
    Integer findMaxPostNumberByThreadId(Long threadId);

    long countByThreadId(Long threadId);
}
