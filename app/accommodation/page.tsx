import { getAccommodations, testAccommodationInsert } from "@/app/actions/booking"
import { Crown } from "lucide-react"
import BookingClient from "./booking-client"
import Navigation from "@/components/navigation"

// Server Component (can call Server Actions during initial render)
export default async function AccommodationPage() {
  // Test des permissions d'insertion
  console.log("🧪 Running accommodation tests...")
  const testResult = await testAccommodationInsert()
  console.log("🧪 Test result:", testResult)
  
  const accommodations = await getAccommodations()

  // Si aucune accommodation n'existe, créer des données de test
  if (accommodations.length === 0) {
    console.log("🏗️ No accommodations found, creating test data...")
    // Vous devriez aller dans votre interface Supabase et ajouter manuellement des données
    console.log("⚠️ Please add accommodations data manually in Supabase interface")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-stone-50">
      <Navigation />
      <div className="pt-24">
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-sage-300 w-24"></div>
              <Crown className="w-6 h-6 text-sage-600 mx-6" />
              <div className="h-px bg-sage-300 w-24"></div>
            </div>
            <h1 className="text-6xl font-display text-stone-800 mb-6 heading-primary">Hébergement</h1>
            <p className="text-xl text-stone-600 max-w-4xl mx-auto font-elegant leading-relaxed">
            Nous avons sélectionné avec soin des établissements de qualité à proximité du domaine, pour que votre séjour soit à la hauteur de notre célébration
            </p>
            
            {/* Message de debug temporaire */}
            {accommodations.length === 0 && (
              <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-yellow-800">
                  ⚠️ Aucune accommodation trouvée dans la base de données. 
                  Veuillez ajouter des données dans l'interface Supabase.
                </p>
              </div>
            )}
          </div>

          <BookingClient accommodations={accommodations} />
        </div>
      </div>
    </div>
  )
}
