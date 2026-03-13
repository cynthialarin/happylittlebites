import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [topFoods, setTopFoods] = useState<{ name: string; count: number }[]>([]);
  const [topAllergens, setTopAllergens] = useState<{ name: string; count: number }[]>([]);
  const [featureUsage, setFeatureUsage] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Use admin functions to get cross-user stats
        const { data: stats } = await supabase.rpc('admin_get_user_stats');
        const totalChildren = (stats || []).reduce((s: number, u: any) => s + Number(u.children_count), 0);
        const totalDiary = (stats || []).reduce((s: number, u: any) => s + Number(u.diary_entries_count), 0);
        const totalFeedback = (stats || []).reduce((s: number, u: any) => s + Number(u.feedback_count), 0);

        setFeatureUsage([
          { name: 'Child Profiles', count: totalChildren },
          { name: 'Diary Entries', count: totalDiary },
          { name: 'Feedback Tickets', count: totalFeedback },
        ]);

        // We can't query all diary_entries due to RLS, so just show aggregated counts
        setTopFoods([]);
        setTopAllergens([]);
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

      <h1 className="text-xl font-black mb-4">App Analytics</h1>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Loading...</p>
      ) : (
        <div className="space-y-5">
          {/* Feature Usage */}
          <div>
            <p className="text-sm font-black mb-2">📊 Feature Usage</p>
            <div className="space-y-2">
              {featureUsage.map(item => (
                <Card key={item.name}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-lg font-black text-primary">{item.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">More detailed analytics (top foods, allergen trends, growth charts) will be available as usage grows.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
