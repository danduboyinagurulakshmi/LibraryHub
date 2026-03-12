import { BookOpen, Users, BookCheck, AlertTriangle } from "lucide-react";

const stats = [
  { label: "Total Books", value: "1,247", icon: BookOpen, color: "text-stat-blue", bg: "bg-stat-blue/10" },
  { label: "Active Members", value: "384", icon: Users, color: "text-stat-green", bg: "bg-stat-green/10" },
  { label: "Books Issued", value: "156", icon: BookCheck, color: "text-stat-orange", bg: "bg-stat-orange/10" },
  { label: "Overdue", value: "12", icon: AlertTriangle, color: "text-stat-red", bg: "bg-stat-red/10" },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-5 shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-shadow duration-300 border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
