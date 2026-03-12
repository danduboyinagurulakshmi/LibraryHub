import { BookOpen, Users, BookMarked, AlertTriangle, TrendingUp, Clock, MapPin, RefreshCw, PackageCheck } from "lucide-react";
import { useLibrary } from "@/context/LibraryContext";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminHome = () => {
  const { books, members, issuedBooks } = useLibrary();

  const totalBooks = books.reduce((acc, b) => acc + b.copies, 0);
  const totalAvailable = books.reduce((acc, b) => acc + b.available, 0);
  const activeMembers = members.filter((m) => m.status === "active").length;
  const activeIssues = issuedBooks.filter((ib) => ib.status === "issued").length;
  const overdueIssues = issuedBooks.filter((ib) => ib.status === "overdue").length;
  const totalFines = issuedBooks.reduce((acc, ib) => acc + ib.fine, 0);

  // Books needing update (poor condition or needs-replacement)
  const booksNeedingUpdate = books.filter((b) => b.condition === "poor" || b.condition === "needs-replacement");

  // Available books
  const availableBooks = books.filter((b) => b.available > 0);

  // Books fully issued (0 available)
  const fullyIssuedBooks = books.filter((b) => b.available === 0);

  const stats = [
    { label: "Total Books", value: totalBooks, icon: BookOpen, color: "bg-stat-blue", sub: `${books.length} titles` },
    { label: "Available Copies", value: totalAvailable, icon: BookMarked, color: "bg-stat-green", sub: `${availableBooks.length} titles in stock` },
    { label: "Active Members", value: activeMembers, icon: Users, color: "bg-stat-orange", sub: `${members.length} total` },
    { label: "Books Issued", value: activeIssues, icon: TrendingUp, color: "bg-primary", sub: `${overdueIssues} overdue` },
  ];

  // Recent activity
  const recentIssues = [...issuedBooks]
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 5);

  // Genre distribution
  const genreCounts: Record<string, number> = {};
  books.forEach((b) => { genreCounts[b.genre] = (genreCounts[b.genre] || 0) + b.copies; });
  const totalCopies = books.reduce((s, b) => s + b.copies, 0);
  const genreData = Object.entries(genreCounts)
    .map(([genre, count]) => ({ genre, pct: Math.round((count / totalCopies) * 100) }))
    .sort((a, b) => b.pct - a.pct);

  const conditionColor = (c: string) => {
    switch (c) {
      case "good": return "bg-stat-green/15 text-stat-green border-stat-green/30";
      case "fair": return "bg-stat-orange/15 text-stat-orange border-stat-orange/30";
      case "poor": return "bg-destructive/15 text-destructive border-destructive/30";
      case "needs-replacement": return "bg-destructive/20 text-destructive border-destructive/40";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">{s.sub}</span>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Available Books Table */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <PackageCheck className="w-5 h-5 text-stat-green" />
          <h3 className="font-display text-lg font-semibold text-foreground">Available Books</h3>
          <Badge variant="secondary" className="ml-auto">{availableBooks.length} titles</Badge>
        </div>
        <div className="overflow-auto max-h-[320px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="text-center">Copies</TableHead>
                <TableHead className="text-center">Available</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Shelf</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={book.cover} alt={book.title} className="w-8 h-11 object-cover rounded" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{book.title}</p>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{book.genre}</Badge></TableCell>
                  <TableCell className="text-center text-sm">{book.copies}</TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold text-stat-green">{book.available}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {book.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-mono text-foreground">{book.shelf}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${conditionColor(book.condition)}`}>
                      {book.condition}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Books Needing Update / Replacement */}
      {booksNeedingUpdate.length > 0 && (
        <div className="bg-card rounded-xl border border-destructive/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-5 h-5 text-destructive" />
            <h3 className="font-display text-lg font-semibold text-foreground">Books Needing Update / Replacement</h3>
            <Badge variant="destructive" className="ml-auto">{booksNeedingUpdate.length} books</Badge>
          </div>
          <div className="space-y-3">
            {booksNeedingUpdate.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                <div className="flex items-center gap-3">
                  <img src={book.cover} alt={book.title} className="w-8 h-11 object-cover rounded" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author} • {book.location} • Shelf {book.shelf}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${conditionColor(book.condition)}`}>
                    {book.condition}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">Last updated: {book.lastUpdated}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recent Issues</h3>
          <div className="space-y-3">
            {recentIssues.map((ib) => {
              const book = books.find((b) => b.id === ib.bookId);
              const member = members.find((m) => m.id === ib.memberId);
              return (
                <div key={ib.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{book?.title}</p>
                    <p className="text-xs text-muted-foreground">Issued to {member?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{ib.issueDate}</p>
                    <span className={`text-xs font-medium ${ib.status === "overdue" ? "text-destructive" : ib.status === "returned" ? "text-stat-green" : "text-stat-blue"}`}>
                      {ib.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Genre distribution */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Collection by Genre</h3>
          <div className="space-y-3">
            {genreData.map((item) => (
              <div key={item.genre}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{item.genre}</span>
                  <span className="text-muted-foreground">{item.pct}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fully Issued Books Alert */}
      {fullyIssuedBooks.length > 0 && (
        <div className="bg-card rounded-xl border border-stat-orange/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-stat-orange" />
            <h3 className="font-display text-lg font-semibold text-foreground">Out of Stock Books</h3>
            <Badge className="ml-auto bg-stat-orange text-primary-foreground">{fullyIssuedBooks.length}</Badge>
          </div>
          <div className="space-y-2">
            {fullyIssuedBooks.map((book) => (
              <div key={book.id} className="flex items-center gap-3 p-3 rounded-lg bg-stat-orange/5 border border-stat-orange/10">
                <img src={book.cover} alt={book.title} className="w-8 h-11 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author} • {book.copies} copies all issued</p>
                </div>
                <div className="text-xs text-muted-foreground">{book.location} / {book.shelf}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{overdueIssues}</p>
            <p className="text-sm text-muted-foreground">Overdue Books</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">₹{totalFines}</p>
            <p className="text-sm text-muted-foreground">Total Fines Pending</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-stat-green/20 flex items-center justify-center">
            <BookMarked className="w-6 h-6 text-stat-green" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{issuedBooks.filter((ib) => ib.status === "returned").length}</p>
            <p className="text-sm text-muted-foreground">Books Returned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
