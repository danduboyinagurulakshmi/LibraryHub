import { useLibrary } from "@/context/LibraryContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, BookOpen, Users } from "lucide-react";

const AdminAnalytics = () => {
  const { books, members, issuedBooks } = useLibrary();

  const totalBooks = books.reduce((s, b) => s + b.copies, 0);
  const totalAvailable = books.reduce((s, b) => s + b.available, 0);
  const utilizationRate = totalBooks > 0 ? Math.round(((totalBooks - totalAvailable) / totalBooks) * 100) : 0;

  const totalIssued = issuedBooks.length;
  const returned = issuedBooks.filter((ib) => ib.status === "returned").length;
  const overdue = issuedBooks.filter((ib) => ib.status === "overdue").length;
  const active = issuedBooks.filter((ib) => ib.status === "issued").length;

  const totalFines = issuedBooks.reduce((s, ib) => s + ib.fine, 0);

  // Genre distribution
  const genreCounts: Record<string, number> = {};
  books.forEach((b) => { genreCounts[b.genre] = (genreCounts[b.genre] || 0) + b.copies; });
  const genreEntries = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);

  // Condition breakdown
  const conditions = { good: 0, fair: 0, poor: 0, "needs-replacement": 0 };
  books.forEach((b) => { conditions[b.condition]++; });

  // Most active members
  const memberActivity: Record<string, number> = {};
  issuedBooks.forEach((ib) => { memberActivity[ib.memberId] = (memberActivity[ib.memberId] || 0) + 1; });
  const topMembers = Object.entries(memberActivity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({
      member: members.find((m) => m.id === id),
      count,
    }));

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Utilization Rate", value: `${utilizationRate}%`, sub: `${totalBooks - totalAvailable} of ${totalBooks} in use` },
          { label: "Total Transactions", value: totalIssued, sub: `${returned} returned, ${active} active` },
          { label: "Overdue Items", value: overdue, sub: "Requires follow-up" },
          { label: "Total Fines", value: `₹${totalFines}`, sub: "Accumulated fines" },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm font-medium text-foreground mt-1">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genre distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Collection by Genre
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {genreEntries.map(([genre, count]) => (
              <div key={genre} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{genre}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-secondary"
                      style={{ width: `${(count / totalBooks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Book condition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-secondary" />
              Book Condition Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(Object.entries(conditions) as [string, number][]).map(([cond, count]) => (
              <div key={cond} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <Badge variant={cond === "good" ? "default" : cond === "fair" ? "secondary" : "destructive"}>
                  {cond.replace("-", " ")}
                </Badge>
                <span className="font-bold text-foreground">{count} book(s)</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top members */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              Most Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {topMembers.map(({ member, count }, i) => (
                <div key={member?.id || i} className="text-center p-4 rounded-lg bg-muted">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-bold text-secondary-foreground">#{i + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{member?.name || "Unknown"}</p>
                  <p className="text-xs text-muted-foreground">{count} transaction(s)</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
