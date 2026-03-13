import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronDown, Sparkles, Check } from 'lucide-react';
import logoOption3 from '@/assets/logo-option-3.png';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function LandingHero() {
  return (
    <section className="relative px-5 pt-10 pb-12 md:pt-24 md:pb-28 text-center max-w-5xl mx-auto overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <motion.div initial="hidden" animate="visible" variants={stagger} className="relative">
        {/* Beta Badge */}
        <motion.div variants={fadeUp} className="mb-5">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 text-xs sm:text-sm px-3 sm:px-4 py-1.5 shadow-sm">
            <Sparkles size={13} className="mr-1.5" />
            Currently in Beta — Free for Early Access
          </Badge>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center mb-5">
          <motion.img
            src={logoOption3}
            alt="Happy Little Bites"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-heading text-[2rem] leading-[1.15] sm:text-4xl md:text-6xl font-900 tracking-tight mb-4">
          Track every bite.{' '}
          <span className="text-primary">Stress less.</span>
          <br className="hidden sm:block" />
          <span className="text-foreground/80"> Raise a happy eater.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed px-2">
          The all-in-one app to track weaning, spot allergies early, plan meals with AI, and keep your pediatrician in the loop — from first purée to toddler plate.
        </motion.p>

        {/* Trust indicators */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-muted-foreground mb-7">
          <span className="flex items-center gap-1"><Check size={14} className="text-primary" /> No credit card needed</span>
          <span className="flex items-center gap-1"><Check size={14} className="text-primary" /> 1 month free trial</span>
          <span className="flex items-center gap-1"><Check size={14} className="text-primary" /> Cancel anytime</span>
        </motion.div>

        {/* CTA Buttons - more prominent */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
          <Button asChild size="lg" className="text-base px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]">
            <Link to="/signup">Start Free Trial <ArrowRight className="ml-1.5" size={18} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-full hover:bg-muted/80 transition-all duration-300">
            <a href="#features">See All Features <ChevronDown className="ml-1" size={18} /></a>
          </Button>
        </motion.div>

        {/* Beta reward callout */}
        <motion.div variants={fadeUp} className="mt-6">
          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-heading font-bold bg-primary/5 rounded-full px-4 py-1.5">
            🎉 Sign up during Beta — Your first month is FREE!
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
