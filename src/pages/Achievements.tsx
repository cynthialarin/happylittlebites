import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '@/hooks/useGamification';
import { BADGES, LEVELS } from '@/data/badges';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import Confetti from '@/components/Confetti';

export default function Achievements() {
  const { xp, level, levelProgress, nextLevel, unlockedBadges } = useGamification();
  const [showConfetti, setShowConfetti] = useState(false);
  const prevBadgeCount = useRef<number | null>(null);
  const prevLevel = useRef<number | null>(null);

  // Confetti on new badge unlock or level up
  useEffect(() => {
    const newBadge = prevBadgeCount.current !== null && unlockedBadges.length > prevBadgeCount.current;
    const newLevel = prevLevel.current !== null && level.level > prevLevel.current;
    if (newBadge || newLevel) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    prevBadgeCount.current = unlockedBadges.length;
    prevLevel.current = level.level;
  }, [unlockedBadges.length, level.level]);

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <Confetti active={showConfetti} />
      <h1 className="text-xl font-black mb-4">Achievements</h1>

      {/* Level Card */}
      <Card className="mb-5 bg-primary/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{level.emoji}</span>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-semibold">Level {level.level}</p>
              <p className="text-lg font-black">{level.title}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-primary">{xp}</p>
              <p className="text-[10px] text-muted-foreground font-semibold">XP</p>
            </div>
          </div>
          {nextLevel && (
            <div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold mb-1">
                <span>{level.title}</span>
                <span>{nextLevel.title} ({nextLevel.minXp} XP)</span>
              </div>
              <Progress value={levelProgress} className="h-2.5" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Level Roadmap */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {LEVELS.map(l => (
          <div
            key={l.level}
            className={`flex-shrink-0 px-2.5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
              xp >= l.minXp ? 'bg-primary/20 text-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            <span>{l.emoji}</span>
            <span>{l.title}</span>
          </div>
        ))}
      </div>

      {/* Badge Stats */}
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold">Badges ({unlockedBadges.length}/{BADGES.length})</h2>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-3 gap-2">
        {BADGES.map((badge, i) => {
          const unlocked = unlockedBadges.includes(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className={`border-none ${unlocked ? 'bg-primary/10' : 'bg-muted/50'}`}>
                <CardContent className="p-3 text-center">
                  <div className={`text-2xl mb-1 ${!unlocked && 'grayscale opacity-40'}`}>
                    {badge.emoji}
                  </div>
                  <p className={`text-[10px] font-bold leading-tight ${!unlocked && 'text-muted-foreground'}`}>
                    {badge.title}
                  </p>
                  <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">
                    {badge.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
