import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Apple, Brain, ShieldAlert, Baby, Utensils, FileText,
  TrendingUp, Users, ShoppingCart, Smartphone, Lock, Sparkles,
  Heart, ChevronRight, Star
} from 'lucide-react';
import AppWalkthrough from '@/components/landing/AppWalkthrough';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const features = [
  { icon: Apple, title: 'First 100 Foods Guide', desc: 'Track every new food with a visual checklist designed by nutrition experts.', color: 'bg-sage/20 text-sage-foreground' },
  { icon: Brain, title: 'AI Meal Suggestions', desc: 'Get personalized meal ideas based on age, preferences, and what\'s in season.', color: 'bg-lavender/20 text-lavender-foreground' },
  { icon: ShieldAlert, title: 'Allergen Tracker', desc: 'Monitor top allergen introductions with reaction logging and timelines.', color: 'bg-destructive/10 text-destructive' },
  { icon: Baby, title: 'Feeding, Sleep & Diapers', desc: 'All-in-one daily tracking with smart summaries and pattern detection.', color: 'bg-sky/20 text-sky-foreground' },
  { icon: Utensils, title: 'Picky Eater Toolkit', desc: 'Evidence-based strategies and recipes to expand adventurous eating.', color: 'bg-peach/20 text-peach-foreground' },
  { icon: FileText, title: 'Weekly Reports', desc: 'Shareable summaries for pediatrician visits — feeding, sleep, and milestones.', color: 'bg-cream/40 text-cream-foreground' },
  { icon: TrendingUp, title: 'Growth & Milestones', desc: 'Visual growth charts and developmental milestone tracking in one place.', color: 'bg-sage/20 text-sage-foreground' },
  { icon: Users, title: 'Multi-Child Profiles', desc: 'Manage multiple children with individual themes, data, and preferences.', color: 'bg-lavender/20 text-lavender-foreground' },
  { icon: ShoppingCart, title: 'Grocery & Meal Planner', desc: 'Plan weekly meals and auto-generate grocery lists from recipes.', color: 'bg-sky/20 text-sky-foreground' },
];

const differentiators = [
  { icon: Sparkles, title: 'All-in-One', desc: 'Food diary, sleep log, diaper tracker, meal planner, and growth charts — no more juggling five different apps.' },
  { icon: Heart, title: '100% Free, Forever', desc: 'No paywalls, no premium tiers, no ads. Every feature is available to every family.' },
  { icon: Smartphone, title: 'Works Everywhere', desc: 'Use it on any phone, tablet, or computer. Install it like an app — no App Store needed.' },
  { icon: Brain, title: 'AI-Powered', desc: 'Smart meal suggestions and food pairing ideas that learn from your baby\'s journey.' },
  { icon: Lock, title: 'Privacy First', desc: 'Your family\'s data stays yours. No selling, no sharing, no third-party tracking.' },
];

const steps = [
  { num: '1', emoji: '👶', title: 'Create a Profile', desc: 'Add your baby\'s details in under a minute.' },
  { num: '2', emoji: '🥕', title: 'Log First Food', desc: 'Record meals, reactions, and textures effortlessly.' },
  { num: '3', emoji: '📊', title: 'Watch Progress', desc: 'See trends, celebrate milestones, and share reports.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="relative px-5 pt-14 pb-16 md:pt-24 md:pb-28 text-center max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex justify-center gap-3 text-3xl mb-6">
            <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0s' }}>🥦</span>
            <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0.3s' }}>🍌</span>
            <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0.6s' }}>🥕</span>
            <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0.9s' }}>🍓</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-6xl font-900 leading-tight tracking-tight mb-4">
            Your baby's food journey,{' '}
            <span className="text-primary">joyfully tracked</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            The stress-free way to track weaning, spot allergies early, celebrate milestones, and keep your pediatrician in the loop — completely free.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-full shadow-lg">
              <Link to="/signup">Get Started Free <ChevronRight className="ml-1" size={18} /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-full">
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="bg-sage/10 border-y border-border py-5"
      >
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-heading font-bold tracking-wide text-foreground/80">
          <span className="flex items-center gap-1.5"><Star size={14} className="text-primary fill-primary" /> 100% Free</span>
          <span className="flex items-center gap-1.5"><Star size={14} className="text-primary fill-primary" /> No Ads</span>
          <span className="flex items-center gap-1.5"><Star size={14} className="text-primary fill-primary" /> No Paywalls</span>
          <span className="flex items-center gap-1.5"><Star size={14} className="text-primary fill-primary" /> No Data Selling</span>
        </div>
      </motion.section>

      {/* Video Demo */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-5 py-16 md:py-24 max-w-4xl mx-auto"
      >
        <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-8">See It in Action</h2>
        <AppWalkthrough />
      </motion.section>

      {/* Feature Grid */}
      <section className="px-5 py-16 md:py-24 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
          <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-3">Everything You Need in One Place</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">From first bites to toddler meals — track, plan, and celebrate every step.</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <Card className="h-full border-border/60 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-3`}>
                    <f.icon size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What Makes Us Different */}
      <section className="px-5 py-16 md:py-24 bg-cream/30">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
            <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-3">Built Different, on Purpose</h2>
            <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">We believe every family deserves great tools — without compromise.</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {differentiators.map((d, i) => (
              <motion.div key={d.title} variants={fadeUp}
                className={`rounded-2xl p-6 bg-card border border-border/50 ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <d.icon size={24} className="text-primary mb-3" />
                <h3 className="font-heading font-bold text-base mb-1">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
          <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-12">Get Started in 3 Steps</h2>
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

      {/* Testimonial Placeholder */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-5 py-16 md:py-20 bg-sage/10"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">💛</div>
          <blockquote className="font-heading text-xl md:text-2xl font-700 italic leading-relaxed text-foreground/85 mb-4">
            "Finally, one app that does it all. I used to have three different trackers — now Happy Little Bites is the only one I need."
          </blockquote>
          <p className="text-sm text-muted-foreground font-heading font-bold">— A happy parent</p>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        className="px-5 py-20 md:py-28 text-center"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-900 mb-4">
          Start your baby's food journey today
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Join thousands of families tracking smarter, stressing less, and celebrating every bite.
        </p>
        <Button asChild size="lg" className="text-base px-10 py-6 rounded-full shadow-lg">
          <Link to="/signup">Create Free Account <ChevronRight className="ml-1" size={18} /></Link>
        </Button>
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
