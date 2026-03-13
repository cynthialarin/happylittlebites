import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, BarChart3, Shield, ArrowLeft, Bell, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import logoOption3 from '@/assets/logo-option-3.png';

interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  reference_id: string | null;
  is_read: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, newSignups7d: 0, totalTickets: 0, newTickets: 0 });
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profiles }, { data: tickets }, { data: notifs }] = await Promise.all([
          supabase.rpc('admin_get_all_profiles'),
          supabase.from('feedback_tickets').select('id, status'),
          supabase.from('admin_notifications').select('*').order('created_at', { ascending: false }).limit(20),
        ]);

        const totalUsers = profiles?.length || 0;
        const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
        const newSignups7d = profiles?.filter((p: any) => p.created_at >= sevenDaysAgo).length || 0;
        const totalTickets = tickets?.length || 0;
        const newTickets = tickets?.filter((t: any) => t.status === 'new').length || 0;

        setStats({ totalUsers, newSignups7d, totalTickets, newTickets });
        setNotifications((notifs as AdminNotification[]) || []);
      } catch (err) {
        console.error('Admin stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAsRead = async (id: string) => {
    await supabase.from('admin_notifications').update({ is_read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllRead = async () => {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0) return;
    await supabase.from('admin_notifications').update({ is_read: true }).in('id', unreadIds);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-primary' },
    { label: 'New (7 days)', value: stats.newSignups7d, icon: Users, color: 'text-accent-foreground' },
    { label: 'Total Tickets', value: stats.totalTickets, icon: MessageSquare, color: 'text-primary' },
    { label: 'New Tickets', value: stats.newTickets, icon: MessageSquare, color: 'text-destructive' },
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

      {/* Notifications */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-foreground/70" />
            <h2 className="text-sm font-bold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary font-medium hover:underline">
              Mark all read
            </button>
          )}
        </div>
        {notifications.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No notifications yet</p>
        ) : (
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {notifications.slice(0, 10).map(n => (
              <div
                key={n.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2 ${
                  n.is_read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20'
                }`}
                onClick={() => {
                  if (!n.is_read) markAsRead(n.id);
                  if (n.reference_id) navigate('/admin/feedback');
                }}
              >
                <MessageSquare className={`h-4 w-4 mt-0.5 shrink-0 ${n.is_read ? 'text-muted-foreground' : 'text-primary'}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-bold ${n.is_read ? 'text-muted-foreground' : ''}`}>{n.title}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(n.created_at).toLocaleDateString()} {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!n.is_read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
              </div>
            ))}
          </div>
        )}
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
