import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Shield, BarChart3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  personalization: boolean;
}

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    analytics: false,
    personalization: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('hlb-consent');
    if (!stored) {
      setShowBanner(true);
    }
  }, []);

  const handleSubmit = (acceptAll = false) => {
    const finalPrefs = acceptAll
      ? { essential: true, analytics: true, personalization: true }
      : preferences;
    localStorage.setItem('hlb-consent', JSON.stringify(finalPrefs));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl border-2 shadow-lg bg-background">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-base mb-1.5">Privacy & Data Preferences</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We care about your family's privacy. Choose how we can use data to improve your experience.
              </p>

              {isExpanded && (
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg border border-secondary/30">
                    <Checkbox checked disabled className="mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-secondary-foreground" />
                        <span className="font-medium text-sm">Essential (Required)</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Account authentication, data storage, and core app functionality.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg border">
                    <Checkbox
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => setPreferences(p => ({ ...p, analytics: checked as boolean }))}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-sky-foreground" />
                        <span className="font-medium text-sm">Analytics (Optional)</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Help us understand how features are used to improve the app.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg border">
                    <Checkbox
                      checked={preferences.personalization}
                      onCheckedChange={(checked) => setPreferences(p => ({ ...p, personalization: checked as boolean }))}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-lavender-foreground" />
                        <span className="font-medium text-sm">AI Personalization (Optional)</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Enable AI-powered meal suggestions based on your child's preferences.</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• All data is encrypted and stored securely</p>
                    <p>• See our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for full details</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={() => handleSubmit(true)} className="flex-1 sm:flex-none">
                  Accept All
                </Button>
                {!isExpanded ? (
                  <Button variant="outline" onClick={() => setIsExpanded(true)} className="flex-1 sm:flex-none">
                    Customize
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => handleSubmit(false)} className="flex-1 sm:flex-none">
                    Save Preferences
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => handleSubmit(false)} className="text-xs">
                  Essential Only
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
