import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      rsvps: {
        Row: {
          id: string
          name: string
          email: string
          attendance: boolean
          allergies: string[] | null
          dietary_restrictions: string | null
          additional_info: string | null
          created_at: string
        }
        Insert: {
          name: string
          email: string
          attendance: boolean
          allergies?: string[] | null
          dietary_restrictions?: string | null
          additional_info?: string | null
        }
      }
      accommodations: {
        Row: {
          id: string
          name: string
          capacity: number
          available: number
          address: string
          city: string
          phone: string | null
          email: string | null
          distance: string
          type: string
          created_at: string
          updated_at: string
        }
        Update: {
          available?: number
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          accommodation_id: string
          guest_name: string
          guest_email: string
          guest_count: number
          created_at: string
        }
        Insert: {
          accommodation_id: string
          guest_name: string
          guest_email: string
          guest_count: number
        }
      }
    }
  }
}
