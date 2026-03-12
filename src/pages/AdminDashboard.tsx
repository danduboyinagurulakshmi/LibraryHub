import { useState } from "react";
import { Navigate } from "react-router-dom";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminOverview from "@/components/superadmin/AdminOverview";
import ManageUsersLibrarians from "@/components/superadmin/ManageUsersLibrarians";
import SystemSettings from "@/components/superadmin/SystemSettings";
import AdminAnalytics from "@/components/superadmin/AdminAnalytics";
import { useLibrary } from "@/context/LibraryContext";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  overview: { title: "Admin Overview", subtitle: "High-level system overview and health" },
  users: { title: "Manage Users & Librarians", subtitle: "Assign roles, manage access, and control permissions" },
  settings: { title: "System Settings", subtitle: "Configure library policies and preferences" },
  analytics: { title: "Analytics", subtitle: "Library-wide performance metrics and trends" },
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { currentUser } = useLibrary();

  if (!currentUser || currentUser.role !== "admin") return <Navigate to="/" replace />;

  const page = pageTitles[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">{page.title}</h1>
          <p className="text-muted-foreground mt-1">{page.subtitle}</p>
        </div>
        {activeTab === "overview" && <AdminOverview />}
        {activeTab === "users" && <ManageUsersLibrarians />}
        {activeTab === "settings" && <SystemSettings />}
        {activeTab === "analytics" && <AdminAnalytics />}
      </main>
    </div>
  );
};

export default AdminDashboard;
