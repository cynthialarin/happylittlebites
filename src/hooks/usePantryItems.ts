import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface PantryItem {
  id: string;
  user_id: string;
  name: string;
  emoji: string;
  category: string;
  location: string;
  quantity: string | null;
  food_id: string | null;
  upc_code: string | null;
  brand: string | null;
  in_stock: boolean;
  added_via: string;
  created_at: string;
}

export function usePantryItems() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["pantry_items", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("pantry_items" as any)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as PantryItem[];
    },
    enabled: !!user,
  });

  const addItem = useMutation({
    mutationFn: async (item: Omit<PantryItem, "id" | "user_id" | "created_at">) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("pantry_items" as any).insert({
        ...item,
        user_id: user.id,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pantry_items"] }),
  });

  const addItems = useMutation({
    mutationFn: async (newItems: Partial<PantryItem>[]) => {
      if (!user) throw new Error("Not authenticated");
      const rows = newItems.map((item) => ({
        user_id: user.id,
        name: item.name || "Unknown",
        emoji: item.emoji || "🍽️",
        category: item.category || "other",
        location: item.location || "fridge",
        quantity: item.quantity || null,
        food_id: item.food_id || null,
        upc_code: item.upc_code || null,
        brand: item.brand || null,
        in_stock: item.in_stock ?? true,
        added_via: item.added_via || "manual",
      }));
      const { error } = await supabase.from("pantry_items" as any).insert(rows as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pantry_items"] }),
  });

  const updateItem = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<PantryItem>) => {
      const { error } = await supabase
        .from("pantry_items" as any)
        .update(updates as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pantry_items"] }),
  });

  const toggleStock = useMutation({
    mutationFn: async ({ id, in_stock }: { id: string; in_stock: boolean }) => {
      const { error } = await supabase
        .from("pantry_items" as any)
        .update({ in_stock } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pantry_items"] }),
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pantry_items" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pantry_items"] }),
  });

  return { items, isLoading, addItem, addItems, updateItem, toggleStock, deleteItem };
}
