"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function submitRSVP(previousState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const attendance = formData.get("attendance") === "yes"
  const allergiesString = formData.get("allergies") as string
  const allergies = allergiesString ? allergiesString.split(",").map((a) => a.trim()) : []
  const dietary_restrictions = formData.get("dietary") as string
  const additional_info = formData.get("message") as string

  try {
    // Vérifier si l'email existe déjà
    const { data: existingRSVP, error: checkError } = await supabase
      .from("rsvps")
      .select("*")
      .eq("email", email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows returned, ce qui est normal si l'email n'existe pas
      console.error("Error checking existing RSVP:", checkError)
      return { success: false, message: "Erreur lors de la vérification. Veuillez réessayer." }
    }

    // Si l'email existe déjà, retourner une réponse spéciale pour déclencher la modal
    if (existingRSVP) {
      return {
        success: false,
        needsConfirmation: true,
        existingRSVP,
        newData: {
          name,
          email,
          attendance,
          allergies: allergies.length > 0 ? allergies : null,
          dietary_restrictions: dietary_restrictions || null,
          additional_info: additional_info || null,
        },
        message: `Une réponse existe déjà pour l'adresse ${email}. Souhaitez-vous la modifier ?`
      }
    }

    // Insérer le nouveau RSVP
    const { error } = await supabase.from("rsvps").insert({
      name,
      email,
      attendance,
      allergies: allergies.length > 0 ? allergies : null,
      dietary_restrictions: dietary_restrictions || null,
      additional_info: additional_info || null,
    })

    if (error) {
      console.error("Error inserting RSVP:", error)
      return { success: false, message: "Erreur lors de l'enregistrement. Veuillez réessayer." }
    }

    revalidatePath("/catering")
    return {
      success: true,
      message: "Merci pour votre réponse ! Nous avons bien pris en compte vos préférences alimentaires.",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "Une erreur inattendue s'est produite." }
  }
}

export async function updateRSVP(rsvpId: string, newData: any) {
  try {
    const { error } = await supabase
      .from("rsvps")
      .update({
        name: newData.name,
        attendance: newData.attendance,
        allergies: newData.allergies,
        dietary_restrictions: newData.dietary_restrictions,
        additional_info: newData.additional_info,
      })
      .eq("id", rsvpId)

    if (error) {
      console.error("Error updating RSVP:", error)
      return { success: false, message: "Erreur lors de la mise à jour. Veuillez réessayer." }
    }

    revalidatePath("/catering")
    return {
      success: true,
      message: "Votre réponse a été mise à jour avec succès !",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "Une erreur inattendue s'est produite." }
  }
}
