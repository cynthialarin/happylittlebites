import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Apple, Brain, ShieldAlert, Baby, Utensils, FileText,
  TrendingUp, Users, ShoppingCart, Lock, Sparkles,
  ChevronRight, Star, HelpCircle, CreditCard, Clock,
  Zap, Check, ArrowRight, BookOpen, BarChart3
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AppWalkthrough from '@/components/landing/AppWalkthrough';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingBetaOffer from '@/components/landing/LandingBetaOffer';
import LandingDifferentiators from '@/components/landing/LandingDifferentiators';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingStats from '@/components/landing/LandingStats';
import LandingPricing from '@/components/landing/LandingPricing';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const steps = [
  { num: '1', emoji: '👶', title: 'Create a Profile', desc: 'Add your baby\'s details in under a minute.' },
  { num: '2', emoji: '🥕', title: 'Log First Food', desc: 'Record meals, reactions, and textures effortlessly.' },
  { num: '3', emoji: '📊', title: 'Watch Progress', desc: 'See trends, celebrate milestones, and share reports.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-3">
          <span className="text-lg font-black tracking-tight">🥦 Happy Little Bites</span>
          <Link to="/login">
            <Button variant="outline" size="sm" className="rounded-full font-bold">
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
        className="bg-sage/10 border-y border-border py-5"
      >
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-heading font-bold tracking-wide text-foreground/80">
          <span className="flex items-center gap-1.5"><CreditCard size={14} className="text-primary" /> No Card Required</span>
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> Cancel Anytime</span>
          <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-primary" /> Beta Early Access</span>
          <span className="flex items-center gap-1.5"><Lock size={14} className="text-primary" /> Privacy First</span>
        </div>
      </motion.section>

      {/* Feature Showcase — immediately visible */}
      <LandingFeatures />

      {/* Stats/Social Proof */}
      <LandingStats />

      {/* Video Demo / Walkthrough */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-5 py-16 md:py-24 max-w-4xl mx-auto"
      >
        <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-3">See It in Action</h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-8">Watch how easy it is to track your baby's entire day — meals, sleep, diapers, and milestones.</p>
        <AppWalkthrough />
      </motion.section>

      {/* How It Works */}
      <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
          <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-12">Get Started in 3 Easy Steps</h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((s) => (
            <motion.div key={s.num} variants={fadeUp} className="text-center">
              <div className="text-5xl mb-3">{s.emoji}</div>
              <div className="inline-flex w-8 h-8 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm items-center justify-center mb-2">{s.num}</div>
              <h3 className="font-heading font-bold text-lg mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
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
        className="px-5 py-20 md:py-28 text-center"
      >
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
          <Sparkles size={12} className="mr-1" /> Limited Beta Access
        </Badge>
        <h2 className="font-heading text-3xl md:text-4xl font-900 mb-4">
          Start your free month today
        </h2>
        <p className="text-muted-foreground mb-3 max-w-md mx-auto">
          No credit card needed. Full access to every feature. Cancel anytime.
        </p>
        <p className="text-sm text-primary font-heading font-bold mb-8">
          Beta users get 50% off their first 3 months when we launch 🎉
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="text-base px-10 py-6 rounded-full shadow-lg">
            <Link to="/signup">Start Free Trial <ArrowRight className="ml-1" size={18} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-full">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-8 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
          <Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
        <p className="text-xs text-muted-foreground/60 font-heading">© {new Date().getFullYear()} Happy Little Bites. Made with 💛 for families.</p>
      </footer>
    </div>
  );
}
