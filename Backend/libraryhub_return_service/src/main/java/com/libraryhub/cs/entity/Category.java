package com.libraryhub.cs.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Category name must not be blank")
    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @OneToMany(
        mappedBy      = "category",
        cascade       = CascadeType.ALL,
        orphanRemoval = true,
        fetch         = FetchType.LAZY
    )
    private List<Book> books = new ArrayList<>();

    public Category() {}

    public Category(Long id, String name, String description) {
        this.id          = id;
        this.name        = name;
        this.description = description;
        this.books       = new ArrayList<>();
    }

    public Long getId() { return this.id; }
    public String getName() { return this.name; }
    public String getDescription() { return this.description; }
    public List<Book> getBooks() { return this.books; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setBooks(List<Book> books) { this.books = books; }

    public void addBook(Book book) {
        books.add(book);
        book.setCategory(this);
    }

    public void removeBook(Book book) {
        books.remove(book);
        book.setCategory(null);
    }

    @Override
    public String toString() {
        return "Category{id=" + id + ", name='" + name + "'}";
    }
}