export interface MilestoneItem {
  key: string;
  label: string;
  ageRange: string;
}

export interface MilestoneCategory {
  id: string;
  label: string;
  emoji: string;
  items: MilestoneItem[];
}

export const milestoneCategories: MilestoneCategory[] = [
  {
    id: 'feeding',
    label: 'Feeding',
    emoji: '🍽️',
    items: [
      { key: 'feeding-readiness-signs', label: 'Shows signs of readiness (watching food, reaching)', ageRange: '4-6mo' },
      { key: 'feeding-sits-support', label: 'Can sit with minimal support', ageRange: '4-6mo' },
      { key: 'feeding-tongue-thrust-gone', label: 'Loss of tongue-thrust reflex', ageRange: '4-6mo' },
      { key: 'feeding-accepts-purees', label: 'Accepts purees from a spoon', ageRange: '6-8mo' },
      { key: 'feeding-opens-mouth', label: 'Opens mouth when food approaches', ageRange: '6-8mo' },
      { key: 'feeding-first-allergens', label: 'Trying first allergens', ageRange: '6-8mo' },
      { key: 'feeding-pincer-grasp', label: 'Developing pincer grasp', ageRange: '8-10mo' },
      { key: 'feeding-soft-finger-foods', label: 'Eating soft finger foods', ageRange: '8-10mo' },
      { key: 'feeding-lumpy-textures', label: 'Can handle mashed/lumpy textures', ageRange: '8-10mo' },
      { key: 'feeding-self-feed-hands', label: 'Starting to self-feed with hands', ageRange: '8-10mo' },
      { key: 'feeding-cup-held', label: 'Drinking from held cup', ageRange: '8-10mo' },
      { key: 'feeding-spoon-attempt', label: 'Attempting to use a spoon', ageRange: '10-12mo' },
      { key: 'feeding-chewing-soft', label: 'Biting and chewing soft foods', ageRange: '10-12mo' },
      { key: 'feeding-open-cup-help', label: 'Drinking from open cup with help', ageRange: '10-12mo' },
      { key: 'feeding-family-foods', label: 'Eating most family foods (modified)', ageRange: '12-18mo' },
      { key: 'feeding-spoon-accuracy', label: 'Using spoon with some accuracy', ageRange: '12-18mo' },
      { key: 'feeding-open-cup-independent', label: 'Drinking from open cup independently', ageRange: '12-18mo' },
      { key: 'feeding-fork-stab', label: 'Using fork to stab food', ageRange: '18-24mo' },
      { key: 'feeding-straw-cup', label: 'Drinking from straw cup well', ageRange: '18-24mo' },
      { key: 'feeding-requests-food', label: 'Requesting specific foods', ageRange: '18-24mo' },
      { key: 'feeding-utensils-independent', label: 'Using utensils independently', ageRange: '2-3yr' },
      { key: 'feeding-pouring', label: 'Pouring from a small pitcher', ageRange: '2-3yr' },
      { key: 'feeding-spreading-knife', label: 'Spreading with a knife', ageRange: '3-5yr' },
      { key: 'feeding-helping-cook', label: 'Helping cook simple recipes', ageRange: '3-5yr' },
    ]
  },
  {
    id: 'motor',
    label: 'Motor',
    emoji: '🏃',
    items: [
      { key: 'motor-head-control', label: 'Good head and neck control', ageRange: '3-4mo' },
      { key: 'motor-rolling-tummy-back', label: 'Rolling from tummy to back', ageRange: '4-5mo' },
      { key: 'motor-rolling-back-tummy', label: 'Rolling from back to tummy', ageRange: '5-6mo' },
      { key: 'motor-sitting-support', label: 'Sitting with support', ageRange: '5-6mo' },
      { key: 'motor-sitting-independent', label: 'Sitting independently', ageRange: '6-8mo' },
      { key: 'motor-crawling', label: 'Crawling', ageRange: '7-10mo' },
      { key: 'motor-pulling-to-stand', label: 'Pulling to stand', ageRange: '8-10mo' },
      { key: 'motor-cruising', label: 'Cruising along furniture', ageRange: '9-12mo' },
      { key: 'motor-standing-alone', label: 'Standing alone', ageRange: '10-14mo' },
      { key: 'motor-first-steps', label: 'First steps', ageRange: '10-15mo' },
      { key: 'motor-walking-steady', label: 'Walking steadily', ageRange: '12-18mo' },
      { key: 'motor-running', label: 'Running', ageRange: '18-24mo' },
      { key: 'motor-climbing-stairs', label: 'Climbing stairs with help', ageRange: '18-24mo' },
      { key: 'motor-jumping', label: 'Jumping with both feet', ageRange: '2-3yr' },
      { key: 'motor-pedaling', label: 'Pedaling a tricycle', ageRange: '2-3yr' },
      { key: 'motor-catching-ball', label: 'Catching a large ball', ageRange: '3-4yr' },
    ]
  },
  {
    id: 'language',
    label: 'Language',
    emoji: '💬',
    items: [
      { key: 'language-cooing', label: 'Cooing and gurgling', ageRange: '2-3mo' },
      { key: 'language-laughing', label: 'Laughing out loud', ageRange: '3-4mo' },
      { key: 'language-babbling', label: 'Babbling (ba-ba, da-da)', ageRange: '6-8mo' },
      { key: 'language-responds-name', label: 'Responds to own name', ageRange: '6-9mo' },
      { key: 'language-gestures', label: 'Using gestures (waving, pointing)', ageRange: '9-12mo' },
      { key: 'language-mama-dada', label: 'Saying "mama" or "dada" meaningfully', ageRange: '10-14mo' },
      { key: 'language-first-words', label: 'First real words (beyond mama/dada)', ageRange: '12-18mo' },
      { key: 'language-follows-directions', label: 'Follows simple directions', ageRange: '12-18mo' },
      { key: 'language-10-words', label: 'Vocabulary of 10+ words', ageRange: '15-18mo' },
      { key: 'language-two-word-phrases', label: 'Two-word phrases ("more milk")', ageRange: '18-24mo' },
      { key: 'language-50-words', label: 'Vocabulary of 50+ words', ageRange: '18-24mo' },
      { key: 'language-short-sentences', label: 'Using short sentences', ageRange: '2-3yr' },
      { key: 'language-asking-why', label: 'Asking "why" questions', ageRange: '2-3yr' },
      { key: 'language-telling-stories', label: 'Telling simple stories', ageRange: '3-4yr' },
      { key: 'language-full-sentences', label: 'Speaking in full sentences', ageRange: '3-5yr' },
    ]
  },
  {
    id: 'social',
    label: 'Social',
    emoji: '🤝',
    items: [
      { key: 'social-smile', label: 'Social smile', ageRange: '2-3mo' },
      { key: 'social-eye-contact', label: 'Making eye contact', ageRange: '2-3mo' },
      { key: 'social-stranger-anxiety', label: 'Stranger anxiety begins', ageRange: '6-9mo' },
      { key: 'social-separation-anxiety', label: 'Separation anxiety', ageRange: '8-12mo' },
      { key: 'social-waves-bye', label: 'Waves bye-bye', ageRange: '9-12mo' },
      { key: 'social-imitates-actions', label: 'Imitates simple actions', ageRange: '9-12mo' },
      { key: 'social-shows-affection', label: 'Shows affection (hugs, kisses)', ageRange: '12-18mo' },
      { key: 'social-parallel-play', label: 'Parallel play with other children', ageRange: '18-24mo' },
      { key: 'social-pretend-play', label: 'Pretend play begins', ageRange: '18-24mo' },
      { key: 'social-takes-turns', label: 'Taking turns with help', ageRange: '2-3yr' },
      { key: 'social-sharing', label: 'Starting to share', ageRange: '2-3yr' },
      { key: 'social-cooperative-play', label: 'Cooperative play with others', ageRange: '3-4yr' },
      { key: 'social-empathy', label: 'Showing empathy for others', ageRange: '3-4yr' },
      { key: 'social-making-friends', label: 'Making friends', ageRange: '4-5yr' },
    ]
  },
];
