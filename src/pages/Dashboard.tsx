import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Users, BarChart3, FileText, Clock, Calendar, Activity, TrendingUp } from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    { title: "Total Users", value: "1,248", change: "+12%", icon: Users },
    { title: "Reports", value: "64", change: "+3%", icon: FileText },
    { title: "Page Views", value: "12.4k", change: "+8%", icon: BarChart3 },
    { title: "Active Now", value: "38", change: "+24%", icon: Activity },
  ];

  const recentActivity = [
    { action: "New user registered", time: "2 min ago", dot: "bg-green-500" },
    { action: "Report #64 generated", time: "18 min ago", dot: "bg-blue-500" },
    { action: "System backup completed", time: "1 hr ago", dot: "bg-yellow-500" },
    { action: "Server restarted", time: "3 hrs ago", dot: "bg-muted-foreground" },
    { action: "Database optimized", time: "5 hrs ago", dot: "bg-muted-foreground" },
  ];

  const tasks = [
    { label: "Review Q4 analytics", done: true },
    { label: "Update user permissions", done: false },
    { label: "Deploy v2.3 patch", done: false },
    { label: "Send weekly report", done: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">admin</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        {/* Greeting + Clock */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{greeting}, Admin 👋</h2>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </p>
          </div>
          <div className="flex items-center gap-2 text-2xl font-mono font-semibold text-foreground tabular-nums">
            <Clock className="h-5 w-5 text-muted-foreground" />
            {formattedTime}
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity + Tasks */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                  <span className="text-sm text-foreground flex-1">{item.action}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded border flex items-center justify-center text-xs ${task.done ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"}`}>
                    {task.done && "✓"}
                  </div>
                  <span className={`text-sm ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {task.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
