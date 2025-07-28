import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Target, 
  TrendingUp, 
  Clock, 
  Zap,
  Plus,
  Dumbbell,
  Heart,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FitnessTracker = () => {
  const { toast } = useToast();
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [todayWorkouts, setTodayWorkouts] = useState([
    { name: "Morning Run", duration: "30 min", calories: 280, completed: true },
    { name: "Push-ups", duration: "10 min", calories: 85, completed: true },
  ]);

  const workoutLibrary = [
    { 
      id: "cardio", 
      name: "Cardio Blast", 
      duration: "20 min", 
      difficulty: "Medium", 
      calories: "200-300",
      exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers", "High Knees"]
    },
    { 
      id: "strength", 
      name: "Strength Training", 
      duration: "45 min", 
      difficulty: "Hard", 
      calories: "300-450",
      exercises: ["Push-ups", "Squats", "Lunges", "Plank"]
    },
    { 
      id: "yoga", 
      name: "Morning Yoga", 
      duration: "30 min", 
      difficulty: "Easy", 
      calories: "150-200",
      exercises: ["Sun Salutation", "Warrior Pose", "Downward Dog", "Child's Pose"]
    },
    { 
      id: "hiit", 
      name: "HIIT Workout", 
      duration: "15 min", 
      difficulty: "Hard", 
      calories: "250-350",
      exercises: ["Sprint Intervals", "Jump Squats", "Plank Jacks", "Bicycle Crunches"]
    }
  ];

  const weeklyProgress = {
    currentWeek: 4,
    targetWeek: 5,
    workoutsCompleted: 12,
    targetWorkouts: 15,
    caloriesBurned: 2480,
    targetCalories: 3000
  };

  const startWorkout = (workoutId: string, workoutName: string) => {
    setActiveWorkout(workoutId);
    setIsWorkoutActive(true);
    setWorkoutTimer(0);
    toast({
      title: "Workout Started! 💪",
      description: `You've started ${workoutName}. Keep going!`,
    });
  };

  const completeWorkout = () => {
    if (activeWorkout) {
      const workout = workoutLibrary.find(w => w.id === activeWorkout);
      const newWorkout = {
        name: workout?.name || "Custom Workout",
        duration: `${Math.floor(workoutTimer / 60)} min`,
        calories: Math.floor(workoutTimer * 4.5), // Rough estimation
        completed: true
      };
      setTodayWorkouts([...todayWorkouts, newWorkout]);
      setActiveWorkout(null);
      setIsWorkoutActive(false);
      setWorkoutTimer(0);
      
      toast({
        title: "Workout Completed! 🎉",
        description: `Great job! You burned ~${newWorkout.calories} calories.`,
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/20 text-success";
      case "Medium": return "bg-warning/20 text-warning";
      case "Hard": return "bg-destructive/20 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-vitality pb-20">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Fitness Tracker</h1>
          <p className="text-muted-foreground">Track workouts and reach your fitness goals</p>
        </div>

        {/* Active Workout Timer */}
        {isWorkoutActive && (
          <Card className="border-primary shadow-health">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Active Workout
              </CardTitle>
              <CardDescription>
                {workoutLibrary.find(w => w.id === activeWorkout)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">
                {Math.floor(workoutTimer / 60)}:{(workoutTimer % 60).toString().padStart(2, '0')}
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => setWorkoutTimer(prev => prev + 1)}
                  variant="outline"
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => setWorkoutTimer(0)}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={completeWorkout}
                  className="bg-success hover:bg-success/90"
                  size="sm"
                >
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="workouts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="workouts" className="space-y-4">
            {/* Today's Completed Workouts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Today's Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{workout.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {workout.duration} • {workout.calories} cal
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                      ✓ Done
                    </Badge>
                  </div>
                ))}
                {todayWorkouts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No workouts completed today. Start one below!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Workout Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  Workout Library
                </CardTitle>
                <CardDescription>Choose from our curated workout collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {workoutLibrary.map((workout) => (
                  <div key={workout.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{workout.name}</h3>
                      <Badge className={getDifficultyColor(workout.difficulty)}>
                        {workout.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {workout.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        {workout.calories} cal
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {workout.exercises.map((exercise, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {exercise}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={() => startWorkout(workout.id, workout.name)}
                      disabled={isWorkoutActive}
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Workout
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Workouts Completed</span>
                    <span className="text-sm text-muted-foreground">
                      {weeklyProgress.workoutsCompleted}/{weeklyProgress.targetWorkouts}
                    </span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.workoutsCompleted / weeklyProgress.targetWorkouts) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Calories Burned</span>
                    <span className="text-sm text-muted-foreground">
                      {weeklyProgress.caloriesBurned}/{weeklyProgress.targetCalories}
                    </span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.caloriesBurned / weeklyProgress.targetCalories) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{weeklyProgress.workoutsCompleted}</div>
                    <div className="text-sm text-muted-foreground">Workouts</div>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">{weeklyProgress.caloriesBurned}</div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            {/* Fitness Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Fitness Goals
                </CardTitle>
                <CardDescription>Set and track your fitness objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="weekly-workouts">Weekly Workout Target</Label>
                  <Input 
                    id="weekly-workouts"
                    type="number" 
                    placeholder="5" 
                    defaultValue={weeklyProgress.targetWorkouts}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="weekly-calories">Weekly Calorie Burn Target</Label>
                  <Input 
                    id="weekly-calories"
                    type="number" 
                    placeholder="3000" 
                    defaultValue={weeklyProgress.targetCalories}
                  />
                </div>

                <Button className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Update Goals
                </Button>

                {/* Current Goals Display */}
                <div className="pt-4 space-y-3">
                  <h4 className="font-medium">Current Goals</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span>Weekly Workouts</span>
                      <Badge variant="outline">{weeklyProgress.targetWorkouts} sessions</Badge>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span>Weekly Calories</span>
                      <Badge variant="outline">{weeklyProgress.targetCalories} cal</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FitnessTracker;