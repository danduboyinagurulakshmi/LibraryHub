import { Book } from "@/data/books";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const isAvailable = book.available > 0;

  return (
    <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 overflow-hidden group">
      {/* Cover */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant={isAvailable ? "default" : "destructive"}
            className={isAvailable ? "bg-stat-green" : ""}
          >
            {isAvailable ? `${book.available} available` : "Unavailable"}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{book.genre}</p>
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{book.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">ISBN: {book.isbn.slice(-4)}</span>
          <Button size="sm" disabled={!isAvailable} variant={isAvailable ? "default" : "outline"}>
            {isAvailable ? "Issue Book" : "Reserve"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
