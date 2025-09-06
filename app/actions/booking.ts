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
    // Vérifier si l'email existe déjà dans les réservations
    const { data: existingBooking, error: checkError } = await supabase
      .from("bookings")
      .select(`
        *,
        accommodations (
          name,
          city,
          type
        )
      `)
      .eq("guest_email", guestEmail)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows returned, ce qui est normal si l'email n'existe pas
      console.error("Error checking existing booking:", checkError)
      return { success: false, message: "Erreur lors de la vérification. Veuillez réessayer." }
    }

    // Vérifier la capacité totale et les réservations existantes pour cet hébergement
    const { data: accommodation, error: fetchError } = await supabase
      .from("accommodations")
      .select("capacity")
      .eq("id", accommodationId)
      .single()

    if (fetchError || !accommodation) {
      return { success: false, message: "Hébergement non trouvé." }
    }

    // Calculer les réservations existantes pour cet hébergement
    const { data: existingBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("guest_count")
      .eq("accommodation_id", accommodationId)

    if (bookingsError) {
      console.error("Error fetching existing bookings:", bookingsError)
      return { success: false, message: "Erreur lors de la vérification de la disponibilité." }
    }

    // Calculer le total des réservations existantes
    const totalBooked = existingBookings?.reduce((total, booking) => total + booking.guest_count, 0) || 0
    const available = accommodation.capacity - totalBooked

    if (available < guestCount) {
      return { success: false, message: `Pas assez de places disponibles. Il reste ${available} place(s) disponible(s).` }
    }

    // Si l'email existe déjà, retourner une réponse spéciale pour déclencher la modal
    if (existingBooking) {
      return {
        success: false,
        needsConfirmation: true,
        existingBooking,
        newData: {
          accommodationId,
          guestName,
          guestEmail,
          guestCount,
        },
        message: `Une information existe déjà pour l'adresse ${guestEmail}. Souhaitez-vous la modifier ou ajouter une nouvelle information ?`
      }
    }

    // Créer la réservation
    const { error: bookingError } = await supabase.from("bookings").insert({
      accommodation_id: accommodationId,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_count: guestCount,
    })

    if (bookingError) {
      console.error("Error creating booking:", bookingError)
      return { success: false, message: "Erreur lors de l'enregistrement." }
    }

    revalidatePath("/accommodation")
    return { success: true, message: `Merci de nous avoir prévenu de votre réservation !` }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "Une erreur inattendue s'est produite." }
  }
}

