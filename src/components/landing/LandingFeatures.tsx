import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Apple, Brain, ShieldAlert, Baby, Utensils, FileText,
  TrendingUp, Users, ShoppingCart, Camera, Trophy, MessageCircle
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const features = [
  { icon: Apple, title: 'First 100 Foods Guide', desc: 'Track every new food across 150+ items with a visual checklist — including 40+ cultural dishes from around the world.', color: 'bg-sage/20 text-sage-foreground' },
  { icon: Brain, title: 'AI Meal Suggestions', desc: 'Get personalized meal ideas based on age, preferences, allergies, and what\'s already in your fridge.', color: 'bg-lavender/20 text-lavender-foreground' },
  { icon: ShieldAlert, title: 'Allergen Tracker', desc: 'Monitor top allergen introductions (US Top 9 & Canada Top 11) with reaction logging and safety timelines.', color: 'bg-destructive/10 text-destructive' },
  { icon: Baby, title: 'Feeding, Sleep & Diapers', desc: 'All-in-one daily tracking with a unified timeline, smart summaries, and automatic pattern detection.', color: 'bg-sky/20 text-sky-foreground' },
  { icon: Camera, title: 'AI Fridge & Plate Scanner', desc: 'Snap your fridge for instant meal ideas, or photograph a plate to auto-log meals in seconds.', color: 'bg-peach/20 text-peach-foreground' },
  { icon: Utensils, title: 'Picky Eater Toolkit', desc: 'Evidence-based strategies, exposure tracking, and reintroduction plans to expand adventurous eating.', color: 'bg-cream/40 text-cream-foreground' },
  { icon: FileText, title: 'Insights & Weekly Reports', desc: 'Auto-generated summaries with charts and trends — ready to share at your next pediatrician visit.', color: 'bg-sage/20 text-sage-foreground' },
  { icon: TrendingUp, title: 'Growth & Milestones', desc: 'Visual growth charts, percentile tracking, and developmental milestone logging over time.', color: 'bg-lavender/20 text-lavender-foreground' },
  { icon: ShoppingCart, title: 'Meal Planner & Grocery', desc: 'Plan weekly meals and auto-generate organized grocery lists from your planned recipes.', color: 'bg-sky/20 text-sky-foreground' },
  { icon: Users, title: 'Caregiver Sharing', desc: 'Share access with partners, grandparents, or daycare providers so everyone stays on the same page.', color: 'bg-peach/20 text-peach-foreground' },
  { icon: Trophy, title: 'Achievements & Badges', desc: 'Earn XP, unlock badges, and build streaks as you track your baby\'s feeding journey.', color: 'bg-cream/40 text-cream-foreground' },
  { icon: MessageCircle, title: 'AI Support Chatbot', desc: 'Get instant answers about any feature, feeding tips, or troubleshooting — available 24/7 in-app.', color: 'bg-sage/20 text-sage-foreground' },
];

export default function LandingFeatures() {
  return (
    <section id="features" className="px-4 sm:px-5 py-12 md:py-24 max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-800 text-center mb-2">
          One App. Every Milestone.
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
          Feeding, sleep, diapers, growth, allergens, AI meal planning, and so much more — all in one place.
        </p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={fadeUp}>
            <Card className="h-full border-border/60 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6 flex sm:block items-start gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${f.color} flex items-center justify-center shrink-0 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base mb-1">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
