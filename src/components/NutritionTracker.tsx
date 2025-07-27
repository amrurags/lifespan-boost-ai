import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Apple, Coffee, Utensils, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import PhotoNutritionAnalyzer from "@/components/PhotoNutritionAnalyzer";
import { FoodAnalysisResult } from "@/services/foodRecognitionService";
import { useToast } from "@/hooks/use-toast";

interface NutritionEntry {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

const NutritionTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [todayEntries, setTodayEntries] = useState<NutritionEntry[]>([
    { id: 1, name: "Greek Yogurt with Berries", calories: 150, protein: 15, carbs: 20, fat: 2, time: "8:30 AM" },
    { id: 2, name: "Grilled Chicken Salad", calories: 350, protein: 35, carbs: 15, fat: 18, time: "12:45 PM" },
    { id: 3, name: "Quinoa Bowl", calories: 420, protein: 18, carbs: 65, fat: 12, time: "6:15 PM" },
  ]);
  const { toast } = useToast();
  
  const handleFoodAdded = (analysis: FoodAnalysisResult) => {
    const newEntries = analysis.foods.map((food, index) => ({
      id: Date.now() + index,
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    
    setTodayEntries(prev => [...prev, ...newEntries]);
  };

  const dailyGoals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 65
  };

  const consumed = todayEntries.reduce(
    (totals, entry) => ({
      calories: totals.calories + entry.calories,
      protein: totals.protein + entry.protein,
      carbs: totals.carbs + entry.carbs,
      fat: totals.fat + entry.fat
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const quickAddFoods = [
    { name: "Banana", calories: 105, icon: "🍌" },
    { name: "Almonds (1oz)", calories: 160, icon: "🥜" },
    { name: "Green Tea", calories: 2, icon: "🍵" },
    { name: "Avocado Half", calories: 160, icon: "🥑" },
  ];

  return (
    <div className="min-h-screen bg-gradient-vitality p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nutrition Tracker</h1>
          <p className="text-muted-foreground">Track your daily nutrition for optimal health</p>
        </div>

        {/* Daily Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-success" />
              Today's Nutrition Summary
            </CardTitle>
            <CardDescription>Track your macronutrients and calories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-sm text-muted-foreground">
                    {consumed.calories}/{dailyGoals.calories}
                  </span>
                </div>
                <Progress value={(consumed.calories / dailyGoals.calories) * 100} className="h-2" />
                <Badge variant="secondary" className="text-xs">
                  {Math.round((consumed.calories / dailyGoals.calories) * 100)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm text-muted-foreground">
                    {consumed.protein}g/{dailyGoals.protein}g
                  </span>
                </div>
                <Progress value={(consumed.protein / dailyGoals.protein) * 100} className="h-2" />
                <Badge variant="secondary" className="text-xs">
                  {Math.round((consumed.protein / dailyGoals.protein) * 100)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Carbs</span>
                  <span className="text-sm text-muted-foreground">
                    {consumed.carbs}g/{dailyGoals.carbs}g
                  </span>
                </div>
                <Progress value={(consumed.carbs / dailyGoals.carbs) * 100} className="h-2" />
                <Badge variant="secondary" className="text-xs">
                  {Math.round((consumed.carbs / dailyGoals.carbs) * 100)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm text-muted-foreground">
                    {consumed.fat}g/{dailyGoals.fat}g
                  </span>
                </div>
                <Progress value={(consumed.fat / dailyGoals.fat) * 100} className="h-2" />
                <Badge variant="secondary" className="text-xs">
                  {Math.round((consumed.fat / dailyGoals.fat) * 100)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Add Foods */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-success" />
              Quick Add
            </CardTitle>
            <CardDescription>Tap to quickly log common foods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickAddFoods.map((food, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-4 flex-col space-y-2 hover:shadow-health transition-smooth"
                >
                  <span className="text-2xl">{food.icon}</span>
                  <span className="text-sm font-medium">{food.name}</span>
                  <span className="text-xs text-muted-foreground">{food.calories} cal</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Photo Scanner */}
        <Card className="shadow-card border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Food Scanner
            </CardTitle>
            <CardDescription>Take a photo to instantly identify food and calculate calories</CardDescription>
          </CardHeader>
          <CardContent>
            <PhotoNutritionAnalyzer onFoodAdded={handleFoodAdded} />
          </CardContent>
        </Card>

        {/* Add Food Search */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Manual Food Search
            </CardTitle>
            <CardDescription>Search for foods to add manually</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Search for foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="health">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Meals */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-accent" />
              Today's Meals
            </CardTitle>
            <CardDescription>Your logged meals and snacks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gradient-vitality rounded-lg border border-border">
                  <div className="flex-1">
                    <h4 className="font-medium">{entry.name}</h4>
                    <p className="text-sm text-muted-foreground">{entry.time}</p>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="text-success">{entry.calories} cal</span>
                      <span className="text-info">{entry.protein}g protein</span>
                      <span className="text-warning">{entry.carbs}g carbs</span>
                      <span className="text-accent">{entry.fat}g fat</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionTracker;