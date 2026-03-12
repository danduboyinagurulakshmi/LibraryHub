import { createContext, useContext, useState, ReactNode } from "react";
import { Book, Member, IssuedBook, sampleBooks, sampleMembers, sampleIssuedBooks } from "@/data/books";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "librarian" | "admin";
}

interface LibrarySettings {
  libraryName: string;
  maxBooksPerUser: number;
  loanPeriodDays: number;
  finePerDay: number;
  operatingHours: string;
}

interface LibraryContextType {
  currentUser: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;

  books: Book[];
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;

  members: Member[];
  updateMemberStatus: (id: string, status: "active" | "inactive") => void;
  updateMemberRole: (id: string, role: "user" | "librarian" | "admin") => void;
  addMember: (member: Omit<Member, "id">) => void;
  deleteMember: (id: string) => void;

  issuedBooks: IssuedBook[];
  issueBook: (bookId: string, memberId: string) => boolean;
  returnBook: (issuedBookId: string) => void;
  getUserIssuedBooks: (memberId: string) => IssuedBook[];

  settings: LibrarySettings;
  updateSettings: (s: Partial<LibrarySettings>) => void;
}

const LibraryContext = createContext<LibraryContextType | null>(null);

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
};

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [members, setMembers] = useState<Member[]>(sampleMembers);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>(sampleIssuedBooks);
  const [settings, setSettings] = useState<LibrarySettings>({
    libraryName: "LibraryHub",
    maxBooksPerUser: 3,
    loanPeriodDays: 14,
    finePerDay: 5,
    operatingHours: "9:00 AM - 8:00 PM",
  });

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === "admin@libraryhub.com" && password === "admin123") {
      setCurrentUser({ id: "admin", name: "Admin", email, role: "admin" });
      return true;
    }
    // Member login (user or librarian)
    const member = members.find((m) => m.email === email && m.password === password);
    if (member) {
      setCurrentUser({ id: member.id, name: member.name, email: member.email, role: member.role as "user" | "librarian" | "admin" });
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const register = (name: string, email: string, password: string): boolean => {
    if (members.find((m) => m.email === email)) return false;
    const newMember: Member = {
      id: String(Date.now()),
      name,
      email,
      password,
      memberSince: new Date().toISOString().split("T")[0],
      booksIssued: 0,
      status: "active",
      role: "user",
    };
    setMembers((prev) => [...prev, newMember]);
    setCurrentUser({ id: newMember.id, name, email, role: "user" });
    return true;
  };

  const addBook = (book: Omit<Book, "id">) => {
    setBooks((prev) => [...prev, { ...book, id: String(Date.now()) }]);
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const updateMemberStatus = (id: string, status: "active" | "inactive") => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const updateMemberRole = (id: string, role: "user" | "librarian" | "admin") => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  const addMember = (member: Omit<Member, "id">) => {
    setMembers((prev) => [...prev, { ...member, id: String(Date.now()) }]);
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const issueBook = (bookId: string, memberId: string): boolean => {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.available <= 0) return false;

    const activeIssued = issuedBooks.filter((ib) => ib.memberId === memberId && ib.status === "issued");
    if (activeIssued.length >= settings.maxBooksPerUser) return false;

    const alreadyIssued = issuedBooks.find(
      (ib) => ib.bookId === bookId && ib.memberId === memberId && ib.status === "issued"
    );
    if (alreadyIssued) return false;

    const today = new Date();
    const due = new Date(today);
    due.setDate(due.getDate() + settings.loanPeriodDays);

    const newIssue: IssuedBook = {
      id: `ib${Date.now()}`,
      bookId,
      memberId,
      issueDate: today.toISOString().split("T")[0],
      dueDate: due.toISOString().split("T")[0],
      returnDate: null,
      status: "issued",
      fine: 0,
    };

    setIssuedBooks((prev) => [...prev, newIssue]);
    setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, available: b.available - 1 } : b)));
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, booksIssued: m.booksIssued + 1 } : m)));
    return true;
  };

  const returnBook = (issuedBookId: string) => {
    const issued = issuedBooks.find((ib) => ib.id === issuedBookId);
    if (!issued) return;

    setIssuedBooks((prev) =>
      prev.map((ib) =>
        ib.id === issuedBookId
          ? { ...ib, returnDate: new Date().toISOString().split("T")[0], status: "returned" as const }
          : ib
      )
    );
    setBooks((prev) => prev.map((b) => (b.id === issued.bookId ? { ...b, available: b.available + 1 } : b)));
    setMembers((prev) =>
      prev.map((m) =>
        m.id === issued.memberId ? { ...m, booksIssued: Math.max(0, m.booksIssued - 1) } : m
      )
    );
  };

  const getUserIssuedBooks = (memberId: string) => {
    return issuedBooks.filter((ib) => ib.memberId === memberId);
  };

  const updateSettings = (s: Partial<LibrarySettings>) => {
    setSettings((prev) => ({ ...prev, ...s }));
  };

  return (
    <LibraryContext.Provider
      value={{
        currentUser, login, logout, register,
        books, addBook, updateBook, deleteBook,
        members, updateMemberStatus, updateMemberRole, addMember, deleteMember,
        issuedBooks, issueBook, returnBook, getUserIssuedBooks,
        settings, updateSettings,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
