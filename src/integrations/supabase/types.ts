export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          current_balance: number
          id: string
          is_active: boolean
          name: string
          risk_per_trade: number
          starting_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_balance?: number
          id?: string
          is_active?: boolean
          name: string
          risk_per_trade?: number
          starting_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_balance?: number
          id?: string
          is_active?: boolean
          name?: string
          risk_per_trade?: number
          starting_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      firms: {
        Row: {
          created_at: string
          description: string | null
          discount_code: string | null
          id: string
          logo_url: string | null
          name: string
          payout: string | null
          pricing: string | null
          rating: number | null
          review_count: number | null
          slug: string
          tags: string[] | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_code?: string | null
          id?: string
          logo_url?: string | null
          name: string
          payout?: string | null
          pricing?: string | null
          rating?: number | null
          review_count?: number | null
          slug: string
          tags?: string[] | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_code?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          payout?: string | null
          pricing?: string | null
          rating?: number | null
          review_count?: number | null
          slug?: string
          tags?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          firm_id: string
          id: string
          rating: number
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string
          firm_id: string
          id?: string
          rating: number
          user_name: string
        }
        Update: {
          content?: string
          created_at?: string
          firm_id?: string
          id?: string
          rating?: number
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          account_id: string
          created_at: string
          date: string
          id: string
          image_url: string | null
          is_public: boolean
          notes: string | null
          result: string
          rr: number | null
          session: string
          strategy_tag: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id: string
          created_at?: string
          date?: string
          id?: string
          image_url?: string | null
          is_public?: boolean
          notes?: string | null
          result: string
          rr?: number | null
          session: string
          strategy_tag?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string
          created_at?: string
          date?: string
          id?: string
          image_url?: string | null
          is_public?: boolean
          notes?: string | null
          result?: string
          rr?: number | null
          session?: string
          strategy_tag?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_admin: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_admin?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      recalculate_account_balance: {
        Args: { account_id_param: string }
        Returns: undefined
      }
      set_account_active: {
        Args: { account_id_param: string }
        Returns: undefined
      }
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
