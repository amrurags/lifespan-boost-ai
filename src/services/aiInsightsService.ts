export interface UserGoal {
  id: string;
  type: 'weight_loss' | 'muscle_gain' | 'endurance' | 'general_health';
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface HealthData {
  nutrition: {
    dailyCalories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
  activity: {
    steps: number;
    activeMinutes: number;
    workoutsThisWeek: number;
    lastWorkoutType: string;
  };
  sleep: {
    averageHours: number;
    quality: number;
  };
  streaks: {
    nutrition: number;
    workout: number;
    sleep: number;
    water: number;
  };
}

export interface AIRecommendation {
  id: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'hydration' | 'recovery';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'moderate' | 'challenging';
  timeframe: string;
  actionSteps: string[];
  reasoning: string;
  relatedGoal?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: Date;
  progress: number;
  target: number;
  category: 'nutrition' | 'fitness' | 'streak' | 'milestone';
}

class AIInsightsService {
  private mockHealthData: HealthData = {
    nutrition: {
      dailyCalories: 1850,
      protein: 68,
      carbs: 180,
      fat: 45,
      water: 6
    },
    activity: {
      steps: 8240,
      activeMinutes: 45,
      workoutsThisWeek: 3,
      lastWorkoutType: 'Upper Body'
    },
    sleep: {
      averageHours: 6.5,
      quality: 75
    },
    streaks: {
      nutrition: 5,
      workout: 3,
      sleep: 2,
      water: 7
    }
  };

  private mockGoals: UserGoal[] = [
    {
      id: '1',
      type: 'weight_loss',
      target: 75,
      current: 82,
      unit: 'kg',
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      priority: 'high'
    },
    {
      id: '2',
      type: 'muscle_gain',
      target: 100,
      current: 68,
      unit: 'g protein/day',
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      priority: 'medium'
    }
  ];

  async generateRecommendations(): Promise<AIRecommendation[]> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const recommendations: AIRecommendation[] = [];

    // Analyze nutrition vs goals
    if (this.mockHealthData.nutrition.protein < 100) {
      recommendations.push({
        id: 'protein-boost',
        category: 'nutrition',
        title: 'Increase Protein Intake',
        description: 'You\'re 32g below your protein goal. Adding lean protein sources will support muscle growth and recovery.',
        impact: 'high',
        difficulty: 'easy',
        timeframe: '1-2 weeks',
        actionSteps: [
          'Add Greek yogurt as a morning snack (15g protein)',
          'Include a palm-sized portion of lean meat at lunch',
          'Try a protein smoothie post-workout',
          'Snack on almonds or hard-boiled eggs'
        ],
        reasoning: 'Based on your muscle gain goal, optimal protein intake should be 1.6-2.2g per kg body weight.',
        relatedGoal: '2'
      });
    }

    // Analyze sleep quality
    if (this.mockHealthData.sleep.averageHours < 7) {
      recommendations.push({
        id: 'sleep-optimization',
        category: 'sleep',
        title: 'Optimize Sleep Duration',
        description: 'Increasing sleep to 7-9 hours will improve recovery, metabolism, and weight loss progress.',
        impact: 'high',
        difficulty: 'moderate',
        timeframe: '2-4 weeks',
        actionSteps: [
          'Set a consistent bedtime 30 minutes earlier',
          'Create a wind-down routine with no screens',
          'Keep bedroom cool (18-20°C) and dark',
          'Avoid caffeine after 2 PM'
        ],
        reasoning: 'Poor sleep disrupts hormones that regulate hunger and metabolism, hindering weight loss.',
        relatedGoal: '1'
      });
    }

    // Analyze workout frequency
    if (this.mockHealthData.activity.workoutsThisWeek < 4) {
      recommendations.push({
        id: 'workout-frequency',
        category: 'exercise',
        title: 'Add Cardio Sessions',
        description: 'Including 2 cardio sessions per week will accelerate weight loss and improve cardiovascular health.',
        impact: 'medium',
        difficulty: 'moderate',
        timeframe: '1 week',
        actionSteps: [
          'Add 20-minute brisk walks on rest days',
          'Try HIIT workouts 2x per week',
          'Use stairs instead of elevators',
          'Dance or bike for 30 minutes on weekends'
        ],
        reasoning: 'Cardio creates additional calorie deficit needed for your weight loss goal.',
        relatedGoal: '1'
      });
    }

    // Hydration optimization
    if (this.mockHealthData.nutrition.water < 8) {
      recommendations.push({
        id: 'hydration-boost',
        category: 'hydration',
        title: 'Improve Hydration',
        description: 'Proper hydration supports metabolism, reduces false hunger, and improves workout performance.',
        impact: 'medium',
        difficulty: 'easy',
        timeframe: '1 week',
        actionSteps: [
          'Drink a glass of water upon waking',
          'Set hourly water reminders on your phone',
          'Carry a water bottle throughout the day',
          'Drink water before each meal'
        ],
        reasoning: 'Adequate hydration is crucial for optimal metabolic function and appetite regulation.',
        relatedGoal: '1'
      });
    }

    // Recovery optimization
    recommendations.push({
      id: 'recovery-focus',
      category: 'recovery',
      title: 'Active Recovery Days',
      description: 'Incorporate light activities on rest days to maintain momentum without overtraining.',
      impact: 'medium',
      difficulty: 'easy',
      timeframe: 'Ongoing',
      actionSteps: [
        'Take 10-minute walks after meals',
        'Do gentle stretching or yoga',
        'Practice meditation for 5-10 minutes',
        'Try foam rolling for muscle recovery'
      ],
      reasoning: 'Active recovery promotes blood flow, reduces muscle stiffness, and maintains healthy habits.',
      relatedGoal: '2'
    });

    return recommendations;
  }

  getHealthData(): HealthData {
    return this.mockHealthData;
  }

  getUserGoals(): UserGoal[] {
    return this.mockGoals;
  }

  getAchievements(): Achievement[] {
    return [
      {
        id: 'first-week',
        title: 'First Week Warrior',
        description: 'Complete 7 days of nutrition tracking',
        icon: '🏆',
        unlocked: true,
        unlockedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        progress: 7,
        target: 7,
        category: 'nutrition'
      },
      {
        id: 'protein-master',
        title: 'Protein Master',
        description: 'Hit protein goal 5 days in a row',
        icon: '💪',
        unlocked: false,
        progress: 3,
        target: 5,
        category: 'nutrition'
      },
      {
        id: 'workout-streak',
        title: 'Consistency Champion',
        description: 'Complete 10 workouts in a month',
        icon: '🔥',
        unlocked: false,
        progress: 7,
        target: 10,
        category: 'fitness'
      },
      {
        id: 'hydration-hero',
        title: 'Hydration Hero',
        description: 'Drink 8 glasses of water for 7 days',
        icon: '💧',
        unlocked: true,
        unlockedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        progress: 7,
        target: 7,
        category: 'streak'
      },
      {
        id: 'early-bird',
        title: 'Early Bird',
        description: 'Log breakfast before 9 AM for 5 days',
        icon: '🌅',
        unlocked: false,
        progress: 2,
        target: 5,
        category: 'streak'
      }
    ];
  }

  calculateStreakBonus(streakDays: number): number {
    if (streakDays >= 30) return 50;
    if (streakDays >= 14) return 25;
    if (streakDays >= 7) return 10;
    if (streakDays >= 3) return 5;
    return 0;
  }

  getMotivationalMessage(streaks: HealthData['streaks']): string {
    const maxStreak = Math.max(...Object.values(streaks));
    
    if (maxStreak >= 14) return "🔥 You're on fire! Your consistency is incredible!";
    if (maxStreak >= 7) return "⚡ Amazing streak! You're building powerful habits!";
    if (maxStreak >= 3) return "🌟 Great momentum! Keep the streak alive!";
    return "💫 Every journey begins with a single step. You've got this!";
  }
}

export const aiInsightsService = new AIInsightsService();