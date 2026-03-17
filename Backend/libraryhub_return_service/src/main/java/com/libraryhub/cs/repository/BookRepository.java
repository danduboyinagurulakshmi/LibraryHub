package com.libraryhub.cs.repository;

import com.libraryhub.cs.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByCategoryId(Long categoryId);

    boolean existsByIsbn(String isbn);

    List<Book> findByAvailableCopiesGreaterThan(int threshold);

    @Query("""
        SELECT b FROM Book b
        WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Book> searchByKeyword(@Param("keyword") String keyword);
}