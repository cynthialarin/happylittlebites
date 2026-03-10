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
    a: 'We\'re currently in Beta! During this period, the app is completely free to use with full access to every feature. When we launch officially, we\'ll introduce affordable subscription plans. Beta users who sign up now will receive 50% off their first 3 months as a thank-you for being early adopters.',
  },
  {
    q: 'How does the free trial work?',
    a: 'When you sign up, you get a full 1-month free trial with access to every feature — no credit card required. We\'ll send you a reminder email before your trial ends so there are no surprises. You can cancel anytime, no questions asked.',
  },
  {
    q: 'Is my baby\'s data safe?',
    a: 'Absolutely. All data is encrypted in transit and at rest. We never sell or share your information with third parties for marketing. We comply with GDPR and COPPA regulations to protect your family\'s privacy.',
  },
  {
    q: 'Which food safety guidelines do you follow?',
    a: 'We follow the American Academy of Pediatrics (AAP) and CDC guidelines for US families, and Health Canada / Canadian Paediatric Society (CPS) guidelines for Canadian families. The app adapts automatically based on your selected country — including allergen lists (Top 9 for US, Top 11 for Canada).',
  },
  {
    q: 'Do I need to download an app from the App Store?',
    a: 'No! Happy Little Bites is a Progressive Web App (PWA). Just visit the website on any phone, tablet, or computer and tap "Add to Home Screen" to install it. It works offline too.',
  },
  {
    q: 'Can I share with my partner, grandparents, or daycare?',
    a: 'Yes! Use the Caregiver Sharing feature to invite trusted family members or care providers via email. They\'ll get their own account with access to your child\'s data. You can revoke access at any time.',
  },
  {
    q: 'Are the AI meal suggestions safe to follow?',
    a: 'AI suggestions are personalized based on your child\'s age, food history, and allergies — but they are for inspiration only and do not constitute medical advice. Always verify suggestions with your pediatrician, especially for allergen introduction.',
  },
  {
    q: 'Will I be charged without notice?',
    a: 'Never. We\'ll always send you an email reminder before your trial period ends or before any subscription charges begin. You can cancel at any time from your account settings — it\'s one click, no hoops to jump through.',
  },
];

export default function LandingFAQ() {
  return (
    <section className="px-5 py-16 md:py-24 max-w-3xl mx-auto">
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
}
