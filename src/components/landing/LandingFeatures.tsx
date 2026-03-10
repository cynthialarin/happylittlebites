import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Apple, Brain, ShieldAlert, Baby, Utensils, FileText,
  TrendingUp, Users, ShoppingCart
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const features = [
  { icon: Apple, title: 'First 100 Foods Guide', desc: 'Track every new food with a visual checklist designed by nutrition experts. Know exactly what your baby has tried.', color: 'bg-sage/20 text-sage-foreground' },
  { icon: Brain, title: 'AI Meal Suggestions', desc: 'Get personalized meal ideas based on age, preferences, allergies, and what\'s in season. Never run out of ideas.', color: 'bg-lavender/20 text-lavender-foreground' },
  { icon: ShieldAlert, title: 'Allergen Tracker', desc: 'Monitor all top allergen introductions (US Top 9 / Canada Top 11) with reaction logging and safety timelines.', color: 'bg-destructive/10 text-destructive' },
  { icon: Baby, title: 'Feeding, Sleep & Diapers', desc: 'All-in-one daily tracking with smart summaries, pattern detection, and sharable weekly reports.', color: 'bg-sky/20 text-sky-foreground' },
  { icon: Utensils, title: 'Picky Eater Toolkit', desc: 'Evidence-based strategies, exposure tracking, and age-appropriate recipes to expand adventurous eating.', color: 'bg-peach/20 text-peach-foreground' },
  { icon: FileText, title: 'Weekly Reports', desc: 'Auto-generated summaries for pediatrician visits — feeding patterns, sleep quality, milestones, and more.', color: 'bg-cream/40 text-cream-foreground' },
  { icon: TrendingUp, title: 'Growth & Milestones', desc: 'Visual growth charts and developmental milestone tracking to see your baby\'s progress over time.', color: 'bg-sage/20 text-sage-foreground' },
  { icon: Users, title: 'Multi-Child & Caregiver Sharing', desc: 'Manage multiple children and share access with partners, grandparents, or daycare providers.', color: 'bg-lavender/20 text-lavender-foreground' },
  { icon: ShoppingCart, title: 'Meal Planner & Grocery Lists', desc: 'Plan weekly meals from 100+ recipes and auto-generate organized grocery lists.', color: 'bg-sky/20 text-sky-foreground' },
];

export default function LandingFeatures() {
  return (
    <section id="features" className="px-5 py-16 md:py-24 max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
        <h2 className="font-heading text-2xl md:text-3xl font-800 text-center mb-3">
          Everything You Need — All in One App
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          From first bites to toddler meals — track, plan, and celebrate every step of the journey.
        </p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={fadeUp}>
            <Card className="h-full border-border/60 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} />
                </div>
                <h3 className="font-heading font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
