import { useLibrary } from "@/context/LibraryContext";
import { User, Mail, Calendar, BookOpen } from "lucide-react";

const UserProfile = () => {
  const { currentUser, members, getUserIssuedBooks } = useLibrary();
  if (!currentUser) return null;

  const member = members.find((m) => m.id === currentUser.id);
  const myBooks = getUserIssuedBooks(currentUser.id);
  const totalBorrowed = myBooks.length;
  const currentlyBorrowed = myBooks.filter((ib) => ib.status === "issued").length;
  const totalReturned = myBooks.filter((ib) => ib.status === "returned").length;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-3xl font-display font-bold text-primary-foreground">
              {currentUser.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-muted-foreground">{currentUser.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="font-medium text-foreground capitalize">{currentUser.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{currentUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="font-medium text-foreground">{member?.memberSince || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="font-medium text-foreground capitalize">{member?.status || "active"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Reading Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{totalBorrowed}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Borrowed</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{currentlyBorrowed}</p>
            <p className="text-xs text-muted-foreground mt-1">Currently Reading</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{totalReturned}</p>
            <p className="text-xs text-muted-foreground mt-1">Returned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
