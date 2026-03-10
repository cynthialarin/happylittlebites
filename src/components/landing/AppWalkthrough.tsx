import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Moon, Droplets, ShieldCheck, ShieldAlert, TrendingUp, Utensils } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const foods = ['🥕', '🍌', '🥦', '🍎', '🥑', '🍠', '🫐', '🍑', '🥒', '🍐', '🧀', '🥚'];

function Screen1() {
  return (
    <div className="p-4 space-y-3">
      <h4 className="font-heading font-bold text-sm text-foreground">First 100 Foods</h4>
      <Progress value={32} className="h-2" />
      <p className="text-xs text-muted-foreground font-heading">32 / 100 foods tried</p>
      <div className="grid grid-cols-4 gap-2 pt-1">
        {foods.map((f, i) => (
          <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${i < 8 ? 'bg-sage/30' : 'bg-muted/50'}`}>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

function Screen2() {
  const entries = [
    { icon: Utensils, label: 'Breakfast — Oatmeal + banana', time: '7:30 AM', color: 'text-peach-foreground bg-peach/20' },
    { icon: Baby, label: 'Breastfeed — Left side, 12 min', time: '9:15 AM', color: 'text-sky-foreground bg-sky/20' },
    { icon: Moon, label: 'Morning nap — 45 min', time: '10:00 AM', color: 'text-lavender-foreground bg-lavender/20' },
    { icon: Droplets, label: 'Wet diaper', time: '11:30 AM', color: 'text-sky-foreground bg-sky/20' },
  ];
  return (
    <div className="p-4 space-y-2.5">
      <h4 className="font-heading font-bold text-sm text-foreground">Today's Log</h4>
      {entries.map((e, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-xl bg-card border border-border/40 p-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${e.color}`}>
            <e.icon size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-heading font-bold truncate">{e.label}</p>
            <p className="text-[10px] text-muted-foreground">{e.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Screen3() {
  const allergens = [
    { name: 'Egg', status: 'safe', emoji: '🥚' },
    { name: 'Milk', status: 'safe', emoji: '🥛' },
    { name: 'Peanut', status: 'caution', emoji: '🥜' },
    { name: 'Wheat', status: 'safe', emoji: '🌾' },
    { name: 'Soy', status: 'pending', emoji: '🫘' },
  ];
  return (
    <div className="p-4 space-y-2.5">
      <h4 className="font-heading font-bold text-sm text-foreground">Allergen Tracker</h4>
      {allergens.map((a) => (
        <div key={a.name} className="flex items-center gap-2.5 rounded-xl bg-card border border-border/40 p-2.5">
          <span className="text-lg">{a.emoji}</span>
          <span className="text-xs font-heading font-bold flex-1">{a.name}</span>
          {a.status === 'safe' && <ShieldCheck size={16} className="text-sage-foreground" />}
          {a.status === 'caution' && <ShieldAlert size={16} className="text-destructive" />}
          {a.status === 'pending' && <span className="text-[10px] text-muted-foreground font-heading">Not tried</span>}
        </div>
      ))}
    </div>
  );
}

function Screen4() {
  const bars = [
    { label: 'Mon', h: 60 }, { label: 'Tue', h: 80 }, { label: 'Wed', h: 45 },
    { label: 'Thu', h: 70 }, { label: 'Fri', h: 90 }, { label: 'Sat', h: 55 }, { label: 'Sun', h: 75 },
  ];
  return (
    <div className="p-4 space-y-3">
      <h4 className="font-heading font-bold text-sm text-foreground">Weekly Report</h4>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-sage/20 p-2">
          <p className="text-lg font-heading font-bold text-sage-foreground">21</p>
          <p className="text-[10px] text-muted-foreground">Meals</p>
        </div>
        <div className="rounded-xl bg-lavender/20 p-2">
          <p className="text-lg font-heading font-bold text-lavender-foreground">5</p>
          <p className="text-[10px] text-muted-foreground">New Foods</p>
        </div>
        <div className="rounded-xl bg-peach/20 p-2">
          <p className="text-lg font-heading font-bold text-peach-foreground">98%</p>
          <p className="text-[10px] text-muted-foreground">Accepted</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-1 h-24 pt-2">
        {bars.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full rounded-t-md bg-primary/70" style={{ height: `${b.h}%` }} />
            <span className="text-[9px] text-muted-foreground">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const screens = [
  { component: Screen1, label: 'Foods' },
  { component: Screen2, label: 'Tracker' },
  { component: Screen3, label: 'Allergens' },
  { component: Screen4, label: 'Report' },
];

export default function AppWalkthrough() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % screens.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const ActiveScreen = screens[active].component;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Phone frame */}
      <div className="relative w-64 h-[480px] rounded-[2rem] border-2 border-border bg-background shadow-xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/10 rounded-b-2xl z-10" />
        {/* Status bar */}
        <div className="h-10 bg-muted/40 flex items-end justify-between px-5 pb-1">
          <span className="text-[9px] text-muted-foreground font-heading">9:41</span>
          <div className="flex gap-1 items-center">
            <TrendingUp size={9} className="text-muted-foreground" />
            <div className="w-4 h-2 rounded-sm border border-muted-foreground/50">
              <div className="w-3/4 h-full bg-sage-foreground rounded-sm" />
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="relative h-[calc(100%-2.5rem)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ActiveScreen />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Dot indicators */}
      <div className="flex gap-2">
        {screens.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
            aria-label={s.label}
          />
        ))}
      </div>
    </div>
  );
}
