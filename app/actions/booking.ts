"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createBooking(
  accommodationId: string,
  guestName: string,
  guestEmail: string,
  guestCount: number,
) {
  try {
    // First, check if there's enough availability
    const { data: accommodation, error: fetchError } = await supabase
      .from("accommodations")
      .select("available, capacity")
      .eq("id", accommodationId)
      .single()

    if (fetchError || !accommodation) {
      return { success: false, message: "Hébergement non trouvé." }
    }

    if (accommodation.available < guestCount) {
      return { success: false, message: "Pas assez de places disponibles." }
    }

    // Create the booking
    const { error: bookingError } = await supabase.from("bookings").insert({
      accommodation_id: accommodationId,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_count: guestCount,
    })

    if (bookingError) {
      console.error("Error creating booking:", bookingError)
      return { success: false, message: "Erreur lors de la réservation." }
    }

    // Update availability
    const { error: updateError } = await supabase
      .from("accommodations")
      .update({
        available: accommodation.available - guestCount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", accommodationId)

    if (updateError) {
      console.error("Error updating availability:", updateError)
      return { success: false, message: "Erreur lors de la mise à jour de la disponibilité." }
    }

    revalidatePath("/accommodation")
    return { success: true, message: `Réservation confirmée pour ${guestCount} personne(s) !` }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "Une erreur inattendue s'est produite." }
  }
}

export async function getAccommodations() {
  try {
    console.log("🔍 Fetching accommodations from Supabase...")
    
    // Test de connexion Supabase
    console.log("🔗 Testing Supabase connection...")
    console.log("📋 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "...")
    console.log("🔑 Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + "...")
    
    // Vérifier les tables disponibles via une requête de test
    console.log("🏗️ Testing table access...")
    const testQuery = await supabase.from("accommodations").select("count", { count: "exact", head: true })
    console.log("📊 Table access test result:", testQuery)
    
    if (testQuery.error) {
      console.error("❌ Error accessing accommodations table:", testQuery.error)
      console.error("❌ Error details:", JSON.stringify(testQuery.error, null, 2))
    } else {
      console.log("✅ Table accessible, count:", testQuery.count)
    }
    
    // Essayer de lister toutes les tables disponibles (peut échouer selon les permissions)
    console.log("📋 Attempting to list available tables...")
    try {
      const tablesQuery = await supabase.rpc('get_table_names')
      console.log("📋 Available tables:", tablesQuery)
    } catch (tableError) {
      console.log("⚠️ Cannot list tables (normal if RPC not available):", tableError)
    }
    
    // Requête principale
    console.log("🔄 Executing main query...")
    const { data, error } = await supabase.from("accommodations").select("*").order("distance")

    if (error) {
      console.error("❌ Error fetching accommodations:", error)
      console.error("❌ Error message:", error.message)
      console.error("❌ Error details:", error.details)
      console.error("❌ Error hint:", error.hint)
      console.error("❌ Error code:", error.code)
      return []
    }

    console.log("✅ Accommodations fetched successfully:", data)
    console.log("📊 Number of accommodations:", data ? data.length : 0)
    
    // Log détaillé de chaque accommodation si des données existent
    if (data && data.length > 0) {
      console.log("🏠 Accommodation details:")
      data.forEach((acc, index) => {
        console.log(`  ${index + 1}. ${acc.name} (${acc.available}/${acc.capacity}) - ${acc.city}`)
      })
    } else {
      console.log("❌ No accommodations found in the response")
      
      // Test avec une requête plus simple
      console.log("🔄 Trying simplified query...")
      const simpleQuery = await supabase.from("accommodations").select("id, name")
      console.log("🔍 Simple query result:", simpleQuery)
      
      // Test avec un select count
      console.log("🔄 Trying count query...")
      const countQuery = await supabase.from("accommodations").select("*", { count: "exact" })
      console.log("🔢 Count query result:", countQuery)
    }

    return data || []
  } catch (error) {
    console.error("💥 Unexpected error:", error)
    console.error("💥 Error stack:", error instanceof Error ? error.stack : "No stack available")
    return []
  }
}

// Fonction de test pour vérifier les permissions d'écriture
export async function testAccommodationInsert() {
  try {
    console.log("🧪 Testing accommodation insert capability...")
    
    const testAccommodation = {
      name: "Test Hotel",
      capacity: 4,
      available: 4,
      address: "123 Test Street",
      city: "Test City",
      phone: "+33123456789",
      email: "test@hotel.com",
      distance: "5 km",
      type: "Hotel"
    }
    
    const { data, error } = await supabase
      .from("accommodations")
      .insert(testAccommodation)
      .select()
    
    if (error) {
      console.error("❌ Test insert failed:", error)
      return { success: false, error }
    } else {
      console.log("✅ Test insert successful:", data)
      
      // Supprimer le test
      if (data && data.length > 0) {
        const deleteResult = await supabase
          .from("accommodations")
          .delete()
          .eq("id", data[0].id)
        console.log("🗑️ Test data cleanup:", deleteResult)
      }
      
      return { success: true, data }
    }
  } catch (error) {
    console.error("💥 Test insert error:", error)
    return { success: false, error }
  }
}
