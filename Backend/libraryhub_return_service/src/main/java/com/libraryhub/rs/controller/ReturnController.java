package com.libraryhub.rs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;  // ← add this
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libraryhub.rs.service.BorrowService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/return")
public class ReturnController {

    @Autowired
    private BorrowService borrowService;

    @PostMapping("/{bookId}/{userId}")
    public String returnBook(@PathVariable int bookId, @PathVariable int userId) {
        return borrowService.returnBook(bookId, userId);
    }
}