import { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Check } from 'lucide-react';

export default function ReintroductionTracker() {
  const { activeChild, diary, addExposure, exposures } = useApp();

  const refusedFoods = useMemo(() => {
    if (!activeChild) return [];
    const childDiary = diary.filter(d => d.childId === activeChild.id);
    
    // Find foods that were refused and not subsequently accepted
    const foodStatus = new Map<string, { name: string; lastRefused: string; accepted: boolean; refuseCount: number }>();
    
    // Process chronologically
    const sorted = [...childDiary].sort((a, b) => a.date.localeCompare(b.date));
    sorted.forEach(entry => {
      if (entry.acceptance === 'refused') {
        const existing = foodStatus.get(entry.foodId);
        foodStatus.set(entry.foodId, {
          name: entry.foodName,
          lastRefused: entry.date,
          accepted: false,
          refuseCount: (existing?.refuseCount || 0) + 1,
        });
      } else if (entry.acceptance === 'loved' || entry.acceptance === 'okay') {
        const existing = foodStatus.get(entry.foodId);
        if (existing) {
          foodStatus.set(entry.foodId, { ...existing, accepted: true });
        }
      }
    });

    // Only show foods still refused (not subsequently accepted)
    return Array.from(foodStatus.entries())
      .filter(([_, status]) => !status.accepted)
      .map(([foodId, status]) => {
        // Calculate next retry date (3-5 days after last refusal)
        const lastRefusedDate = new Date(status.lastRefused + 'T12:00:00');
        const retryDate = new Date(lastRefusedDate);
        retryDate.setDate(retryDate.getDate() + 3);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isDue = retryDate <= today;
        
        // Get exposure count
        const exposure = exposures.find(e => e.foodName === status.name && e.childId === activeChild!.id);
        const exposureCount = exposure?.exposures.length || status.refuseCount;

        return {
          foodId,
          name: status.name,
          lastRefused: status.lastRefused,
          retryDate: retryDate.toISOString().split('T')[0],
          isDue,
          refuseCount: status.refuseCount,
          exposureCount,
        };
      })
      .sort((a, b) => {
        if (a.isDue && !b.isDue) return -1;
        if (!a.isDue && b.isDue) return 1;
        return a.retryDate.localeCompare(b.retryDate);
      });
  }, [activeChild, diary, exposures]);

  const handleRetry = (foodName: string, accepted: boolean) => {
    if (!activeChild) return;
    addExposure(foodName, activeChild.id, accepted);
  };

  if (!activeChild) return null;

  if (refusedFoods.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <span className="text-2xl">🎉</span>
          <p className="text-sm font-bold mt-1">No refused foods!</p>
          <p className="text-xs text-muted-foreground mt-1">
            When foods are refused, they'll appear here for scheduled reintroduction.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold">Reintroduction Tracker</span>
          <span className="text-[10px] text-muted-foreground ml-auto">{refusedFoods.length} foods</span>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          Research shows it can take 10-15 exposures before a child accepts a new food. Keep trying!
        </p>

        <div className="space-y-2">
          {refusedFoods.map(food => (
            <div
              key={food.foodId}
              className={`p-3 rounded-xl border transition-all ${
                food.isDue
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold">{food.name}</span>
                {food.isDue && (
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Due for retry!
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
                <span>Refused {food.refuseCount}×</span>
                <span>•</span>
                <span>{food.exposureCount} exposures</span>
                <span>•</span>
                <span>
                  Retry: {new Date(food.retryDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              {/* Exposure progress bar */}
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < food.exposureCount ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground mb-2">{food.exposureCount}/15 exposures toward acceptance</p>
              {food.isDue && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs h-7"
                    onClick={() => handleRetry(food.name, false)}
                  >
                    😤 Still refused
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs h-7"
                    onClick={() => handleRetry(food.name, true)}
                  >
                    <Check className="h-3 w-3 mr-1" /> Accepted!
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
