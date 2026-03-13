import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Gift, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function LandingBetaOffer() {
  return (
    <motion.section
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
      className="px-4 sm:px-5 py-12 md:py-24"
    >
      <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-primary/8 via-primary/5 to-sage/10 border-2 border-primary/20 p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Gift size={36} className="text-primary mx-auto mb-3" />
          </motion.div>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-900 mb-2.5">
            Join the Beta — Your First Month is FREE!
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-5">
            Help us build the best baby tracking app ever. Full access to feeding, sleep, diaper tracking, AI scanners, meal planning, and more — completely free, no credit card needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center text-xs sm:text-sm text-foreground/80 mb-6">
            <span className="flex items-center justify-center gap-1.5"><Check size={15} className="text-primary" /> 1 month completely free</span>
            <span className="flex items-center justify-center gap-1.5"><Check size={15} className="text-primary" /> Full access to all features</span>
            <span className="flex items-center justify-center gap-1.5"><Check size={15} className="text-primary" /> No credit card required</span>
          </div>

          <Button asChild size="lg" className="text-base px-8 sm:px-10 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]">
            <Link to="/signup">
              <Sparkles size={18} className="mr-2" />
              Claim Your Beta Spot
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>

          <p className="text-[10px] sm:text-xs text-muted-foreground mt-4">
            We'll notify you before any charges begin. Cancel anytime — no strings attached.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
