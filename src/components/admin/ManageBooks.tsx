import { useState } from "react";
import { Search, Edit2, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLibrary } from "@/context/LibraryContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Book } from "@/data/books";

const ManageBooks = () => {
  const { books, updateBook, deleteBook } = useLibrary();
  const [search, setSearch] = useState("");
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", genre: "", copies: 0, available: 0, location: "", shelf: "" });

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search)
  );

  const openEdit = (book: Book) => {
    setEditBook(book);
    setEditForm({ title: book.title, author: book.author, genre: book.genre, copies: book.copies, available: book.available, location: book.location, shelf: book.shelf });
  };

  const handleUpdate = () => {
    if (!editBook) return;
    updateBook(editBook.id, editForm);
    toast.success("Book updated successfully");
    setEditBook(null);
  };

  const handleDelete = (id: string, title: string) => {
    deleteBook(id);
    toast.success(`"${title}" removed from catalog`);
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by title, author, or ISBN..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card" />
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Location / Shelf</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead className="text-center">Copies</TableHead>
              <TableHead className="text-center">Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={book.cover} alt={book.title} className="w-10 h-14 object-cover rounded" />
                    <div>
                      <p className="font-medium text-foreground">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author} • {book.year}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="secondary">{book.genre}</Badge></TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="text-foreground">{book.location}</p>
                    <p className="text-xs text-muted-foreground font-mono">Shelf {book.shelf}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{book.isbn}</TableCell>
                <TableCell className="text-center">{book.copies}</TableCell>
                <TableCell className="text-center">
                  <span className={book.available === 0 ? "text-destructive font-medium" : "text-foreground"}>
                    {book.available}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => openEdit(book)}>
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDelete(book.id, book.title)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editBook} onOpenChange={() => setEditBook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div><Label>Title</Label><Input value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} className="mt-1" /></div>
            <div><Label>Author</Label><Input value={editForm.author} onChange={(e) => setEditForm((p) => ({ ...p, author: e.target.value }))} className="mt-1" /></div>
            <div><Label>Genre</Label><Input value={editForm.genre} onChange={(e) => setEditForm((p) => ({ ...p, genre: e.target.value }))} className="mt-1" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Total Copies</Label><Input type="number" value={editForm.copies} onChange={(e) => setEditForm((p) => ({ ...p, copies: Number(e.target.value) }))} className="mt-1" /></div>
              <div><Label>Available</Label><Input type="number" value={editForm.available} onChange={(e) => setEditForm((p) => ({ ...p, available: Number(e.target.value) }))} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Location</Label><Input value={editForm.location} onChange={(e) => setEditForm((p) => ({ ...p, location: e.target.value }))} className="mt-1" /></div>
              <div><Label>Shelf</Label><Input value={editForm.shelf} onChange={(e) => setEditForm((p) => ({ ...p, shelf: e.target.value }))} className="mt-1" /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleUpdate} className="flex-1">Save Changes</Button>
              <Button variant="outline" onClick={() => setEditBook(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBooks;
