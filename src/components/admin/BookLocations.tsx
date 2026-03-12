import { useState } from "react";
import { MapPin, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLibrary } from "@/context/LibraryContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BookLocations = () => {
  const { books } = useLibrary();
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  const locations = [...new Set(books.map((b) => b.location))];

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.shelf.toLowerCase().includes(search.toLowerCase());
    const matchLocation = locationFilter === "all" || b.location === locationFilter;
    return matchSearch && matchLocation;
  });

  // Group by location
  const grouped = filtered.reduce<Record<string, typeof books>>((acc, book) => {
    if (!acc[book.location]) acc[book.location] = [];
    acc[book.location].push(book);
    return acc;
  }, {});

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
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by title, author, or shelf..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card" />
        </div>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-[220px] bg-card">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((loc) => {
          const locBooks = books.filter((b) => b.location === loc);
          const totalCopies = locBooks.reduce((s, b) => s + b.copies, 0);
          const availableCopies = locBooks.reduce((s, b) => s + b.available, 0);
          return (
            <div key={loc} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-accent" />
                <p className="font-medium text-foreground text-sm">{loc}</p>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{locBooks.length} titles</span>
                <span>{totalCopies} copies</span>
                <span className="text-stat-green font-medium">{availableCopies} available</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grouped tables */}
      {Object.entries(grouped).map(([location, locBooks]) => (
        <div key={location} className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 bg-muted/30 border-b border-border flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <h3 className="font-display font-semibold text-foreground">{location}</h3>
            <Badge variant="secondary" className="ml-auto">{locBooks.length} books</Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Shelf</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="text-center">Copies</TableHead>
                <TableHead className="text-center">Available</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locBooks.map((book) => (
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
                  <TableCell className="font-mono text-sm text-foreground font-medium">{book.shelf}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{book.genre}</Badge></TableCell>
                  <TableCell className="text-center text-sm">{book.copies}</TableCell>
                  <TableCell className="text-center">
                    <span className={book.available === 0 ? "text-destructive font-semibold" : "text-stat-green font-semibold"}>
                      {book.available}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${conditionColor(book.condition)}`}>
                      {book.condition}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{book.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default BookLocations;
