import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { childAge, childName, feedingApproach, knownAllergies, recentFoods, triedFoods, availableRecipes, country, availableIngredients } = await req.json();

    const isCanada = country === 'CA';
    const guidelineSource = isCanada ? 'Health Canada and CPS (Canadian Paediatric Society)' : 'AAP (American Academy of Pediatrics) and CDC';
    const countryNote = isCanada
      ? `Follow Health Canada guidelines: iron-rich meat/alternatives should be prioritized as first complementary foods. Cow milk as a drink is OK from 9-12 months (pasteurized, homogenized 3.25% M.F.). Limit fresh/frozen tuna, shark, swordfish, marlin to max 75g/month. Canada recognizes 11 priority allergens (adds mustard and sulphites).`
      : `Follow AAP/CDC guidelines: cow milk as a drink should wait until 12 months. Use FDA Best Choices fish list. Top 9 allergens.`;

    const ingredientNote = availableIngredients?.length
      ? `\nAVAILABLE INGREDIENTS (from fridge/pantry scan — prioritize meals using these):\n${availableIngredients.join(', ')}`
      : '';

    const systemPrompt = `You are a pediatric nutrition expert specializing in baby and toddler feeding. You help parents decide what to feed their child each day. You follow ${guidelineSource} guidelines.

${countryNote}

CHILD CONTEXT:
- Name: ${childName}
- Age: ${childAge} months
- Feeding approach: ${feedingApproach}
- Known allergies: ${knownAllergies?.length ? knownAllergies.join(', ') : 'None'}
- Foods eaten in last 7 days: ${recentFoods?.length ? recentFoods.join(', ') : 'None logged'}
- Total unique foods tried: ${triedFoods?.length || 0}
${ingredientNote}

RULES:
1. NEVER suggest foods containing known allergens
2. Prioritize variety — suggest foods NOT eaten in the last 7 days
3. Consider age-appropriate textures and serving sizes
4. Include at least one iron-rich food per day
5. Aim for diversity across food groups (fruits, vegetables, grains, protein, dairy, legumes)
6. If the child is under 12 months, no honey, no added salt/sugar, no whole nuts
7. If a matching recipe ID is available, include it
8. Give a brief, encouraging reason for each suggestion (1-2 sentences max)
9. Suggest one new/untried food per day to encourage exploration
10. Provide clear preparation instructions appropriate for the child's age and feeding approach
11. Assess choking risk and explain how to prepare food safely
12. Note any allergens present in each meal
13. Highlight key nutrients in each meal
14. Estimate preparation time realistically
15. Provide age-appropriate serving size guidance`;

    const userPrompt = `Please suggest 3 meals for ${childName} today in these categories: one quick snack, one balanced meal, and one iron-rich option.${availableIngredients?.length ? ' Prioritize using available ingredients: ' + availableIngredients.join(', ') + '.' : ''}

Available recipe IDs that you can reference: ${availableRecipes?.slice(0, 50)?.join(', ') || 'none provided'}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_daily_meals",
              description: "Return personalized meal suggestions for a baby/toddler for today",
              parameters: {
                type: "object",
                properties: {
                  suggestions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        mealType: { type: "string", enum: ["quick-snack", "balanced-meal", "iron-rich"] },
                        title: { type: "string", description: "Name of the meal" },
                        description: { type: "string", description: "Brief encouraging reason (1-2 sentences)" },
                        prepInstructions: { type: "string", description: "Step-by-step preparation instructions appropriate for baby's feeding stage" },
                        chokingRisk: { type: "string", enum: ["low", "medium", "high"], description: "Choking risk level with this preparation method" },
                        allergenInfo: { type: "string", description: "Allergens present in this meal, or 'None' if allergen-free" },
                        nutritionHighlights: { type: "array", items: { type: "string" }, description: "Key nutrients provided (e.g. 'Iron', 'Vitamin C', 'Healthy fats')" },
                        prepTimeMinutes: { type: "number", description: "Estimated preparation time in minutes" },
                        servingSize: { type: "string", description: "Age-appropriate serving size guidance" },
                        recipeId: { type: "string", description: "Matching recipe ID if available, otherwise empty string" },
                        emoji: { type: "string", description: "A single food emoji for this meal" },
                        newFood: { type: "boolean", description: "Whether this includes a food the child hasn't tried yet" },
                      },
                      required: ["mealType", "title", "description", "prepInstructions", "chokingRisk", "allergenInfo", "nutritionHighlights", "prepTimeMinutes", "servingSize", "recipeId", "emoji", "newFood"],
                      additionalProperties: false,
                    },
                  },
                  dailyTip: { type: "string", description: "One short, encouraging feeding tip for the parent today" },
                },
                required: ["suggestions", "dailyTip"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_daily_meals" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Failed to generate suggestions" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Failed to parse suggestions" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = typeof toolCall.function.arguments === "string"
      ? JSON.parse(toolCall.function.arguments)
      : toolCall.function.arguments;

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("suggest-meals error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
