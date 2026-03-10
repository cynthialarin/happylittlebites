import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, Copy, Check, AlertTriangle, ShieldCheck, UtensilsCrossed, Calendar, Send, Mail, Baby } from 'lucide-react';
import { foods } from '@/data/foods';
import { recipes } from '@/data/recipes';
import { TOP_9_ALLERGENS, CA_EXTRA_ALLERGENS } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function CaregiverShare() {
  const { activeChild, diary, allergenRecords, mealPlan, getChildAge, settings } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [sendingInvite, setSendingInvite] = useState(false);
  const [feedingEntries, setFeedingEntries] = useState<any[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const age = activeChild ? getChildAge(activeChild) : null;
  const today = new Date().toISOString().split('T')[0];

  // Load today's feeding entries
  useEffect(() => {
    if (!user || !activeChild) return;
    supabase
      .from('feeding_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .eq('date', today)
      .order('time', { ascending: true })
      .then(({ data }) => setFeedingEntries(data || []));
  }, [user, activeChild, today]);

  const childData = useMemo(() => {
    if (!activeChild) return null;

    const childDiary = diary.filter(d => d.childId === activeChild.id);
    const triedFoodIds = new Set(childDiary.map(d => d.foodId));
    const lovedFoods = childDiary.filter(d => d.acceptance === 'loved').map(d => d.foodName);
    const refusedFoods = childDiary.filter(d => d.acceptance === 'refused').map(d => d.foodName);
    const uniqueLovedFoods = [...new Set(lovedFoods)];
    const uniqueRefusedFoods = [...new Set(refusedFoods)];

    // Safe foods = tried without reactions
    const foodsWithReactions = new Set(
      childDiary.filter(d => d.reactionSeverity !== 'none' && d.reactionSeverity).map(d => d.foodId)
    );
    const safeFoods = [...triedFoodIds]
      .filter(id => !foodsWithReactions.has(id))
      .map(id => {
        const food = foods.find(f => f.id === id);
        return food ? food.name : null;
      })
      .filter(Boolean) as string[];

    // Allergies & reactions
    const childAllergens = allergenRecords.filter(a => a.childId === activeChild.id);
    const confirmedAllergies = activeChild.knownAllergies || [];
    const introducedAllergens = childAllergens.map(a => ({
      name: a.allergen,
      severity: a.reactionSeverity,
      symptoms: a.symptoms,
    }));

    // Choking hazards for age
    const chokingFoods = foods.filter(f => f.chokingHazard && triedFoodIds.has(f.id));

    // Today's meal plan
    const todayMeals = mealPlan
      .filter(m => m.childId === activeChild.id && m.date === today)
      .map(m => {
        const recipe = m.recipeId ? recipes.find(r => r.id === m.recipeId) : null;
        return {
          mealType: m.mealType,
          name: recipe ? recipe.title : m.customMeal || 'Not planned',
        };
      });

    return {
      safeFoods,
      uniqueLovedFoods,
      uniqueRefusedFoods,
      confirmedAllergies,
      introducedAllergens,
      chokingFoods,
      todayMeals,
    };
  }, [activeChild, diary, allergenRecords, mealPlan, today]);

  const generateTextSummary = () => {
    if (!activeChild || !childData || !age) return '';

    const lines = [
      `🍽️ CAREGIVER GUIDE FOR ${activeChild.name.toUpperCase()}`,
      `${activeChild.avatar} ${age.label}`,
      `Guidelines: ${settings.country === 'CA' ? '🇨🇦 Health Canada' : '🇺🇸 AAP/CDC'}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      '⚠️ ALLERGIES & RESTRICTIONS',
      childData.confirmedAllergies.length > 0
        ? childData.confirmedAllergies.map(a => `  🚫 ${a}`).join('\n')
        : '  No known allergies',
      '',
    ];

    if (childData.introducedAllergens.some(a => a.severity !== 'none')) {
      lines.push('⚡ REACTIONS NOTED');
      childData.introducedAllergens
        .filter(a => a.severity !== 'none')
        .forEach(a => {
          lines.push(`  • ${a.name}: ${a.severity} — ${a.symptoms.join(', ')}`);
        });
      lines.push('');
    }

    lines.push('✅ SAFE FOODS (tried without reaction)');
    if (childData.safeFoods.length > 0) {
      for (let i = 0; i < childData.safeFoods.length; i += 4) {
        lines.push('  ' + childData.safeFoods.slice(i, i + 4).join(', '));
      }
    } else {
      lines.push('  No foods logged yet');
    }
    lines.push('');

    if (childData.uniqueLovedFoods.length > 0) {
      lines.push('💚 LOVES');
      lines.push('  ' + childData.uniqueLovedFoods.slice(0, 10).join(', '));
      lines.push('');
    }

    if (childData.uniqueRefusedFoods.length > 0) {
      lines.push('🚫 OFTEN REFUSES');
      lines.push('  ' + childData.uniqueRefusedFoods.slice(0, 10).join(', '));
      lines.push('');
    }

    if (childData.chokingFoods.length > 0) {
      lines.push('⚠️ CHOKING HAZARD REMINDERS');
      childData.chokingFoods.forEach(f => {
        lines.push(`  • ${f.name}: ${f.chokingNotes}`);
      });
      lines.push('');
    }

    if (childData.todayMeals.length > 0) {
      lines.push(`📅 TODAY'S MEAL PLAN (${today})`);
      childData.todayMeals.forEach(m => {
        lines.push(`  ${m.mealType.charAt(0).toUpperCase() + m.mealType.slice(1)}: ${m.name}`);
      });
      lines.push('');
    }

    if (feedingEntries.length > 0) {
      lines.push(`🍼 TODAY'S FEEDING LOG (${today})`);
      feedingEntries.forEach((f: any) => {
        const typeLabel = f.feeding_type === 'breast' ? 'Breast' : f.feeding_type === 'bottle-breastmilk' ? 'Bottle (BM)' : 'Bottle (Formula)';
        const details = [f.time, f.amount_oz ? `${f.amount_oz}oz` : null, f.duration_minutes ? `${f.duration_minutes}min` : null, f.side].filter(Boolean).join(', ');
        lines.push(`  ${typeLabel}: ${details}`);
      });
      lines.push('');
    }

    lines.push('—');
    lines.push('Generated by Happy Little Bites 🥦');

    return lines.join('\n');
  };

  const handleCopyToClipboard = async () => {
    const text = generateTextSummary();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: '📋 Copied!', description: 'Caregiver guide copied to clipboard. Paste it in a message to share.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Could not copy', description: 'Please try again', variant: 'destructive' });
    }
  };

  const handleDownloadText = () => {
    const text = generateTextSummary();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeChild?.name || 'child'}-caregiver-guide.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: '📥 Downloaded!', description: 'Caregiver guide saved as a text file.' });
  };

  if (!activeChild || !childData || !age) {
    return (
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
        <p className="text-muted-foreground text-center mt-20">Add a child profile first</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-black">Caregiver Share</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-4 bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <span className="text-4xl">{activeChild.avatar}</span>
            <h2 className="text-lg font-black mt-1">{activeChild.name}</h2>
            <p className="text-sm text-muted-foreground">{age.label}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Share this guide with daycare, grandparents, or babysitters
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div ref={contentRef} className="space-y-3 mb-6">
        {/* Allergies */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-destructive/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-bold text-destructive">Allergies & Restrictions</span>
              </div>
              {childData.confirmedAllergies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {childData.confirmedAllergies.map(a => (
                    <span key={a} className="px-2 py-1 text-xs font-bold bg-destructive/10 text-destructive rounded-full">
                      🚫 {a}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No known allergies recorded</p>
              )}
              {childData.introducedAllergens.filter(a => a.severity !== 'none').length > 0 && (
                <div className="mt-3 border-t border-border pt-2">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Reactions noted:</p>
                  {childData.introducedAllergens
                    .filter(a => a.severity !== 'none')
                    .map((a, i) => (
                      <p key={i} className="text-xs text-muted-foreground">
                        • <span className="font-semibold">{a.name}</span>: {a.severity} — {a.symptoms.join(', ')}
                      </p>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Safe Foods */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold">Safe Foods</span>
                <span className="text-xs text-muted-foreground ml-auto">{childData.safeFoods.length} foods</span>
              </div>
              {childData.safeFoods.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {childData.safeFoods.slice(0, 30).map(f => (
                    <span key={f} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-medium">
                      {f}
                    </span>
                  ))}
                  {childData.safeFoods.length > 30 && (
                    <span className="px-2 py-0.5 text-xs text-muted-foreground">+{childData.safeFoods.length - 30} more</span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No foods logged yet</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Loves & Refuses */}
        {(childData.uniqueLovedFoods.length > 0 || childData.uniqueRefusedFoods.length > 0) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <UtensilsCrossed className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold">Preferences</span>
                </div>
                {childData.uniqueLovedFoods.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">💚 Loves</p>
                    <div className="flex flex-wrap gap-1">
                      {childData.uniqueLovedFoods.slice(0, 10).map(f => (
                        <span key={f} className="px-2 py-0.5 text-xs bg-accent/20 rounded-full font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
                {childData.uniqueRefusedFoods.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">🚫 Often refuses</p>
                    <div className="flex flex-wrap gap-1">
                      {childData.uniqueRefusedFoods.slice(0, 10).map(f => (
                        <span key={f} className="px-2 py-0.5 text-xs bg-muted rounded-full font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Today's Meal Plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold">Today's Meal Plan</span>
              </div>
              {childData.todayMeals.length > 0 ? (
                <div className="space-y-1.5">
                  {childData.todayMeals.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="font-semibold capitalize text-xs w-16">{m.mealType}</span>
                      <span className="text-xs text-muted-foreground">{m.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No meals planned for today. Use the Meal Planner to add them!</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Feeding Log */}
        {feedingEntries.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Baby className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold">Today's Feeding Log</span>
                </div>
                <div className="space-y-1.5">
                  {feedingEntries.map((f: any, i: number) => {
                    const typeLabel = f.feeding_type === 'breast' ? '🤱 Breast' : f.feeding_type === 'bottle-breastmilk' ? '🍼 Bottle (BM)' : '🍼 Bottle (Formula)';
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="font-semibold w-10">{f.time}</span>
                        <span>{typeLabel}</span>
                        {f.amount_oz && <span className="text-muted-foreground">{f.amount_oz}oz</span>}
                        {f.duration_minutes && <span className="text-muted-foreground">{f.duration_minutes}min</span>}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Choking Hazards */}
        {childData.chokingFoods.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="border-accent/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  <span className="text-sm font-bold">Choking Hazard Reminders</span>
                </div>
                <div className="space-y-1">
                  {childData.chokingFoods.slice(0, 8).map(f => (
                    <p key={f.id} className="text-xs text-muted-foreground">
                      <span className="font-semibold">{f.name}:</span> {f.chokingNotes}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Invite Caregiver */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">Invite a Caregiver</span>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-semibold">Email address</Label>
                <Input
                  type="email"
                  placeholder="grandma@email.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Message (optional)</Label>
                <Input
                  placeholder="Here's the food guide for..."
                  value={inviteMessage}
                  onChange={e => setInviteMessage(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                onClick={async () => {
                  if (!inviteEmail || !activeChild || !user) return;
                  setSendingInvite(true);
                  try {
                    const { data, error } = await supabase.functions.invoke('invite-caregiver', {
                      body: { email: inviteEmail, childName: activeChild.name, message: inviteMessage },
                    });
                    if (error) throw error;
                    toast({ title: '📤 Invite created!', description: `Invite sent for ${activeChild.name}'s guide.` });
                    setInviteEmail('');
                    setInviteMessage('');
                  } catch (e: any) {
                    toast({ title: 'Could not send invite', description: e.message, variant: 'destructive' });
                  } finally {
                    setSendingInvite(false);
                  }
                }}
                disabled={!inviteEmail || sendingInvite}
                className="w-full gap-2"
                size="sm"
              >
                <Send className="h-3.5 w-3.5" />
                {sendingInvite ? 'Sending...' : 'Send Invite'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleCopyToClipboard} variant="outline" className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Text'}
        </Button>
        <Button onClick={handleDownloadText} className="gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-3">
        Copy and paste into any messaging app, or download as a file to share
      </p>
    </div>
  );
}
