import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, Target, TrendingUp, Zap, Brain, Flame, Trophy, Star, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { aiInsightsService, Achievement, HealthData } from "@/services/aiInsightsService";
import healthHero from "@/assets/health-hero.jpg";
import nutritionIcon from "@/assets/nutrition-icon.jpg";
import workoutIcon from "@/assets/workout-icon.jpg";
import aiRecommendationsIcon from "@/assets/ai-recommendations-icon.jpg";

interface HealthMetric {
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
  color: "health" | "energy" | "calm" | "info";
}

const HealthDashboard = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [motivationalMessage, setMotivationalMessage] = useState("");

  useEffect(() => {
    const data = aiInsightsService.getHealthData();
    const userAchievements = aiInsightsService.getAchievements();
    const message = aiInsightsService.getMotivationalMessage(data.streaks);
    
    setHealthData(data);
    setAchievements(userAchievements);
    setMotivationalMessage(message);
  }, []);
  const healthMetrics: HealthMetric[] = [
    { label: "Daily Steps", value: 8240, target: 10000, unit: "steps", trend: "up", color: "health" },
    { label: "Water Intake", value: 6, target: 8, unit: "glasses", trend: "up", color: "calm" },
    { label: "Sleep Quality", value: 85, target: 100, unit: "%", trend: "stable", color: "info" },
    { label: "Active Minutes", value: 45, target: 60, unit: "min", trend: "up", color: "energy" },
  ];

  const aiRecommendations = [
    "Increase protein intake by 15g to support muscle recovery",
    "Try 10 minutes of meditation before bed for better sleep",
    "Add strength training 2x per week to boost metabolism",
    "Drink water upon waking to kickstart hydration"
  ];

  const getStreakColor = (days: number) => {
    if (days >= 14) return "text-orange-500";
    if (days >= 7) return "text-primary";
    if (days >= 3) return "text-info";
    return "text-muted-foreground";
  };

  const getStreakEmoji = (days: number) => {
    if (days >= 14) return "🔥";
    if (days >= 7) return "⚡";
    if (days >= 3) return "✨";
    return "📅";
  };

  if (!healthData) {
    return <div className="min-h-screen bg-gradient-vitality flex items-center justify-center">
      <div className="text-center">Loading your health dashboard...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-vitality p-4 md:p-6">
      {/* Hero Section */}
      <div className="relative mb-8 overflow-hidden rounded-xl">
        <img 
          src={healthHero} 
          alt="Health Dashboard" 
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-health bg-opacity-80 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">LifeSpan Boost</h1>
            <p className="text-lg opacity-90">AI-Powered Health & Longevity Tracker</p>
          </div>
        </div>
      </div>

      {/* Health Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="shadow-card hover:shadow-health transition-smooth">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
                  {metric.trend === "down" && <TrendingUp className="h-4 w-4 text-destructive rotate-180" />}
                  {metric.trend === "stable" && <Activity className="h-4 w-4 text-muted-foreground" />}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">{metric.value.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">/{metric.target} {metric.unit}</span>
                </div>
                <Progress 
                  value={(metric.value / metric.target) * 100} 
                  className="h-2"
                />
                <Badge variant="secondary" className="text-xs">
                  {Math.round((metric.value / metric.target) * 100)}% of goal
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gamification Section - Streaks & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Streaks */}
        <Card className="shadow-card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Daily Streaks
            </CardTitle>
            <CardDescription>Keep the momentum going!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl">{getStreakEmoji(healthData.streaks.nutrition)}</div>
                <div className={`text-2xl font-bold ${getStreakColor(healthData.streaks.nutrition)}`}>
                  {healthData.streaks.nutrition}
                </div>
                <div className="text-sm text-muted-foreground">Nutrition</div>
                <Badge variant="secondary" className="text-xs">
                  +{aiInsightsService.calculateStreakBonus(healthData.streaks.nutrition)} XP
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">{getStreakEmoji(healthData.streaks.workout)}</div>
                <div className={`text-2xl font-bold ${getStreakColor(healthData.streaks.workout)}`}>
                  {healthData.streaks.workout}
                </div>
                <div className="text-sm text-muted-foreground">Workouts</div>
                <Badge variant="secondary" className="text-xs">
                  +{aiInsightsService.calculateStreakBonus(healthData.streaks.workout)} XP
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">{getStreakEmoji(healthData.streaks.water)}</div>
                <div className={`text-2xl font-bold ${getStreakColor(healthData.streaks.water)}`}>
                  {healthData.streaks.water}
                </div>
                <div className="text-sm text-muted-foreground">Hydration</div>
                <Badge variant="secondary" className="text-xs">
                  +{aiInsightsService.calculateStreakBonus(healthData.streaks.water)} XP
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">{getStreakEmoji(healthData.streaks.sleep)}</div>
                <div className={`text-2xl font-bold ${getStreakColor(healthData.streaks.sleep)}`}>
                  {healthData.streaks.sleep}
                </div>
                <div className="text-sm text-muted-foreground">Sleep</div>
                <Badge variant="secondary" className="text-xs">
                  +{aiInsightsService.calculateStreakBonus(healthData.streaks.sleep)} XP
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Achievements
            </CardTitle>
            <CardDescription>Your health milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.slice(0, 3).map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-smooth ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 border-yellow-300' 
                      : 'bg-muted/50 border-muted'
                  }`}
                >
                  <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {!achievement.unlocked && (
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-1 mt-1" 
                      />
                    )}
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Gift className="h-4 w-4 mr-2" />
                View All Achievements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Message */}
      <Card className="shadow-card bg-gradient-health text-white mb-8">
        <CardContent className="py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{motivationalMessage}</h3>
            <p className="text-white/90 text-sm">
              You've logged nutrition for {healthData.streaks.nutrition} days straight! 
              {healthData.streaks.nutrition >= 7 ? " You're building incredible habits!" : " Keep going to build stronger habits!"}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Main Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Nutrition Tracking */}
        <Card className="shadow-card hover:shadow-health transition-smooth">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <img src={nutritionIcon} alt="Nutrition" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-success" />
                  Nutrition Tracker
                </CardTitle>
                <CardDescription>Monitor your daily intake</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-success">1,850</p>
                  <p className="text-muted-foreground">Calories</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-info">85g</p>
                  <p className="text-muted-foreground">Protein</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-warning">45g</p>
                  <p className="text-muted-foreground">Fiber</p>
                </div>
              </div>
              <Button variant="health" className="w-full">
                Log Meal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workout Planner */}
        <Card className="shadow-card hover:shadow-health transition-smooth">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <img src={workoutIcon} alt="Workout" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Workout Planner
                </CardTitle>
                <CardDescription>AI-optimized fitness routines</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Today's Focus</span>
                  <Badge variant="secondary">Upper Body</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold">45 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Exercises</span>
                  <span className="font-semibold">6 planned</span>
                </div>
              </div>
              <Button variant="energy" className="w-full">
                Start Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="shadow-card hover:shadow-health transition-smooth">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <img src={aiRecommendationsIcon} alt="AI Recommendations" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-secondary" />
                  AI Insights
                </CardTitle>
                <CardDescription>Personalized health recommendations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiRecommendations.slice(0, 2).map((recommendation, index) => (
                <div key={index} className="text-sm p-3 bg-gradient-vitality rounded-lg border border-border">
                  {recommendation}
                </div>
              ))}
              <Button variant="calm" className="w-full">
                View All Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>Fast access to common health tracking tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <Heart className="h-6 w-6" />
              <span className="text-xs">Log Weight</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <Activity className="h-6 w-6" />
              <span className="text-xs">Track Mood</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <Zap className="h-6 w-6" />
              <span className="text-xs">Log Sleep</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
              <Brain className="h-6 w-6" />
              <span className="text-xs">Meditation</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;