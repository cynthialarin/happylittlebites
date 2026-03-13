import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import logoOption3 from '@/assets/logo-option-3.png';

const TOUR_KEY = 'hlb-product-tour-seen';

const steps = [
  {
    type: 'welcome' as const,
    emoji: '👋',
    title: 'Welcome to Happy Little Bites!',
    message: "Let's take a quick tour so you can get the most out of your baby's food journey.",
    tip: 'This only takes about 30 seconds',
  },
  {
    type: 'feature' as const,
    emoji: '📝',
    title: 'Log Meals & Track Progress',
    message: 'Record what your baby eats, their reaction, and texture stage. Watch their food journey grow day by day!',
    tip: 'Tap "Log a Meal" on the dashboard or visit the Food Diary',
    color: 'bg-sage/20',
  },
  {
    type: 'feature' as const,
    emoji: '🛡️',
    title: 'Safe Allergen Introduction',
    message: 'Follow step-by-step guidance to introduce allergens safely. Track reactions and keep a complete record.',
    tip: 'We track all top allergens with severity & symptom logging',
    color: 'bg-sky/20',
  },
  {
    type: 'feature' as const,
    emoji: '✨',
    title: 'AI-Powered Meal Ideas',
    message: "Get personalized meal suggestions based on your baby's age, foods they've tried, and dietary needs.",
    tip: 'Tap "What should baby eat?" on the dashboard',
    color: 'bg-lavender/20',
  },
  {
    type: 'feature' as const,
    emoji: '📊',
    title: 'Insights & Weekly Reports',
    message: 'See nutrition trends, food variety scores, and weekly summaries to stay on track with feeding goals.',
    tip: 'Check Insights or Weekly Report from the dashboard',
    color: 'bg-peach/20',
  },
  {
    type: 'feature' as const,
    emoji: '👥',
    title: 'Share with Caregivers',
    message: "Share your child's food guide with daycare, grandparents, or babysitters — everyone stays informed.",
    tip: 'Find "Caregiver Share" in the More menu',
    color: 'bg-primary/10',
  },
  {
    type: 'finish' as const,
    emoji: '🎉',
    title: "You're All Set!",
    message: "Start by logging your first meal — you'll earn XP and unlock achievements as you go!",
    tip: '',
  },
];

interface ProductTourProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export default function ProductTour({ forceShow, onClose }: ProductTourProps = {}) {
  const [active, setActive] = useState(!!forceShow);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (forceShow) {
      setActive(true);
      setStep(0);
      return;
    }
    try {
      if (!localStorage.getItem(TOUR_KEY)) {
        const timer = setTimeout(() => setActive(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, [forceShow]);

  const dismiss = () => {
    setActive(false);
    try { localStorage.setItem(TOUR_KEY, 'true'); } catch {}
  };

  const next = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else dismiss();
  };

  const prev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  if (!active) return null;

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        onClick={dismiss}
      >
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="bg-card rounded-2xl shadow-2xl border border-border max-w-sm w-full overflow-hidden"
        >
          {/* Progress bar */}
          <div className="px-5 pt-4 pb-0">
            <Progress value={progress} className="h-1" />
          </div>

          <div className="p-5">
            {/* Close */}
            <div className="flex justify-end -mt-1 -mr-1 mb-1">
              <button onClick={dismiss} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Welcome step */}
            {current.type === 'welcome' && (
              <div className="text-center">
                <motion.img
                  src={logoOption3}
                  alt="Happy Little Bites"
                  className="w-16 h-16 object-contain mx-auto mb-3"
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />
                <h3 className="text-lg font-black mb-2">{current.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{current.message}</p>
                <p className="text-xs text-primary font-medium">{current.tip}</p>
              </div>
            )}

            {/* Feature step */}
            {current.type === 'feature' && (
              <div>
                <div className={`w-14 h-14 rounded-2xl ${current.color} flex items-center justify-center mb-3`}>
                  <span className="text-3xl">{current.emoji}</span>
                </div>
                <h3 className="text-base font-black mb-1.5">{current.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{current.message}</p>
                <div className="bg-muted/50 rounded-lg px-3 py-2">
                  <p className="text-xs text-foreground/70 font-medium flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-primary shrink-0" />
                    {current.tip}
                  </p>
                </div>
              </div>
            )}

            {/* Finish step */}
            {current.type === 'finish' && (
              <div className="text-center">
                <motion.div
                  className="text-5xl mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                >
                  {current.emoji}
                </motion.div>
                <h3 className="text-lg font-black mb-2">{current.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{current.message}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-5 pb-5 flex items-center justify-between">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-5 bg-primary' : i < step ? 'w-1.5 bg-primary/40' : 'w-1.5 bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {step > 0 && step < steps.length - 1 && (
                <Button variant="ghost" size="sm" onClick={prev} className="text-xs h-8 px-2">
                  <ChevronLeft className="h-3 w-3" />
                </Button>
              )}
              {step === 0 && (
                <Button variant="ghost" size="sm" onClick={dismiss} className="text-xs h-8">
                  Skip Tour
                </Button>
              )}
              <Button size="sm" onClick={next} className="text-xs h-8 gap-1 rounded-full px-4">
                {step === 0 ? "Let's Go!" : step < steps.length - 1 ? 'Next' : 'Start Exploring'}
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
