import { BookOpen, LayoutDashboard, Library, BookMarked, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLibrary } from "@/context/LibraryContext";
import { useNavigate } from "react-router-dom";

interface UserSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "browse", label: "Browse Books", icon: Library },
  { id: "my-books", label: "My Books", icon: BookMarked },
  { id: "profile", label: "My Profile", icon: User },
];

const UserSidebar = ({ activeTab, onTabChange }: UserSidebarProps) => {
  const { currentUser, logout } = useLibrary();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-sidebar-foreground">LibraryHub</h1>
          <p className="text-xs text-sidebar-foreground/60">Member Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === item.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-3">
        <div className="p-4 rounded-lg bg-sidebar-accent mb-3">
          <p className="text-sm font-medium text-sidebar-foreground">{currentUser?.name}</p>
          <p className="text-xs text-sidebar-foreground/60">{currentUser?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
