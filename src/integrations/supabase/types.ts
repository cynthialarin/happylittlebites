export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      allergen_records: {
        Row: {
          allergen: string
          child_id: string
          date_introduced: string
          food: string
          id: string
          notes: string
          onset_time: string
          reaction_severity: string
          symptoms: string[]
          user_id: string
        }
        Insert: {
          allergen: string
          child_id: string
          date_introduced: string
          food?: string
          id: string
          notes?: string
          onset_time?: string
          reaction_severity?: string
          symptoms?: string[]
          user_id: string
        }
        Update: {
          allergen?: string
          child_id?: string
          date_introduced?: string
          food?: string
          id?: string
          notes?: string
          onset_time?: string
          reaction_severity?: string
          symptoms?: string[]
          user_id?: string
        }
        Relationships: []
      }
      caregiver_invites: {
        Row: {
          child_name: string
          created_at: string
          id: string
          invitee_email: string
          inviter_id: string
          message: string
          share_token: string
          status: string
        }
        Insert: {
          child_name: string
          created_at?: string
          id?: string
          invitee_email: string
          inviter_id: string
          message?: string
          share_token: string
          status?: string
        }
        Update: {
          child_name?: string
          created_at?: string
          id?: string
          invitee_email?: string
          inviter_id?: string
          message?: string
          share_token?: string
          status?: string
        }
        Relationships: []
      }
      children: {
        Row: {
          avatar: string
          birthdate: string
          feeding_approach: string
          id: string
          known_allergies: string[]
          name: string
          user_id: string
        }
        Insert: {
          avatar?: string
          birthdate: string
          feeding_approach?: string
          id: string
          known_allergies?: string[]
          name: string
          user_id: string
        }
        Update: {
          avatar?: string
          birthdate?: string
          feeding_approach?: string
          id?: string
          known_allergies?: string[]
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      diary_entries: {
        Row: {
          acceptance: string
          child_id: string
          date: string
          food_id: string
          food_name: string
          id: string
          meal_type: string
          notes: string
          reaction: string
          reaction_severity: string
          texture_stage: string
          user_id: string
        }
        Insert: {
          acceptance?: string
          child_id: string
          date: string
          food_id?: string
          food_name?: string
          id: string
          meal_type?: string
          notes?: string
          reaction?: string
          reaction_severity?: string
          texture_stage?: string
          user_id: string
        }
        Update: {
          acceptance?: string
          child_id?: string
          date?: string
          food_id?: string
          food_name?: string
          id?: string
          meal_type?: string
          notes?: string
          reaction?: string
          reaction_severity?: string
          texture_stage?: string
          user_id?: string
        }
        Relationships: []
      }
      exposures: {
        Row: {
          child_id: string
          exposure_data: Json
          food_name: string
          id: string
          user_id: string
        }
        Insert: {
          child_id: string
          exposure_data?: Json
          food_name: string
          id: string
          user_id: string
        }
        Update: {
          child_id?: string
          exposure_data?: Json
          food_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      grocery_list_items: {
        Row: {
          amount: string | null
          checked: boolean
          created_at: string
          id: string
          name: string
          source: string | null
          unit: string | null
          user_id: string
        }
        Insert: {
          amount?: string | null
          checked?: boolean
          created_at?: string
          id?: string
          name: string
          source?: string | null
          unit?: string | null
          user_id: string
        }
        Update: {
          amount?: string | null
          checked?: boolean
          created_at?: string
          id?: string
          name?: string
          source?: string | null
          unit?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meal_plan_entries: {
        Row: {
          child_id: string
          custom_meal: string | null
          date: string
          id: string
          meal_type: string
          recipe_id: string | null
          user_id: string
        }
        Insert: {
          child_id: string
          custom_meal?: string | null
          date: string
          id: string
          meal_type: string
          recipe_id?: string | null
          user_id: string
        }
        Update: {
          child_id?: string
          custom_meal?: string | null
          date?: string
          id?: string
          meal_type?: string
          recipe_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active_child_id: string | null
          created_at: string
          id: string
          onboarding_complete: boolean
          user_id: string
        }
        Insert: {
          active_child_id?: string | null
          created_at?: string
          id?: string
          onboarding_complete?: boolean
          user_id: string
        }
        Update: {
          active_child_id?: string | null
          created_at?: string
          id?: string
          onboarding_complete?: boolean
          user_id?: string
        }
        Relationships: []
      }
      saved_recipes: {
        Row: {
          created_at: string
          description: string
          emoji: string
          id: string
          ingredients: string[]
          instructions: string[]
          meal_type: string
          source: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          emoji?: string
          id?: string
          ingredients?: string[]
          instructions?: string[]
          meal_type?: string
          source?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          emoji?: string
          id?: string
          ingredients?: string[]
          instructions?: string[]
          meal_type?: string
          source?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          favorite_recipes: string[]
          food_preferences: Json
          id: string
          tried_recipes: string[]
          user_id: string
        }
        Insert: {
          favorite_recipes?: string[]
          food_preferences?: Json
          id?: string
          tried_recipes?: string[]
          user_id: string
        }
        Update: {
          favorite_recipes?: string[]
          food_preferences?: Json
          id?: string
          tried_recipes?: string[]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
