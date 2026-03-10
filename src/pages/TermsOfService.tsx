import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: March 10, 2026</p>
        </div>

        <div className="space-y-8">
          {/* Medical Disclaimer */}
          <section className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-destructive">⚠️ Important Medical Disclaimer</h2>
            <div className="space-y-3 text-sm">
              <p><strong>THIS APP IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.</strong></p>
              <p>Happy Little Bites is designed to help track your baby's feeding journey and provide general educational information based on published pediatric guidelines.</p>
              <div className="mt-4 space-y-2">
                <p>• <strong>Always consult your pediatrician</strong> before introducing new foods, especially potential allergens</p>
                <p>• <strong>Seek immediate medical attention</strong> for any signs of allergic reactions (hives, swelling, difficulty breathing, vomiting)</p>
                <p>• <strong>AI-generated meal suggestions</strong> are for educational and inspirational purposes only — they do not constitute medical or nutritional advice</p>
                <p>• <strong>Growth charts, milestones, and nutrition scores</strong> are general reference points, not diagnostic tools</p>
                <p>• <strong>Allergen tracking features</strong> are organizational aids — they do not replace professional allergy testing or medical guidance</p>
              </div>
            </div>
          </section>

          {/* 1. Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">By accessing or using the Happy Little Bites application ("the App"), you agree to be bound by these Terms of Service and our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>. If you do not agree, please discontinue use immediately.</p>
          </section>

          {/* 1b. Beta & Pricing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1b. Beta Program & Subscription</h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>Happy Little Bites is currently in <strong>Beta</strong>. During the Beta period, all features are available at no cost. When the Beta period ends, the App will transition to a paid subscription model.</p>
              <p><strong>Free Trial:</strong> New users receive a 1-month free trial with full access to all features. No credit card is required to start the trial.</p>
              <p><strong>Beta Early Adopter Discount:</strong> Users who create an account during the Beta period will receive 50% off their subscription for the first 3 months after the official launch.</p>
              <p><strong>Pre-Charge Notification:</strong> We will always send you an email notification before your free trial ends or before any subscription charges begin. You may cancel at any time from your account settings.</p>
              <p><strong>Cancellation:</strong> You may cancel your subscription at any time. Upon cancellation, you will retain access through the end of your current billing period. No refunds are provided for partial billing periods.</p>
            </div>
          </section>

          {/* 2. Description of Service */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="leading-relaxed mb-4">Happy Little Bites is a comprehensive baby feeding and development tracking application. The App provides the following features:</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Food & Nutrition Tracking</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>First 100 Foods visual checklist with safety guides for each food</li>
                  <li>Food diary with meal type, texture stage, acceptance level, and reaction logging</li>
                  <li>Food library with 100+ foods including age-appropriate serving tips</li>
                  <li>Recipe library with 100+ baby-friendly recipes organized by age group</li>
                  <li>Meal planner with weekly calendar and recipe integration</li>
                  <li>Auto-generated grocery lists from meal plans and recipes</li>
                  <li>Nutrition scorecard and daily nutrition summaries</li>
                  <li>Picky eater toolkit with evidence-based strategies</li>
                  <li>Texture progression tracking (purees → finger foods)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Health & Safety Monitoring</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Allergen introduction tracker (Top 9 US / Top 11 Canada priority allergens)</li>
                  <li>Reaction severity logging with symptom photos and onset timeline</li>
                  <li>Growth measurement recording with visual charts</li>
                  <li>Developmental milestone tracking</li>
                  <li>Feeding session tracker (breast, bottle, solids) with duration and amounts</li>
                  <li>Sleep tracker with quality ratings and pattern analysis</li>
                  <li>Diaper tracker with type and color logging</li>
                  <li>Choking hazard warnings and CPR quick-reference button</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">AI & Smart Features</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>AI-powered meal suggestions based on your child's age, food history, and preferences</li>
                  <li>AI-generated food images for visual reference</li>
                  <li>Weekly summary reports for pediatrician visits</li>
                  <li>Achievement and gamification system to celebrate milestones</li>
                  <li>Food reintroduction tracker for previously refused foods</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Account & Sharing</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Multi-child profile management with individual settings</li>
                  <li>Caregiver sharing via email invitations (partners, grandparents, daycare)</li>
                  <li>Data export and account deletion capabilities</li>
                  <li>Progressive Web App (PWA) — works offline and installable on any device</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Medical Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Medical Liability & Limitations</h2>
            <div className="space-y-4">
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">No Medical Advice</h3>
                <p className="text-sm">We are not healthcare professionals. All content, including food safety information, allergen guidance, growth charts, milestone checklists, and nutrition scores, is for informational and organizational purposes only. Nothing in this App should be interpreted as medical diagnosis or treatment.</p>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Allergen Tracking Disclaimer</h3>
                <p className="text-sm">The allergen tracker is an organizational tool to help you log introductions and reactions. It does not replace professional allergy testing (skin prick tests, blood tests, oral food challenges). Always work with your allergist or pediatrician when managing food allergies.</p>
              </div>
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Emergency Situations</h3>
                <p className="text-sm"><strong>If your child shows signs of anaphylaxis, choking, or any medical emergency, call 911 (US) or 911/112 (Canada) immediately. Do not rely on this App in an emergency.</strong></p>
              </div>
            </div>
          </section>

          {/* 4. AI Features */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. AI-Generated Content</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
              <p className="text-sm leading-relaxed">The App uses artificial intelligence to generate meal suggestions, food images, and recipe ideas. You acknowledge and agree that:</p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>AI suggestions are generated based on your child's age, logged food history, known allergies, and dietary preferences</li>
              <li>AI-generated content may contain errors, omissions, or suggestions that are not appropriate for your specific child</li>
              <li>AI suggestions <strong>do not account for</strong> all possible medical conditions, medication interactions, or individual health circumstances</li>
              <li>You must verify all AI-generated recipes and suggestions with your pediatrician before serving them to your child</li>
              <li>AI-generated food images are for illustrative purposes and may not accurately represent the actual appearance of prepared foods</li>
              <li>Your child's data is sent to AI model providers on a per-request basis for generating suggestions; it is not stored by AI providers after processing</li>
            </ul>
          </section>

          {/* 5. Country-Specific Guidelines */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Country-Specific Food Safety Guidelines</h2>
            <p className="leading-relaxed mb-4">The App provides food safety information based on published guidelines from recognized health authorities. Currently supported regions:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">🇺🇸 United States</h3>
                <ul className="text-sm space-y-1">
                  <li>• American Academy of Pediatrics (AAP)</li>
                  <li>• Centers for Disease Control (CDC)</li>
                  <li>• FDA food safety guidelines</li>
                  <li>• Top 9 priority allergens</li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">🇨🇦 Canada</h3>
                <ul className="text-sm space-y-1">
                  <li>• Health Canada</li>
                  <li>• Canadian Paediatric Society (CPS)</li>
                  <li>• Top 11 priority allergens (includes mustard & sulphites)</li>
                  <li>• Cow's milk introduction at 9–12 months</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">These guidelines are updated periodically but may not reflect the most recent changes. Always verify with your healthcare provider that the information is current and appropriate for your child.</p>
          </section>

          {/* 6. User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. User Responsibilities</h2>
            <p className="leading-relaxed mb-3">By using the App, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Provide accurate information about your child's age, allergies, and health conditions</li>
              <li>Use the App in conjunction with — not as a replacement for — your pediatrician's recommendations</li>
              <li>Verify all AI-generated meal suggestions and recipes with a qualified healthcare professional before serving</li>
              <li>Accurately log allergen introductions, reactions, and symptoms</li>
              <li>Monitor your child closely when introducing new foods, especially priority allergens</li>
              <li>Introduce allergens one at a time, waiting 2–3 days between new introductions, per standard pediatric guidance</li>
              <li>Keep your account credentials secure and not share login information</li>
              <li>Use the caregiver sharing feature responsibly, only inviting trusted individuals</li>
              <li>Report any inaccurate food safety information you encounter in the App</li>
            </ul>
          </section>

          {/* 7. Caregiver Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Caregiver Sharing</h2>
            <p className="leading-relaxed mb-3">The App allows you to invite other caregivers (partners, grandparents, daycare providers) to view your child's data. By using this feature:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>You authorize the sharing of your child's profile, food diary, allergen records, and other tracked data with invited caregivers</li>
              <li>You are responsible for ensuring that invited caregivers understand and follow your child's dietary requirements and allergen restrictions</li>
              <li>You can revoke access at any time through the App settings</li>
              <li>We are not responsible for actions taken by caregivers based on shared data</li>
            </ul>
          </section>

          {/* 8. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="leading-relaxed text-sm"><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP.</strong> This includes, without limitation, damages arising from reliance on food safety information, AI-generated suggestions, allergen tracking data, growth measurements, or any other content provided by the App. You acknowledge that the App is a tracking and educational tool only.</p>
            </div>
          </section>

          {/* 9. Data & Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Data and Privacy</h2>
            <p className="leading-relaxed">Your use of the App is also governed by our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>, which details how we collect, use, store, and protect your family's information, including children's data, AI processing, and caregiver sharing.</p>
          </section>

          {/* 10. Data Export & Deletion */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Data Export & Deletion</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>You may export your data (food diary, allergen records, growth data) at any time through the Data Management section</li>
              <li>You may delete your account and all associated data at any time through the App settings</li>
              <li>Upon account deletion, all personal data including child profiles, diary entries, photos, and tracking data will be permanently removed within 30 days</li>
            </ul>
          </section>

          {/* 11. PWA & Offline */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. PWA & Offline Usage</h2>
            <p className="leading-relaxed text-sm">The App is a Progressive Web App (PWA) that can be installed on your device and used offline. Data entered while offline will sync when connectivity is restored. We are not responsible for data loss due to device failure, browser cache clearing, or extended offline periods.</p>
          </section>

          {/* 12. Account Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Account Termination</h2>
            <p className="leading-relaxed">We may suspend or terminate your account if you violate these terms or misuse the service. You may delete your account at any time through the App settings.</p>
          </section>

          {/* 13. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="leading-relaxed">We may revise these terms from time to time. Material changes will be communicated through the App. Continued use after changes constitutes acceptance of the revised terms.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-sky/10 border border-sky/30 rounded-lg p-4 text-center">
            <p className="text-sm"><strong>Remember:</strong> Your child's health and safety are paramount. When in doubt, always consult with qualified healthcare professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
