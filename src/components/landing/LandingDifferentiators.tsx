import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Lock, Smartphone, Gift, Camera } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const differentiators = [
  { icon: Sparkles, title: 'All-in-One', desc: 'Food diary, sleep log, diaper tracker, meal planner, growth charts, achievements, and milestones — no more juggling five different apps.' },
  { icon: Camera, title: 'AI Camera Scanners', desc: 'Point your camera at your fridge for instant meal ideas, or snap a plate to auto-log meals — powered by AI vision.' },
  { icon: Gift, title: 'Early Access Savings', desc: 'Sign up during Beta and get 50% off your first 3 months when we launch. No card required to start.' },
  { icon: Brain, title: 'AI-Powered Everything', desc: 'Smart meal suggestions, fridge & plate scanning, personalized insights, and a 24/7 AI support chatbot — all built in.' },
  { icon: Smartphone, title: 'Works Everywhere', desc: 'Use it on any phone, tablet, or computer. Install it like an app — no App Store needed.' },
  { icon: Lock, title: 'Privacy First', desc: 'Your family\'s data stays yours. No selling, no sharing, no third-party tracking. GDPR & COPPA compliant.' },
];

const LandingDifferentiators = React.forwardRef<HTMLElement>(function LandingDifferentiators(_props, ref) {
  return (
    <section ref={ref} className="px-5 py-16 md:py-24 bg-cream/30">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
          <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-3">Built Different, on Purpose</h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">We believe every family deserves great tools — without compromise.</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {differentiators.map((d) => (
            <motion.div key={d.title} variants={fadeUp}
              className="rounded-2xl p-6 bg-card border border-border/50 hover:shadow-md transition-shadow"
            >
              <d.icon size={24} className="text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-1">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default LandingDifferentiators;
