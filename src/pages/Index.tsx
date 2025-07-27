import { useState } from "react";
import HealthDashboard from "@/components/HealthDashboard";
import NutritionTracker from "@/components/NutritionTracker";
import AIInsightsPage from "@/components/AIInsightsPage";
import MobileNavigation from "@/components/MobileNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <HealthDashboard />;
      case "nutrition":
        return <NutritionTracker />;
      case "fitness":
        return <div className="p-4 text-center">Fitness tracker coming soon!</div>;
      case "insights":
        return <AIInsightsPage />;
      case "profile":
        return <div className="p-4 text-center">Profile settings coming soon!</div>;
      default:
        return <HealthDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-vitality">
      {renderActiveTab()}
      <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
