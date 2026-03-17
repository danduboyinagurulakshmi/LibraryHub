package com.libraryhub.cs.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title must not be blank")
    @Column(nullable = false, length = 255)
    private String title;

    @NotBlank(message = "Author must not be blank")
    @Column(nullable = false, length = 150)
    private String author;

    @Column(unique = true, length = 20)
    private String isbn;

    @Column(length = 100)
    private String genre;

    @NotNull
    @Min(value = 1, message = "Total copies must be at least 1")
    @Column(nullable = false)
    private Integer totalCopies;

    @Min(value = 0, message = "Available copies cannot be negative")
    @Column(nullable = false)
    private Integer availableCopies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public Book() {}

    public Book(Long id, String title, String author, String isbn,
                String genre, Integer totalCopies,
                Integer availableCopies, Category category) {
        this.id              = id;
        this.title           = title;
        this.author          = author;
        this.isbn            = isbn;
        this.genre           = genre;
        this.totalCopies     = totalCopies;
        this.availableCopies = availableCopies;
        this.category        = category;
    }

    public Long getId() { return this.id; }
    public String getTitle() { return this.title; }
    public String getAuthor() { return this.author; }
    public String getIsbn() { return this.isbn; }
    public String getGenre() { return this.genre; }
    public Integer getTotalCopies() { return this.totalCopies; }
    public Integer getAvailableCopies() { return this.availableCopies; }
    public Category getCategory() { return this.category; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setAuthor(String author) { this.author = author; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public void setGenre(String genre) { this.genre = genre; }
    public void setTotalCopies(Integer totalCopies) { this.totalCopies = totalCopies; }
    public void setAvailableCopies(Integer availableCopies) { this.availableCopies = availableCopies; }
    public void setCategory(Category category) { this.category = category; }

    public void decrementAvailableCopies() {
        if (this.availableCopies <= 0) {
            throw new IllegalStateException(
                "No available copies for book id=" + this.id);
        }
        this.availableCopies--;
    }

    public void incrementAvailableCopies() {
        if (this.availableCopies >= this.totalCopies) {
            throw new IllegalStateException(
                "Available copies already at maximum for book id=" + this.id);
        }
        this.availableCopies++;
    }

    public boolean isAvailable() {
        return this.availableCopies != null && this.availableCopies > 0;
    }

    @Override
    public String toString() {
        return "Book{id=" + id + ", title='" + title
             + "', availableCopies=" + availableCopies + "}";
    }
}