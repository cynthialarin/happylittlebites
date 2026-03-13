import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Clock, CheckCircle2, Eye, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import logoOption3 from '@/assets/logo-option-3.png';

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  new: { label: 'Submitted', color: 'bg-muted text-muted-foreground', icon: Clock },
  reviewed: { label: 'Reviewed', color: 'bg-primary/15 text-primary', icon: Eye },
  'in-progress': { label: 'In Progress', color: 'bg-accent/20 text-accent-foreground', icon: AlertCircle },
  resolved: { label: 'Resolved', color: 'bg-sage/20 text-foreground', icon: CheckCircle2 },
};

const categoryEmoji: Record<string, string> = {
  bug: '🐛',
  feature: '💡',
  feedback: '💬',
  support: '❓',
};

interface Reply {
  id: string;
  message: string;
  created_at: string;
}

interface Ticket {
  id: string;
  category: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  wants_response: boolean;
  screenshots: string[];
}

export default function MyFeedback() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: ticketData } = await supabase
        .from('feedback_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const t = (ticketData || []) as Ticket[];
      setTickets(t);

      if (t.length > 0) {
        const { data: replyData } = await supabase
          .from('feedback_replies')
          .select('*')
          .in('ticket_id', t.map(tk => tk.id))
          .order('created_at', { ascending: true });

        const grouped: Record<string, Reply[]> = {};
        (replyData || []).forEach((r: any) => {
          if (!grouped[r.ticket_id]) grouped[r.ticket_id] = [];
          grouped[r.ticket_id].push(r);
        });
        setReplies(grouped);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <img src={logoOption3} alt="Happy Little Bites" className="w-10 h-10 object-contain" />
        <div>
          <h1 className="text-xl font-black">My Feedback</h1>
          <p className="text-xs text-muted-foreground">Track your submitted tickets & replies</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No feedback submitted yet</p>
          <Button onClick={() => navigate('/feedback')} size="sm">Send Feedback</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map(ticket => {
            const status = statusConfig[ticket.status] || statusConfig.new;
            const StatusIcon = status.icon;
            const ticketReplies = replies[ticket.id] || [];
            const isExpanded = expandedId === ticket.id;

            return (
              <Card
                key={ticket.id}
                className="cursor-pointer hover:ring-2 ring-primary/20 transition-all"
                onClick={() => setExpandedId(isExpanded ? null : ticket.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoryEmoji[ticket.category] || '💬'}</span>
                      <span className="text-xs font-bold capitalize">{ticket.category}</span>
                    </div>
                    <Badge className={`${status.color} text-[10px] gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>

                  <p className="text-sm text-foreground line-clamp-2 mb-2">{ticket.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </span>
                    {ticketReplies.length > 0 && (
                      <span className="text-[10px] font-bold text-primary">
                        {ticketReplies.length} repl{ticketReplies.length === 1 ? 'y' : 'ies'}
                      </span>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      {ticket.screenshots.length > 0 && (
                        <div className="flex gap-2 mb-2">
                          {ticket.screenshots.map((url, i) => (
                            <img key={i} src={url} alt="" className="w-16 h-16 rounded-lg object-cover border border-border" />
                          ))}
                        </div>
                      )}

                      {ticketReplies.length > 0 ? (
                        ticketReplies.map(reply => (
                          <div key={reply.id} className="bg-primary/5 rounded-lg p-3">
                            <p className="text-[10px] font-bold text-primary mb-1">Admin Reply</p>
                            <p className="text-sm">{reply.message}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              {new Date(reply.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground italic">No replies yet</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
