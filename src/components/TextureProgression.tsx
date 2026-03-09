import { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { TextureStage } from '@/types';

const STAGES: { stage: TextureStage; label: string; emoji: string; ageRange: string }[] = [
  { stage: 'purees', label: 'Purees', emoji: '🥣', ageRange: '6-7mo' },
  { stage: 'mashed', label: 'Mashed', emoji: '🥄', ageRange: '7-8mo' },
  { stage: 'soft-chunks', label: 'Soft Chunks', emoji: '🧊', ageRange: '8-10mo' },
  { stage: 'finger-foods', label: 'Finger Foods', emoji: '🤏', ageRange: '9-12mo' },
  { stage: 'regular', label: 'Regular', emoji: '🍽️', ageRange: '12mo+' },
];

export default function TextureProgression() {
  const { activeChild, diary, getChildAge } = useApp();
  const age = activeChild ? getChildAge(activeChild) : null;

  const textureStats = useMemo(() => {
    if (!activeChild) return {};
    const childDiary = diary.filter(d => d.childId === activeChild.id);
    const counts: Record<string, number> = {};
    childDiary.forEach(entry => {
      counts[entry.textureStage] = (counts[entry.textureStage] || 0) + 1;
    });
    return counts;
  }, [activeChild, diary]);

  const currentStageIndex = useMemo(() => {
    let maxIndex = -1;
    STAGES.forEach((s, i) => {
      if (textureStats[s.stage] && textureStats[s.stage] > 0) {
        maxIndex = Math.max(maxIndex, i);
      }
    });
    return maxIndex;
  }, [textureStats]);

  const suggestedStage = useMemo(() => {
    if (!age) return null;
    if (age.months < 7) return 'purees';
    if (age.months < 8) return 'mashed';
    if (age.months < 10) return 'soft-chunks';
    if (age.months < 12) return 'finger-foods';
    return 'regular';
  }, [age]);

  if (!activeChild) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🎨</span>
          <span className="text-sm font-bold">Texture Progression</span>
        </div>

        <div className="space-y-2">
          {STAGES.map((stage, i) => {
            const count = textureStats[stage.stage] || 0;
            const isReached = i <= currentStageIndex;
            const isCurrent = i === currentStageIndex;
            const isSuggested = stage.stage === suggestedStage && !isReached;

            return (
              <div
                key={stage.stage}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-primary/10 border border-primary/30'
                    : isSuggested
                      ? 'bg-accent/10 border border-accent/30'
                      : isReached
                        ? 'bg-muted/50'
                        : 'opacity-40'
                }`}
              >
                <span className={`text-xl ${isReached || isSuggested ? '' : 'grayscale'}`}>{stage.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{stage.label}</span>
                    {isCurrent && (
                      <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                    {isSuggested && (
                      <span className="text-[9px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
                        Try next!
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{stage.ageRange}</span>
                </div>
                <span className="text-xs font-bold text-muted-foreground">
                  {count > 0 ? `${count}×` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
