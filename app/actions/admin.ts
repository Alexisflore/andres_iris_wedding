"use server"

import { supabase } from "@/lib/supabase"

export async function getAllRSVPs() {
  try {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching RSVPs:", error)
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data: data || [], error: null }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, data: [], error: "Une erreur inattendue s'est produite" }
  }
}

export async function getAllBookings() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        accommodations (
          name,
          city,
          type
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching bookings:", error)
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data: data || [], error: null }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, data: [], error: "Une erreur inattendue s'est produite" }
  }
}

export async function getAdminStats() {
  try {
    // Récupérer les statistiques des RSVPs
    const { data: rsvpStats, error: rsvpError } = await supabase
      .from("rsvps")
      .select("attendance")

    // Récupérer les statistiques des réservations
    const { data: bookingStats, error: bookingError } = await supabase
      .from("bookings")
      .select("guest_count")

    if (rsvpError || bookingError) {
      console.error("Error fetching stats:", rsvpError || bookingError)
      return { success: false, data: null, error: "Erreur lors de la récupération des statistiques" }
    }

    const totalRSVPs = rsvpStats?.length || 0
    const attendingRSVPs = rsvpStats?.filter(r => r.attendance).length || 0
    const notAttendingRSVPs = rsvpStats?.filter(r => !r.attendance).length || 0

    const totalBookings = bookingStats?.length || 0
    const totalGuests = bookingStats?.reduce((sum, booking) => sum + (booking.guest_count || 0), 0) || 0

    return {
      success: true,
      data: {
        rsvp: {
          total: totalRSVPs,
          attending: attendingRSVPs,
          notAttending: notAttendingRSVPs
        },
        bookings: {
          total: totalBookings,
          guests: totalGuests
        }
      },
      error: null
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, data: null, error: "Une erreur inattendue s'est produite" }
  }
} 