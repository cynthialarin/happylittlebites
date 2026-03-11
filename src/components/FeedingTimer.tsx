import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Timer } from 'lucide-react';

interface FeedingTimerProps {
  onComplete: (durationMinutes: number) => void;
}

const TIMER_KEY = 'hlb-feeding-timer';

function loadTimerState(): { startedAt: number; pausedElapsed: number; paused: boolean } | null {
  try {
    const stored = sessionStorage.getItem(TIMER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function saveTimerState(state: { startedAt: number; pausedElapsed: number; paused: boolean } | null) {
  if (state) {
    sessionStorage.setItem(TIMER_KEY, JSON.stringify(state));
  } else {
    sessionStorage.removeItem(TIMER_KEY);
  }
}

export default function FeedingTimer({ onComplete }: FeedingTimerProps) {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const startRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Restore from sessionStorage on mount
  useEffect(() => {
    const saved = loadTimerState();
    if (saved) {
      if (saved.paused) {
        setRunning(true);
        setPaused(true);
        setElapsed(Math.floor(saved.pausedElapsed / 1000));
        pausedElapsedRef.current = saved.pausedElapsed;
        startRef.current = saved.startedAt;
      } else {
        setRunning(true);
        setPaused(false);
        startRef.current = saved.startedAt;
        pausedElapsedRef.current = saved.pausedElapsed;
        const now = Date.now();
        const totalMs = (now - saved.startedAt) + saved.pausedElapsed;
        setElapsed(Math.floor(totalMs / 1000));
      }
    }
  }, []);

  // Tick interval
  useEffect(() => {
    if (running && !paused) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const totalMs = (now - startRef.current) + pausedElapsedRef.current;
        setElapsed(Math.floor(totalMs / 1000));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, paused]);

  const start = useCallback(() => {
    const now = Date.now();
    startRef.current = now;
    pausedElapsedRef.current = 0;
    setElapsed(0);
    setRunning(true);
    setPaused(false);
    saveTimerState({ startedAt: now, pausedElapsed: 0, paused: false });
  }, []);

  const pause = useCallback(() => {
    const now = Date.now();
    const additionalMs = now - startRef.current;
    pausedElapsedRef.current += additionalMs;
    setPaused(true);
    saveTimerState({ startedAt: startRef.current, pausedElapsed: pausedElapsedRef.current, paused: true });
  }, []);

  const resume = useCallback(() => {
    startRef.current = Date.now();
    setPaused(false);
    saveTimerState({ startedAt: startRef.current, pausedElapsed: pausedElapsedRef.current, paused: false });
  }, []);

  const stop = useCallback(() => {
    const minutes = Math.max(1, Math.round(elapsed / 60));
    setRunning(false);
    setPaused(false);
    setElapsed(0);
    saveTimerState(null);
    onComplete(minutes);
  }, [elapsed, onComplete]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-4">
      <AnimatePresence mode="wait">
        {!running ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={start}
              className="w-full gap-2 rounded-xl border-dashed border-2 border-primary/30 hover:border-primary/60 h-12"
            >
              <Timer className="h-4 w-4" />
              Start Feeding Timer
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="timer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-primary/5 border border-primary/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${paused ? 'bg-amber-400' : 'bg-green-500 animate-pulse'}`} />
                <span className="text-3xl font-black tabular-nums tracking-tight">
                  {formatTime(elapsed)}
                </span>
              </div>
              <div className="flex gap-2">
                {paused ? (
                  <Button size="sm" variant="outline" onClick={resume} className="gap-1 rounded-full">
                    <Play className="h-3.5 w-3.5" /> Resume
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={pause} className="gap-1 rounded-full">
                    <Pause className="h-3.5 w-3.5" /> Pause
                  </Button>
                )}
                <Button size="sm" variant="default" onClick={stop} className="gap-1 rounded-full">
                  <Square className="h-3.5 w-3.5" /> Done
                </Button>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              {paused ? 'Timer paused' : 'Timer running — duration will auto-fill when you stop'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
