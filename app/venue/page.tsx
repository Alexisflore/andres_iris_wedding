import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Car, Train, Plane, Instagram, Crown } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"

export default function VenuePage() {
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
            <h1 className="text-6xl font-display text-stone-800 mb-6 heading-primary">Les Tourelles de Fonville</h1>
            <p className="text-xl text-stone-600 max-w-4xl mx-auto font-serif leading-relaxed">
              Un château d'exception du XVIIe siècle, niché au cœur de la campagne française, où l'histoire et
              l'élégance se rencontrent pour célébrer notre union.
            </p>
          </div>

          {/* Venue Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2">
              <div className="luxury-card rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=900"
                  alt="Tourelles de Fonville - Vue principale"
                  width={900}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="luxury-card rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Tourelles de Fonville - Jardins"
                  width={400}
                  height={240}
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="luxury-card rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Tourelles de Fonville - Intérieur"
                  width={400}
                  height={240}
                  className="w-full h-60 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Venue Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="luxury-card border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-stone-800 text-2xl font-serif">
                  <MapPin className="w-7 h-7 mr-3 text-sage-600" />
                  Localisation & Accès
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="font-serif text-stone-700 leading-relaxed">
                  <p className="text-lg mb-2">Les Tourelles de Fonville</p>
                  <p className="text-stone-600">28500 Fonville, Eure-et-Loir</p>
                  <p className="text-stone-600">France</p>
                </div>

                <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden elegant-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615674896!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMwLjEiTiAywrAxNyczMzIuMCJF!5e0!3m2!1sen!2sfr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>

                <Link
                  href="https://instagram.com/tourellesdefonville"
                  className="inline-flex items-center text-sage-700 hover:text-bordeaux-600 transition-colors font-serif"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  @tourellesdefonville
                </Link>
              </CardContent>
            </Card>

            <Card className="luxury-card border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-stone-800 text-2xl font-serif">
                  <Car className="w-7 h-7 mr-3 text-sage-600" />
                  Informations Pratiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-sage-50 p-6 rounded-lg elegant-border">
                  <p className="font-serif text-stone-700 text-lg mb-2">Stationnement</p>
                  <p className="text-stone-600 font-serif">40 places disponibles sur le domaine</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Train className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-stone-800 text-lg">En train</h4>
                      <p className="text-stone-600 font-serif">Gare de Dreux (15 minutes en voiture)</p>
                      <p className="text-sm text-stone-500 font-serif italic">
                        Liaison directe depuis Paris Montparnasse
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Plane className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-stone-800 text-lg">En avion</h4>
                      <p className="text-stone-600 font-serif">Aéroport de Paris-Orly (1h30 en voiture)</p>
                      <p className="text-sm text-stone-500 font-serif italic">Navettes disponibles vers Dreux</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Car className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-stone-800 text-lg">En voiture</h4>
                      <p className="text-stone-600 font-serif">Depuis Paris : A13 puis N12 (1h15)</p>
                      <p className="text-stone-600 font-serif">Depuis Chartres : N154 (30 minutes)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
