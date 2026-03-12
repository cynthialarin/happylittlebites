import logoOption1 from '@/assets/logo-option-1.png';
import logoOption2 from '@/assets/logo-option-2.png';
import logoOption3 from '@/assets/logo-option-3.png';
import logoPremium from '@/assets/logo-premium.png';

const logos = [
  { src: logoOption1, label: 'Option 1 — Playful Veggie Character' },
  { src: logoOption2, label: 'Option 2 — Baby Spoon + Leaf' },
  { src: logoOption3, label: 'Option 3 — Bite Mark Circle' },
  { src: logoPremium, label: 'Option 4 — Premium Brand Mark' },
];

export default function ChooseLogo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-center mb-2">Choose Your Logo</h1>
      <p className="text-muted-foreground text-center mb-10">Pick the one that feels like a $20M brand 🚀</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {logos.map((logo, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm">
            <div className="w-48 h-48 flex items-center justify-center bg-muted/30 rounded-xl">
              <img src={logo.src} alt={logo.label} className="max-w-full max-h-full object-contain" />
            </div>
            <p className="font-semibold text-sm text-center">{logo.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
