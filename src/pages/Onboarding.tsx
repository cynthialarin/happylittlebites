import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { FeedingApproach, Country, Gender } from '@/types';
import { Baby, Heart, ShieldCheck, Sparkles, ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import logoOption3 from '@/assets/logo-option-3.png';

const AVATARS = ['🐣', '🧸', '🌻', '🐰', '🦊', '🐝', '🍼', '🌈'];

const GENDER_OPTIONS: { value: Gender; label: string; emoji: string }[] = [
  { value: 'boy', label: 'Boy', emoji: '👦' },
  { value: 'girl', label: 'Girl', emoji: '👧' },
  { value: 'neutral', label: 'Prefer not to say', emoji: '🌟' },
];

const TOTAL_STEPS = 3;

export default function Onboarding() {
  const { addChild, completeOnboarding, setCountry } = useApp();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [approach, setApproach] = useState<FeedingApproach>('combo');
  const [avatar, setAvatar] = useState('🐣');
  const [country, setCountryLocal] = useState<Country>('US');
  const [gender, setGender] = useState<Gender>('neutral');

  const features = [
    { icon: Baby, title: '100+ Foods', desc: 'Safe food guides for every age' },
    { icon: ShieldCheck, title: 'Allergen Tracker', desc: 'Step-by-step allergen intro' },
    { icon: Heart, title: 'Picky Eater Help', desc: 'Strategies that actually work' },
    { icon: Sparkles, title: 'Free During Beta', desc: 'Your first month is on us' },
  ];

  const handleComplete = () => {
    if (!name.trim() || !birthdate) return;
    setCountry(country);
    addChild({
      id: crypto.randomUUID(),
      name: name.trim(),
      birthdate,
      knownAllergies: [],
      fussyFoods: [],
      feedingApproach: approach,
      avatar,
      gender,
    });
    completeOnboarding();
    navigate('/', { replace: true });
  };

  const stepProgress = step === 0 ? 0 : (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Persistent header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2.5">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <span className="flex items-center gap-2 text-base font-black tracking-tight">
            <img src={logoOption3} alt="Happy Little Bites" className="h-6 w-6 object-contain" />
            Happy Little Bites
          </span>
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5 text-xs" onClick={signOut}>
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Button>
        </div>
      </header>
      {/* Progress bar — visible on steps 1+ */}
      {step > 0 && (
        <div className="px-6 pt-4 max-w-md mx-auto w-full">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
            <span className="text-xs text-muted-foreground">{Math.round(stepProgress)}%</span>
          </div>
          <Progress value={stepProgress} className="h-2" />
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-6"
            >
              <img src={logoOption3} alt="Happy Little Bites" className="w-16 h-16 object-contain" />
            </motion.div>
            <h1 className="text-3xl font-black mb-2">Happy Little Bites</h1>
            <p className="text-foreground/70 mb-2 max-w-sm text-base">
              Your free guide to baby & toddler feeding
            </p>
            <p className="text-muted-foreground mb-8 max-w-sm text-sm">
              From first purees to family meals — we'll walk you through it step by step.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border text-left"
                >
                  <f.icon className="h-5 w-5 text-primary mb-1.5" />
                  <p className="font-bold text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="gap-2 rounded-full px-8 h-12 text-base" onClick={() => setStep(1)}>
              Get Started <ChevronRight className="h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3">Takes less than 1 minute ⏱️</p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="country"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
          >
            <h2 className="text-2xl font-black mb-2">Where are you located? 🌍</h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
              We'll show food safety guidelines from your country's health authority
            </p>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
              {([
                { value: 'US' as Country, label: 'United States', flag: '🇺🇸', desc: 'AAP & CDC guidelines' },
                { value: 'CA' as Country, label: 'Canada', flag: '🇨🇦', desc: 'Health Canada & CPS' },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setCountryLocal(opt.value)}
                  className={`p-5 rounded-2xl border-2 transition-all text-center ${
                    country === opt.value
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="text-4xl mb-2">{opt.flag}</div>
                  <div className="text-sm font-bold">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 w-full max-w-sm">
              <Button variant="outline" onClick={() => setStep(0)} className="rounded-full h-11 px-5 gap-1">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button className="flex-1 rounded-full gap-2 h-11" onClick={() => setStep(2)}>
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="profile-basics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col px-6 py-8 max-w-md mx-auto w-full"
          >
            <h2 className="text-2xl font-black mb-1">Tell us about your little one 🍼</h2>
            <p className="text-muted-foreground mb-6 text-sm">We'll personalize everything for their age and needs</p>

            <div className="space-y-5">
              <div>
                <Label className="mb-2 block text-base font-bold">Pick an avatar</Label>
                <div className="flex gap-2 flex-wrap">
                  {AVATARS.map(a => (
                    <button
                      key={a}
                      onClick={() => setAvatar(a)}
                      className={`text-2xl p-3 rounded-xl transition-all ${avatar === a ? 'bg-primary/20 ring-2 ring-primary scale-110' : 'bg-muted hover:bg-muted/80'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">You can upload a real photo later!</p>
              </div>

              <div>
                <Label htmlFor="name" className="text-base font-bold">Child's name</Label>
                <Input id="name" placeholder="e.g., Luna" value={name} onChange={e => setName(e.target.value)} className="mt-1.5 h-11" />
              </div>

              <div>
                <Label htmlFor="birthdate" className="text-base font-bold">Date of birth</Label>
                <Input id="birthdate" type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className="mt-1.5 h-11" max={new Date().toISOString().split('T')[0]} />
                <p className="text-xs text-muted-foreground mt-1">This helps us show age-appropriate foods</p>
              </div>

              <div>
                <Label className="text-base font-bold mb-2 block">Gender</Label>
                <div className="grid grid-cols-3 gap-2">
                  {GENDER_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setGender(opt.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${gender === opt.value ? 'border-primary bg-primary/15 ring-2 ring-primary/30' : 'border-border hover:border-primary/40'}`}
                    >
                      <div className="text-2xl mb-1">{opt.emoji}</div>
                      <div className="text-xs font-bold">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="rounded-full h-11 px-5 gap-1">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                className="flex-1 rounded-full h-11 gap-2"
                onClick={() => setStep(3)}
                disabled={!name.trim() || !birthdate}
              >
                Almost done! <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="feeding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col px-6 py-8 max-w-md mx-auto w-full"
          >
            <h2 className="text-2xl font-black mb-1">How do you feed? 🥣</h2>
            <p className="text-muted-foreground mb-6 text-sm">No worries — you can change this anytime</p>

            <div className="space-y-3">
              {([
                { value: 'blw' as const, label: 'Baby-Led Weaning', emoji: '🤚', desc: 'Baby self-feeds soft finger foods from the start. Great for motor skills and independence.' },
                { value: 'purees' as const, label: 'Traditional Purées', emoji: '🥣', desc: 'Spoon-fed smooth foods, gradually adding texture over weeks. A gentle, classic approach.' },
                { value: 'combo' as const, label: 'Combo (Most Popular)', emoji: '✨', desc: 'Mix of both — spoon-feeding & finger foods. Flexible and works for most families!' },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setApproach(opt.value)}
                  className={`w-full p-5 rounded-xl border-2 transition-all text-left flex items-start gap-3 ${approach === opt.value ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'border-border hover:border-primary/40'}`}
                >
                  <span className="text-2xl mt-0.5">{opt.emoji}</span>
                  <div>
                    <p className="text-sm font-bold">{opt.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <details className="mt-4 text-left">
              <summary className="text-sm text-primary cursor-pointer font-medium hover:underline">Not sure? Learn more ℹ️</summary>
              <div className="mt-2 space-y-2 text-sm text-foreground/70 bg-muted/50 rounded-xl p-4">
                <p><span className="font-semibold text-foreground">Baby-Led Weaning (BLW)</span> is a trending approach where babies skip purees entirely and self-feed soft, age-appropriate finger foods from around 6 months.</p>
                <p><span className="font-semibold text-foreground">Purées</span> is the traditional approach — you spoon-feed smooth blended foods and gradually increase texture over weeks/months.</p>
                <p><span className="font-semibold text-foreground">Combo</span> blends both methods — the most popular choice among parents using this app!</p>
              </div>
            </details>

            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="rounded-full h-11 px-5 gap-1">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                className="flex-1 rounded-full h-12 text-base font-bold gap-2"
                onClick={handleComplete}
                disabled={!name.trim() || !birthdate}
              >
                Let's Go! 🎉
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
