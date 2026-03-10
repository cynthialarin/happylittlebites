import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Gift, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function LandingBetaOffer() {
  return (
    <motion.section
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
      className="px-5 py-16 md:py-24"
    >
      <div className="max-w-3xl mx-auto rounded-3xl bg-primary/5 border-2 border-primary/20 p-8 md:p-12 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <Gift size={40} className="text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-900 mb-3">
            Join the Beta — Get Rewarded
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Help us build the best baby feeding app ever. Sign up now during our Beta period and lock in exclusive early adopter pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm text-foreground/80 mb-8">
            <span className="flex items-center justify-center gap-1.5"><Check size={16} className="text-primary" /> 1 month completely free</span>
            <span className="flex items-center justify-center gap-1.5"><Check size={16} className="text-primary" /> 50% off first 3 months</span>
            <span className="flex items-center justify-center gap-1.5"><Check size={16} className="text-primary" /> No credit card required</span>
          </div>

          <Button asChild size="lg" className="text-base px-10 py-6 rounded-full shadow-lg">
            <Link to="/signup">
              <Sparkles size={18} className="mr-2" />
              Claim Your Beta Spot
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            We'll notify you before any charges begin. Cancel anytime — no strings attached.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
