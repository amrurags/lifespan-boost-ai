import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Camera, Image as ImageIcon, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { foodRecognitionService, FoodAnalysisResult } from "@/services/foodRecognitionService";
import { useToast } from "@/hooks/use-toast";

interface PhotoNutritionAnalyzerProps {
  onFoodAdded: (analysis: FoodAnalysisResult) => void;
}

const PhotoNutritionAnalyzer = ({ onFoodAdded }: PhotoNutritionAnalyzerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);
  const { toast } = useToast();

  const handlePhotoCapture = async () => {
    try {
      setIsAnalyzing(true);
      const imageBase64 = await foodRecognitionService.capturePhoto();
      setCapturedImage(imageBase64);
      
      // Analyze the captured image
      const result = await foodRecognitionService.analyzeFood(imageBase64);
      setAnalysisResult(result);
      
      toast({
        title: "Food Analysis Complete!",
        description: `Detected ${result.foods.length} food item(s) with ${result.totalCalories} total calories.`,
      });
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Failed to capture photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGallerySelect = async () => {
    try {
      setIsAnalyzing(true);
      const imageBase64 = await foodRecognitionService.selectFromGallery();
      setCapturedImage(imageBase64);
      
      // Analyze the selected image
      const result = await foodRecognitionService.analyzeFood(imageBase64);
      setAnalysisResult(result);
      
      toast({
        title: "Food Analysis Complete!",
        description: `Detected ${result.foods.length} food item(s) with ${result.totalCalories} total calories.`,
      });
    } catch (error) {
      toast({
        title: "Gallery Error",
        description: "Failed to select photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToLog = () => {
    if (analysisResult) {
      onFoodAdded(analysisResult);
      toast({
        title: "Food Added!",
        description: "Nutrition data has been added to your daily log.",
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCapturedImage("");
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <>
      <Button 
        variant="health" 
        className="w-full" 
        onClick={() => setIsOpen(true)}
      >
        <Camera className="h-4 w-4 mr-2" />
        Scan Food with AI
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Food Scanner
            </DialogTitle>
            <DialogDescription>
              Take a photo or select from gallery to automatically identify food and calculate calories
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {!capturedImage && !isAnalyzing && (
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-24 flex-col space-y-2"
                  onClick={handlePhotoCapture}
                >
                  <Camera className="h-8 w-8" />
                  <span className="text-sm">Take Photo</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex-col space-y-2"
                  onClick={handleGallerySelect}
                >
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-sm">Select from Gallery</span>
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div className="text-center">
                      <h3 className="font-medium">Analyzing Food...</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI is identifying ingredients and calculating nutrition
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {capturedImage && !isAnalyzing && (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={`data:image/jpeg;base64,${capturedImage}`}
                    alt="Captured food"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Analyzed
                  </Badge>
                </div>

                {analysisResult && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Analysis Results</CardTitle>
                      <CardDescription>
                        AI detected {analysisResult.foods.length} food item(s)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Detected Foods */}
                      <div className="space-y-2">
                        {analysisResult.foods.map((food, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gradient-vitality rounded-lg border">
                            <div>
                              <h4 className="font-medium">{food.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {Math.round(food.confidence * 100)}% confidence
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-success">{food.calories} cal</p>
                              <p className="text-xs text-muted-foreground">
                                {food.protein}g protein
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Nutrition Summary */}
                      <div className="grid grid-cols-4 gap-2 p-3 bg-primary/5 rounded-lg">
                        <div className="text-center">
                          <p className="text-lg font-bold text-success">{analysisResult.totalCalories}</p>
                          <p className="text-xs text-muted-foreground">Calories</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-info">{Math.round(analysisResult.totalProtein)}g</p>
                          <p className="text-xs text-muted-foreground">Protein</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-warning">{Math.round(analysisResult.totalCarbs)}g</p>
                          <p className="text-xs text-muted-foreground">Carbs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-accent">{Math.round(analysisResult.totalFat)}g</p>
                          <p className="text-xs text-muted-foreground">Fat</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleClose} className="flex-1">
                          Cancel
                        </Button>
                        <Button variant="health" onClick={handleAddToLog} className="flex-1">
                          Add to Log
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {capturedImage && !analysisResult && !isAnalyzing && (
              <Card className="border-destructive/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span>Failed to analyze image. Please try again.</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoNutritionAnalyzer;