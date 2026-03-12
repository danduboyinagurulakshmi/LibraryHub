import { CalendarDays, BookMarked, Clock, AlertTriangle } from "lucide-react";
import { useLibrary } from "@/context/LibraryContext";

const UserHome = () => {
  const { currentUser, getUserIssuedBooks, books } = useLibrary();
  if (!currentUser) return null;

  const myBooks = getUserIssuedBooks(currentUser.id);
  const activeBooks = myBooks.filter((ib) => ib.status === "issued");
  const overdueBooks = myBooks.filter((ib) => ib.status === "overdue");
  const returnedBooks = myBooks.filter((ib) => ib.status === "returned");

  const allActive = [...activeBooks, ...overdueBooks];
  const lastIssueDate = allActive.length > 0
    ? [...allActive].sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())[0].issueDate
    : "—";

  const nearestDue = allActive.length > 0
    ? [...allActive].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0]
    : null;

  const daysUntilDue = nearestDue
    ? Math.ceil((new Date(nearestDue.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const dueReminderText = daysUntilDue !== null
    ? daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d overdue` : daysUntilDue === 0 ? "Due today!" : `${daysUntilDue}d left`
    : "—";

  const stats = [
    { label: "Currently Borrowed", value: String(activeBooks.length), icon: BookMarked, color: "bg-stat-blue", isDate: false },
    { label: "Overdue", value: String(overdueBooks.length), icon: AlertTriangle, color: "bg-stat-red", isDate: false },
    { label: "Last Issued", value: lastIssueDate, icon: CalendarDays, color: "bg-stat-green", isDate: true },
    { label: "Return Reminder", value: dueReminderText, icon: Clock, color: "bg-stat-orange", isDate: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className={`font-display font-bold text-foreground ${s.isDate ? "text-lg" : "text-3xl"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Currently borrowed */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Currently Borrowed</h3>
        {activeBooks.length === 0 ? (
          <p className="text-muted-foreground text-sm">You haven't borrowed any books yet. Browse our catalog to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBooks.map((ib) => {
              const book = books.find((b) => b.id === ib.bookId);
              if (!book) return null;
              return (
                <div key={ib.id} className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <img src={book.cover} alt={book.title} className="w-16 h-20 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm line-clamp-1">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                    <div className="mt-2 text-xs space-y-0.5">
                      <div>
                        <span className="text-muted-foreground">Issued: </span>
                        <span className="font-medium text-foreground">{ib.issueDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due: </span>
                        <span className="font-medium text-foreground">{ib.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Overdue alert */}
      {overdueBooks.length > 0 && (
        <div className="bg-destructive/10 rounded-xl border border-destructive/30 p-6">
          <h3 className="font-display text-lg font-semibold text-destructive mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Overdue Books
          </h3>
          <div className="space-y-2">
            {overdueBooks.map((ib) => {
              const book = books.find((b) => b.id === ib.bookId);
              return (
                <div key={ib.id} className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-medium">{book?.title}</span>
                  <span className="text-destructive font-semibold">Fine: ₹{ib.fine}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
