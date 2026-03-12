import { useLibrary } from "@/context/LibraryContext";
import { BookOpen, Users, TrendingUp, AlertTriangle } from "lucide-react";

const AdminReports = () => {
  const { books, members, issuedBooks } = useLibrary();

  const totalCopies = books.reduce((s, b) => s + b.copies, 0);
  const totalAvailable = books.reduce((s, b) => s + b.available, 0);
  const totalIssued = issuedBooks.filter((ib) => ib.status === "issued").length;
  const totalOverdue = issuedBooks.filter((ib) => ib.status === "overdue").length;
  const totalReturned = issuedBooks.filter((ib) => ib.status === "returned").length;
  const totalFines = issuedBooks.reduce((s, ib) => s + ib.fine, 0);
  const activeMembers = members.filter((m) => m.status === "active").length;

  // Most borrowed books
  const bookBorrowCount: Record<string, number> = {};
  issuedBooks.forEach((ib) => { bookBorrowCount[ib.bookId] = (bookBorrowCount[ib.bookId] || 0) + 1; });
  const popularBooks = Object.entries(bookBorrowCount)
    .map(([bookId, count]) => ({ book: books.find((b) => b.id === bookId), count }))
    .filter((p) => p.book)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top borrowers
  const memberBorrowCount: Record<string, number> = {};
  issuedBooks.forEach((ib) => { memberBorrowCount[ib.memberId] = (memberBorrowCount[ib.memberId] || 0) + 1; });
  const topBorrowers = Object.entries(memberBorrowCount)
    .map(([memberId, count]) => ({ member: members.find((m) => m.id === memberId), count }))
    .filter((p) => p.member)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Book Copies", value: totalCopies, icon: BookOpen },
          { label: "Currently Issued", value: totalIssued, icon: TrendingUp },
          { label: "Overdue Books", value: totalOverdue, icon: AlertTriangle },
          { label: "Active Members", value: activeMembers, icon: Users },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <s.icon className="w-5 h-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most popular books */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Most Borrowed Books</h3>
          <div className="space-y-3">
            {popularBooks.map(({ book, count }, i) => (
              <div key={book!.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">{i + 1}</span>
                <img src={book!.cover} alt={book!.title} className="w-8 h-11 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{book!.title}</p>
                  <p className="text-xs text-muted-foreground">{book!.author}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{count} times</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top borrowers */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Top Borrowers</h3>
          <div className="space-y-3">
            {topBorrowers.map(({ member, count }, i) => (
              <div key={member!.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-secondary-foreground font-bold">{i + 1}</span>
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">{member!.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{member!.name}</p>
                  <p className="text-xs text-muted-foreground">{member!.email}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{count} books</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial summary */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Library Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-xl font-bold text-foreground">{totalAvailable}</p>
            <p className="text-xs text-muted-foreground">Available Copies</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-xl font-bold text-foreground">{totalReturned}</p>
            <p className="text-xs text-muted-foreground">Total Returns</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-xl font-bold text-destructive">₹{totalFines}</p>
            <p className="text-xs text-muted-foreground">Pending Fines</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-xl font-bold text-foreground">{books.length}</p>
            <p className="text-xs text-muted-foreground">Unique Titles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
