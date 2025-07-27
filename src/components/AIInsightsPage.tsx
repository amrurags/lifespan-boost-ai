import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  Star,
  Trophy,
  Loader2
} from "lucide-react";
import { aiInsightsService, AIRecommendation, UserGoal, HealthData } from "@/services/aiInsightsService";
import { useToast } from "@/hooks/use-toast";

const AIInsightsPage = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setIsLoading(true);
      const [recs, userGoals, data] = await Promise.all([
        aiInsightsService.generateRecommendations(),
        aiInsightsService.getUserGoals(),
        aiInsightsService.getHealthData()
      ]);
      
      setRecommendations(recs);
      setGoals(userGoals);
      setHealthData(data);
    } catch (error) {
      toast({
        title: "Error Loading Insights",
        description: "Failed to load AI recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-info';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/20 text-success';
      case 'moderate': return 'bg-warning/20 text-warning';
      case 'challenging': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nutrition': return '🍎';
      case 'exercise': return '💪';
      case 'sleep': return '😴';
      case 'hydration': return '💧';
      case 'recovery': return '🧘';
      default: return '⚡';
    }
  };

  const filteredRecommendations = recommendations.filter(rec => 
    selectedCategory === 'all' || rec.category === selectedCategory
  );

  const categories = ['all', 'nutrition', 'exercise', 'sleep', 'hydration', 'recovery'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-vitality p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Analyzing Your Health Data</h3>
                <p className="text-muted-foreground">Our AI is generating personalized insights...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-vitality p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Health Insights</h1>
          <p className="text-muted-foreground">Personalized recommendations based on your goals and data</p>
        </div>

        {/* Goals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base capitalize">
                    {goal.type.replace('_', ' ')} Goal
                  </CardTitle>
                  <Badge variant={goal.priority === 'high' ? 'destructive' : 'secondary'}>
                    {goal.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.current} / {goal.target} {goal.unit}</span>
                  </div>
                  <Progress 
                    value={(goal.current / goal.target) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
                    <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Filter */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Recommendations ({filteredRecommendations.length})
            </CardTitle>
            <CardDescription>Filter by category to focus on specific areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All' : `${getCategoryIcon(category)} ${category}`}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="shadow-card hover:shadow-health transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getCategoryIcon(rec.category)}</div>
                    <div>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getImpactColor(rec.impact)}>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {rec.impact} impact
                        </Badge>
                        <Badge className={getDifficultyColor(rec.difficulty)}>
                          {rec.difficulty}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {rec.timeframe}
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{rec.description}</p>
                
                <div className="bg-gradient-vitality p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-warning" />
                    <span className="font-medium text-sm">Why this matters:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Action Steps:
                  </h4>
                  <ul className="space-y-2">
                    {rec.actionSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="health" size="sm">
                    <Star className="h-4 w-4 mr-1" />
                    Start Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trophy className="h-4 w-4 mr-1" />
                    Save to Goals
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="py-12 text-center">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recommendations in this category</h3>
              <p className="text-muted-foreground">Try selecting a different category or check back later for new insights.</p>
            </CardContent>
          </Card>
        )}

        {/* Refresh Button */}
        <Card className="shadow-card">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Get Fresh Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Update recommendations based on your latest health data
                </p>
              </div>
              <Button variant="outline" onClick={loadInsights} disabled={isLoading}>
                <Zap className="h-4 w-4 mr-2" />
                Refresh Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIInsightsPage;