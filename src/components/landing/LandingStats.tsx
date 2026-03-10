import { motion } from 'framer-motion';
import { BookOpen, Apple, Globe, Brain, Users, Star, Stethoscope } from 'lucide-react';

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

const testimonials = [
  { quote: "Finally, one app that does it all. I used to juggle three different trackers!", name: "Sarah M.", role: "Mom of 2", emoji: "👩‍👧‍👦" },
  { quote: "The allergen tracker gave me so much confidence introducing peanuts. Love the step-by-step guidance.", name: "James L.", role: "First-time dad", emoji: "👨‍👧" },
  { quote: "My pediatrician was impressed when I showed her the weekly report. So professional!", name: "Priya K.", role: "Mom of 1", emoji: "👩‍👦" },
];

export default function LandingStats() {
  return (
    <>
      {/* Social Proof Banner */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-5 py-8 bg-primary/5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users size={20} className="text-primary" />
            <span className="font-heading text-lg md:text-xl font-900">We're New in Town! 🎉</span>
          </div>
          <p className="text-sm text-muted-foreground">Help us make this app awesome by testing it for <span className="font-bold text-primary">FREE for 1 month</span>! Join 50+ families already on board.</p>
          <div className="flex items-center justify-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-accent fill-accent" />
            ))}
            <span className="text-xs font-bold text-muted-foreground ml-1.5">4.9/5 from beta testers</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Stethoscope size={14} className="text-primary" />
            <span className="text-xs font-bold text-primary">Built with pediatrician-recommended guidelines (AAP & Health Canada)</span>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
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

      {/* Testimonials */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
        className="px-5 py-12 md:py-16"
      >
        <motion.h2 variants={fadeUp} className="font-heading text-2xl md:text-3xl font-800 text-center mb-8">What Parents Are Saying</motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground/85 italic mb-4">"{t.quote}"</p>
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