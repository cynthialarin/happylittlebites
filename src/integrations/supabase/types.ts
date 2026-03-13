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
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          reference_id: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          reference_id?: string | null
          title: string
          type?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          reference_id?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
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
          fussy_foods: string[]
          gender: string
          id: string
          known_allergies: string[]
          name: string
          photo_url: string | null
          user_id: string
        }
        Insert: {
          avatar?: string
          birthdate: string
          feeding_approach?: string
          fussy_foods?: string[]
          gender?: string
          id: string
          known_allergies?: string[]
          name: string
          photo_url?: string | null
          user_id: string
        }
        Update: {
          avatar?: string
          birthdate?: string
          feeding_approach?: string
          fussy_foods?: string[]
          gender?: string
          id?: string
          known_allergies?: string[]
          name?: string
          photo_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          body: string
          created_at: string
          display_name: string
          id: string
          likes: number
          reply_count: number
          title: string
          topic: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          display_name?: string
          id?: string
          likes?: number
          reply_count?: number
          title: string
          topic?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          display_name?: string
          id?: string
          likes?: number
          reply_count?: number
          title?: string
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      community_replies: {
        Row: {
          body: string
          created_at: string
          display_name: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          display_name?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          display_name?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      diaper_entries: {
        Row: {
          child_id: string
          color: string
          created_at: string
          date: string
          diaper_type: string
          id: string
          notes: string
          time: string
          user_id: string
        }
        Insert: {
          child_id: string
          color?: string
          created_at?: string
          date: string
          diaper_type?: string
          id?: string
          notes?: string
          time: string
          user_id: string
        }
        Update: {
          child_id?: string
          color?: string
          created_at?: string
          date?: string
          diaper_type?: string
          id?: string
          notes?: string
          time?: string
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
          photo_url: string | null
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
          photo_url?: string | null
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
          photo_url?: string | null
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
      feedback_replies: {
        Row: {
          admin_id: string
          created_at: string
          id: string
          message: string
          ticket_id: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          id?: string
          message: string
          ticket_id: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          id?: string
          message?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_replies_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "feedback_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_tickets: {
        Row: {
          admin_notes: string
          category: string
          created_at: string
          description: string
          id: string
          priority: string
          screenshots: string[]
          status: string
          user_email: string
          user_id: string
          wants_response: boolean
        }
        Insert: {
          admin_notes?: string
          category?: string
          created_at?: string
          description: string
          id?: string
          priority?: string
          screenshots?: string[]
          status?: string
          user_email?: string
          user_id: string
          wants_response?: boolean
        }
        Update: {
          admin_notes?: string
          category?: string
          created_at?: string
          description?: string
          id?: string
          priority?: string
          screenshots?: string[]
          status?: string
          user_email?: string
          user_id?: string
          wants_response?: boolean
        }
        Relationships: []
      }
      feeding_entries: {
        Row: {
          amount_oz: number | null
          child_id: string
          created_at: string
          date: string
          duration_minutes: number | null
          feeding_type: string
          id: string
          notes: string
          side: string | null
          time: string
          user_id: string
        }
        Insert: {
          amount_oz?: number | null
          child_id: string
          created_at?: string
          date: string
          duration_minutes?: number | null
          feeding_type: string
          id?: string
          notes?: string
          side?: string | null
          time: string
          user_id: string
        }
        Update: {
          amount_oz?: number | null
          child_id?: string
          created_at?: string
          date?: string
          duration_minutes?: number | null
          feeding_type?: string
          id?: string
          notes?: string
          side?: string | null
          time?: string
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
      growth_measurements: {
        Row: {
          child_id: string
          created_at: string
          date: string
          head_cm: number | null
          height_cm: number | null
          id: string
          notes: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          child_id: string
          created_at?: string
          date: string
          head_cm?: number | null
          height_cm?: number | null
          id?: string
          notes?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          child_id?: string
          created_at?: string
          date?: string
          head_cm?: number | null
          height_cm?: number | null
          id?: string
          notes?: string
          user_id?: string
          weight_kg?: number | null
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
      milestone_achievements: {
        Row: {
          achieved_date: string
          child_id: string
          created_at: string
          id: string
          milestone_key: string
          notes: string
          user_id: string
        }
        Insert: {
          achieved_date: string
          child_id: string
          created_at?: string
          id?: string
          milestone_key: string
          notes?: string
          user_id: string
        }
        Update: {
          achieved_date?: string
          child_id?: string
          created_at?: string
          id?: string
          milestone_key?: string
          notes?: string
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
          trial_start_date: string | null
          user_id: string
        }
        Insert: {
          active_child_id?: string | null
          created_at?: string
          id?: string
          onboarding_complete?: boolean
          trial_start_date?: string | null
          user_id: string
        }
        Update: {
          active_child_id?: string | null
          created_at?: string
          id?: string
          onboarding_complete?: boolean
          trial_start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          reminder_enabled: boolean
          reminder_interval_hours: number | null
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          reminder_enabled?: boolean
          reminder_interval_hours?: number | null
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          reminder_enabled?: boolean
          reminder_interval_hours?: number | null
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
      sleep_entries: {
        Row: {
          child_id: string
          created_at: string
          date: string
          end_time: string
          id: string
          notes: string
          quality: string
          sleep_type: string
          start_time: string
          user_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          date: string
          end_time: string
          id?: string
          notes?: string
          quality?: string
          sleep_type?: string
          start_time: string
          user_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          date?: string
          end_time?: string
          id?: string
          notes?: string
          quality?: string
          sleep_type?: string
          start_time?: string
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
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_get_all_profiles: {
        Args: never
        Returns: {
          active_child_id: string | null
          created_at: string
          id: string
          onboarding_complete: boolean
          trial_start_date: string | null
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      admin_get_user_emails: {
        Args: never
        Returns: {
          created_at: string
          email: string
          id: string
        }[]
      }
      admin_get_user_stats: {
        Args: never
        Returns: {
          children_count: number
          diary_entries_count: number
          feedback_count: number
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_post_likes: { Args: { post_id: string }; Returns: undefined }
      increment_reply_count: { Args: { post_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
