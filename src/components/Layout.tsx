import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, BookOpen, ClipboardList, Menu, Plus, LogOut, Moon, Sun, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import SafetyButton from './SafetyButton';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import ChildAvatar from './ChildAvatar';
import HintTooltip from './HintTooltip';
import { useRef } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import logoOption3 from '@/assets/logo-option-3.png';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/foods', icon: UtensilsCrossed, label: 'Foods' },
  { path: '/recipes', icon: BookOpen, label: 'Recipes' },
  { path: '/tracker', icon: ClipboardList, label: 'Tracker' },
  { path: '/more', icon: Menu, label: 'More' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeChild, children, setActiveChild, getChildAge, settings, setTheme } = useApp();
  const { signOut } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  const genderTheme = activeChild?.gender === 'boy' ? 'theme-boy' : activeChild?.gender === 'girl' ? 'theme-girl' : '';
  const showChildBar = settings.onboardingComplete && activeChild;

  return (
    <div className={cn("min-h-screen bg-background flex flex-col", genderTheme)}>
      {showChildBar && (
        <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2">
          <div className="flex items-center justify-between max-w-lg mx-auto gap-2">
            <img src={logoOption3} alt="Happy Little Bites" className="h-6 w-6 object-contain shrink-0" />

            {/* Horizontal scrollable child pills */}
            <div ref={scrollRef} className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5">
                {children.map(child => {
                  const isActive = child.id === activeChild.id;
                  const childAge = getChildAge(child);
                  return (
                    <button
                      key={child.id}
                      onClick={() => setActiveChild(child.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-full transition-all shrink-0",
                        isActive
                          ? "bg-primary/15 ring-2 ring-primary/40"
                          : "bg-muted/40 hover:bg-muted/70"
                      )}
                    >
                      <ChildAvatar
                        photoUrl={child.photoUrl}
                        emoji={child.avatar}
                        name={child.name}
                        size="sm"
                      />
                      <div className="text-left">
                        <p className={cn("text-xs font-bold leading-tight", isActive && "text-primary")}>{child.name}</p>
                        <p className="text-[9px] text-muted-foreground">{childAge.label}</p>
                      </div>
                    </button>
                  );
                })}
                <button
                  onClick={() => navigate('/more/profiles')}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-muted/30 hover:bg-muted/60 transition-colors shrink-0"
                >
                  <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-bold text-muted-foreground">Add</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-8 w-8 p-0"
                onClick={() => setTheme(settings.theme === 'dark' ? 'light' : 'dark')}
              >
                {settings.theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground h-8 w-8 p-0" onClick={signOut}>
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      <SafetyButton />

      {showChildBar && (
        <div className="fixed bottom-20 right-16 z-50">
          <HintTooltip id="fab-log-meal" message="Tap here anytime to quickly log what your baby ate!" emoji="✏️">
            <button
              onClick={() => navigate('/tracker')}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors active:scale-95"
              aria-label="Log a meal"
            >
              <Plus className="h-6 w-6" />
            </button>
          </HintTooltip>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border safe-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto h-16">
          {navItems.map(item => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors min-w-[60px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "animate-bounce-gentle")} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
