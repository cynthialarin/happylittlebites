import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Plus, Check, Trash2 } from 'lucide-react';
import { FeedingApproach } from '@/types';

const AVATARS = ['🐣', '🧸', '🌻', '🐰', '🦊', '🐝', '🍼', '🌈'];

export default function ChildProfiles() {
  const { children, activeChild, setActiveChild, addChild, removeChild, getChildAge } = useApp();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [approach, setApproach] = useState<FeedingApproach>('combo');
  const [avatar, setAvatar] = useState('🐣');

  const handleAdd = () => {
    if (!name.trim() || !birthdate) return;
    addChild({
      id: crypto.randomUUID(),
      name: name.trim(),
      birthdate,
      knownAllergies: [],
      feedingApproach: approach,
      avatar,
    });
    setShowAdd(false);
    setName('');
    setBirthdate('');
  };

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-black">Child Profiles 👶</h1>
        <Button size="sm" className="rounded-full gap-1" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4" /> Add Child
        </Button>
      </div>

      <div className="space-y-2">
        {children.map(child => {
          const age = getChildAge(child);
          const isActive = child.id === activeChild?.id;
          return (
            <Card key={child.id} className={isActive ? 'ring-2 ring-primary' : ''}>
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-3xl">{child.avatar}</span>
                <div className="flex-1">
                  <p className="font-bold">{child.name}</p>
                  <p className="text-xs text-muted-foreground">{age.label} • {child.feedingApproach}</p>
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
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Add Child</DialogTitle>
            <DialogDescription>Add another child's profile</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Avatar</Label>
              <div className="flex gap-2 flex-wrap mt-1">
                {AVATARS.map(a => (
                  <button key={a} onClick={() => setAvatar(a)} className={`text-2xl p-2 rounded-xl ${avatar === a ? 'bg-primary/20 ring-2 ring-primary' : 'bg-muted'}`}>{a}</button>
                ))}
              </div>
            </div>
            <div>
              <Label className="font-semibold">Name</Label>
              <Input placeholder="e.g., Luna" value={name} onChange={e => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="font-semibold">Date of birth</Label>
              <Input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className="mt-1" max={new Date().toISOString().split('T')[0]} />
            </div>
            <Button className="w-full rounded-full" onClick={handleAdd} disabled={!name.trim() || !birthdate}>Add Child</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
