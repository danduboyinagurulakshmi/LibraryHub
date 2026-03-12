import { BookOpen, UserPlus, RotateCcw, AlertTriangle } from "lucide-react";

const activities = [
  { icon: BookOpen, text: '"Sapiens" issued to Aarav Sharma', time: "2 hours ago", color: "text-stat-blue" },
  { icon: RotateCcw, text: '"1984" returned by Priya Patel', time: "5 hours ago", color: "text-stat-green" },
  { icon: UserPlus, text: "New member Ananya Singh registered", time: "1 day ago", color: "text-stat-orange" },
  { icon: AlertTriangle, text: '"Pride and Prejudice" overdue — Vikram Reddy', time: "2 days ago", color: "text-stat-red" },
  { icon: BookOpen, text: '"The Catcher in the Rye" issued to Rohan Gupta', time: "3 days ago", color: "text-stat-blue" },
];

const RecentActivity = () => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-[var(--card-shadow)] p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
