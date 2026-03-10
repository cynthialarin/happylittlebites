import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOUR_KEY = 'hlb-product-tour-seen';

const steps = [
  { emoji: '📝', title: 'Log a Meal', message: 'Tap "Log a Meal" or "Food Diary" to record what your baby ate, their reaction, and texture stage.', target: 'log-meal' },
  { emoji: '🛡️', title: 'Track Allergens', message: 'Monitor allergen introductions safely with step-by-step guidance and reaction tracking.', target: 'allergens' },
  { emoji: '📊', title: 'Weekly Report', message: 'Check your weekly report to see nutrition trends, food variety, and progress summaries.', target: 'report' },
  { emoji: '👥', title: 'Share with Caregivers', message: 'Share your child\'s food guide with daycare, grandparents, or babysitters in one tap.', target: 'share' },
];

export default function ProductTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(TOUR_KEY)) {
        const timer = setTimeout(() => setActive(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const dismiss = () => {
    setActive(false);
    try { localStorage.setItem(TOUR_KEY, 'true'); } catch {}
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      dismiss();
    }
  };

  if (!active) return null;

  const current = steps[step];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-foreground/40 flex items-end sm:items-center justify-center p-4"
        onClick={dismiss}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          onClick={e => e.stopPropagation()}
          className="bg-card rounded-2xl shadow-xl border border-border p-5 max-w-sm w-full"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{current.emoji}</span>
              <h3 className="font-bold text-sm">{current.title}</h3>
            </div>
            <button onClick={dismiss} className="p-1 rounded-full hover:bg-muted transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{current.message}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={dismiss} className="text-xs">
                Skip
              </Button>
              <Button size="sm" onClick={next} className="text-xs gap-1">
                {step < steps.length - 1 ? 'Next' : 'Got it!'} <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
