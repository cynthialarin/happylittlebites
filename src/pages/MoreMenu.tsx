import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Brain, Baby, Milestone, Users, Settings, CalendarDays, LogOut, Sparkles, Share2, ListChecks, Globe, ShoppingCart, TrendingUp, Database, FileText } from 'lucide-react';
import { Country } from '@/types';

const getMenuItems = (isCanada: boolean) => [
  { path: '/first-100-foods', icon: ListChecks, label: 'First 100 Foods', desc: 'Guided journey through essential foods', emoji: '🗺️', color: 'bg-sage/10' },
  { path: '/suggestions', icon: Sparkles, label: 'AI Meal Ideas', desc: 'Personalized daily meal suggestions', emoji: '✨', color: 'bg-primary/10' },
  { path: '/meal-planner', icon: CalendarDays, label: 'Meal Planner', desc: 'Plan weekly meals & shopping list', emoji: '📅', color: 'bg-peach/10' },
  { path: '/grocery-list', icon: ShoppingCart, label: 'Grocery List', desc: 'Track ingredients to buy', emoji: '🛒', color: 'bg-sage/20' },
  { path: '/growth', icon: TrendingUp, label: 'Growth Tracker', desc: 'Weight, height & percentiles', emoji: '📏', color: 'bg-sky/10' },
  { path: '/achievements', icon: ShieldCheck, label: 'Achievements', desc: 'Badges, XP & level progress', emoji: '🏆', color: 'bg-primary/10' },
  { path: '/tracker/allergens', icon: ShieldCheck, label: 'Allergen Tracker', desc: isCanada ? 'Top 11 allergen introduction guide' : 'Top 9 allergen introduction guide', emoji: '🛡️', color: 'bg-sky/20' },
  { path: '/more/picky-eater', icon: Brain, label: 'Picky Eater Toolkit', desc: 'Evidence-based strategies', emoji: '🧠', color: 'bg-lavender/20' },
  { path: '/more/safety', icon: ShieldCheck, label: 'Safety Reference', desc: 'Choking, gagging & first aid', emoji: '🚨', color: 'bg-destructive/10' },
  { path: '/more/milestones', icon: Milestone, label: 'Milestones', desc: 'Feeding milestones by age', emoji: '📈', color: 'bg-sage/20' },
  { path: '/caregiver-share', icon: Share2, label: 'Caregiver Share', desc: 'Share food guide with daycare & family', emoji: '📤', color: 'bg-sage/10' },
  { path: '/more/profiles', icon: Users, label: 'Child Profiles', desc: 'Manage your children', emoji: '👶', color: 'bg-peach/20' },
  { path: '/more/data', icon: Database, label: 'Data & Privacy', desc: 'Export data, manage account', emoji: '🔐', color: 'bg-muted' },
];

export default function MoreMenu() {
  const navigate = useNavigate();
  const { activeChild, children: allChildren, settings, setCountry } = useApp();
  const { signOut } = useAuth();

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

      <div className="space-y-2">
        {getMenuItems(settings.country === 'CA').map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
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

      {/* Country Toggle */}
      <Card className="mt-5 mb-2">
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
    </div>
  );
}
