import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, CheckCircle2, Circle, Plus, ChevronDown, ChevronRight, ArrowLeft, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useGroceryList, GroceryItem } from "@/hooks/useGroceryList";
import { toast } from "sonner";

export default function GroceryList() {
  const navigate = useNavigate();
  const { items, isLoading, addItems, toggleItem, deleteItem, clearChecked } = useGroceryList();
  const [newItem, setNewItem] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);

  const grouped = useMemo(() => {
    const groups = new Map<string, GroceryItem[]>();
    for (const item of unchecked) {
      const key = item.source || "Manual";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    }
    return groups;
  }, [unchecked]);

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const singleGroup = grouped.size <= 1;

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-black">Grocery List</h1>
            <p className="text-sm text-muted-foreground">
              {unchecked.length} item{unchecked.length !== 1 ? "s" : ""} to buy
            </p>
          </div>
        </div>
        {checked.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs"
            onClick={() => clearChecked.mutate()}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear done
          </Button>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = newItem.trim();
          if (!trimmed) return;
          addItems.mutate([{ name: trimmed }]);
          setNewItem("");
        }}
        className="flex gap-2"
      >
        <Input
          placeholder="Add an item…"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!newItem.trim()} className="shrink-0 h-10 w-10">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      {isLoading && (
        <div className="py-12 text-center text-muted-foreground text-sm">Loading…</div>
      )}

      {!isLoading && items.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="font-bold text-foreground">Your grocery list is empty</p>
            <p className="text-sm text-muted-foreground mt-1 mb-1">
              Add items manually above, or they'll appear automatically when you plan meals or save recipes.
            </p>
          </CardContent>
        </Card>
      )}

      {!singleGroup ? (
        Array.from(grouped.entries()).map(([source, groupItems]) => {
          const isOpen = !collapsedGroups.has(source);
          return (
            <Collapsible key={source} open={isOpen} onOpenChange={() => toggleGroup(source)}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left py-1">
                {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{source}</span>
                <span className="text-[10px] text-muted-foreground">({groupItems.length})</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1.5 mt-1">
                  {groupItems.map((item) => (
                    <GroceryItemRow key={item.id} item={item} onToggle={toggleItem} onDelete={deleteItem} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })
      ) : (
        unchecked.length > 0 && (
          <div className="space-y-1.5">
            {unchecked.map((item) => (
              <GroceryItemRow key={item.id} item={item} onToggle={toggleItem} onDelete={deleteItem} />
            ))}
          </div>
        )
      )}

      {checked.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
            Done ({checked.length})
          </p>
          <div className="space-y-1.5">
            {checked.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm opacity-60">
                <CardContent className="flex items-center gap-3 p-3">
                  <button onClick={() => toggleItem.mutate({ id: item.id, checked: false })} className="shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </button>
                  <span className="text-sm text-muted-foreground line-through flex-1">
                    {item.amount && item.unit ? `${item.amount} ${item.unit} ` : ""}
                    {item.name}
                  </span>
                  <button
                    onClick={() => deleteItem.mutate(item.id)}
                    className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GroceryItemRow({ item, onToggle, onDelete }: { item: GroceryItem; onToggle: any; onDelete: any }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex items-center gap-3 p-3">
        <button onClick={() => onToggle.mutate({ id: item.id, checked: true })} className="shrink-0">
          <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
        </button>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium">
            {item.amount && item.unit ? `${item.amount} ${item.unit} ` : ""}
            {item.name}
          </span>
          {item.source && (
            <p className="text-[10px] text-muted-foreground truncate">{item.source}</p>
          )}
        </div>
        <button
          onClick={() => onDelete.mutate(item.id)}
          className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
