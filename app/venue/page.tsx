import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Car, Train, Plane, Instagram } from "lucide-react"
import Link from "next/link"
import PageLayout from "@/components/page-layout"
import { VENUE_IMAGES } from "@/lib/config"

export default function VenuePage() {
  return (
    <PageLayout
      title="Les Tourelles de Fonville"
      subtitle="Acienne ferme de caractère et d’exception, nichée au coeur de la campagne française, où l’histoire et l’élégance se rencontrent pour célébrer notre union"
    >
      {/* Venue Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
        <div className="lg:col-span-2">
          <div className="luxury-card rounded-lg overflow-hidden shadow-xl elegant-hover group">
            <Image
              src={VENUE_IMAGES.main}
              alt="Tourelles de Fonville - Vue principale"
              width={900}
              height={500}
              className="w-full h-64 sm:h-80 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8">
          {VENUE_IMAGES.gallery.map((image, index) => (
            <div key={index} className="luxury-card rounded-lg overflow-hidden shadow-lg elegant-hover group">
              <Image
                src={image}
                alt={`Tourelles de Fonville - ${index === 0 ? 'Jardins' : 'Intérieur'}`}
                width={400}
                height={240}
                className="w-full h-48 sm:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Venue Info */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
        <Card className="luxury-card border-0 shadow-lg">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center text-stone-800 text-xl sm:text-2xl font-serif">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-sage-600 flex-shrink-0" />
              Localisation & Accès
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="font-serif text-stone-700 leading-relaxed">
              <p className="text-base sm:text-lg mb-2">Les Tourelles de Fonville</p>
              <p className="text-stone-600 text-sm sm:text-base">28500 Fonville, Eure-et-Loir</p>
              <p className="text-stone-600 text-sm sm:text-base">France</p>
            </div>

            <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden elegant-border">
  <iframe
    src="https://maps.google.com/maps?q=Les+Tourelles+de+Fonville+28500+Fonville,+Eure-et-Loir,+France&output=embed&iwloc=near"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    className="rounded-lg"
  ></iframe>
</div>

            <Link
              href="https://instagram.com/lestourellesdefonville"
              className="inline-flex items-center text-sage-700 hover:text-bordeaux-600 transition-colors font-serif text-sm sm:text-base"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              @lestourellesdefonville
            </Link>
          </CardContent>
        </Card>

        <Card className="luxury-card border-0 shadow-lg">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center text-stone-800 text-xl sm:text-2xl font-serif">
              <Car className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-sage-600 flex-shrink-0" />
              Informations Pratiques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="bg-sage-50 p-4 sm:p-6 rounded-lg elegant-border">
              <p className="font-serif text-stone-700 text-base sm:text-lg mb-2">Stationnement</p>
              <p className="text-stone-600 font-serif text-sm sm:text-base">40 places disponibles sur le domaine</p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Train className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-medium text-stone-800 text-base sm:text-lg">En train</h4>
                  <p className="text-stone-600 font-serif text-sm sm:text-base">Gare de Dreux (15 minutes en voiture)</p>
                  <p className="text-xs sm:text-sm text-stone-500 font-serif italic">
                    Liaison directe depuis Paris Montparnasse
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-medium text-stone-800 text-base sm:text-lg">En avion</h4>
                  <p className="text-stone-600 font-serif text-sm sm:text-base">Aéroport de Paris-Orly (1h30 en voiture)</p>
                  <p className="text-xs sm:text-sm text-stone-500 font-serif italic">Navettes disponibles vers Dreux</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <Car className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-medium text-stone-800 text-base sm:text-lg">En voiture</h4>
                  <p className="text-stone-600 font-serif text-sm sm:text-base">Depuis Paris : A13 puis N12 (1h15)</p>
                  <p className="text-stone-600 font-serif text-sm sm:text-base">Depuis Chartres : N154 (30 minutes)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
