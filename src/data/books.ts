export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  year: number;
  copies: number;
  available: number;
  cover: string;
  description: string;
  location: string;
  shelf: string;
  condition: "good" | "fair" | "poor" | "needs-replacement";
  lastUpdated: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  memberSince: string;
  booksIssued: number;
  status: "active" | "inactive";
  password?: string;
  role: "user" | "librarian" | "admin";
}

export interface IssuedBook {
  id: string;
  bookId: string;
  memberId: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "issued" | "returned" | "overdue";
  fine: number;
}

export const sampleBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    isbn: "978-0743273565",
    year: 1925,
    copies: 5,
    available: 3,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    description: "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.",
    location: "Floor 1 - Section A",
    shelf: "A-12",
    condition: "good",
    lastUpdated: "2026-02-01",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    isbn: "978-0061120084",
    year: 1960,
    copies: 4,
    available: 1,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    description: "The unforgettable novel of a childhood in a sleepy Southern town.",
    location: "Floor 1 - Section A",
    shelf: "A-14",
    condition: "fair",
    lastUpdated: "2025-12-10",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    isbn: "978-0451524935",
    year: 1949,
    copies: 6,
    available: 4,
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
    description: "A dystopian social science fiction novel and cautionary tale about the future.",
    location: "Floor 1 - Section B",
    shelf: "B-03",
    condition: "good",
    lastUpdated: "2026-01-15",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    isbn: "978-0141439518",
    year: 1813,
    copies: 3,
    available: 2,
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop",
    description: "The story follows Elizabeth Bennet as she deals with issues of manners and morality.",
    location: "Floor 2 - Section C",
    shelf: "C-07",
    condition: "poor",
    lastUpdated: "2025-08-20",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-age",
    isbn: "978-0316769488",
    year: 1951,
    copies: 4,
    available: 2,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    description: "The story of Holden Caulfield's experiences in New York City.",
    location: "Floor 1 - Section A",
    shelf: "A-18",
    condition: "needs-replacement",
    lastUpdated: "2025-06-05",
  },
  {
    id: "6",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    isbn: "978-0062316097",
    year: 2011,
    copies: 7,
    available: 5,
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
    description: "A brief history of humankind exploring how Homo sapiens came to dominate the world.",
    location: "Floor 2 - Section D",
    shelf: "D-01",
    condition: "good",
    lastUpdated: "2026-02-20",
  },
  {
    id: "7",
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    isbn: "978-0060850524",
    year: 1932,
    copies: 3,
    available: 3,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
    description: "A dystopian novel set in a futuristic World State of genetically engineered citizens.",
    location: "Floor 1 - Section B",
    shelf: "B-05",
    condition: "fair",
    lastUpdated: "2025-11-30",
  },
  {
    id: "8",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    isbn: "978-0062315007",
    year: 1988,
    copies: 5,
    available: 4,
    cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop",
    description: "A mystical story about Santiago, an Andalusian shepherd boy who yearns to travel.",
    location: "Floor 2 - Section C",
    shelf: "C-11",
    condition: "good",
    lastUpdated: "2026-01-28",
  },
];
export const sampleMembers: Member[] = [
  { id: "1", name: "Aarav Sharma", email: "aarav@email.com", password: "user123", memberSince: "2023-01-15", booksIssued: 3, status: "active", role: "user" },
  { id: "2", name: "Priya Patel", email: "priya@email.com", password: "user123", memberSince: "2022-06-20", booksIssued: 1, status: "active", role: "user" },
  { id: "3", name: "Rohan Gupta", email: "rohan@email.com", password: "user123", memberSince: "2023-08-10", booksIssued: 0, status: "inactive", role: "user" },
  { id: "4", name: "Ananya Singh", email: "ananya@email.com", password: "user123", memberSince: "2024-02-01", booksIssued: 2, status: "active", role: "user" },
  { id: "5", name: "Vikram Reddy", email: "vikram@email.com", password: "user123", memberSince: "2023-11-05", booksIssued: 4, status: "active", role: "user" },
  { id: "6", name: "Meera Librarian", email: "librarian@libraryhub.com", password: "lib123", memberSince: "2022-01-01", booksIssued: 0, status: "active", role: "librarian" },
];

export const sampleIssuedBooks: IssuedBook[] = [
  { id: "ib1", bookId: "1", memberId: "1", issueDate: "2026-02-15", dueDate: "2026-03-15", returnDate: null, status: "issued", fine: 0 },
  { id: "ib2", bookId: "3", memberId: "1", issueDate: "2026-02-20", dueDate: "2026-03-20", returnDate: null, status: "issued", fine: 0 },
  { id: "ib3", bookId: "2", memberId: "2", issueDate: "2026-01-10", dueDate: "2026-02-10", returnDate: "2026-02-08", status: "returned", fine: 0 },
  { id: "ib4", bookId: "5", memberId: "4", issueDate: "2026-02-01", dueDate: "2026-03-01", returnDate: null, status: "overdue", fine: 50 },
  { id: "ib5", bookId: "6", memberId: "4", issueDate: "2026-02-25", dueDate: "2026-03-25", returnDate: null, status: "issued", fine: 0 },
  { id: "ib6", bookId: "1", memberId: "5", issueDate: "2026-01-20", dueDate: "2026-02-20", returnDate: "2026-02-18", status: "returned", fine: 0 },
  { id: "ib7", bookId: "4", memberId: "5", issueDate: "2026-02-28", dueDate: "2026-03-28", returnDate: null, status: "issued", fine: 0 },
];
