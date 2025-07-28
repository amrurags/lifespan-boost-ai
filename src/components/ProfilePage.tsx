import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Trophy, 
  Target, 
  Bell, 
  Shield, 
  Smartphone,
  Heart,
  Activity,
  Utensils,
  Brain,
  Calendar,
  TrendingUp,
  Award,
  Crown,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    age: 28,
    height: "5'8\"",
    weight: "165 lbs",
    goal: "Maintain healthy lifestyle",
    joinDate: "January 2024"
  });

  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealTracking: true,
    achievements: true,
    weeklyReports: false
  });

  const achievements = [
    { 
      id: 1, 
      name: "Nutrition Newbie", 
      description: "Tracked meals for 7 days", 
      earned: true, 
      icon: Utensils,
      rarity: "common"
    },
    { 
      id: 2, 
      name: "Workout Warrior", 
      description: "Completed 10 workouts", 
      earned: true, 
      icon: Activity,
      rarity: "common"
    },
    { 
      id: 3, 
      name: "Streak Master", 
      description: "Maintained 30-day streak", 
      earned: false, 
      icon: Crown,
      rarity: "legendary"
    },
    { 
      id: 4, 
      name: "AI Explorer", 
      description: "Used AI insights 5 times", 
      earned: true, 
      icon: Brain,
      rarity: "rare"
    },
    { 
      id: 5, 
      name: "Consistency King", 
      description: "7-day perfect week", 
      earned: true, 
      icon: Star,
      rarity: "epic"
    },
    { 
      id: 6, 
      name: "Photo Pro", 
      description: "Scanned 20 meals with camera", 
      earned: false, 
      icon: Smartphone,
      rarity: "rare"
    }
  ];

  const healthStats = {
    totalWorkouts: 47,
    mealsTracked: 156,
    caloriesBurned: 12450,
    currentStreak: 12,
    longestStreak: 23,
    aiInsightsUsed: 8
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-slate-100 text-slate-700 border-slate-200";
      case "rare": return "bg-blue-100 text-blue-700 border-blue-200";
      case "epic": return "bg-purple-100 text-purple-700 border-purple-200";
      case "legendary": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notifications Updated! 🔔",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-vitality pb-20">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
          <p className="text-muted-foreground">Manage your health journey and achievements</p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-health">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{profileData.name}</h3>
                <p className="text-muted-foreground">{profileData.email}</p>
                <p className="text-sm text-muted-foreground">Member since {profileData.joinDate}</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Level 3
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="achievements">Awards</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            {/* Health Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Health Journey
                </CardTitle>
                <CardDescription>Track your progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="text-2xl font-bold text-primary">{healthStats.totalWorkouts}</div>
                    <div className="text-sm text-muted-foreground">Total Workouts</div>
                  </div>
                  <div className="text-center p-4 bg-success/5 rounded-lg border border-success/10">
                    <div className="text-2xl font-bold text-success">{healthStats.mealsTracked}</div>
                    <div className="text-sm text-muted-foreground">Meals Tracked</div>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/10">
                    <div className="text-2xl font-bold text-warning">{healthStats.caloriesBurned}</div>
                    <div className="text-sm text-muted-foreground">Calories Burned</div>
                  </div>
                  <div className="text-center p-4 bg-info/5 rounded-lg border border-info/10">
                    <div className="text-2xl font-bold text-info">{healthStats.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="font-medium">Personal Records</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Longest Streak</span>
                      <Badge variant="outline">{healthStats.longestStreak} days</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">AI Insights Used</span>
                      <Badge variant="outline">{healthStats.aiInsightsUsed} times</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
                <CardDescription>Your health milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border-2 transition-smooth ${
                        achievement.earned 
                          ? 'bg-primary/5 border-primary/20' 
                          : 'bg-muted/20 border-muted opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.earned 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{achievement.name}</h4>
                            <Badge 
                              variant="outline" 
                              className={getRarityColor(achievement.rarity)}
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-success/20 text-success border-success/30">
                            ✓ Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        type="number"
                        value={profileData.age}
                        onChange={(e) => setProfileData({...profileData, age: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input 
                        id="height"
                        value={profileData.height}
                        onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input 
                      id="weight"
                      value={profileData.weight}
                      onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal">Health Goal</Label>
                    <Input 
                      id="goal"
                      value={profileData.goal}
                      onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={handleProfileUpdate} className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="workout-reminders">Workout Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded to exercise</p>
                    </div>
                    <Switch 
                      id="workout-reminders"
                      checked={notifications.workoutReminders}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, workoutReminders: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="meal-tracking">Meal Tracking</Label>
                      <p className="text-sm text-muted-foreground">Log your meals regularly</p>
                    </div>
                    <Switch 
                      id="meal-tracking"
                      checked={notifications.mealTracking}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, mealTracking: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="achievements">Achievement Alerts</Label>
                      <p className="text-sm text-muted-foreground">Celebrate your milestones</p>
                    </div>
                    <Switch 
                      id="achievements"
                      checked={notifications.achievements}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, achievements: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Summary of your progress</p>
                    </div>
                    <Switch 
                      id="weekly-reports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, weeklyReports: checked})
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleNotificationUpdate} className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            {/* App Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  App Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Security
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Data & Storage
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Export Health Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;