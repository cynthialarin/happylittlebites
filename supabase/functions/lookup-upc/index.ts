import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CATEGORY_MAP: Record<string, string> = {
  "en:baby-foods": "baby-food",
  "en:baby-meals": "baby-food",
  "en:infant-formulas": "formula",
  "en:baby-cereals": "baby-food",
  "en:fruits": "fruit",
  "en:vegetables": "vegetable",
  "en:meats": "protein",
  "en:dairy": "dairy",
  "en:cereals-and-potatoes": "grain",
  "en:legumes": "legume",
  "en:diapers": "diapers",
};

function mapCategory(categories: string): string {
  const cats = categories.toLowerCase();
  for (const [key, val] of Object.entries(CATEGORY_MAP)) {
    if (cats.includes(key)) return val;
  }
  if (cats.includes("baby") || cats.includes("infant")) return "baby-food";
  if (cats.includes("formula")) return "formula";
  if (cats.includes("diaper") || cats.includes("nappy")) return "diapers";
  if (cats.includes("fruit")) return "fruit";
  if (cats.includes("vegetable") || cats.includes("veggie")) return "vegetable";
  if (cats.includes("meat") || cats.includes("chicken") || cats.includes("fish")) return "protein";
  if (cats.includes("milk") || cats.includes("yogurt") || cats.includes("cheese")) return "dairy";
  if (cats.includes("cereal") || cats.includes("grain") || cats.includes("bread") || cats.includes("rice") || cats.includes("pasta")) return "grain";
  return "other";
}

function pickEmoji(category: string): string {
  const map: Record<string, string> = {
    fruit: "🍎", vegetable: "🥦", protein: "🥩", dairy: "🥛",
    grain: "🌾", legume: "🫘", "baby-food": "🍼", formula: "🧴",
    diapers: "🧷", other: "🍽️",
  };
  return map[category] || "🍽️";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { barcode } = await req.json();
    if (!barcode || typeof barcode !== "string") {
      return new Response(JSON.stringify({ error: "barcode is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Try Open Food Facts first
    const offRes = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`,
      { headers: { "User-Agent": "HappyLittleBites/1.0" } }
    );

    if (offRes.ok) {
      const offData = await offRes.json();
      if (offData.status === 1 && offData.product) {
        const p = offData.product;
        const categories = p.categories_tags?.join(",") || p.categories || "";
        const category = mapCategory(categories);
        return new Response(
          JSON.stringify({
            found: true,
            source: "openfoodfacts",
            product: {
              name: p.product_name || p.product_name_en || "Unknown Product",
              brand: p.brands || null,
              category,
              emoji: pickEmoji(category),
              imageUrl: p.image_front_small_url || null,
              ingredients: p.ingredients_text || null,
              barcode,
            },
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Fallback: use Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ found: false, error: "Product not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You identify products by UPC/EAN barcode. Return a JSON object with name, brand, category (one of: fruit, vegetable, protein, dairy, grain, legume, baby-food, formula, diapers, other). Only return the JSON object, no markdown.",
          },
          {
            role: "user",
            content: `What product has barcode ${barcode}? Return JSON: {"name":"...","brand":"...","category":"..."}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "identify_product",
              description: "Return product info for a barcode",
              parameters: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  brand: { type: "string" },
                  category: { type: "string", enum: ["fruit", "vegetable", "protein", "dairy", "grain", "legume", "baby-food", "formula", "diapers", "other"] },
                },
                required: ["name", "brand", "category"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "identify_product" } },
      }),
    });

    if (aiRes.ok) {
      const aiData = await aiRes.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall) {
        const args = JSON.parse(toolCall.function.arguments);
        return new Response(
          JSON.stringify({
            found: true,
            source: "ai",
            product: {
              name: args.name,
              brand: args.brand || null,
              category: args.category || "other",
              emoji: pickEmoji(args.category || "other"),
              imageUrl: null,
              ingredients: null,
              barcode,
            },
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({ found: false, error: "Product not found in any database" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("lookup-upc error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
