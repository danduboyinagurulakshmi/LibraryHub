import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLibrary } from "@/context/LibraryContext";

const AddBookForm = () => {
  const { addBook } = useLibrary();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    year: "",
    copies: "",
    description: "",
    cover: "",
    location: "",
    shelf: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.isbn) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const copies = Number(form.copies) || 1;
    addBook({
      title: form.title,
      author: form.author,
      genre: form.genre || "General",
      isbn: form.isbn,
      year: Number(form.year) || new Date().getFullYear(),
      copies,
      available: copies,
      cover: form.cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      description: form.description || "No description provided.",
      location: form.location || "Floor 1 - Section A",
      shelf: form.shelf || "A-01",
      condition: "good",
      lastUpdated: new Date().toISOString().split("T")[0],
    });
    toast.success(`"${form.title}" has been added to the catalog!`);
    setForm({ title: "", author: "", genre: "", isbn: "", year: "", copies: "", description: "", cover: "", location: "", shelf: "" });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
      <h3 className="font-display text-lg font-semibold text-foreground mb-1">Add New Book</h3>
      <p className="text-sm text-muted-foreground mb-6">Fill in the details to add a book to the library catalog.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Book title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input id="author" name="author" value={form.author} onChange={handleChange} placeholder="Author name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN *</Label>
            <Input id="isbn" name="isbn" value={form.isbn} onChange={handleChange} placeholder="978-XXXXXXXXXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input id="genre" name="genre" value={form.genre} onChange={handleChange} placeholder="e.g. Fiction" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" type="number" value={form.year} onChange={handleChange} placeholder="2024" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="copies">Copies</Label>
            <Input id="copies" name="copies" type="number" value={form.copies} onChange={handleChange} placeholder="1" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Floor 1 - Section A" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shelf">Shelf</Label>
            <Input id="shelf" name="shelf" value={form.shelf} onChange={handleChange} placeholder="e.g. A-12" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cover">Cover Image URL</Label>
          <Input id="cover" name="cover" value={form.cover} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Brief description of the book..." rows={3} />
        </div>
        <Button type="submit" size="lg">Add Book</Button>
      </form>
    </div>
  );
};

export default AddBookForm;
