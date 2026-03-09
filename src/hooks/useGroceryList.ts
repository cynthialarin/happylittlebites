import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface GroceryItem {
  id: string;
  user_id: string;
  name: string;
  amount: string | null;
  unit: string | null;
  checked: boolean;
  source: string | null;
  created_at: string;
}

export function useGroceryList() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["grocery_list", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("grocery_list_items" as any)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as GroceryItem[];
    },
    enabled: !!user,
  });

  const addItems = useMutation({
    mutationFn: async (newItems: { name: string; amount?: string; unit?: string; source?: string }[]) => {
      if (!user) throw new Error("Not authenticated");
      const rows = newItems.map((item) => ({
        user_id: user.id,
        name: item.name,
        amount: item.amount || null,
        unit: item.unit || null,
        source: item.source || null,
        checked: false,
      }));
      const { error } = await supabase.from("grocery_list_items" as any).insert(rows as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grocery_list"] }),
  });

  const toggleItem = useMutation({
    mutationFn: async ({ id, checked }: { id: string; checked: boolean }) => {
      const { error } = await supabase
        .from("grocery_list_items" as any)
        .update({ checked } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grocery_list"] }),
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("grocery_list_items" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grocery_list"] }),
  });

  const clearChecked = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("grocery_list_items" as any)
        .delete()
        .eq("user_id", user.id)
        .eq("checked", true);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grocery_list"] }),
  });

  return { items, isLoading, addItems, toggleItem, deleteItem, clearChecked };
}
