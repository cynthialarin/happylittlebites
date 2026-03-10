import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface HintTooltipProps {
  id: string;
  children: React.ReactNode;
  message: string;
  emoji?: string;
  position?: 'top' | 'bottom';
}

function hasSeenHint(id: string): boolean {
  try {
    const seen = JSON.parse(localStorage.getItem('hlb-hints-seen') || '{}');
    return !!seen[id];
  } catch { return false; }
}

function markHintSeen(id: string) {
  try {
    const seen = JSON.parse(localStorage.getItem('hlb-hints-seen') || '{}');
    seen[id] = true;
    localStorage.setItem('hlb-hints-seen', JSON.stringify(seen));
  } catch {}
}

export default function HintTooltip({ id, children, message, emoji = '💡', position = 'top' }: HintTooltipProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasSeenHint(id)) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [id]);

  const dismiss = () => {
    setVisible(false);
    markHintSeen(id);
  };

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 8 : -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'top' ? 8 : -8, scale: 0.95 }}
            className={`absolute z-50 left-1/2 -translate-x-1/2 w-64 ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
          >
            <div className="bg-foreground text-background rounded-xl px-4 py-3 shadow-lg relative">
              <button
                onClick={dismiss}
                className="absolute top-1.5 right-1.5 p-1 rounded-full hover:bg-background/20 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
              <p className="text-xs font-medium leading-relaxed pr-4">
                {emoji} {message}
              </p>
              {/* Arrow */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground rotate-45 ${
                position === 'top' ? '-bottom-1.5' : '-top-1.5'
              }`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { hasSeenHint, markHintSeen };
