"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function submitRSVP(previousState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const attendance = formData.get("attendance") === "yes"
  const allergiesString = formData.get("allergies") as string
  const allergies = allergiesString ? allergiesString.split(",").map((a) => a.trim()) : []
  const dietary_restrictions = formData.get("dietary_restrictions") as string
  const additional_info = formData.get("additional_info") as string

  try {
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
