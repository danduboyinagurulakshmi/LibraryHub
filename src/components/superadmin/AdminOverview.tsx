import { useLibrary } from "@/context/LibraryContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Library, AlertTriangle, UserCheck, BookMarked } from "lucide-react";

const AdminOverview = () => {
  const { books, members, issuedBooks } = useLibrary();

  const totalBooks = books.reduce((s, b) => s + b.copies, 0);
  const totalAvailable = books.reduce((s, b) => s + b.available, 0);
  const activeMembers = members.filter((m) => m.status === "active").length;
  const librarians = members.filter((m) => m.role === "librarian").length;
  const users = members.filter((m) => m.role === "user").length;
  const overdueBooks = issuedBooks.filter((ib) => ib.status === "overdue").length;
  const activeIssued = issuedBooks.filter((ib) => ib.status === "issued").length;
  const needsReplacement = books.filter((b) => b.condition === "needs-replacement" || b.condition === "poor").length;

  const stats = [
    { label: "Total Books", value: totalBooks, icon: BookOpen, color: "text-[hsl(var(--stat-blue))]", bg: "bg-[hsl(var(--stat-blue)/0.1)]" },
    { label: "Available", value: totalAvailable, icon: Library, color: "text-[hsl(var(--stat-green))]", bg: "bg-[hsl(var(--stat-green)/0.1)]" },
    { label: "Active Members", value: activeMembers, icon: Users, color: "text-[hsl(var(--stat-orange))]", bg: "bg-[hsl(var(--stat-orange)/0.1)]" },
    { label: "Overdue", value: overdueBooks, icon: AlertTriangle, color: "text-[hsl(var(--stat-red))]", bg: "bg-[hsl(var(--stat-red)/0.1)]" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role breakdown & alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-secondary" />
              Role Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-3">
                <Badge variant="default">Admin</Badge>
                <span className="text-sm text-foreground">System Administrator</span>
              </div>
              <span className="font-bold text-foreground">1</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Librarian</Badge>
                <span className="text-sm text-foreground">Library Staff</span>
              </div>
              <span className="font-bold text-foreground">{librarians}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-3">
                <Badge variant="outline">User</Badge>
                <span className="text-sm text-foreground">Regular Members</span>
              </div>
              <span className="font-bold text-foreground">{users}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[hsl(var(--stat-orange))]" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdueBooks > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--stat-red)/0.08)] border border-[hsl(var(--stat-red)/0.2)]">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--stat-red))]" />
                <div>
                  <p className="text-sm font-medium text-foreground">{overdueBooks} Overdue Book(s)</p>
                  <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                </div>
              </div>
            )}
            {needsReplacement > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--stat-orange)/0.08)] border border-[hsl(var(--stat-orange)/0.2)]">
                <BookMarked className="w-5 h-5 text-[hsl(var(--stat-orange))]" />
                <div>
                  <p className="text-sm font-medium text-foreground">{needsReplacement} Book(s) Need Repair/Replacement</p>
                  <p className="text-xs text-muted-foreground">Poor or damaged condition</p>
                </div>
              </div>
            )}
            {activeIssued > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--stat-blue)/0.08)] border border-[hsl(var(--stat-blue)/0.2)]">
                <BookOpen className="w-5 h-5 text-[hsl(var(--stat-blue))]" />
                <div>
                  <p className="text-sm font-medium text-foreground">{activeIssued} Active Loan(s)</p>
                  <p className="text-xs text-muted-foreground">Currently issued to members</p>
                </div>
              </div>
            )}
            {overdueBooks === 0 && needsReplacement === 0 && activeIssued === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No alerts — everything looks good!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
