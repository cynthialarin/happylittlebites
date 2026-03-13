import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, BarChart3, Shield, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import logoOption3 from '@/assets/logo-option-3.png';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, newSignups7d: 0, totalTickets: 0, newTickets: 0 });
  const [newSinceLastVisit, setNewSinceLastVisit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get all profiles via admin function
        const { data: profiles } = await supabase.rpc('admin_get_all_profiles');
        const totalUsers = profiles?.length || 0;

        const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
        const newSignups7d = profiles?.filter((p: any) => p.created_at >= sevenDaysAgo).length || 0;

        // Get feedback tickets
        const { data: tickets } = await supabase.from('feedback_tickets').select('id, status');
        const totalTickets = tickets?.length || 0;
        const newTickets = tickets?.filter((t: any) => t.status === 'new').length || 0;

        // New since last visit
        const lastVisit = localStorage.getItem('admin_last_visit');
        const newSince = lastVisit
          ? tickets?.filter((t: any) => t.created_at > lastVisit).length || 0
          : totalTickets;
        setNewSinceLastVisit(newSince);
        localStorage.setItem('admin_last_visit', new Date().toISOString());

        setStats({ totalUsers, newSignups7d, totalTickets, newTickets });
      } catch (err) {
        console.error('Admin stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-primary' },
    { label: 'New (7 days)', value: stats.newSignups7d, icon: Users, color: 'text-accent-foreground' },
    { label: 'Total Tickets', value: stats.totalTickets, icon: MessageSquare, color: 'text-primary' },
    { label: 'New Tickets', value: stats.newTickets, icon: MessageSquare, color: 'text-destructive' },
    ...(newSinceLastVisit > 0 ? [{ label: 'Since Last Visit', value: newSinceLastVisit, icon: MessageSquare, color: 'text-primary' }] : []),
  ];

  const navItems = [
    { path: '/admin/feedback', label: 'Feedback Management', desc: 'View & respond to user feedback', icon: MessageSquare, color: 'bg-primary/10' },
    { path: '/admin/users', label: 'User Management', desc: 'View all users & activity', icon: Users, color: 'bg-secondary/30' },
    { path: '/admin/analytics', label: 'App Analytics', desc: 'Usage data & trends', icon: BarChart3, color: 'bg-accent/30' },
  ];

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center gap-1 text-muted-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to App
      </button>

      <div className="flex items-center gap-3 mb-6">
        <img src={logoOption3} alt="Admin" className="w-10 h-10 object-contain" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black">Admin Dashboard</h1>
            <span className="text-[10px] font-black bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
              <Shield className="h-3 w-3 inline mr-0.5" />ADMIN
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Happy Little Bites Beta</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {cards.map(card => (
          <Card key={card.label}>
            <CardContent className="p-4">
              <card.icon className={`h-5 w-5 ${card.color} mb-1`} />
              <p className="text-2xl font-black">{loading ? '...' : card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nav */}
      <div className="space-y-2">
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full p-4 rounded-xl ${item.color} text-left hover:ring-2 ring-primary/30 transition-all flex items-center gap-3`}
          >
            <item.icon className="h-6 w-6 text-foreground/70" />
            <div>
              <p className="font-bold text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
