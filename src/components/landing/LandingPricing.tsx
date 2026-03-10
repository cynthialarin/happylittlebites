import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    description: 'Get started tracking your baby\'s food journey.',
    features: ['1 child profile', 'Food diary & library', 'Allergen tracking', 'Basic milestones'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Plus',
    price: '$4.99',
    period: '/mo',
    description: 'Unlock AI insights and advanced tracking.',
    features: ['Unlimited child profiles', 'AI meal suggestions', 'Weekly nutrition reports', 'Picky eater tools', 'Growth tracking'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Family',
    price: '$7.99',
    period: '/mo',
    description: 'Share with caregivers and get priority support.',
    features: ['Everything in Plus', 'Caregiver sharing', 'Meal planning & grocery lists', 'Priority support', 'Export & backup'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
];

export default function LandingPricing() {
  return (
    <section className="px-5 py-16 md:py-24 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUp}
        className="text-center mb-12"
      >
        <Badge className="mb-4 bg-accent/15 text-accent border-accent/20 hover:bg-accent/20">
          <Sparkles size={12} className="mr-1" /> Currently FREE during Beta
        </Badge>
        <h2 className="font-heading text-2xl md:text-3xl font-800 mb-3">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">
          Start free today. Beta users get <span className="font-bold text-primary">50% off</span> their first 3 months when we launch.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1 } },
            }}
          >
            <Card
              className={`relative h-full ${
                tier.highlighted
                  ? 'border-primary/40 ring-2 ring-primary/20 bg-primary/5'
                  : 'border-border'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-[10px] font-bold px-3">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="font-heading font-bold text-lg mb-1">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-5">
                  <span className="text-3xl font-black">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.highlighted ? 'default' : 'outline'}
                  className="w-full rounded-full font-bold"
                >
                  <Link to="/signup">
                    {tier.cta} {tier.highlighted && <ArrowRight size={14} className="ml-1" />}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
