import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
          <p className="text-muted-foreground mt-2">Last updated: March 9, 2026</p>
        </div>

        <div className="space-y-8">
          <section className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-destructive">⚠️ Important Medical Disclaimer</h2>
            <div className="space-y-3 text-sm">
              <p><strong>THIS APP IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE.</strong></p>
              <p>This application is designed to help track your baby's feeding journey and provide general educational information.</p>
              <div className="mt-4 space-y-2">
                <p>• <strong>Always consult your pediatrician</strong> before introducing new foods, especially potential allergens</p>
                <p>• <strong>Seek immediate medical attention</strong> for any signs of allergic reactions</p>
                <p>• <strong>AI-generated suggestions</strong> are for educational purposes only</p>
                <p>• <strong>Growth charts and milestones</strong> are general guidelines</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">By accessing or using this baby feeding tracker application, you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Food introduction tracking and logging</li>
              <li>Allergen introduction monitoring</li>
              <li>Growth measurement recording</li>
              <li>AI-powered meal suggestions (optional)</li>
              <li>Educational content about infant nutrition</li>
              <li>Data sharing with other caregivers (when authorized)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Medical Liability</h2>
            <div className="space-y-4">
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">No Medical Advice</h3>
                <p className="text-sm">We are not healthcare professionals. All content is for informational purposes only.</p>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Emergency Situations</h3>
                <p className="text-sm"><strong>If your child shows signs of allergic reaction, choking, or other medical emergency, call emergency services immediately.</strong></p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information about your child</li>
              <li>Use the app in accordance with your pediatrician's recommendations</li>
              <li>Monitor your child's reactions to new foods</li>
              <li>Keep your account secure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="leading-relaxed text-sm"><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THE APP.</strong> You acknowledge that the app is a tracking and educational tool only.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data and Privacy</h2>
            <p className="leading-relaxed">Your use of the app is also governed by our Privacy Policy, which details how we collect, use, and protect your family's information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Account Termination</h2>
            <p className="leading-relaxed">We may suspend or terminate your account if you violate these terms. You may delete your account at any time through app settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="leading-relaxed">We may revise these terms from time to time. Continued use of the app after changes constitutes acceptance.</p>
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
