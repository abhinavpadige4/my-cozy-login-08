import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Clock, Calendar } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">{greeting}, Admin 👋</h2>
          <div className="text-5xl font-mono font-semibold text-foreground tabular-nums flex items-center justify-center gap-3">
            <Clock className="h-8 w-8 text-muted-foreground" />
            {formattedTime}
          </div>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
