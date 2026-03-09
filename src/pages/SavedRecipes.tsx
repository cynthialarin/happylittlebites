import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bookmark, Trash2, Clock } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface SavedRecipe {
  id: string;
  title: string;
  description: string;
  meal_type: string;
  emoji: string;
  ingredients: string[];
  instructions: string[];
  source: string;
  created_at: string;
}

export default function SavedRecipes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadRecipes();
  }, [user]);

  const loadRecipes = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Load error:', error);
    } else {
      setRecipes(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: 'Could not delete recipe', variant: 'destructive' });
    } else {
      setRecipes(prev => prev.filter(r => r.id !== id));
      toast({ title: '🗑️ Removed', description: 'Recipe deleted' });
    }
  };

  const MEAL_COLORS: Record<string, string> = {
    breakfast: 'bg-peach/10 border-peach/20',
    lunch: 'bg-sage/10 border-sage/20',
    dinner: 'bg-lavender/10 border-lavender/20',
    snack: 'bg-sky/10 border-sky/20',
  };

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-black">Saved Recipes</h1>
          <p className="text-sm text-muted-foreground">AI-generated meal ideas you've saved</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Loading...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-5xl mb-3">📌</div>
          <p className="font-semibold mb-1">No saved recipes yet</p>
          <p className="text-sm mb-4">Save meal ideas from AI Meal Suggestions to see them here</p>
          <Button variant="outline" onClick={() => navigate('/suggestions')} className="gap-2">
            <Bookmark className="h-4 w-4" /> Get AI Suggestions
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {recipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`${MEAL_COLORS[recipe.meal_type] || 'bg-muted/10'} border`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{recipe.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                        {recipe.meal_type}
                      </p>
                      <p className="text-sm font-bold mt-0.5">{recipe.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{recipe.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          {new Date(recipe.created_at).toLocaleDateString()}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                          AI Generated
                        </span>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete saved recipe?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Remove "{recipe.title}" from your saved recipes. This can't be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(recipe.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
