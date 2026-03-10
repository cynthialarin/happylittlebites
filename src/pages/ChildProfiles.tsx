import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Plus, Check, Trash2, Users, Pencil } from 'lucide-react';
import { FeedingApproach, Gender, TOP_9_ALLERGENS, ChildProfile } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import ChildAvatar from '@/components/ChildAvatar';

const AVATARS = ['🐣', '🧸', '🌻', '🐰', '🦊', '🐝', '🍼', '🌈'];
const APPROACH_OPTIONS: { value: FeedingApproach; label: string; emoji: string }[] = [
  { value: 'blw', label: 'Baby-Led', emoji: '🥦' },
  { value: 'purees', label: 'Purées', emoji: '🥣' },
  { value: 'combo', label: 'Combo', emoji: '🍽️' },
];

const GENDER_OPTIONS: { value: Gender; label: string; emoji: string }[] = [
  { value: 'boy', label: 'Boy', emoji: '👦' },
  { value: 'girl', label: 'Girl', emoji: '👧' },
  { value: 'neutral', label: 'Neutral', emoji: '🌟' },
];

const GENDER_LABEL: Record<Gender, string> = {
  boy: '👦 Boy',
  girl: '👧 Girl',
  neutral: '🌟',
};

interface ChildForm {
  name: string;
  birthdate: string;
  approach: FeedingApproach;
  avatar: string;
  gender: Gender;
}

const emptyForm = (): ChildForm => ({
  name: '',
  birthdate: '',
  approach: 'combo',
  avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
  gender: 'neutral',
});

