import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const faqs = [
  {
    q: 'Is Happy Little Bites free?',
    a: 'We\'re currently in Beta! During this period, the app is completely free to use with full access to every feature — including our AI-powered Fridge Scanner, Plate Scanner, 150+ food library, and support chatbot. When we launch officially, we\'ll introduce affordable subscription plans. Beta users who sign up now will receive 50% off their first 3 months as a thank-you for being early adopters.',
  },
  {
    q: 'How does the free trial work?',
    a: 'When you sign up, you get a full 1-month free trial with access to every feature — no credit card required. This includes AI meal suggestions, the Fridge & Plate Scanners, Weekly Reports, and all tracking tools. We\'ll send you a reminder email before your trial ends so there are no surprises. You can cancel anytime, no questions asked.',
  },
  {
    q: 'Is my baby\'s data safe?',
    a: 'Absolutely. All data is encrypted in transit and at rest. We use Row-Level Security so only you (and caregivers you invite) can see your child\'s data. We never sell or share your information with third parties for marketing. We comply with GDPR and COPPA regulations. Photos from the Fridge & Plate Scanners are processed in real-time and never stored permanently.',
  },
  {
    q: 'Which food safety guidelines do you follow?',
    a: 'We follow the American Academy of Pediatrics (AAP) and CDC guidelines for US families, and Health Canada / Canadian Paediatric Society (CPS) guidelines for Canadian families. The app adapts automatically based on your selected country — including allergen lists (Top 9 for US, Top 11 for Canada), serving tips, and age-appropriate warnings.',
  },
  {
    q: 'What is the Fridge Scanner & Plate Scanner?',
    a: 'The Fridge Scanner uses your phone\'s camera to identify ingredients in your fridge, then generates personalized baby-friendly meal ideas based on what you have on hand — filtered by your child\'s age, allergies, and preferences. The Plate Scanner lets you snap a photo of your baby\'s meal to auto-log it in your food diary, saving you time on manual entry. Both features are AI-powered and work instantly.',
  },
  {
    q: 'How does the First 100 Foods tracker work?',
    a: 'The First 100 Foods feature gives you a visual checklist of 100 essential foods organized by category (fruits, vegetables, proteins, grains, dairy). As your child tries each food, you mark it off and the app tracks their progress with a completion percentage. Each food includes age-appropriate safety tips, preparation guidance, and allergen warnings.',
  },
  {
    q: 'Can I track feeding, sleep, and diapers too?',
    a: 'Yes! Beyond solid food tracking, we offer a full baby tracker suite: log breastfeeding/bottle sessions with duration and amounts, track naps and nighttime sleep with quality ratings, and record diaper changes with type and color. Everything appears on a unified Daily Timeline view so you can see your baby\'s entire day at a glance.',
  },
  {
    q: 'What are the Insights & Weekly Reports?',
    a: 'The Insights page gives you charts and trend analysis of your child\'s eating patterns, food variety, nutrition scores, and more. Weekly Reports compile all your tracking data — food diary, feeding sessions, sleep patterns, diapers, and milestones — into a clean, shareable summary that\'s perfect for pediatrician visits.',
  },
  {
    q: 'How does the achievement system work?',
    a: 'We use fun gamification to keep you motivated! Earn badges and XP for logging meals, trying new foods, maintaining streaks, and hitting milestones. Achievements include things like "First Bite" (log your first food), "Rainbow Plate" (try foods from every color group), and "Consistency Champion" (log meals for 7 days straight). It makes the feeding journey more rewarding!',
  },
  {
    q: 'What is the Picky Eater Toolkit?',
    a: 'Our evidence-based Picky Eater Toolkit helps parents navigate food refusals with proven strategies. It includes a Reintroduction Tracker that helps you systematically re-offer refused foods (research shows it can take 10-15 exposures!), picky-eater-friendly recipes, and tips backed by pediatric nutrition science.',
  },
  {
    q: 'Do I need to download an app from the App Store?',
    a: 'No! Happy Little Bites is a Progressive Web App (PWA). Just visit the website on any phone, tablet, or computer and tap "Add to Home Screen" to install it. It works offline too — your data syncs automatically when you\'re back online.',
  },
  {
    q: 'Can I share with my partner, grandparents, or daycare?',
    a: 'Yes! Use the Caregiver Sharing feature to invite trusted family members or care providers via email. They\'ll get their own account with access to your child\'s data — including food diary, allergen records, and safety information. You can revoke access at any time.',
  },
  {
    q: 'Are the AI meal suggestions safe to follow?',
    a: 'AI suggestions are personalized based on your child\'s age, food history, and allergies — but they are for inspiration only and do not constitute medical advice. The same applies to our AI Support Chatbot, which can answer questions about the app\'s features and general feeding guidance. Always verify suggestions with your pediatrician, especially for allergen introduction.',
  },
  {
    q: 'Will I be charged without notice?',
    a: 'Never. We\'ll always send you an email reminder before your trial period ends or before any subscription charges begin. You can cancel at any time from your account settings — it\'s one click, no hoops to jump through.',
  },
];

const LandingFAQ = React.forwardRef<HTMLElement>(function LandingFAQ(_props, ref) {
  return (
    <section ref={ref} className="px-5 py-16 md:py-24 max-w-3xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-2xl md:text-3xl font-800 text-center">Frequently Asked Questions</h2>
        </div>
        <p className="text-center text-muted-foreground mb-8 text-sm">Everything you need to know before getting started.</p>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
});

export default LandingFAQ;
