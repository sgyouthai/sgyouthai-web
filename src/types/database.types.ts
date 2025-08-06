export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string | null;
          author_id: string;
          published: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content?: string | null;
          author_id: string;
          published?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string | null;
          author_id?: string;
          published?: boolean;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
