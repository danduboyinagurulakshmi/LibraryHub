import { useLibrary } from "@/context/LibraryContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

const MyBooks = () => {
  const { currentUser, getUserIssuedBooks, books, returnBook } = useLibrary();
  if (!currentUser) return null;

  const myBooks = getUserIssuedBooks(currentUser.id);
  const activeBooks = myBooks.filter((ib) => ib.status !== "returned");
  const history = myBooks.filter((ib) => ib.status === "returned");

  const handleReturn = (issuedBookId: string) => {
    returnBook(issuedBookId);
    toast.success("Book returned successfully!");
  };

  const getBookTitle = (bookId: string) => books.find((b) => b.id === bookId)?.title || "Unknown";
  const getBookAuthor = (bookId: string) => books.find((b) => b.id === bookId)?.author || "Unknown";

  const statusColor = (status: string) => {
    switch (status) {
      case "issued": return "default";
      case "overdue": return "destructive";
      case "returned": return "secondary";
      default: return "default" as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Books */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-display text-lg font-semibold text-foreground">Currently Borrowed ({activeBooks.length}/3)</h3>
          <p className="text-sm text-muted-foreground mt-1">You can borrow up to 3 books at a time</p>
        </div>
        {activeBooks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Fine</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeBooks.map((ib) => (
                <TableRow key={ib.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{getBookTitle(ib.bookId)}</p>
                      <p className="text-xs text-muted-foreground">{getBookAuthor(ib.bookId)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{ib.issueDate}</TableCell>
                  <TableCell className="text-muted-foreground">{ib.dueDate}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={statusColor(ib.status)}>{ib.status}</Badge>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {ib.fine > 0 ? <span className="text-destructive">₹{ib.fine}</span> : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => handleReturn(ib.id)}>
                      Return
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No active borrows. Visit Browse Books to issue one!</p>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">Borrowing History</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Returned</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((ib) => (
                <TableRow key={ib.id}>
                  <TableCell className="font-medium text-foreground">{getBookTitle(ib.bookId)}</TableCell>
                  <TableCell className="text-muted-foreground">{ib.issueDate}</TableCell>
                  <TableCell className="text-muted-foreground">{ib.returnDate}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">Returned</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
