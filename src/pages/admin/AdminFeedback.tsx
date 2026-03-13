import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Sparkles, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type Ticket = {
  id: string;
  user_email: string;
  category: string;
  description: string;
  priority: string;
  screenshots: string[];
  wants_response: boolean;
  status: string;
  admin_notes: string;
  created_at: string;
};

type Reply = {
  id: string;
  message: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: 'bg-destructive/20 text-destructive',
  reviewed: 'bg-primary/20 text-primary',
  'in-progress': 'bg-accent/50 text-accent-foreground',
  resolved: 'bg-secondary/50 text-secondary-foreground',
};

const categoryEmoji: Record<string, string> = {
  bug: '🐛', feature: '💡', feedback: '💬', support: '❓',
};

export default function AdminFeedback() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [replyText, setReplyText] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const { data } = await supabase
      .from('feedback_tickets')
      .select('*')
      .order('created_at', { ascending: false });
    setTickets((data as Ticket[]) || []);
    setLoading(false);
  };

  const fetchReplies = async (ticketId: string) => {
    const { data } = await supabase
      .from('feedback_replies')
      .select('id, message, created_at')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });
    setReplies(prev => ({ ...prev, [ticketId]: (data as Reply[]) || [] }));
  };

  const updateStatus = async (ticketId: string, status: string) => {
    await supabase.from('feedback_tickets').update({ status }).eq('id', ticketId);
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
    toast({ title: `Status updated to ${status}` });
  };

  const sendReply = async (ticketId: string) => {
    if (!replyText.trim() || !user) return;
    const { error } = await supabase.from('feedback_replies').insert({
      ticket_id: ticketId,
      admin_id: user.id,
      message: replyText.trim(),
    });
    if (!error) {
      toast({ title: 'Reply sent!' });
      setReplyText('');
      fetchReplies(ticketId);
    }
  };

  const generatePrompt = async (ticket: Ticket) => {
    setGenerating(true);
    setGeneratedPrompt('');
    try {
      const { data, error } = await supabase.functions.invoke('generate-lovable-prompt', {
        body: { category: ticket.category, description: ticket.description },
      });
      if (error) throw error;
      setGeneratedPrompt(data.prompt || 'Failed to generate prompt.');
    } catch {
      toast({ title: 'Failed to generate prompt', variant: 'destructive' });
    } finally {
      setGenerating(false);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({ title: 'Prompt copied to clipboard! 📋' });
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setGeneratedPrompt('');
    } else {
      setExpandedId(id);
      setGeneratedPrompt('');
      fetchReplies(id);
    }
  };

  const filtered = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      <button onClick={() => navigate('/admin')} className="flex items-center gap-1 text-muted-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Admin Dashboard
      </button>

      <h1 className="text-xl font-black mb-4">Feedback Management</h1>

      {/* Filters */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide">
        {['all', 'new', 'reviewed', 'in-progress', 'resolved'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              filter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {s === 'all' ? `All (${tickets.length})` : `${s} (${tickets.filter(t => t.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No tickets found</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(ticket => (
            <Card key={ticket.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpand(ticket.id)}
                  className="w-full p-4 text-left flex items-start justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{categoryEmoji[ticket.category]}</span>
                      <Badge className={`text-[10px] ${statusColors[ticket.status] || ''}`}>{ticket.status}</Badge>
                      {ticket.wants_response && <Badge variant="outline" className="text-[10px]">Wants reply</Badge>}
                    </div>
                    <p className="text-sm font-bold truncate">{ticket.description.slice(0, 80)}{ticket.description.length > 80 ? '...' : ''}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{ticket.user_email} · {new Date(ticket.created_at).toLocaleDateString()}</p>
                  </div>
                  {expandedId === ticket.id ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                </button>

                {expandedId === ticket.id && (
                  <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                    <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>

                    {ticket.screenshots.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {ticket.screenshots.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noreferrer">
                            <img src={url} alt="Screenshot" className="w-20 h-20 object-cover rounded-lg border border-border" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Status update */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">Status:</span>
                      <Select value={ticket.status} onValueChange={v => updateStatus(ticket.id, v)}>
                        <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Replies */}
                    {(replies[ticket.id] || []).map(reply => (
                      <div key={reply.id} className="bg-primary/5 rounded-lg p-3">
                        <p className="text-xs text-primary font-bold mb-1">Admin Reply</p>
                        <p className="text-sm">{reply.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{new Date(reply.created_at).toLocaleString()}</p>
                      </div>
                    ))}

                    {/* Reply form */}
                    <div className="flex gap-2">
                      <Textarea
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder="Reply to user..."
                        className="min-h-[60px] text-sm"
                      />
                      <Button size="sm" onClick={() => sendReply(ticket.id)} disabled={!replyText.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* AI Prompt Generator */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generatePrompt(ticket)}
                      disabled={generating}
                      className="w-full"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {generating ? 'Generating Lovable Prompt...' : 'Generate Lovable Prompt'}
                    </Button>

                    {generatedPrompt && (
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold">Generated Lovable Prompt</p>
                          <Button size="sm" variant="ghost" onClick={copyPrompt}>
                            <Copy className="h-3 w-3 mr-1" /> Copy
                          </Button>
                        </div>
                        <pre className="text-xs whitespace-pre-wrap font-mono">{generatedPrompt}</pre>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
