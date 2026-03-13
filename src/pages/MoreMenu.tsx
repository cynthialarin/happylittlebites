import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, LogOut, FileText, Moon, Sun, Monitor } from 'lucide-react';
import { Country } from '@/types';
import ProductTour from '@/components/ProductTour';

const menuSections = (isCanada: boolean) => [
  {
    title: '🛠️ Daily Tools',
    items: [
      { path: '/first-100-foods', label: 'First 100 Foods', desc: 'Guided journey through essential foods', emoji: '🗺️', color: 'bg-sage/10' },
      { path: '/jar-foods', label: 'Store-Bought Guide', desc: 'Jar & pouch baby food database', emoji: '🍼', color: 'bg-sky/10' },
      { path: '/suggestions', label: 'AI Meal Ideas', desc: 'Personalized daily meal suggestions', emoji: '✨', color: 'bg-primary/10' },
      { path: '/meal-planner', label: 'Meal Planner', desc: 'Plan weekly meals & shopping list', emoji: '📅', color: 'bg-peach/10' },
      { path: '/grocery-list', label: 'Grocery List', desc: 'Track ingredients to buy', emoji: '🛒', color: 'bg-sage/20' },
    ],
  },
  {
    title: '📊 Tracking',
    items: [
      { path: '/growth', label: 'Growth Tracker', desc: 'Weight, height & percentiles', emoji: '📏', color: 'bg-sky/10' },
      { path: '/achievements', label: 'Achievements', desc: 'Badges, XP & level progress', emoji: '🏆', color: 'bg-primary/10' },
      { path: '/tracker/allergens', label: 'Allergen Tracker', desc: isCanada ? 'Top 11 allergen introduction guide' : 'Top 9 allergen introduction guide', emoji: '🛡️', color: 'bg-sky/20' },
      { path: '/saved-recipes', label: 'Saved Recipes', desc: 'AI-generated meal ideas you saved', emoji: '📌', color: 'bg-primary/5' },
      { path: '/weekly-report', label: 'Weekly Report', desc: 'Summary to share with your pediatrician', emoji: '📋', color: 'bg-sage/10' },
    ],
  },
  {
    title: '📖 Learning',
    items: [
      { path: '/more/picky-eater', label: 'Picky Eater Toolkit', desc: 'Evidence-based strategies', emoji: '🧠', color: 'bg-lavender/20' },
      { path: '/more/safety', label: 'Safety Reference', desc: 'Choking, gagging & first aid', emoji: '🚨', color: 'bg-destructive/10' },
      { path: '/more/milestones', label: 'Milestones', desc: 'Feeding milestones by age', emoji: '📈', color: 'bg-sage/20' },
    ],
  },
  {
    title: '⚙️ Account',
    items: [
      { path: '/caregiver-share', label: 'Caregiver Share', desc: 'Share food guide with daycare & family', emoji: '📤', color: 'bg-sage/10' },
      { path: '/more/profiles', label: 'Child Profiles', desc: 'Manage your children', emoji: '👶', color: 'bg-peach/20' },
      { path: '/my-feedback', label: 'My Feedback', desc: 'View your tickets & replies', emoji: '📨', color: 'bg-primary/5' },
      { path: '#replay-tour', label: 'Replay Tour', desc: 'Re-watch the onboarding walkthrough', emoji: '🎓', color: 'bg-lavender/10' },
      { path: '/more/data', label: 'Data & Privacy', desc: 'Export data, manage account', emoji: '🔐', color: 'bg-muted' },
    ],
  },
];

export default function MoreMenu() {
  const navigate = useNavigate();
  const { activeChild, children: allChildren, settings, setCountry, setTheme } = useApp();
  const { signOut } = useAuth();
  const [showTour, setShowTour] = useState(false);

  const handleMenuClick = (path: string) => {
    if (path === '#replay-tour') {
      try { localStorage.removeItem('hlb-product-tour-seen'); } catch {}
      setShowTour(true);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <h1 className="text-xl font-black mb-4">More</h1>

      {activeChild && (
        <Card className="mb-4 bg-primary/5 border-primary/20">
          <CardContent className="p-3 flex items-center gap-3">
            <span className="text-3xl">{activeChild.avatar}</span>
            <div>
              <p className="font-bold text-sm">{activeChild.name}</p>
              <p className="text-xs text-muted-foreground">{allChildren.length} profile{allChildren.length !== 1 ? 's' : ''}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-5">
        {menuSections(settings.country === 'CA').map(section => (
          <div key={section.title}>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-2 px-1">{section.title}</p>
            <div className="space-y-1.5">
              {section.items.map(item => (
                <button
                  key={item.path}
                  onClick={() => handleMenuClick(item.path)}
                  className={`w-full p-4 rounded-xl ${item.color} text-left hover:ring-2 ring-primary/30 transition-all flex items-center gap-3`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Appearance Toggle */}
      <Card className="mt-5 mb-2">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-bold">Appearance</span>
            </div>
            <div className="flex gap-1">
              {([
                { code: 'light' as const, icon: Sun, label: 'Light' },
                { code: 'dark' as const, icon: Moon, label: 'Dark' },
                { code: 'system' as const, icon: Monitor, label: 'Auto' },
              ]).map(t => (
                <button
                  key={t.code}
                  onClick={() => setTheme(t.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    settings.theme === t.code
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <t.icon className="h-3 w-3" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Country Toggle */}
      <Card className="mb-2">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-bold">Guidelines</span>
            </div>
            <div className="flex gap-1">
              {([{ code: 'US' as Country, flag: '🇺🇸', label: 'US (AAP)' }, { code: 'CA' as Country, flag: '🇨🇦', label: 'Canada' }]).map(c => (
                <button
                  key={c.code}
                  onClick={() => setCountry(c.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    settings.country === c.code
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {c.flag} {c.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Links */}
      <div className="flex gap-2 mt-3 mb-4">
        <button onClick={() => navigate('/privacy')} className="flex-1 text-xs text-muted-foreground hover:text-foreground text-center py-2 bg-muted/50 rounded-lg">
          <FileText className="h-3 w-3 mx-auto mb-0.5" /> Privacy Policy
        </button>
        <button onClick={() => navigate('/terms')} className="flex-1 text-xs text-muted-foreground hover:text-foreground text-center py-2 bg-muted/50 rounded-lg">
          <FileText className="h-3 w-3 mx-auto mb-0.5" /> Terms of Service
        </button>
      </div>

      <Button
        variant="outline"
        className="w-full mt-2 text-destructive hover:text-destructive"
        onClick={signOut}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
      {showTour && <ProductTour forceShow onClose={() => setShowTour(false)} />}
    </div>
  );
}
