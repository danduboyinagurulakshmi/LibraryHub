import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLibrary } from "@/context/LibraryContext";
import { toast } from "sonner";

type FilterStatus = "all" | "issued" | "overdue" | "returned";

const AdminIssuedBooks = () => {
  const { issuedBooks, books, members, returnBook } = useLibrary();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

  const filtered = issuedBooks.filter((ib) => {
    const book = books.find((b) => b.id === ib.bookId);
    const member = members.find((m) => m.id === ib.memberId);
    const matchesSearch =
      book?.title.toLowerCase().includes(search.toLowerCase()) ||
      member?.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || ib.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReturn = (id: string) => {
    returnBook(id);
    toast.success("Book marked as returned");
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "issued": return "default";
      case "overdue": return "destructive";
      case "returned": return "secondary";
      default: return "default" as const;
    }
  };

  const filters: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "Issued", value: "issued" },
    { label: "Overdue", value: "overdue" },
    { label: "Returned", value: "returned" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by book or member..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card" />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === f.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Fine</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((ib) => {
              const book = books.find((b) => b.id === ib.bookId);
              const member = members.find((m) => m.id === ib.memberId);
              return (
                <TableRow key={ib.id}>
                  <TableCell className="font-medium text-foreground">{book?.title}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-foreground text-sm">{member?.name}</p>
                      <p className="text-xs text-muted-foreground">{member?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{ib.issueDate}</TableCell>
                  <TableCell className="text-muted-foreground">{ib.dueDate}</TableCell>
                  <TableCell className="text-muted-foreground">{ib.returnDate || "—"}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={statusColor(ib.status)}>{ib.status}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {ib.fine > 0 ? <span className="text-destructive font-medium">₹{ib.fine}</span> : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {ib.status !== "returned" && (
                      <Button size="sm" variant="outline" onClick={() => handleReturn(ib.id)}>
                        Mark Returned
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No records found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminIssuedBooks;
