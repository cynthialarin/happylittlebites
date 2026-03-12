import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronDown, Sparkles, Check } from 'lucide-react';
import logoOption3 from '@/assets/logo-option-3.png';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LandingHero() {
  return (
    <section className="relative px-5 pt-14 pb-16 md:pt-24 md:pb-28 text-center max-w-5xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Beta Badge */}
        <motion.div variants={fadeUp} className="mb-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 text-sm px-4 py-1.5">
            <Sparkles size={14} className="mr-1.5" />
            Currently in Beta — Free for Early Access
          </Badge>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center gap-3 text-3xl mb-6">
          <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0s' }}>🥦</span>
          <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0.3s' }}>🍌</span>
          <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0.6s' }}>🥕</span>
          <span className="animate-bounce-gentle inline-block" style={{ animationDelay: '0.9s' }}>🍓</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-6xl font-900 leading-tight tracking-tight mb-4">
          Track every bite.{' '}
          <span className="text-primary">Stress less.</span>
          <br className="hidden md:block" />
          <span className="text-foreground/80"> Raise a happy eater.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
          The all-in-one app to track weaning, spot allergies early, plan meals with AI, and keep your pediatrician in the loop — from first purée to toddler plate.
        </motion.p>

        {/* Trust indicators inline */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Check size={14} className="text-primary" /> No credit card needed</span>
          <span className="flex items-center gap-1"><Check size={14} className="text-primary" /> 1 month free trial</span>
          <span className="flex items-center gap-1"><Check size={14} className="text-primary" /> Cancel anytime</span>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="text-base px-8 py-6 rounded-full shadow-lg">
            <Link to="/signup">Start Free Trial <ArrowRight className="ml-1" size={18} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-full">
            <a href="#features">See All Features <ChevronDown className="ml-1" size={18} /></a>
          </Button>
        </motion.div>

        {/* Beta reward callout */}
        <motion.p variants={fadeUp} className="mt-6 text-sm text-primary font-heading font-bold">
          🎉 Sign up during Beta — Your first month is FREE!
        </motion.p>
      </motion.div>
    </section>
  );
}
