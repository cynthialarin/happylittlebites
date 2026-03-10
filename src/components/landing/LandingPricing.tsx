import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function LandingPricing() {
  return (
    <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUp}
      >
        <Badge className="mb-4 bg-accent/15 text-accent border-accent/20 hover:bg-accent/20">
          <Sparkles size={12} className="mr-1" /> 100% FREE during Beta
        </Badge>
        <h2 className="font-heading text-2xl md:text-3xl font-800 mb-3">
          Free While We're in Beta
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm mb-2">
          Every feature is completely free right now — no credit card, no limits. When we launch paid plans, prices will be <span className="font-bold text-primary">very competitive</span>.
        </p>
        <p className="text-sm text-primary font-heading font-bold mb-8">
          Beta users will get 50% off their first 3 months when pricing launches 🎉
        </p>
        <Button asChild size="lg" className="rounded-full font-bold px-8">
          <Link to="/signup">
            Get Started Free <ArrowRight size={14} className="ml-1" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
