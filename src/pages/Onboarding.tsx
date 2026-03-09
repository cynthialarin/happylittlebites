import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { FeedingApproach, Country } from '@/types';
import { Baby, Heart, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

const AVATARS = ['🐣', '🧸', '🌻', '🐰', '🦊', '🐝', '🍼', '🌈'];

export default function Onboarding() {
  const { addChild, completeOnboarding, setCountry } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [approach, setApproach] = useState<FeedingApproach>('combo');
  const [avatar, setAvatar] = useState('🐣');
  const [country, setCountryLocal] = useState<Country>('US');

  const features = [
    { icon: Baby, title: '100+ Foods', desc: 'Age-appropriate safety guides for every food' },
    { icon: ShieldCheck, title: 'Allergen Tracker', desc: 'Guided top-9 allergen introduction' },
    { icon: Heart, title: 'Picky Eater Help', desc: 'Evidence-based strategies that work' },
    { icon: Sparkles, title: '100% Free', desc: 'No subscriptions, no paywalls, ever' },
  ];

  const handleComplete = () => {
    if (!name.trim() || !birthdate) return;
    setCountry(country);
    addChild({
      id: crypto.randomUUID(),
      name: name.trim(),
      birthdate,
      knownAllergies: [],
      feedingApproach: approach,
      avatar,
    });
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              className="text-7xl mb-6"
            >
              🍽️
            </motion.div>
            <h1 className="text-3xl font-black mb-2">Happy Little Bites</h1>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Your free guide to baby & toddler feeding — from first purees to family meals
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-3 rounded-xl bg-card border border-border text-left"
                >
                  <f.icon className="h-5 w-5 text-primary mb-1" />
                  <p className="font-bold text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="gap-2 rounded-full px-8" onClick={() => setStep(1)}>
              Get Started <ChevronRight className="h-4 w-4" />
            </Button>
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
              We'll show guidelines from your country's health authority
            </p>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
              {([
                { value: 'US' as Country, label: 'United States', flag: '🇺🇸', desc: 'AAP & CDC guidelines' },
                { value: 'CA' as Country, label: 'Canada', flag: '🇨🇦', desc: 'Health Canada & CPS guidelines' },
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
              <Button variant="outline" onClick={() => setStep(0)} className="rounded-full">Back</Button>
              <Button className="flex-1 rounded-full gap-2" onClick={() => setStep(2)}>
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col px-6 py-12 max-w-md mx-auto w-full"
          >
            <h2 className="text-2xl font-black mb-1">Add your little one 🍼</h2>
            <p className="text-muted-foreground mb-6">Tell us about your child to personalize their experience</p>

            <div className="space-y-5">
              <div>
                <Label className="mb-2 block font-semibold">Choose an avatar</Label>
                <div className="flex gap-2 flex-wrap">
                  {AVATARS.map(a => (
                    <button
                      key={a}
                      onClick={() => setAvatar(a)}
                      className={`text-2xl p-2 rounded-xl transition-all ${avatar === a ? 'bg-primary/20 ring-2 ring-primary scale-110' : 'bg-muted hover:bg-muted/80'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="font-semibold">Child's name</Label>
                <Input id="name" placeholder="e.g., Luna" value={name} onChange={e => setName(e.target.value)} className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="birthdate" className="font-semibold">Date of birth</Label>
                <Input id="birthdate" type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className="mt-1.5" max={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <Label className="font-semibold mb-2 block">Feeding approach</Label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: 'blw' as const, label: 'Baby-Led', emoji: '🤚', desc: 'Baby self-feeds soft finger foods from the start' },
                    { value: 'purees' as const, label: 'Purées', emoji: '🥣', desc: 'Spoon-fed smooth foods, gradually adding texture' },
                    { value: 'combo' as const, label: 'Combo', emoji: '✨', desc: 'Mix of both — spoon-feeding & finger foods' },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setApproach(opt.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${approach === opt.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}
                    >
                      <div className="text-xl mb-1">{opt.emoji}</div>
                      <div className="text-xs font-semibold">{opt.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="rounded-full">Back</Button>
              <Button
                className="flex-1 rounded-full"
                onClick={handleComplete}
                disabled={!name.trim() || !birthdate}
              >
                Start Exploring 🎉
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
