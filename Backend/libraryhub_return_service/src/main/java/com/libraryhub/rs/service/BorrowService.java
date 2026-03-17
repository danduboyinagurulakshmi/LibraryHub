package com.libraryhub.rs.service;

import org.springframework.stereotype.Service;

@Service
public class BorrowService {
	
	public String returnBook(int bookId, int userId) {
		
		incrementAvailableCopies(bookId);
		
		return "Book returned successfully for User Id:" + userId;
	}

	private void incrementAvailableCopies(int bookId) {
		// TODO Auto-generated method stub
		
		System.out.println("Available copies increased for Book Id:" +bookId);
	}

}