export default function ChildProfiles() {
  const { children, activeChild, setActiveChild, addChild, removeChild, updateChild, getChildAge } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [forms, setForms] = useState<ChildForm[]>([emptyForm()]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [editChild, setEditChild] = useState<ChildProfile | null>(null);
  const [editForm, setEditForm] = useState<ChildForm & { knownAllergies: string[] }>({ ...emptyForm(), knownAllergies: [] });

  const updateForm = (index: number, updates: Partial<ChildForm>) => {
    setForms(prev => prev.map((f, i) => i === index ? { ...f, ...updates } : f));
  };

  const handleAdd = () => {
    forms.forEach(form => {
      if (!form.name.trim() || !form.birthdate) return;
      addChild({
        id: crypto.randomUUID(),
        name: form.name.trim(),
        birthdate: form.birthdate,
        knownAllergies: [],
        feedingApproach: form.approach,
        avatar: form.avatar,
        gender: form.gender,
      });
    });
    setShowAdd(false);
    setForms([emptyForm()]);
  };

  const openMultiAdd = (count: number) => {
    setForms(Array.from({ length: count }, emptyForm));
    setShowAdd(true);
  };

  const handlePhotoUpload = async (childId: string, file: File) => {
    if (!user) return;
    setUploading(childId);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${user.id}/${childId}.${ext}`;
      const { error } = await supabase.storage
        .from('child-photos')
        .upload(path, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('child-photos').getPublicUrl(path);
      const photoUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      const child = children.find(c => c.id === childId);
      if (child) {
        updateChild({ ...child, photoUrl });
      }
      toast('📸 Photo updated!');
    } catch (e) {
      console.error('Photo upload failed:', e);
      toast('Failed to upload photo');
    }
    setUploading(null);
  };

  const openEdit = (child: ChildProfile) => {
    setEditChild(child);
    setEditForm({
      name: child.name,
      birthdate: child.birthdate,
      approach: child.feedingApproach,
      avatar: child.avatar,
      gender: child.gender,
      knownAllergies: child.knownAllergies || [],
    });
  };

  const handleSaveEdit = () => {
    if (!editChild || !editForm.name.trim() || !editForm.birthdate) return;
    updateChild({
      ...editChild,
      name: editForm.name.trim(),
      birthdate: editForm.birthdate,
      feedingApproach: editForm.approach,
      avatar: editForm.avatar,
      gender: editForm.gender,
      knownAllergies: editForm.knownAllergies,
    });
    toast('✅ Profile updated!');
    setEditChild(null);
  };

  const allFormsValid = forms.every(f => f.name.trim() && f.birthdate);
  const editFormValid = editForm.name.trim() && editForm.birthdate;

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-black">Child Profiles 👶</h1>
        <Button size="sm" className="rounded-full gap-1" onClick={() => { setForms([emptyForm()]); setShowAdd(true); }}>
          <Plus className="h-4 w-4" /> Add Child
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button size="sm" variant="outline" className="rounded-full gap-1 text-xs" onClick={() => openMultiAdd(2)}>
          <Users className="h-3.5 w-3.5" /> Add Twins
        </Button>
        <Button size="sm" variant="outline" className="rounded-full gap-1 text-xs" onClick={() => openMultiAdd(3)}>
          <Users className="h-3.5 w-3.5" /> Add Triplets
        </Button>
      </div>

      <div className="space-y-2">
        {children.map(child => {
          const age = getChildAge(child);
          const isActive = child.id === activeChild?.id;
          return (
            <Card key={child.id} className={isActive ? 'ring-2 ring-primary' : ''}>
              <CardContent className="p-4 flex items-center gap-3">
                <ChildAvatar
                  photoUrl={child.photoUrl}
                  emoji={child.avatar}
                  name={child.name}
                  size="lg"
                  editable
                  onPhotoSelect={(file) => handlePhotoUpload(child.id, file)}
                />
                <div className="flex-1">
                  <p className="font-bold">{child.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {age.label} • {child.feedingApproach} {child.gender !== 'neutral' ? `• ${GENDER_LABEL[child.gender]}` : ''}
                  </p>
                  {uploading === child.id && (
                    <p className="text-[10px] text-primary font-semibold mt-0.5">Uploading photo…</p>
                  )}
                </div>
                <div className="flex gap-1">
                  {!isActive && (
                    <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => setActiveChild(child.id)}>
                      <Check className="h-3 w-3 mr-1" /> Set Active
                    </Button>
                  )}
                  {isActive && <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">Active</span>}
                  {children.length > 1 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete {child.name}'s profile?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove {child.name}'s profile and all associated data. This can't be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeChild(child.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md mx-4 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add {forms.length > 1 ? `${forms.length} Children` : 'Child'}</DialogTitle>
            <DialogDescription>
              {forms.length > 1 ? `Add ${forms.length} children at once` : "Add another child's profile"}
            </DialogDescription>
          </DialogHeader>

          {forms.map((form, idx) => (
            <div key={idx} className="space-y-4 border-b border-border pb-4 last:border-0 last:pb-0">
              {forms.length > 1 && (
                <p className="text-sm font-bold text-primary">Child {idx + 1}</p>
              )}

              <div>
                <Label className="font-semibold">Avatar</Label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {AVATARS.map(a => (
                    <button key={a} onClick={() => updateForm(idx, { avatar: a })} className={`text-2xl p-2 rounded-xl ${form.avatar === a ? 'bg-primary/20 ring-2 ring-primary' : 'bg-muted'}`}>{a}</button>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">You can upload a real photo after adding the profile</p>
              </div>

              <div>
                <Label className="font-semibold">Name</Label>
                <Input placeholder="e.g., Luna" value={form.name} onChange={e => updateForm(idx, { name: e.target.value })} className="mt-1" />
              </div>

              <div>
                <Label className="font-semibold">Date of birth</Label>
                <Input type="date" value={form.birthdate} onChange={e => updateForm(idx, { birthdate: e.target.value })} className="mt-1" max={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <Label className="font-semibold">Gender</Label>
                <div className="flex gap-2 mt-1">
                  {GENDER_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateForm(idx, { gender: opt.value })}
                      className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${form.gender === opt.value ? 'border-primary bg-primary/15 ring-2 ring-primary/30' : 'border-border hover:border-primary/40'}`}
                    >
                      <div className="text-lg">{opt.emoji}</div>
                      <div className="text-xs font-bold mt-0.5">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Button className="w-full rounded-full" onClick={handleAdd} disabled={!allFormsValid}>
            {forms.length > 1 ? `Add ${forms.length} Children` : 'Add Child'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}