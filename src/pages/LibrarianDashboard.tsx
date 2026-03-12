import { useState } from "react";
import { Navigate } from "react-router-dom";
import LibrarianSidebar from "@/components/layout/LibrarianSidebar";
import AdminHome from "@/components/admin/AdminHome";
import ManageBooks from "@/components/admin/ManageBooks";
import AdminMembers from "@/components/admin/AdminMembers";
import AdminIssuedBooks from "@/components/admin/AdminIssuedBooks";
import AdminReports from "@/components/admin/AdminReports";
import AddBookForm from "@/components/addbook/AddBookForm";
import BookLocations from "@/components/admin/BookLocations";
import { useLibrary } from "@/context/LibraryContext";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Librarian Dashboard", subtitle: "Library overview, availability, and book conditions" },
  books: { title: "Manage Books", subtitle: "Add, edit, and remove books from catalog" },
  "add-book": { title: "Add Book", subtitle: "Register a new book in the catalog" },
  locations: { title: "Book Locations", subtitle: "Track where every book is shelved in the library" },
  members: { title: "Members", subtitle: "Manage library members and their activity" },
  issued: { title: "Issued Books", subtitle: "Track all book issues and returns" },
  reports: { title: "Reports", subtitle: "Library statistics and analytics" },
};

const LibrarianDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { currentUser } = useLibrary();

  if (!currentUser || currentUser.role !== "librarian") return <Navigate to="/" replace />;

  const page = pageTitles[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <LibrarianSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">{page.title}</h1>
          <p className="text-muted-foreground mt-1">{page.subtitle}</p>
        </div>
        {activeTab === "dashboard" && <AdminHome />}
        {activeTab === "books" && <ManageBooks />}
        {activeTab === "add-book" && <AddBookForm />}
        {activeTab === "locations" && <BookLocations />}
        {activeTab === "members" && <AdminMembers />}
        {activeTab === "issued" && <AdminIssuedBooks />}
        {activeTab === "reports" && <AdminReports />}
      </main>
    </div>
  );
};

export default LibrarianDashboard;
