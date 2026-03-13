import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

type UserStat = {
  user_id: string;
  email: string;
  created_at: string;
  children_count: number;
  diary_entries_count: number;
  feedback_count: number;
  trial_start_date: string | null;
};

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: stats } = await supabase.rpc('admin_get_user_stats');
        const { data: emails } = await supabase.rpc('admin_get_user_emails');
        const { data: profiles } = await supabase.rpc('admin_get_all_profiles');

        const emailMap = new Map((emails || []).map((e: any) => [e.id, e]));
        const profileMap = new Map((profiles || []).map((p: any) => [p.user_id, p]));

        const merged: UserStat[] = (stats || []).map((s: any) => {
          const emailInfo = emailMap.get(s.user_id) as any;
          const profile = profileMap.get(s.user_id) as any;
          return {
            user_id: s.user_id,
            email: emailInfo?.email || 'Unknown',
            created_at: emailInfo?.created_at || '',
            children_count: Number(s.children_count),
            diary_entries_count: Number(s.diary_entries_count),
            feedback_count: Number(s.feedback_count),
            trial_start_date: profile?.trial_start_date || null,
          };
        });

        setUsers(merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      <button onClick={() => navigate('/admin')} className="flex items-center gap-1 text-muted-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Admin Dashboard
      </button>

      <h1 className="text-xl font-black mb-1">User Management</h1>
      <p className="text-xs text-muted-foreground mb-4">{users.length} total users</p>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Loading...</p>
      ) : (
        <div className="space-y-2">
          {users.map(u => (
            <Card key={u.user_id}>
              <CardContent className="p-3">
                <p className="text-sm font-bold truncate">{u.email}</p>
                <p className="text-[10px] text-muted-foreground mb-2">
                  Joined {new Date(u.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px]">👶 {u.children_count} children</Badge>
                  <Badge variant="outline" className="text-[10px]">📝 {u.diary_entries_count} entries</Badge>
                  <Badge variant="outline" className="text-[10px]">💬 {u.feedback_count} tickets</Badge>
                  {u.trial_start_date && (
                    <Badge className="text-[10px] bg-primary/20 text-primary">Trial active</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
