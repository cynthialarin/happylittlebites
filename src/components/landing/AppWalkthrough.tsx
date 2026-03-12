import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Moon, Droplets, ShieldCheck, ShieldAlert, TrendingUp, Utensils, Calendar, Ruler } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const foods = ['🥕', '🍌', '🥦', '🍎', '🥑', '🍠', '🫐', '🍑', '🥒', '🍐', '🧀', '🥚'];

function Screen1() {
  const [progress, setProgress] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(32), 300);
    const interval = setInterval(() => {
      setVisibleCount(c => { if (c >= 12) { clearInterval(interval); return c; } return c + 1; });
    }, 120);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  return (
    <div className="p-4 space-y-3">
      <h4 className="font-heading font-bold text-sm text-foreground">First 100 Foods</h4>
      <Progress value={progress} className="h-2 transition-all duration-700" />
      <p className="text-xs text-muted-foreground font-heading">32 / 100 foods tried</p>
      <div className="grid grid-cols-4 gap-2 pt-1">
        {foods.map((f, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={i < visibleCount ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${i < 8 ? 'bg-sage/30' : 'bg-muted/50'}`}
          >
            {f}
          </motion.div>
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
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 + 0.1 }}
          className="flex items-center gap-2.5 rounded-xl bg-card border border-border/40 p-2.5"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${e.color}`}>
            <e.icon size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-heading font-bold truncate">{e.label}</p>
            <p className="text-[10px] text-muted-foreground">{e.time}</p>
          </div>
        </motion.div>
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
      {allergens.map((a, i) => (
        <motion.div
          key={a.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.1 }}
          className="flex items-center gap-2.5 rounded-xl bg-card border border-border/40 p-2.5"
        >
          <span className="text-lg">{a.emoji}</span>
          <span className="text-xs font-heading font-bold flex-1">{a.name}</span>
          {a.status === 'safe' && <ShieldCheck size={16} className="text-sage-foreground" />}
          {a.status === 'caution' && <ShieldAlert size={16} className="text-destructive" />}
          {a.status === 'pending' && <span className="text-[10px] text-muted-foreground font-heading">Not tried</span>}
        </motion.div>
      ))}
    </div>
  );
}

function Screen4() {
  const bars = [
    { label: 'Mon', h: 60 }, { label: 'Tue', h: 80 }, { label: 'Wed', h: 45 },
    { label: 'Thu', h: 70 }, { label: 'Fri', h: 90 }, { label: 'Sat', h: 55 }, { label: 'Sun', h: 75 },
  ];
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 200); }, []);

  return (
    <div className="p-4 space-y-3">
      <h4 className="font-heading font-bold text-sm text-foreground">Weekly Report</h4>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { val: '21', label: 'Meals', bg: 'bg-sage/20', color: 'text-sage-foreground' },
          { val: '5', label: 'New Foods', bg: 'bg-lavender/20', color: 'text-lavender-foreground' },
          { val: '98%', label: 'Accepted', bg: 'bg-peach/20', color: 'text-peach-foreground' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }} className={`rounded-xl ${s.bg} p-2`}>
            <p className={`text-lg font-heading font-bold ${s.color}`}>{s.val}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex items-end justify-between gap-1 h-24 pt-2">
        {bars.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
            <motion.div
              className="w-full rounded-t-md bg-primary/70"
              initial={{ height: 0 }}
              animate={{ height: animated ? `${b.h}%` : 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <span className="text-[9px] text-muted-foreground">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Screen5() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const meals = [
    ['🥣 Oatmeal', '🍌 Banana purée', '🥦 Broccoli bites'],
    ['🥞 Pancakes', '🍠 Sweet potato', '🍗 Chicken strips'],
    ['🥚 Egg muffin', '🥑 Avocado toast', '🐟 Salmon flakes'],
    ['🫐 Yogurt bowl', '🥕 Carrot sticks', '🍝 Pasta stars'],
    ['🍎 Apple oats', '🧀 Cheese quesadilla', '🥩 Beef mince'],
  ];

  return (
    <div className="p-4 space-y-2.5">
      <h4 className="font-heading font-bold text-sm text-foreground flex items-center gap-1.5">
        <Calendar size={14} /> Meal Planner
      </h4>
      {days.map((day, i) => (
        <motion.div
          key={day}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 + 0.1 }}
          className="rounded-xl bg-card border border-border/40 p-2"
        >
          <p className="text-[10px] font-heading font-bold text-primary mb-1">{day}</p>
          <div className="flex gap-1 flex-wrap">
            {meals[i].map((m, j) => (
              <span key={j} className="text-[9px] bg-muted/60 rounded-md px-1.5 py-0.5">{m}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Screen6() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { setTimeout(() => setDrawn(true), 300); }, []);

  const points = [
    { x: 10, y: 80 }, { x: 30, y: 72 }, { x: 50, y: 60 },
    { x: 70, y: 48 }, { x: 90, y: 35 }, { x: 110, y: 22 },
    { x: 130, y: 12 },
  ];
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="p-4 space-y-3">
      <h4 className="font-heading font-bold text-sm text-foreground flex items-center gap-1.5">
        <Ruler size={14} /> Growth Chart
      </h4>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-xl bg-sage/20 p-2">
          <p className="text-sm font-heading font-bold text-sage-foreground">7.8 kg</p>
          <p className="text-[10px] text-muted-foreground">Weight</p>
        </div>
        <div className="rounded-xl bg-sky/20 p-2">
          <p className="text-sm font-heading font-bold text-sky-foreground">68 cm</p>
          <p className="text-[10px] text-muted-foreground">Height</p>
        </div>
      </div>
      <div className="bg-muted/30 rounded-xl p-3">
        <svg viewBox="0 0 140 90" className="w-full h-20">
          <motion.path
            d={pathD}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="hsl(var(--primary))"
              initial={{ scale: 0 }}
              animate={{ scale: drawn ? 1 : 0 }}
              transition={{ delay: (i * 0.15) + 0.3 }}
            />
          ))}
        </svg>
        <div className="flex justify-between text-[8px] text-muted-foreground mt-1 px-1">
          <span>Birth</span><span>3mo</span><span>6mo</span>
        </div>
      </div>
      <p className="text-[10px] text-center text-muted-foreground">50th percentile — on track! ✅</p>
    </div>
  );
}

const screens = [
  { component: Screen1, label: 'Foods', emoji: '🥕' },
  { component: Screen2, label: 'Tracker', emoji: '📋' },
  { component: Screen3, label: 'Allergens', emoji: '🛡️' },
  { component: Screen4, label: 'Report', emoji: '📊' },
  { component: Screen5, label: 'Planner', emoji: '📅' },
  { component: Screen6, label: 'Growth', emoji: '📈' },
];

export default function AppWalkthrough() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % screens.length), 4000);
    return () => clearInterval(timer);
  }, [paused]);

  const ActiveScreen = screens[active].component;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phone frame */}
      <div
        className="relative w-64 h-[480px] rounded-[2rem] border-2 border-border bg-background shadow-xl overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
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
              className="absolute inset-0 overflow-y-auto"
            >
              <ActiveScreen />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Tap cursor hint */}
        <motion.div
          className="absolute bottom-16 right-6 z-20 pointer-events-none"
          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-lg">👆</span>
        </motion.div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 flex-wrap justify-center max-w-xs">
        {screens.map((s, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setPaused(true); }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all ${
              i === active
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-muted/60 text-muted-foreground hover:bg-muted'
            }`}
          >
            <span>{s.emoji}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <Button asChild size="lg" className="rounded-full font-bold gap-2 shadow-lg">
          <Link to="/auth">
            ✨ Try it yourself — free for 30 days
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
