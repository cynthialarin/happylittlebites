import { motion } from 'framer-motion';
import { BookOpen, Apple, Globe, Brain, Star, Stethoscope, LayoutGrid } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { icon: BookOpen, value: '100+', label: 'Baby-Friendly Recipes', color: 'text-peach-foreground' },
  { icon: Apple, value: '150+', label: 'Foods & Cultural Dishes', color: 'text-sage-foreground' },
  { icon: LayoutGrid, value: '6', label: 'Built-In Trackers', color: 'text-lavender-foreground' },
  { icon: Brain, value: 'AI', label: 'Powered Scanners & Chat', color: 'text-sky-foreground' },
];

const testimonials = [
  { quote: "The AI scanned my fridge and suggested three perfect meals — I was blown away!", name: "Sarah M.", role: "Mom of 2", emoji: "👩‍👧‍👦" },
  { quote: "Sleep + diaper tracking alongside food logging saved me from using three different apps.", name: "James L.", role: "First-time dad", emoji: "👨‍👧" },
  { quote: "My pediatrician loved the weekly report — it had everything she needed in one page!", name: "Priya K.", role: "Mom of 1", emoji: "👩‍👦" },
];

export default function LandingStats() {
  return (
    <>
      {/* Social Proof Banner */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-5 py-6 sm:py-8 bg-primary/5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-heading text-base sm:text-lg md:text-xl font-900">We're New in Town! 🎉</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Help us make this app awesome by testing it for <span className="font-bold text-primary">FREE for 1 month</span>! Join 50+ families already on board.
          </p>
          <div className="flex items-center justify-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-accent fill-accent" />
            ))}
            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground ml-1.5">4.9/5 from beta testers</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            <Stethoscope size={13} className="text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-primary">Built with pediatrician-recommended guidelines (AAP & Health Canada)</span>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
        className="px-5 py-10 md:py-16 bg-cream/30 border-y border-border"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <s.icon size={24} className={`mx-auto mb-1.5 ${s.color}`} />
              <p className="font-heading text-xl sm:text-2xl md:text-3xl font-900">{s.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-heading font-bold mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
        className="px-4 sm:px-5 py-10 md:py-16"
      >
        <motion.h2 variants={fadeUp} className="font-heading text-xl sm:text-2xl md:text-3xl font-800 text-center mb-6 sm:mb-8">What Parents Are Saying</motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp} className="bg-card border border-border rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-0.5 mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground/85 italic mb-3">"{t.quote}"</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.emoji}</span>
                <div>
                  <p className="text-xs font-bold">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
}
