import { useState } from "react";
import HealthDashboard from "@/components/HealthDashboard";
import NutritionTracker from "@/components/NutritionTracker";
import AIInsightsPage from "@/components/AIInsightsPage";
import FitnessTracker from "@/components/FitnessTracker";
import ProfilePage from "@/components/ProfilePage";
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
        return <FitnessTracker />;
      case "insights":
        return <AIInsightsPage />;
      case "profile":
        return <ProfilePage />;
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
