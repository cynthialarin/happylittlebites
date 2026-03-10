import { motion } from 'framer-motion';
import { BookOpen, Apple, Globe, Brain } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { icon: BookOpen, value: '100+', label: 'Baby-Friendly Recipes', color: 'text-peach-foreground' },
  { icon: Apple, value: '100+', label: 'Foods in Library', color: 'text-sage-foreground' },
  { icon: Globe, value: 'US & CA', label: 'Safety Guidelines', color: 'text-sky-foreground' },
  { icon: Brain, value: 'AI', label: 'Powered Suggestions', color: 'text-lavender-foreground' },
];

export default function LandingStats() {
  return (
    <motion.section
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
      className="px-5 py-12 md:py-16 bg-cream/30 border-y border-border"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center">
            <s.icon size={28} className={`mx-auto mb-2 ${s.color}`} />
            <p className="font-heading text-2xl md:text-3xl font-900">{s.value}</p>
            <p className="text-xs text-muted-foreground font-heading font-bold mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
