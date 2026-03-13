import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard, Clock, Lock, Sparkles, ArrowRight
} from 'lucide-react';
import AppWalkthrough from '@/components/landing/AppWalkthrough';
import LandingHero from '@/components/landing/LandingHero';
import logoOption3 from '@/assets/logo-option-3.png';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingBetaOffer from '@/components/landing/LandingBetaOffer';
import LandingDifferentiators from '@/components/landing/LandingDifferentiators';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingStats from '@/components/landing/LandingStats';
import LandingPricing from '@/components/landing/LandingPricing';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const steps = [
  { num: '1', emoji: '👶', title: 'Create a Profile', desc: 'Add your baby\'s details in under a minute.' },
  { num: '2', emoji: '📋', title: 'Start Tracking', desc: 'Log meals, sleep, diapers, and milestones — all in one place.' },
  { num: '3', emoji: '🤖', title: 'Get AI Insights', desc: 'See trends, earn achievements, and share reports with your pediatrician.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3">
          <span className="flex items-center gap-2 text-base sm:text-lg font-black tracking-tight">
            <img src={logoOption3} alt="Happy Little Bites" className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
            <span className="hidden xs:inline">Happy Little Bites</span>
            <span className="xs:hidden">HLB</span>
          </span>
          <Link to="/login">
            <Button variant="outline" size="sm" className="rounded-full font-bold text-xs sm:text-sm">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <LandingHero />

      {/* Trust Bar */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="bg-sage/10 border-y border-border py-4 sm:py-5"
      >
        <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-1.5 text-xs sm:text-sm font-heading font-bold tracking-wide text-foreground/80">
          <span className="flex items-center gap-1.5"><CreditCard size={13} className="text-primary" /> No Card Required</span>
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-primary" /> Cancel Anytime</span>
          <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-primary" /> Beta Early Access</span>
          <span className="flex items-center gap-1.5"><Lock size={13} className="text-primary" /> Privacy First</span>
        </div>
      </motion.section>

      {/* Features */}
      <LandingFeatures />

      {/* Stats/Social Proof */}
      <LandingStats />

      {/* Interactive Walkthrough */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-4 sm:px-5 py-12 md:py-24 max-w-4xl mx-auto"
      >
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-800 text-center mb-2">See It in Action</h2>
        <p className="text-sm sm:text-base text-muted-foreground text-center max-w-lg mx-auto mb-6 sm:mb-8">Watch how easy it is to track your baby's entire day.</p>
        <AppWalkthrough />
      </motion.section>

      {/* How It Works */}
      <section className="px-4 sm:px-5 py-12 md:py-24 max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-800 text-center mb-8 sm:mb-12">Get Started in 3 Easy Steps</h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          className="grid grid-cols-3 gap-3 sm:gap-8"
        >
          {steps.map((s) => (
            <motion.div key={s.num} variants={fadeUp} className="text-center">
              <div className="text-3xl sm:text-5xl mb-2 sm:mb-3">{s.emoji}</div>
              <div className="inline-flex w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground font-heading font-bold text-xs sm:text-sm items-center justify-center mb-1.5 sm:mb-2">{s.num}</div>
              <h3 className="font-heading font-bold text-xs sm:text-lg mb-0.5 sm:mb-1">{s.title}</h3>
              <p className="text-[10px] sm:text-sm text-muted-foreground leading-snug">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Beta Offer CTA */}
      <LandingBetaOffer />

      {/* Pricing Preview */}
      <LandingPricing />

      {/* What Makes Us Different */}
      <LandingDifferentiators />

      {/* FAQ */}
      <LandingFAQ />

      {/* Final CTA */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-5 py-16 md:py-28 text-center"
      >
        <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
          <Sparkles size={12} className="mr-1" /> Limited Beta Access
        </Badge>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-900 mb-3">
          Start your free month today
        </h2>
        <p className="text-sm text-muted-foreground mb-2.5 max-w-md mx-auto">
          No credit card needed. Full access to every feature. Cancel anytime.
        </p>
        <p className="text-xs sm:text-sm text-primary font-heading font-bold mb-6 sm:mb-8">
          Beta users get 50% off their first 3 months when we launch 🎉
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
          <Button asChild size="lg" className="text-base px-10 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]">
            <Link to="/signup">Start Free Trial <ArrowRight className="ml-1" size={18} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-full">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-6 sm:py-8 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          <Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <img src={logoOption3} alt="Happy Little Bites" className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
          <span className="font-heading font-bold text-xs sm:text-sm">Happy Little Bites</span>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-heading">© {new Date().getFullYear()} Happy Little Bites. Made with 💛 for families.</p>
      </footer>
    </div>
  );
}
