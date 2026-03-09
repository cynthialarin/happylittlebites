import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  rotation: number;
  shape: 'circle' | 'square' | 'star';
}

const COLORS = [
  'hsl(var(--primary))',
  '#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1',
  '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8C69',
];

function generatePieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.6,
    rotation: Math.random() * 720 - 360,
    shape: (['circle', 'square', 'star'] as const)[Math.floor(Math.random() * 3)],
  }));
}

interface ConfettiProps {
  active: boolean;
  duration?: number;
  pieces?: number;
}

export default function Confetti({ active, duration = 2500, pieces = 50 }: ConfettiProps) {
  const [show, setShow] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      setConfetti(generatePieces(pieces));
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration, pieces]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: -20,
                rotate: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                y: '110vh',
                rotate: piece.rotation,
                opacity: [1, 1, 0.8, 0],
                scale: [1, 1.2, 0.8],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random(),
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: 'absolute',
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.shape !== 'star' ? piece.color : 'transparent',
                borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' ? '2px' : 0,
                ...(piece.shape === 'star' ? {
                  width: 0,
                  height: 0,
                  borderLeft: `${piece.size / 2}px solid transparent`,
                  borderRight: `${piece.size / 2}px solid transparent`,
                  borderBottom: `${piece.size}px solid ${piece.color}`,
                  backgroundColor: 'transparent',
                } : {}),
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
