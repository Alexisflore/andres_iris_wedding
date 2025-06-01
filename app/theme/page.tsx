import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Shirt, Crown, Gem } from "lucide-react"
import Navigation from "@/components/navigation"

export default function ThemePage() {
  const colorPalette = [
    { name: "Crème", color: "bg-cream-200", description: "Élégance intemporelle" },
    { name: "Sage", color: "bg-sage-400", description: "Noblesse naturelle" },
    { name: "Bordeaux", color: "bg-bordeaux-600", description: "Raffinement discret" },
    { name: "Pierre", color: "bg-stone-400", description: "Sophistication sobre" },
    { name: "Marine", color: "bg-navy-700", description: "Distinction classique" },
  ]

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
            <h1 className="text-6xl font-display text-stone-800 mb-6 heading-primary">Thème & Dress Code</h1>
            <p className="text-2xl text-bordeaux-700 font-serif italic mb-4">COMS</p>
            <p className="text-lg text-stone-600 font-elegant">Chic • Old-Money • Sprezzatura</p>
          </div>

          {/* Theme Explanation */}
          <div className="max-w-5xl mx-auto mb-20">
            <Card className="luxury-card border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-4xl font-display text-stone-800 heading-secondary">L'esprit COMS</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-12 pb-12">
                <p className="text-xl text-stone-700 leading-relaxed font-elegant mb-6">
                  Notre thème s'inspire de l'élégance intemporelle de l'aristocratie européenne, mêlée à la
                  décontraction raffinée de la sprezzatura italienne.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed font-elegant">
                  Pensez à un style sophistiqué mais naturel, riche en histoire mais sans ostentation. L'art de paraître
                  sans effort, dans la plus pure tradition du savoir-vivre.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Color Palette */}
          <div className="mb-20">
            <h2 className="text-4xl font-display text-stone-800 text-center mb-12 heading-secondary">
              Palette de couleurs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
              {colorPalette.map((color, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`w-24 h-24 rounded-full ${color.color} shadow-lg mb-4 mx-auto elegant-hover luxury-card`}
                  ></div>
                  <h3 className="font-serif font-medium text-stone-800 mb-1">{color.name}</h3>
                  <p className="text-sm text-stone-600 font-elegant italic">{color.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dress Code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Men's Dress Code */}
            <Card className="luxury-card border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-stone-800 text-3xl font-display heading-secondary">
                  <Shirt className="w-8 h-8 mr-4 text-sage-600" />
                  Messieurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-sage-50 p-6 rounded-lg elegant-border">
                  <div className="flex items-start space-x-4">
                    <Crown className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-stone-800 text-xl mb-2">Recommandé</h4>
                      <p className="text-stone-700 font-elegant leading-relaxed">
                        Costume trois-pièces en laine fine, couleurs nobles : marine, gris anthracite, beige ou bordeaux
                        discret.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Gem className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif font-medium text-stone-800 text-xl mb-2">Accessoires</h4>
                    <p className="text-stone-700 font-elegant leading-relaxed">
                      Cravate en soie ou nœud papillon, pochette assortie, chaussures en cuir patiné, montre de famille
                      si possible.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="luxury-card rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Inspiration tenue masculine"
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Women's Dress Code */}
            <Card className="luxury-card border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-stone-800 text-3xl font-display heading-secondary">
                  <Palette className="w-8 h-8 mr-4 text-sage-600" />
                  Mesdames
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-sage-50 p-6 rounded-lg elegant-border">
                  <div className="flex items-start space-x-4">
                    <Crown className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-stone-800 text-xl mb-2">Recommandé</h4>
                      <p className="text-stone-700 font-elegant leading-relaxed">
                        Robe midi ou longue en matières nobles : soie, crêpe, dentelle fine ou tweed. Coupes
                        intemporelles et élégantes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Gem className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif font-medium text-stone-800 text-xl mb-2">À éviter</h4>
                    <p className="text-stone-700 font-elegant leading-relaxed">
                      Blanc (réservé à la mariée), noir total, couleurs fluorescentes, décolletés trop prononcés,
                      mini-robes.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="luxury-card rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Inspiration tenue féminine"
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final Note */}
          <div className="mt-20 text-center">
            <Card className="luxury-card border-0 shadow-lg max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display text-stone-800 mb-4 heading-secondary">L'art de la mesure</h3>
                <p className="text-stone-700 font-elegant leading-relaxed text-lg">
                  "La vraie élégance réside dans la simplicité et la justesse du choix. Mieux vaut être sous-habillé que
                  sur-habillé, mais toujours avec goût et respect pour l'occasion."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
