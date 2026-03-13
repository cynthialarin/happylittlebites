import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Send, Bug, Lightbulb, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import logoOption3 from '@/assets/logo-option-3.png';

const categories = [
  { id: 'bug', label: 'Report a Bug', icon: Bug, color: 'bg-destructive/10 text-destructive border-destructive/30' },
  { id: 'feature', label: 'Request Feature', icon: Lightbulb, color: 'bg-primary/10 text-primary border-primary/30' },
  { id: 'feedback', label: 'General Feedback', icon: MessageCircle, color: 'bg-accent/50 text-accent-foreground border-accent' },
  { id: 'support', label: 'Need Help', icon: HelpCircle, color: 'bg-secondary/50 text-secondary-foreground border-secondary' },
];

const priorities = [
  { id: 'low', label: 'Low', color: 'bg-muted text-muted-foreground' },
  { id: 'medium', label: 'Medium', color: 'bg-primary/20 text-primary' },
  { id: 'high', label: 'High', color: 'bg-destructive/20 text-destructive' },
];

export default function Feedback() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [wantsResponse, setWantsResponse] = useState(false);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (screenshots.length + files.length > 3) {
      toast({ title: 'Maximum 3 screenshots', variant: 'destructive' });
      return;
    }
    setScreenshots(prev => [...prev, ...files].slice(0, 3));
  };

  const handleSubmit = async () => {
    if (!category || !description.trim()) {
      toast({ title: 'Please select a category and add a description', variant: 'destructive' });
      return;
    }
    if (!user) return;

    setSubmitting(true);
    try {
      // Upload screenshots
      const screenshotUrls: string[] = [];
      for (const file of screenshots) {
        const path = `${user.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('feedback-attachments')
          .upload(path, file);
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('feedback-attachments')
            .getPublicUrl(path);
          screenshotUrls.push(urlData.publicUrl);
        }
      }

      const { error } = await supabase.from('feedback_tickets').insert({
        user_id: user.id,
        user_email: user.email || '',
        category,
        description: description.trim(),
        priority: category === 'bug' ? priority : 'medium',
        screenshots: screenshotUrls,
        wants_response: wantsResponse,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: 'Thank you! Your feedback has been submitted 💚' });
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to submit. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="px-4 pt-12 pb-4 max-w-lg mx-auto text-center">
        <img src={logoOption3} alt="Happy Little Bites" className="w-16 h-16 object-contain mx-auto mb-4" />
        <h1 className="text-2xl font-black mb-2">Thank You! 💚</h1>
        <p className="text-muted-foreground mb-6">Your feedback helps us make Happy Little Bites better for every family.</p>
        {wantsResponse && (
          <p className="text-sm text-primary mb-4">We'll get back to you as soon as possible!</p>
        )}
        <Button onClick={() => navigate('/')} className="w-full">Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <img src={logoOption3} alt="Happy Little Bites" className="w-10 h-10 object-contain" />
        <div>
          <h1 className="text-xl font-black">Send Feedback</h1>
          <p className="text-xs text-muted-foreground">Help us improve Happy Little Bites Beta</p>
        </div>
      </div>

      {/* Category */}
      <p className="text-sm font-bold mb-2">What's this about?</p>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              category === cat.id ? cat.color + ' ring-2 ring-primary/40' : 'border-border bg-card hover:bg-muted/50'
            }`}
          >
            <cat.icon className="h-5 w-5 mb-1" />
            <p className="text-xs font-bold">{cat.label}</p>
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm font-bold mb-2">Tell us more</p>
      <Textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder={
          category === 'bug' ? "What happened? What did you expect?" :
          category === 'feature' ? "Describe the feature you'd love to see..." :
          category === 'support' ? "What do you need help with?" :
          "Share your thoughts..."
        }
        className="mb-4 min-h-[120px]"
      />

      {/* Priority (bugs only) */}
      {category === 'bug' && (
        <div className="mb-4">
          <p className="text-sm font-bold mb-2">How urgent is this?</p>
          <div className="flex gap-2">
            {priorities.map(p => (
              <button
                key={p.id}
                onClick={() => setPriority(p.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  priority === p.id ? p.color + ' ring-2 ring-primary/40' : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Screenshots */}
      <div className="mb-4">
        <p className="text-sm font-bold mb-2">Screenshots (optional)</p>
        <div className="flex gap-2 flex-wrap">
          {screenshots.map((file, i) => (
            <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => setScreenshots(prev => prev.filter((_, j) => j !== i))}
                className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >×</button>
            </div>
          ))}
          {screenshots.length < 3 && (
            <label className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
              <Camera className="h-5 w-5 text-muted-foreground" />
              <input type="file" accept="image/*" onChange={handleScreenshot} className="hidden" />
            </label>
          )}
        </div>
      </div>

      {/* Contact preference */}
      <Card className="mb-6">
        <CardContent className="p-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={wantsResponse}
              onChange={e => setWantsResponse(e.target.checked)}
              className="rounded border-border"
            />
            <div>
              <p className="text-sm font-bold">I'd like a response</p>
              <p className="text-xs text-muted-foreground">We'll reply to {user?.email}</p>
            </div>
          </label>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} disabled={submitting || !category || !description.trim()} className="w-full">
        <Send className="h-4 w-4 mr-2" />
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </div>
  );
}
