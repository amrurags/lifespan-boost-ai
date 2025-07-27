import { Button } from "@/components/ui/button";
import { Home, Activity, Utensils, Brain, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "nutrition", icon: Utensils, label: "Nutrition" },
    { id: "fitness", icon: Activity, label: "Fitness" },
    { id: "insights", icon: Brain, label: "AI Insights" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-card z-50">
      <nav className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex-col space-y-1 h-auto py-2 px-3 rounded-lg transition-smooth",
                isActive && "bg-primary/10 text-primary shadow-health"
              )}
            >
              <IconComponent className={cn(
                "h-5 w-5",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavigation;