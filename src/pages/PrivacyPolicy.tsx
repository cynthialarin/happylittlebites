import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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
          <p className="text-muted-foreground mt-2">Last updated: March 13, 2026</p>
        </div>

        <div className="space-y-8">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="leading-relaxed">This Privacy Policy describes how Happy Little Bites ("we," "us," "the App") collects, uses, stores, and protects your information. We are deeply committed to protecting your family's privacy, especially when it comes to information about your children. The App is currently in Beta and offers a free trial period; see our <Link to="/terms" className="text-primary underline">Terms of Service</Link> for subscription details.</p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Account Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Email address and display name</li>
                  <li>Authentication credentials (securely hashed, never stored in plain text)</li>
                  <li>Country/region selection (US or Canada) for localized guidelines</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Child Profile Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Child's name, date of birth, gender, and avatar/photo</li>
                  <li>Feeding approach preferences (baby-led weaning, spoon-fed, combination)</li>
                  <li>Known allergies and fussy food lists</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Tracking & Diary Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Food diary entries: food name, meal type, date, texture stage, acceptance level, reaction details, notes, and photos</li>
                  <li>Allergen introduction records: allergen type, date introduced, symptoms, reaction severity, onset time, and notes</li>
                  <li>Food exposure records: food name, exposure count, and acceptance history</li>
                  <li>Feeding session entries: type (breast/bottle/solids), duration, amount, side, date, and time</li>
                  <li>Sleep entries: start/end times, sleep type, quality rating, date, and notes</li>
                  <li>Diaper entries: type, color, date, time, and notes</li>
                  <li>Growth measurements recorded through the App</li>
                  <li>Milestone achievements: milestone name, date achieved, and notes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Meal Planning & Recipes</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Meal plan entries: dates, meal types, and assigned recipes</li>
                  <li>Grocery list items: names, amounts, units, and checked status</li>
                  <li>Saved AI-generated recipes: title, ingredients, instructions, and meal type</li>
                  <li>Favorite and tried recipe preferences</li>
                  <li>Food preferences (loves/refuses) per child</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">AI Feature Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Fridge Scanner photos:</strong> Images are processed in real-time by AI to identify ingredients and are <strong>not stored permanently</strong> on our servers</li>
                  <li><strong>Plate Scanner photos:</strong> Meal images are analyzed by AI for food identification and are <strong>not stored permanently</strong> after processing</li>
                  <li><strong>AI Support Chatbot conversations:</strong> Messages are processed in real-time and are <strong>not persisted</strong> between sessions — conversation history is stored only in your browser's memory during the active session</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Feedback & Community Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Feedback ticket submissions: description, category, priority, screenshots, and contact preferences</li>
                  <li>Community forum posts and replies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Caregiver Sharing Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Caregiver invite records: invitee email, child name, custom message, and invitation status</li>
                  <li>Share tokens for secure access</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Usage & Technical Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>App usage patterns and feature interactions (anonymized analytics, if consent given)</li>
                  <li>Product tour completion and contextual hint dismissal data (stored locally on your device via localStorage)</li>
                  <li>Device information and browser type for compatibility</li>
                  <li>Error logs for improving App performance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Children's Privacy (COPPA Compliance)</h2>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="leading-relaxed"><strong>Important:</strong> We do not knowingly collect personal information directly from children under 13. All child-related data is entered and managed exclusively by parents or authorized caregivers.</p>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>• Child data is only accessible to the parent/caregiver who created the profile and any invited caregivers</p>
              <p>• We implement strict Row-Level Security to ensure data isolation between users</p>
              <p>• Parents can view, export, and delete all child data at any time</p>
              <p>• We never share child information with third parties for marketing or advertising purposes</p>
              <p>• Child photos are stored securely and are never used for any purpose other than display within the parent's account</p>
              <p>• If we discover that data has been collected from a child without parental consent, we will delete it immediately</p>
            </div>
          </section>

          {/* 4. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Core Tracking Features:</strong> Saving food diary entries, allergen records, feeding/sleep/diaper logs, growth data, and milestones — syncing across your devices</li>
              <li><strong>Food Safety:</strong> Providing age-appropriate food warnings, allergen alerts, choking hazard notices, and country-specific safety guidelines (AAP/CDC for US, Health Canada/CPS for Canada)</li>
              <li><strong>AI Meal Suggestions:</strong> Generating personalized meal ideas using your child's age, food history, allergen records, and dietary preferences (see Section 5)</li>
              <li><strong>Fridge & Plate Scanning:</strong> Processing camera photos to identify ingredients or foods for meal recommendations and automatic diary logging</li>
              <li><strong>AI Support Chatbot:</strong> Providing real-time help with app features, general feeding guidance, and troubleshooting</li>
              <li><strong>Weekly Reports:</strong> Compiling feeding, sleep, diaper, and milestone data into shareable summaries for pediatrician visits</li>
              <li><strong>Insights & Analytics:</strong> Generating charts, trends, and data visualizations of your child's eating patterns and nutrition</li>
              <li><strong>Achievements & Gamification:</strong> Tracking food diversity, consistency streaks, and milestone badges to encourage engagement</li>
              <li><strong>Nutrition Analysis:</strong> Calculating daily nutrition summaries and scores based on logged meals</li>
              <li><strong>Meal Planning:</strong> Enabling weekly meal plans and auto-generating grocery lists from selected recipes</li>
              <li><strong>Caregiver Collaboration:</strong> Sharing child data with invited caregivers at your authorization</li>
              <li><strong>Feedback & Support:</strong> Processing your feedback tickets and bug reports to improve the App</li>
            </ul>
          </section>

          {/* 5. AI Data Processing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. AI Data Processing</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
              <p className="text-sm leading-relaxed"><strong>Transparency Notice:</strong> The App uses AI models to generate meal suggestions, food images, fridge-based recommendations, plate photo analysis, and support chatbot responses. Here's exactly how your data is handled:</p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>What is sent for meal suggestions:</strong> Your child's age, food history, known allergies, dietary preferences, and feeding approach are included in AI prompts</li>
              <li><strong>What is sent for Fridge Scanner:</strong> The photo of your fridge contents, along with your child's age, allergies, and preferences for personalized results</li>
              <li><strong>What is sent for Plate Scanner:</strong> The photo of the meal for food identification and automatic diary logging</li>
              <li><strong>What is sent for Support Chatbot:</strong> Your question and conversation context within the current session — no personal child data is sent unless you include it in your message</li>
              <li><strong>Processing:</strong> Data is sent to AI model providers on a per-request basis only when you actively use an AI feature</li>
              <li><strong>No storage by AI providers:</strong> Your data is processed in real-time and is not retained, stored, or used for training by AI model providers after the request is completed</li>
              <li><strong>Photo handling:</strong> Fridge and plate photos are transmitted for processing only and are not permanently stored on our servers</li>
              <li><strong>No profiling:</strong> We do not use AI to build behavioral profiles of your child or make automated decisions about their health</li>
              <li><strong>Opt-out:</strong> AI features are entirely optional. You can use the App without ever requesting AI suggestions, scanning, or chatbot assistance</li>
            </ul>
          </section>

          {/* 6. Caregiver Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Caregiver Data Sharing</h2>
            <p className="leading-relaxed mb-4">The App allows you to invite trusted caregivers to access your child's data:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Invite system:</strong> You send invitations via email. Invited caregivers must create an account to access shared data</li>
              <li><strong>What is shared:</strong> Child profiles, food diary entries, allergen records, and relevant safety information</li>
              <li><strong>Your control:</strong> You can view all active shares and revoke access at any time through the App</li>
              <li><strong>Caregiver responsibilities:</strong> Invited caregivers are bound by these same Terms and Privacy Policy</li>
            </ul>
          </section>

          {/* 7. Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Third-Party Information Sharing</h2>
            <p className="leading-relaxed mb-4">We do <strong>not</strong> sell your personal information. We only share information in limited circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>With your consent:</strong> When you choose to share data with caregivers or export reports</li>
              <li><strong>AI processing:</strong> Child data sent to AI providers for meal suggestions, scanning, and chatbot responses (see Section 5)</li>
              <li><strong>Infrastructure providers:</strong> Trusted cloud hosting and database services with strict data processing agreements</li>
              <li><strong>Legal requirements:</strong> When required by applicable law, regulation, or valid legal process</li>
            </ul>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Your Rights (GDPR & CCPA)</h2>
            <p className="leading-relaxed mb-4">Regardless of where you live, we provide the following rights to all users:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <p>• <strong>Access:</strong> View and download all your data</p>
                <p>• <strong>Correction:</strong> Update any incorrect information</p>
                <p>• <strong>Deletion:</strong> Delete your account and all associated data</p>
                <p>• <strong>Portability:</strong> Export data in standard formats (JSON/CSV)</p>
              </div>
              <div className="space-y-2 text-sm">
                <p>• <strong>Consent withdrawal:</strong> Opt out of analytics and optional features</p>
                <p>• <strong>Object:</strong> Opt out of certain data processing activities</p>
                <p>• <strong>Restrict:</strong> Limit how we process your data</p>
                <p>• <strong>Non-discrimination:</strong> Exercise your rights without penalty</p>
              </div>
            </div>
          </section>

          {/* 9. Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Data Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>All data encrypted in transit (TLS/SSL) and at rest</li>
              <li>Row-Level Security (RLS) ensures users can only access their own data</li>
              <li>Authentication via secure email/password with optional email verification</li>
              <li>Regular security monitoring and infrastructure audits</li>
              <li>Secure cloud infrastructure with automatic backups</li>
              <li>No plain-text storage of passwords or sensitive credentials</li>
            </ul>
          </section>

          {/* 10. Cookies & Local Storage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Cookies & Local Storage</h2>
            <p className="leading-relaxed mb-3">The App uses:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Essential cookies/local storage:</strong> Authentication tokens and session management (required for App functionality)</li>
              <li><strong>Preference storage:</strong> Your consent choices, theme preferences, onboarding state, product tour progress, and page hint dismissal data</li>
              <li><strong>Temporary session storage:</strong> AI chatbot conversation history (cleared when you close the chat or refresh the page)</li>
              <li><strong>Analytics cookies:</strong> Only with your explicit consent via our cookie consent banner</li>
              <li>We do not use advertising cookies or third-party tracking pixels</li>
            </ul>
          </section>

          {/* 11. Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Data Retention</h2>
            <p className="leading-relaxed">We retain your data for as long as your account is active. When you delete your account, all personal data — including child profiles, diary entries, photos, allergen records, meal plans, saved recipes, community posts, feedback tickets, and all tracking data — is permanently removed within 30 days. Anonymized, aggregated usage statistics may be retained for service improvement.</p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="leading-relaxed">If you have questions about this Privacy Policy, want to exercise your data rights, or need to report a privacy concern, please use the in-app Feedback feature or the AI Support Chatbot to reach us.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">This policy is designed to be transparent and comprehensive. We believe your family's data deserves the highest level of protection.</p>
        </div>
      </div>
    </div>
  );
}
