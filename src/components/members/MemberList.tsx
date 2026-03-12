import { sampleMembers } from "@/data/books";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MemberList = () => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-display text-lg font-semibold text-foreground">Library Members</h3>
        <p className="text-sm text-muted-foreground mt-1">Manage registered members and their activity.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Member Since</TableHead>
            <TableHead className="text-center">Books Issued</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell className="text-muted-foreground">{member.email}</TableCell>
              <TableCell className="text-muted-foreground">{member.memberSince}</TableCell>
              <TableCell className="text-center">{member.booksIssued}</TableCell>
              <TableCell className="text-center">
                <Badge variant={member.status === "active" ? "default" : "secondary"}>
                  {member.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;
