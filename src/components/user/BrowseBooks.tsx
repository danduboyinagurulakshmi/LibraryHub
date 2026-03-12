import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLibrary } from "@/context/LibraryContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Book } from "@/data/books";

const genres = ["All", "Classic Fiction", "Dystopian", "Romance", "Coming-of-age", "Non-Fiction", "Fiction"];

const BrowseBooks = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { books, currentUser, issueBook } = useLibrary();

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleIssue = (bookId: string) => {
    if (!currentUser) return;
    const success = issueBook(bookId, currentUser.id);
    if (success) {
      toast.success("Book issued successfully! Due in 14 days.");
      setSelectedBook(null);
    } else {
      toast.error("Cannot issue book. You may already have it or reached the limit (3 books).");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search books by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedGenre === genre
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
              onClick={() => setSelectedBook(book)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant={book.available > 0 ? "default" : "destructive"} className={book.available > 0 ? "bg-stat-green" : ""}>
                    {book.available > 0 ? `${book.available} available` : "Unavailable"}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{book.genre}</p>
                <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{book.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-lg">No books found matching your criteria.</p>
        </div>
      )}

      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{selectedBook.title}</DialogTitle>
                <DialogDescription>by {selectedBook.author}</DialogDescription>
              </DialogHeader>
              <div className="flex gap-4 mt-2">
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-32 h-44 object-cover rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Genre:</span>
                      <p className="font-medium text-foreground">{selectedBook.genre}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Year:</span>
                      <p className="font-medium text-foreground">{selectedBook.year}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ISBN:</span>
                      <p className="font-medium text-foreground">{selectedBook.isbn}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Available:</span>
                      <p className="font-medium text-foreground">{selectedBook.available} / {selectedBook.copies}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedBook.description}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button
                  className="flex-1"
                  disabled={selectedBook.available <= 0}
                  onClick={() => handleIssue(selectedBook.id)}
                >
                  {selectedBook.available > 0 ? "Issue This Book" : "Not Available"}
                </Button>
                <Button variant="outline" onClick={() => setSelectedBook(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrowseBooks;