export async function updateBooking(bookingId: string, newData: any) {
  try {
    // Vérifier la capacité pour le nouvel hébergement
    const { data: accommodation, error: fetchError } = await supabase
      .from("accommodations")
      .select("capacity")
      .eq("id", newData.accommodationId)
      .single()

    if (fetchError || !accommodation) {
      return { success: false, message: "Hébergement non trouvé." }
    }

    // Récupérer la réservation existante pour connaître l'ancien nombre de personnes
    const { data: currentBooking, error: currentError } = await supabase
      .from("bookings")
      .select("guest_count, accommodation_id")
      .eq("id", bookingId)
      .single()

    if (currentError || !currentBooking) {
      return { success: false, message: "Information introuvable." }
    }

    // Calculer les réservations existantes pour le nouvel hébergement
    const { data: existingBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("guest_count")
      .eq("accommodation_id", newData.accommodationId)
      .neq("id", bookingId) // Exclure la réservation actuelle

    if (bookingsError) {
      console.error("Error fetching existing bookings:", bookingsError)
      return { success: false, message: "Erreur lors de la vérification de la disponibilité." }
    }

    // Calculer le total des réservations existantes
    const totalBooked = existingBookings?.reduce((total, booking) => total + booking.guest_count, 0) || 0
    const available = accommodation.capacity - totalBooked

    if (available < newData.guestCount) {
      return { success: false, message: `Pas assez de places disponibles. Il reste ${available} place(s) disponible(s).` }
    }

    // Mettre à jour la réservation
    const { error: updateError } = await supabase
      .from("bookings")
      .update({
        accommodation_id: newData.accommodationId,
        guest_name: newData.guestName,
        guest_count: newData.guestCount,
      })
      .eq("id", bookingId)

    if (updateError) {
      console.error("Error updating booking:", updateError)
      return { success: false, message: "Erreur lors de la mise à jour. Veuillez réessayer." }
    }

    revalidatePath("/accommodation")
    return {
      success: true,
      message: "Votre information a été mise à jour avec succès ! Merci de nous avoir prévenu.",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "Une erreur inattendue s'est produite." }
  }
}

export async function forceCreateBooking(
  accommodationId: string,
  guestName: string,
  guestEmail: string,
  guestCount: number,
) {
  try {
    // Vérifier la capacité totale et les réservations existantes pour cet hébergement
    const { data: accommodation, error: fetchError } = await supabase
      .from("accommodations")
      .select("capacity")
      .eq("id", accommodationId)
      .single()

    if (fetchError || !accommodation) {
      return { success: false, message: "Hébergement non trouvé." }
    }

    // Calculer les réservations existantes pour cet hébergement
    const { data: existingBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("guest_count")
      .eq("accommodation_id", accommodationId)

    if (bookingsError) {
      console.error("Error fetching existing bookings:", bookingsError)
      return { success: false, message: "Erreur lors de la vérification de la disponibilité." }
    }

    // Calculer le total des réservations existantes
    const totalBooked = existingBookings?.reduce((total, booking) => total + booking.guest_count, 0) || 0
    const available = accommodation.capacity - totalBooked

    if (available < guestCount) {
      return { success: false, message: `Pas assez de places disponibles. Il reste ${available} place(s) disponible(s).` }
    }

    // Créer la nouvelle réservation (en forçant même si l'email existe déjà)
    const { error: bookingError } = await supabase.from("bookings").insert({
      accommodation_id: accommodationId,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_count: guestCount,
    })

    if (bookingError) {
      console.error("Error creating booking:", bookingError)
      return { success: false, message: "Erreur lors de l'enregistrement." }
    }

    revalidatePath("/accommodation")
    return { success: true, message: `Merci de nous avoir prévenu de votre réservation de ${guestCount} personne(s) !` }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "Une erreur inattendue s'est produite." }
  }
}

export async function getAccommodations() {
  try {
    console.log("🔍 Fetching accommodations from Supabase...")
    
    // Récupérer les hébergements
    const { data: accommodations, error } = await supabase
      .from("accommodations")
      .select("*")
      .order("distance")

    if (error) {
      console.error("❌ Error fetching accommodations:", error)
      return []
    }

    if (!accommodations || accommodations.length === 0) {
      console.log("❌ No accommodations found")
      return []
    }

    // Récupérer toutes les réservations pour calculer la disponibilité
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("accommodation_id, guest_count")

    if (bookingsError) {
      console.error("❌ Error fetching bookings:", bookingsError)
      // Retourner les accommodations sans mise à jour de disponibilité
      return accommodations
    }

    // Calculer la disponibilité pour chaque hébergement
    const accommodationsWithAvailability = accommodations.map(accommodation => {
      // Calculer le total des réservations pour cet hébergement
      const totalBooked = bookings
        ?.filter(booking => booking.accommodation_id === accommodation.id)
        ?.reduce((total, booking) => total + booking.guest_count, 0) || 0

      // Calculer la disponibilité
      const available = Math.max(0, accommodation.capacity - totalBooked)

      console.log(`🏠 ${accommodation.name}: ${available}/${accommodation.capacity} disponible (${totalBooked} réservé)`)

      return {
        ...accommodation,
        available
      }
    })

    console.log("✅ Accommodations with calculated availability:", accommodationsWithAvailability.length)
    
    return accommodationsWithAvailability
  } catch (error) {
    console.error("💥 Unexpected error:", error)
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
