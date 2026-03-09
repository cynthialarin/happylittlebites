import { MealType } from '@/types';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import FoodImage from '@/components/FoodImage';

const MEAL_INFO: Record<MealType, { emoji: string; label: string }> = {
  breakfast: { emoji: '🌅', label: 'Breakfast' },
  lunch: { emoji: '☀️', label: 'Lunch' },
  dinner: { emoji: '🌙', label: 'Dinner' },
  snack: { emoji: '🍪', label: 'Snack' },
};

interface MealSlotProps {
  mealType: MealType;
  mealName?: string;
  mealEmoji?: string;
  recipeId?: string;
  onAdd: () => void;
  onRemove?: () => void;
  className?: string;
}

export default function MealSlot({ mealType, mealName, mealEmoji, onAdd, onRemove, className }: MealSlotProps) {
  const info = MEAL_INFO[mealType];

  if (mealName) {
    return (
      <div className={cn("p-2.5 rounded-lg bg-card border border-border flex items-center gap-2 group", className)}>
        <span className="text-base">{mealEmoji || info.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground font-semibold">{info.label}</p>
          <p className="text-xs font-bold truncate">{mealName}</p>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onAdd}
      className={cn(
        "p-2.5 rounded-lg border border-dashed border-border hover:border-primary/40 flex items-center gap-2 w-full transition-colors",
        className
      )}
    >
      <span className="text-base opacity-40">{info.emoji}</span>
      <span className="text-xs text-muted-foreground">{info.label}</span>
      <Plus className="h-3 w-3 text-muted-foreground ml-auto" />
    </button>
  );
}
