import { format } from 'date-fns';
import { Copy, Printer } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useApp } from '@/contexts/AppContext';
import { TOP_9_ALLERGENS, CA_EXTRA_ALLERGENS } from '@/types';

interface AllergenExportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ALLERGEN_LABELS: Record<string, { emoji: string; label: string }> = {
  milk: { emoji: '🥛', label: 'Milk' },
  eggs: { emoji: '🥚', label: 'Eggs' },
  peanuts: { emoji: '🥜', label: 'Peanuts' },
  'tree-nuts': { emoji: '🌰', label: 'Tree Nuts' },
  wheat: { emoji: '🌾', label: 'Wheat' },
  soy: { emoji: '🫘', label: 'Soy' },
  fish: { emoji: '🐟', label: 'Fish' },
  shellfish: { emoji: '🦐', label: 'Shellfish' },
  sesame: { emoji: '🫙', label: 'Sesame' },
  mustard: { emoji: '🟡', label: 'Mustard' },
  sulphites: { emoji: '⚗️', label: 'Sulphites' },
};

export default function AllergenExport({ open, onOpenChange }: AllergenExportProps) {
  const { activeChild, allergenRecords, settings } = useApp();

  const childRecords = allergenRecords.filter(a => a.childId === activeChild?.id);
  const allergens = settings.country === 'CA'
    ? [...TOP_9_ALLERGENS, ...CA_EXTRA_ALLERGENS]
    : [...TOP_9_ALLERGENS];

  const buildReport = () => {
    const lines: string[] = [];
    lines.push('ALLERGEN TRACKER REPORT');
    lines.push(`Child: ${activeChild?.name || 'Unknown'}`);
    lines.push(`Generated: ${format(new Date(), 'MMMM d, yyyy')}`);
    lines.push('─'.repeat(40));
    lines.push('');
    lines.push(`TOP ${allergens.length} ALLERGEN STATUS`);
    lines.push('');

    for (const a of allergens) {
      const info = ALLERGEN_LABELS[a] || { emoji: '❓', label: a };
      const record = childRecords.find(r => r.allergen === a);
      const status = record ? 'INTRODUCED' : 'NOT STARTED';
      const dateStr = record ? format(new Date(record.dateIntroduced), 'MMM d, yyyy') : '—';
      lines.push(`${info.emoji} ${info.label}: ${status}  (First: ${dateStr})`);
      if (record?.notes) lines.push(`   Notes: ${record.notes}`);
      if (record && record.reactionSeverity !== 'none') {
        lines.push(`   Reaction: ${record.reactionSeverity.toUpperCase()} - ${record.symptoms.join(', ')}`);
      }
    }

    const reactions = childRecords.filter(r => r.reactionSeverity !== 'none');
    if (reactions.length > 0) {
      lines.push('');
      lines.push('─'.repeat(40));
      lines.push('REACTION HISTORY');
      lines.push('');
      reactions.forEach(r => {
        const info = ALLERGEN_LABELS[r.allergen] || { label: r.allergen };
        lines.push(`${format(new Date(r.dateIntroduced), 'MMM d, yyyy')} — ${info.label} [${r.reactionSeverity.toUpperCase()}]`);
        lines.push(`  Symptoms: ${r.symptoms.join(', ')}`);
        if (r.notes) lines.push(`  Notes: ${r.notes}`);
        lines.push('');
      });
    }

    return lines.join('\n');
  };

  const report = buildReport();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(report);
    toast('📋 Report copied to clipboard!');
  };

  const handlePrint = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<pre style="font-family:monospace;white-space:pre-wrap;padding:2rem;">${report}</pre>`);
    w.document.close();
    w.print();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl px-4 pb-8">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-lg font-extrabold">📄 Pediatrician Export</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 160px)' }}>
          <pre className="whitespace-pre-wrap rounded-xl bg-muted p-4 text-xs font-mono leading-relaxed">
            {report}
          </pre>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1 rounded-full font-bold" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" className="flex-1 rounded-full font-bold" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
