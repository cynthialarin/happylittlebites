import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';

interface PageHintProps {
  id: string;
  emoji?: string;
  title: string;
  message: string;
}

function hasSeenPageHint(id: string): boolean {
  try {
    const seen = JSON.parse(localStorage.getItem('hlb-page-hints') || '{}');
    return !!seen[id];
  } catch { return false; }
}

function markPageHintSeen(id: string) {
  try {
    const seen = JSON.parse(localStorage.getItem('hlb-page-hints') || '{}');
    seen[id] = true;
    localStorage.setItem('hlb-page-hints', JSON.stringify(seen));
  } catch {}
}

export default function PageHint({ id, emoji = '💡', title, message }: PageHintProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasSeenPageHint(id)) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [id]);

  const dismiss = () => {
    setVisible(false);
    markPageHintSeen(id);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mb-3 overflow-hidden"
        >
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 flex items-start gap-3">
            <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{message}</p>
            </div>
            <button
              onClick={dismiss}
              className="p-1 rounded-full hover:bg-primary/10 transition-colors shrink-0 mt-0.5"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
