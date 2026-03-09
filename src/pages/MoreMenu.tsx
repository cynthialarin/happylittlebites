import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Brain, Baby, Milestone, Users, Settings, CalendarDays, LogOut, Sparkles } from 'lucide-react';

const menuItems = [
  { path: '/suggestions', icon: Sparkles, label: 'AI Meal Ideas', desc: 'Personalized daily meal suggestions', emoji: '✨', color: 'bg-primary/10' },
  { path: '/meal-planner', icon: CalendarDays, label: 'Meal Planner', desc: 'Plan weekly meals & shopping list', emoji: '📅', color: 'bg-peach/10' },
  { path: '/achievements', icon: ShieldCheck, label: 'Achievements', desc: 'Badges, XP & level progress', emoji: '🏆', color: 'bg-primary/10' },
  { path: '/tracker/allergens', icon: ShieldCheck, label: 'Allergen Tracker', desc: 'Top 9 allergen introduction guide', emoji: '🛡️', color: 'bg-sky/20' },
  { path: '/more/picky-eater', icon: Brain, label: 'Picky Eater Toolkit', desc: 'Evidence-based strategies', emoji: '🧠', color: 'bg-lavender/20' },
  { path: '/more/safety', icon: ShieldCheck, label: 'Safety Reference', desc: 'Choking, gagging & first aid', emoji: '🚨', color: 'bg-destructive/10' },
  { path: '/more/milestones', icon: Milestone, label: 'Milestones', desc: 'Feeding milestones by age', emoji: '📈', color: 'bg-sage/20' },
  { path: '/more/profiles', icon: Users, label: 'Child Profiles', desc: 'Manage your children', emoji: '👶', color: 'bg-peach/20' },
];

export default function MoreMenu() {
  const navigate = useNavigate();
  const { activeChild, children: allChildren } = useApp();
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
        {menuItems.map(item => (
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

      <Button
        variant="outline"
        className="w-full mt-6 text-destructive hover:text-destructive"
        onClick={signOut}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
