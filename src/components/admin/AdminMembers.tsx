import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLibrary } from "@/context/LibraryContext";
import { toast } from "sonner";

const AdminMembers = () => {
  const { members, updateMemberStatus, issuedBooks, books } = useLibrary();
  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );

  const getMemberBooks = (memberId: string) => {
    return issuedBooks.filter((ib) => ib.memberId === memberId && ib.status === "issued");
  };

  const toggleStatus = (id: string, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    updateMemberStatus(id, newStatus);
    toast.success(`Member status updated to ${newStatus}`);
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{members.length}</span> total members
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Member Since</TableHead>
              <TableHead className="text-center">Books Issued</TableHead>
              <TableHead>Currently Borrowing</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((member) => {
              const currentBooks = getMemberBooks(member.id);
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.memberSince}</TableCell>
                  <TableCell className="text-center">{member.booksIssued}</TableCell>
                  <TableCell>
                    {currentBooks.length > 0 ? (
                      <div className="space-y-1">
                        {currentBooks.map((ib) => {
                          const book = books.find((b) => b.id === ib.bookId);
                          return (
                            <p key={ib.id} className="text-xs text-muted-foreground">
                              • {book?.title} <span className="text-foreground/50">(due {ib.dueDate})</span>
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(member.id, member.status)}
                    >
                      {member.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminMembers;
