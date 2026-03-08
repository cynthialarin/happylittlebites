import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, BookOpen, ClipboardList, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import SafetyButton from './SafetyButton';

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      <SafetyButton />

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
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[56px]",
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
