import { useState } from "react";
import { Navigate } from "react-router-dom";
import UserSidebar from "@/components/layout/UserSidebar";
import UserHome from "@/components/user/UserHome";
import BrowseBooks from "@/components/user/BrowseBooks";
import MyBooks from "@/components/user/MyBooks";
import UserProfile from "@/components/user/UserProfile";
import { useLibrary } from "@/context/LibraryContext";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Your reading overview at a glance" },
  browse: { title: "Browse Books", subtitle: "Discover and issue books from our catalog" },
  "my-books": { title: "My Books", subtitle: "Track your borrowed and returned books" },
  profile: { title: "My Profile", subtitle: "View and manage your account" },
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { currentUser } = useLibrary();

  if (!currentUser || currentUser.role !== "user") return <Navigate to="/" replace />;

  const page = pageTitles[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">{page.title}</h1>
          <p className="text-muted-foreground mt-1">{page.subtitle}</p>
        </div>
        {activeTab === "dashboard" && <UserHome />}
        {activeTab === "browse" && <BrowseBooks />}
        {activeTab === "my-books" && <MyBooks />}
        {activeTab === "profile" && <UserProfile />}
      </main>
    </div>
  );
};

export default UserDashboard;
