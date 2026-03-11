import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, BookOpen, ClipboardList, Menu, Plus, ChevronDown, Check, LogOut, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import SafetyButton from './SafetyButton';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import ChildAvatar from './ChildAvatar';
import HintTooltip from './HintTooltip';
import { useState } from 'react';

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
  const { activeChild, children, setActiveChild, getChildAge, settings } = useApp();
  const { signOut } = useAuth();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const age = activeChild ? getChildAge(activeChild) : null;

  const genderTheme = activeChild?.gender === 'boy' ? 'theme-boy' : activeChild?.gender === 'girl' ? 'theme-girl' : '';

  const showChildBar = settings.onboardingComplete && activeChild;

  return (
    <div className={cn("min-h-screen bg-background flex flex-col", genderTheme)}>
      {showChildBar && (
        <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <span className="text-sm font-black tracking-tight">🥦 Happy Little Bites</span>
            <Popover open={switcherOpen} onOpenChange={setSwitcherOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2.5 hover:bg-muted/50 rounded-xl px-2 py-1.5 transition-colors">
                  <ChildAvatar
                    photoUrl={activeChild.photoUrl}
                    emoji={activeChild.avatar}
                    name={activeChild.name}
                    size="md"
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold leading-tight">{activeChild.name}</p>
                    <p className="text-[10px] text-muted-foreground">{age?.label}</p>
                  </div>
                  {children.length > 1 && <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                </button>
              </PopoverTrigger>
              {children.length > 1 && (
                <PopoverContent className="w-64 p-2" align="start">
                  <p className="text-xs font-semibold text-muted-foreground px-2 pb-1.5">Switch child</p>
                  {children.map(child => {
                    const childAge = getChildAge(child);
                    const isActive = child.id === activeChild.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => { setActiveChild(child.id); setSwitcherOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors text-left",
                          isActive ? "bg-primary/10" : "hover:bg-muted"
                        )}
                      >
                        <ChildAvatar
                          photoUrl={child.photoUrl}
                          emoji={child.avatar}
                          name={child.name}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{child.name}</p>
                          <p className="text-[10px] text-muted-foreground">{childAge.label}</p>
                        </div>
                        {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full mt-1 gap-1 text-xs rounded-lg"
                    onClick={() => { setSwitcherOpen(false); navigate('/more/profiles'); }}
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Child
                  </Button>
                </PopoverContent>
              )}
            </Popover>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-8 w-8 p-0"
                onClick={() => {
                  const current = settings.theme || 'light';
                  const next = current === 'dark' ? 'light' : 'dark';
                  (useApp as any).__setThemeRef?.(next);
                  // Direct call via context
                  document.dispatchEvent(new CustomEvent('hlb-toggle-theme'));
                }}
                title={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {settings.theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              {children.length <= 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full gap-1 text-xs h-8"
                  onClick={() => navigate('/more/profiles')}
                >
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-muted-foreground h-8 w-8 p-0" onClick={signOut} title="Sign Out">
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

      {/* Floating Log Meal FAB */}
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