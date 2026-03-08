import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';

interface Milestone {
  age: string;
  title: string;
  items: string[];
}

const milestones: Milestone[] = [
  {
    age: '4-6 months',
    title: 'Signs of Readiness',
    items: [
      'Can sit with minimal support',
      'Good head and neck control',
      'Shows interest in food (watching, reaching)',
      'Loss of tongue-thrust reflex',
      'Can bring objects to mouth',
    ]
  },
  {
    age: '6-8 months',
    title: 'First Foods',
    items: [
      'Accepts purees from a spoon',
      'Opens mouth when food approaches',
      'Beginning to use palmar grasp for food',
      'Learning to move food from front to back of mouth',
      'Trying first allergens',
    ]
  },
  {
    age: '8-10 months',
    title: 'Texture Exploration',
    items: [
      'Developing pincer grasp (thumb + finger)',
      'Eating soft finger foods',
      'Can handle mashed/lumpy textures',
      'Starting to self-feed with hands',
      'Drinking from held cup',
    ]
  },
  {
    age: '10-12 months',
    title: 'Self-Feeding Skills',
    items: [
      'Picking up small foods with pincer grasp',
      'Attempting to use a spoon',
      'Biting and chewing soft foods',
      'Eating a variety of textures',
      'Drinking from open cup with help',
    ]
  },
  {
    age: '12-18 months',
    title: 'Toddler Transitions',
    items: [
      'Eating most family foods (modified)',
      'Using spoon with some accuracy',
      'Drinking from open cup independently',
      'Transitioning from bottles/breast',
      'Eating 3 meals + 2-3 snacks daily',
    ]
  },
  {
    age: '18-24 months',
    title: 'Growing Independence',
    items: [
      'Using fork to stab food',
      'Drinking from straw cup well',
      'Requesting specific foods',
      'Normal pickiness may begin',
      'Eating at the table with family',
    ]
  },
  {
    age: '2-3 years',
    title: 'Mastering Mealtimes',
    items: [
      'Using utensils independently',
      'Pouring from a small pitcher',
      'Understanding mealtime routines',
      'Helping with simple food prep',
      'Trying some raw fruits and veggies (supervised)',
    ]
  },
  {
    age: '3-5 years',
    title: 'Food Explorer',
    items: [
      'Spreading with a knife',
      'Helping cook simple recipes',
      'Understanding basic nutrition concepts',
      'Eating a wider variety of foods',
      'Good mealtime manners developing',
    ]
  },
];

export default function Milestones() {
  const navigate = useNavigate();
  const { activeChild, getChildAge } = useApp();
  const age = activeChild ? getChildAge(activeChild) : null;

  const getCurrentStageIndex = () => {
    if (!age) return -1;
    if (age.months < 6) return 0;
    if (age.months < 8) return 1;
    if (age.months < 10) return 2;
    if (age.months < 12) return 3;
    if (age.months < 18) return 4;
    if (age.months < 24) return 5;
    if (age.months < 36) return 6;
    return 7;
  };

  const currentStage = getCurrentStageIndex();

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-xl font-black mb-1">Feeding Milestones 📈</h1>
      <p className="text-sm text-muted-foreground mb-5">
        {activeChild ? `${activeChild.name} is at the "${milestones[currentStage]?.title || 'Explorer'}" stage` : 'Track your child\'s feeding journey'}
      </p>

      <div className="space-y-4">
        {milestones.map((m, i) => {
          const isCurrent = i === currentStage;
          const isPast = i < currentStage;

          return (
            <Card key={m.age} className={`${isCurrent ? 'ring-2 ring-primary bg-primary/5' : isPast ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isPast ? 'bg-sage text-sage-foreground' : isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {isPast ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground">{m.age}</span>
                    <h3 className="font-bold text-sm">{m.title}</h3>
                  </div>
                  {isCurrent && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold">Current</span>}
                </div>
                <ul className="space-y-1 ml-8">
                  {m.items.map(item => (
                    <li key={item} className="text-xs flex items-start gap-1.5">
                      <span className="text-muted-foreground mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
