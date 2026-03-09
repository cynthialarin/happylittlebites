import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

const strategies = [
  {
    title: 'Division of Responsibility',
    emoji: '🤝',
    content: 'Parent decides WHAT, WHEN, and WHERE food is served. Child decides WHETHER and HOW MUCH to eat. This reduces mealtime battles and builds healthy eaters.',
    source: 'Ellyn Satter Institute'
  },
  {
    title: 'The 15-20 Exposure Rule',
    emoji: '🔄',
    content: 'Research shows children may need 15-20 exposures to a food before accepting it. An "exposure" can be seeing it, touching it, smelling it — not just tasting. Don\'t give up after a few rejections!',
    source: 'Journal of the American Dietetic Association'
  },
  {
    title: 'No Pressure, No Bribes',
    emoji: '🚫',
    content: '"Just one more bite" and "eat your veggies to get dessert" actually INCREASE picky eating long-term. Keep the mood positive and neutral.',
    source: 'AAP Guidelines'
  },
  {
    title: 'Serve Familiar + New Together',
    emoji: '🍽️',
    content: 'Always include at least one food you know your child will eat alongside new foods. This reduces anxiety and ensures they eat something.',
    source: 'Feeding Therapy Research'
  },
  {
    title: 'Food Play & Sensory Exploration',
    emoji: '🎨',
    content: 'Let kids play with food! Squishing, painting, building — all build comfort with unfamiliar textures. Messy eating is developmental progress.',
    source: 'Occupational Therapy Guidelines'
  },
  {
    title: 'Model Eating Behavior',
    emoji: '👨‍👩‍👧',
    content: 'Children are 5x more likely to try a food if they see a parent eating and enjoying it. Eat together whenever possible.',
    source: 'Pediatric Nutrition Research'
  },
  {
    title: 'Reduce Grazing & Milk',
    emoji: '⏰',
    content: 'Too much milk (over 16-24oz/day) and constant snacking kills appetite at meals. Structured meal times with 2-3 hour gaps help children come to the table hungry.',
    source: 'AAP Nutrition Guidelines'
  },
  {
    title: 'Involve Kids in Cooking',
    emoji: '👩‍🍳',
    content: 'Children who help prepare food are significantly more likely to try it. Even toddlers can wash veggies, tear lettuce, or stir mixtures.',
    source: 'Journal of Nutrition Education and Behavior'
  },
];

const sensoryIdeas = [
  { emoji: '🖌️', title: 'Veggie Painting', desc: 'Use cut veggies as stamps with yogurt "paint"' },
  { emoji: '🏗️', title: 'Food Building', desc: 'Build towers with crackers, veggies, and cheese' },
  { emoji: '🔬', title: 'Kitchen Science', desc: 'Watch bread rise, ice melt, butter soften' },
  { emoji: '👃', title: 'Smell Test Game', desc: 'Blindfolded sniffing game with herbs and fruits' },
  { emoji: '🎭', title: 'Pretend Restaurant', desc: 'Let your child "serve" you and take orders' },
  { emoji: '🌱', title: 'Grow a Snack', desc: 'Plant herbs or bean sprouts they can eat' },
];

export default function PickyEater() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-xl font-black">Picky Eater Toolkit 🧠</h1>
        <p className="text-sm text-muted-foreground">Evidence-based strategies that actually work</p>
      </div>

      {/* Age Expectations */}
      <Card className="mb-5 bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-2">📊 Normal Picky Eating by Age</h2>
          <div className="space-y-2 text-sm">
            <p><strong>12-18 months:</strong> Normal to slow down — growth rate drops. Many new foods get rejected.</p>
            <p><strong>18-24 months:</strong> Peak pickiness. "Food neophobia" (fear of new foods) is developmentally normal.</p>
            <p><strong>2-3 years:</strong> Independence battles often play out at the table. Totally normal.</p>
            <p><strong>3-5 years:</strong> Gradually improving. Peer influence starts helping.</p>
          </div>
        </CardContent>
      </Card>

      {/* Strategies */}
      <h2 className="font-bold text-sm mb-3">✨ Evidence-Based Strategies</h2>
      <div className="space-y-3 mb-6">
        {strategies.map(s => (
          <Card key={s.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{s.emoji}</span>
                <h3 className="font-bold text-sm">{s.title}</h3>
              </div>
              <p className="text-sm mb-1">{s.content}</p>
              <p className="text-[10px] text-muted-foreground italic">Source: {s.source}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sensory Play */}
      <h2 className="font-bold text-sm mb-3">🎨 Sensory Play Ideas</h2>
      <div className="grid grid-cols-2 gap-2">
        {sensoryIdeas.map(idea => (
          <Card key={idea.title} className="bg-lavender/10 border-none">
            <CardContent className="p-3">
              <span className="text-xl">{idea.emoji}</span>
              <p className="font-bold text-xs mt-1">{idea.title}</p>
              <p className="text-[10px] text-muted-foreground">{idea.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
