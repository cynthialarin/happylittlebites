import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, Plus, Send, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const TOPICS = [
  { id: 'general', label: 'General', emoji: '💬' },
  { id: 'blw', label: 'BLW', emoji: '🥑' },
  { id: 'allergies', label: 'Allergies', emoji: '🛡️' },
  { id: 'picky-eaters', label: 'Picky Eaters', emoji: '🤔' },
  { id: 'recipes', label: 'Recipes', emoji: '👩‍🍳' },
  { id: 'milestones', label: 'Milestones', emoji: '🎉' },
];

interface Post {
  id: string;
  user_id: string;
  display_name: string;
  topic: string;
  title: string;
  body: string;
  likes: number;
  reply_count: number;
  created_at: string;
}

interface Reply {
  id: string;
  post_id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
}

export default function Community() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newTopic, setNewTopic] = useState('general');
  const [replyText, setReplyText] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['community_posts', selectedTopic],
    queryFn: async () => {
      let query = supabase
        .from('community_posts' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (selectedTopic) {
        query = query.eq('topic', selectedTopic);
      }
      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as Post[];
    },
  });

  const { data: replies = [] } = useQuery({
    queryKey: ['community_replies', expandedPost],
    queryFn: async () => {
      if (!expandedPost) return [];
      const { data, error } = await supabase
        .from('community_replies' as any)
        .select('*')
        .eq('post_id', expandedPost)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as Reply[];
    },
    enabled: !!expandedPost,
  });

  const createPost = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase.from('community_posts' as any).insert({
        user_id: user.id,
        display_name: user.email?.split('@')[0] || 'Parent',
        topic: newTopic,
        title: newTitle.trim(),
        body: newBody.trim(),
        likes: 0,
        reply_count: 0,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['community_posts'] });
      setShowCompose(false);
      setNewTitle('');
      setNewBody('');
      toast.success('Post shared!');
    },
    onError: () => toast.error('Failed to post'),
  });

  const createReply = useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase.from('community_replies' as any).insert({
        post_id: postId,
        user_id: user.id,
        display_name: user.email?.split('@')[0] || 'Parent',
        body: replyText.trim(),
      } as any);
      if (error) throw error;
      // Increment reply count
      await supabase.rpc('increment_reply_count' as any, { post_id: postId } as any);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['community_replies'] });
      qc.invalidateQueries({ queryKey: ['community_posts'] });
      setReplyText('');
      toast.success('Reply added!');
    },
    onError: () => toast.error('Failed to reply'),
  });

  const likePost = useMutation({
    mutationFn: async (postId: string) => {
      await supabase.rpc('increment_post_likes' as any, { post_id: postId } as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['community_posts'] }),
  });

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-black">Parent Community</h1>
            <p className="text-xs text-muted-foreground">Share tips & get support</p>
          </div>
        </div>
        <Button size="sm" className="rounded-full" onClick={() => setShowCompose(true)}>
          <Plus className="h-4 w-4 mr-1" /> Post
        </Button>
      </div>

      {/* Topic Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedTopic(null)}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            !selectedTopic ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}
        >
          All
        </button>
        {TOPICS.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTopic(t.id === selectedTopic ? null : t.id)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopic === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <Card className="border-primary/30">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">New Post</h3>
              <button onClick={() => setShowCompose(false)} className="p-1 rounded hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {TOPICS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setNewTopic(t.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    newTopic === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
            <Input
              placeholder="Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="text-sm"
            />
            <Textarea
              placeholder="Share your experience, ask a question..."
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              rows={3}
              className="text-sm"
            />
            <Button
              onClick={() => createPost.mutate()}
              disabled={!newTitle.trim() || !newBody.trim() || createPost.isPending}
              className="rounded-full w-full"
            >
              Share Post
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Posts */}
      {isLoading && <p className="text-center text-sm text-muted-foreground py-8">Loading…</p>}

      {!isLoading && posts.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="font-bold">No posts yet</p>
            <p className="text-sm text-muted-foreground mt-1">Be the first to share!</p>
          </CardContent>
        </Card>
      )}

      {posts.map(post => {
        const isExpanded = expandedPost === post.id;
        const topicInfo = TOPICS.find(t => t.id === post.topic);
        return (
          <Card key={post.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {post.display_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold">{post.display_name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  {topicInfo && (
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 mb-1">
                      {topicInfo.emoji} {topicInfo.label}
                    </Badge>
                  )}
                  <h3 className="text-sm font-bold mb-1">{post.title}</h3>
                  <p className="text-xs text-muted-foreground">{post.body}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => likePost.mutate(post.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Heart className="h-3.5 w-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{post.reply_count} replies</span>
                    </button>
                  </div>

                  {/* Replies */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      {replies.map(reply => (
                        <div key={reply.id} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold shrink-0">
                            {reply.display_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold">{reply.display_name}</span>
                              <span className="text-[9px] text-muted-foreground">
                                {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{reply.body}</p>
                          </div>
                        </div>
                      ))}
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          if (replyText.trim()) createReply.mutate(post.id);
                        }}
                        className="flex gap-2 mt-2"
                      >
                        <Input
                          placeholder="Add a reply…"
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          className="flex-1 h-8 text-xs"
                        />
                        <Button type="submit" size="icon" className="h-8 w-8 shrink-0" disabled={!replyText.trim()}>
                          <Send className="h-3 w-3" />
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
