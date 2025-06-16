import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Shirt, Gem } from "lucide-react"
import PageLayout from "@/components/page-layout"
import { STYLE_IMAGES } from "@/lib/config"

export default function ThemePage() {
  const colorPalette = [
    { name: "Crème", colorClass: "bg-amber-200", description: "Élégance intemporelle" },
    { name: "Sage", colorClass: "bg-emerald-500", description: "Noblesse naturelle" },
    { name: "Bordeaux", colorClass: "bg-red-800", description: "Raffinement discret" },
    { name: "Pierre", colorClass: "bg-stone-600", description: "Sophistication sobre" },
    { name: "Marine", colorClass: "bg-slate-800", description: "Distinction classique" },
  ]

  return (
    <PageLayout>
      {/* Custom Header for Theme Page */}
      <div className="text-center mb-16 sm:mb-20">
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="h-px bg-sage-300 w-16 sm:w-24"></div>
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mx-4 sm:mx-6" />
          <div className="h-px bg-sage-300 w-16 sm:w-24"></div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-stone-800 mb-4 sm:mb-6 heading-primary">
          Thème & Dress Code
        </h1>
        <p className="text-xl sm:text-2xl text-bordeaux-800 font-serif italic mb-2 sm:mb-4">COMS</p>
        <p className="text-base sm:text-lg text-stone-600 font-elegant">Chic • Old-Money • Sprezzatura</p>
      </div>

      {/* Theme Explanation */}
      <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
        <Card className="luxury-card border-0 shadow-lg">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-display text-stone-800 heading-secondary">
              L'esprit COMS
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12">
            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-elegant mb-4 sm:mb-6">
              Notre thème s'inspire de l'élégance intemporelle de l'aristocratie européenne, mêlée à la
              décontraction raffinée de la sprezzatura italienne.
            </p>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-elegant">
              Pensez à un style sophistiqué mais naturel, riche en histoire mais sans ostentation. L'art de paraître
              sans effort, dans la plus pure tradition du savoir-vivre.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Color Palette */}
      <div className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-stone-800 text-center mb-8 sm:mb-12 heading-secondary">
          Palette de couleurs
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {colorPalette.map((colorItem, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full shadow-lg mb-3 sm:mb-4 mx-auto elegant-hover border-2 border-stone-300 ${colorItem.colorClass}`}
              ></div>
              <h3 className="font-serif font-medium text-stone-800 mb-1 text-sm sm:text-base">{colorItem.name}</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-elegant italic">{colorItem.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dress Code */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
        {/* Men's Dress Code */}
        <Card className="luxury-card border-0 shadow-2xl bg-gradient-to-br from-white to-stone-50/30">
          <CardHeader className="pb-4 sm:pb-6 border-b border-stone-200/50">
            <CardTitle className="flex items-center text-stone-800 text-2xl sm:text-3xl font-display heading-secondary">
              <Shirt className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-sage-600 flex-shrink-0" />
              Messieurs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 pt-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-serif font-medium text-stone-800 text-lg sm:text-xl mb-3">Accessoires</h4>
                <p className="text-stone-700 font-elegant leading-relaxed text-sm sm:text-base">
                  Cravate en soie, pochette assortie, chaussures en cuir patiné, montre de famille si possible.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50/80 to-sage-50/60 p-5 sm:p-6 rounded-lg border border-amber-200/40 shadow-inner">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-medium text-stone-800 text-lg sm:text-xl mb-3">Nuances & Harmonie</h4>
                  <p className="text-stone-700 font-elegant leading-relaxed text-sm sm:text-base">
                    Votre tenue peut composer plusieurs couleurs de cette palette, ou même divers tons dérivés.
                    L'art réside dans l'harmonie subtile des nuances.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-serif font-medium text-stone-800 text-lg sm:text-xl mb-3">À éviter</h4>
                <p className="text-stone-700 font-elegant leading-relaxed text-sm sm:text-base">
                  Nœud papillon et costume noir, réservés au marié et aux garçons d'honneur.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="luxury-card rounded-xl overflow-hidden shadow-lg border border-stone-200/60">
                <Image
                  src={STYLE_IMAGES.men}
                  alt="Inspiration tenue masculine élégante"
                  width={400}
                  height={300}
                  className="w-full h-56 sm:h-64 lg:h-80 object-cover object-center"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Women's Dress Code */}
        <Card className="luxury-card border-0 shadow-2xl bg-gradient-to-br from-white to-stone-50/30">
          <CardHeader className="pb-4 sm:pb-6 border-b border-stone-200/50">
            <CardTitle className="flex items-center text-stone-800 text-2xl sm:text-3xl font-display heading-secondary">
              <Palette className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-sage-600 flex-shrink-0" />
              Mesdames
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 pt-6">
            <div className="bg-gradient-to-r from-sage-50/80 to-amber-50/60 p-5 sm:p-6 rounded-lg border border-sage-200/40 shadow-inner">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-medium text-stone-800 text-lg sm:text-xl mb-3">Recommandé</h4>
                  <p className="text-stone-700 font-elegant leading-relaxed text-sm sm:text-base">
                    Robe midi ou longue en matières nobles : soie, crêpe, dentelle fine ou tweed. Coupes
                    intemporelles et élégantes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-serif font-medium text-stone-800 text-lg sm:text-xl mb-3">À éviter</h4>
                <p className="text-stone-700 font-elegant leading-relaxed text-sm sm:text-base">
                  Blanc (réservé à la mariée), noir total, couleurs fluorescentes.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="luxury-card rounded-xl overflow-hidden shadow-lg border border-stone-200/60">
                <Image
                  src={STYLE_IMAGES.women}
                  alt="Inspiration tenue féminine élégante"
                  width={400}
                  height={300}
                  className="w-full h-56 sm:h-64 lg:h-80 object-cover object-center"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Note */}
      <div className="mt-16 sm:mt-20 text-center">
        <Card className="luxury-card border-0 shadow-lg max-w-4xl mx-auto">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-display text-stone-800 mb-3 sm:mb-4 heading-secondary">
              L'art de la mesure
            </h3>
            <p className="text-stone-700 font-elegant leading-relaxed text-base sm:text-lg">
              "La vraie élégance réside dans la simplicité et la justesse du choix. Mieux vaut être sous-habillé que
              sur-habillé, mais toujours avec goût et respect pour l'occasion."
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
