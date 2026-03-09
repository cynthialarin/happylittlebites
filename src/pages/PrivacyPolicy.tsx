import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: March 9, 2026</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="leading-relaxed">This Privacy Policy describes how we collect, use, and protect your information when you use our baby feeding tracker application. We are committed to protecting your family's privacy, especially when it comes to information about children.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your email address and display name</li>
                  <li>Child's name, date of birth, and feeding preferences</li>
                  <li>Food logs, growth measurements, and allergen tracking data</li>
                  <li>Photos you choose to upload of meals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>App usage patterns and feature interactions</li>
                  <li>Device information and technical diagnostics</li>
                  <li>Error logs for improving app performance</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Children's Privacy (COPPA Compliance)</h2>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="leading-relaxed"><strong>Important:</strong> We do not knowingly collect personal information directly from children under 13. All child-related data is entered by parents or caregivers.</p>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>• Child data is only accessible to the parent/caregiver who created it</p>
              <p>• We implement strict access controls to protect child information</p>
              <p>• Parents can delete all child data at any time through app settings</p>
              <p>• We never share child information with third parties for marketing</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Services:</strong> Core app functionality, saving data, syncing across devices</li>
              <li><strong>Safety Features:</strong> Allergen warnings, age-appropriate food recommendations</li>
              <li><strong>AI Suggestions:</strong> Personalized meal ideas based on your child's age and preferences</li>
              <li><strong>Customer Support:</strong> Responding to questions and troubleshooting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Information Sharing</h2>
            <p className="leading-relaxed mb-4">We do <strong>not</strong> sell your personal information. We only share information in limited circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With your consent:</strong> When you choose to share data with caregivers</li>
              <li><strong>Service providers:</strong> Trusted partners for cloud hosting</li>
              <li><strong>Legal requirements:</strong> When required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights (GDPR)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <p>• <strong>Access:</strong> Download all your data</p>
                <p>• <strong>Correct:</strong> Update incorrect information</p>
                <p>• <strong>Delete:</strong> Remove your account and data</p>
                <p>• <strong>Portability:</strong> Export data in standard format</p>
              </div>
              <div className="space-y-2 text-sm">
                <p>• <strong>Consent:</strong> Withdraw consent for optional features</p>
                <p>• <strong>Object:</strong> Opt out of certain data uses</p>
                <p>• <strong>Restrict:</strong> Limit how we process your data</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure cloud infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
            <p className="leading-relaxed">We keep your information for as long as your account is active. When you delete your account, we remove your personal data within 30 days.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="leading-relaxed">If you have questions about this Privacy Policy, please contact us through the app's support feature.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">This policy is designed to be transparent and comprehensive.</p>
        </div>
      </div>
    </div>
  );
}
