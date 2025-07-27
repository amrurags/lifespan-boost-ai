import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

export interface FoodAnalysisResult {
  foods: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

class FoodRecognitionService {
  // Mock food recognition - in a real app, you'd use a service like Clarifai, Google Vision, or a custom AI model
  private mockFoodDatabase = [
    { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Rice Bowl", calories: 350, protein: 8, carbs: 70, fat: 2 },
    { name: "Caesar Salad", calories: 280, protein: 12, carbs: 15, fat: 22 },
    { name: "Avocado Toast", calories: 320, protein: 8, carbs: 30, fat: 20 },
    { name: "Greek Yogurt", calories: 100, protein: 15, carbs: 6, fat: 0 },
    { name: "Quinoa Bowl", calories: 420, protein: 18, carbs: 65, fat: 12 },
    { name: "Salmon Fillet", calories: 350, protein: 40, carbs: 0, fat: 18 },
    { name: "Mixed Vegetables", calories: 80, protein: 4, carbs: 16, fat: 0.5 }
  ];

  async analyzeFood(imageBase64: string): Promise<FoodAnalysisResult> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis - randomly select 1-3 foods from our database
    const numFoods = Math.floor(Math.random() * 3) + 1;
    const selectedFoods: FoodItem[] = [];
    
    for (let i = 0; i < numFoods; i++) {
      const randomFood = this.mockFoodDatabase[Math.floor(Math.random() * this.mockFoodDatabase.length)];
      const confidence = 0.7 + Math.random() * 0.3; // 70-100% confidence
      
      selectedFoods.push({
        ...randomFood,
        confidence: Math.round(confidence * 100) / 100
      });
    }
    
    // Calculate totals
    const totals = selectedFoods.reduce(
      (acc, food) => ({
        totalCalories: acc.totalCalories + food.calories,
        totalProtein: acc.totalProtein + food.protein,
        totalCarbs: acc.totalCarbs + food.carbs,
        totalFat: acc.totalFat + food.fat
      }),
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
    );
    
    return {
      foods: selectedFoods,
      ...totals
    };
  }

  async capturePhoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        width: 1024,
        height: 1024
      });
      
      return image.base64String || '';
    } catch (error) {
      console.error('Error capturing photo:', error);
      throw new Error('Failed to capture photo');
    }
  }

  async selectFromGallery(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        width: 1024,
        height: 1024
      });
      
      return image.base64String || '';
    } catch (error) {
      console.error('Error selecting photo:', error);
      throw new Error('Failed to select photo');
    }
  }
}

export const foodRecognitionService = new FoodRecognitionService();