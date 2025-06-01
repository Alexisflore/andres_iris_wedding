import { Card, CardContent } from "@/components/ui/card"
import { Clock, Heart, Utensils, Music, Camera, Crown } from "lucide-react"
import Navigation from "@/components/navigation"

export default function ProgramPage() {
  const schedule = [
    {
      time: "14h00",
      title: "Accueil des invités",
      description: "Vin d'honneur et cocktail de bienvenue dans les jardins du château",
      icon: Heart,
    },
    {
      time: "15h00",
      title: "Cérémonie laïque",
      description: "Échange des vœux dans la roseraie, face à l'étang",
      icon: Heart,
    },
    {
      time: "16h00",
      title: "Séance photographique",
      description: "Portraits des mariés et photos de groupe dans le parc",
      icon: Camera,
    },
    {
      time: "17h30",
      title: "Cocktail dînatoire",
      description: "Apéritif raffiné et amuse-bouches sur la terrasse",
      icon: Utensils,
    },
    {
      time: "20h00",
      title: "Dîner de gala",
      description: "Repas servi dans la grande salle de réception",
      icon: Utensils,
    },
    {
      time: "23h00",
      title: "Ouverture du bal",
      description: "Première danse des mariés",
      icon: Music,
    },
    {
      time: "23h30",
      title: "Soirée dansante",
      description: "Musique et danse jusqu'aux premières lueurs de l'aube",
      icon: Music,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-stone-50">
      <Navigation />
      <div className="pt-24">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-sage-300 w-24"></div>
              <Crown className="w-6 h-6 text-sage-600 mx-6" />
              <div className="h-px bg-sage-300 w-24"></div>
            </div>
            <h1 className="text-6xl font-display text-stone-800 mb-6 heading-primary">Programme de la journée</h1>
            <p className="text-xl text-stone-600 max-w-4xl mx-auto font-elegant leading-relaxed">
              Découvrez le déroulement de notre célébration, pensée dans le respect des traditions et l'art de recevoir
              à la française.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-10 top-0 bottom-0 w-px bg-sage-300 hidden md:block"></div>

              <div className="space-y-12">
                {schedule.map((event, index) => {
                  const IconComponent = event.icon
                  return (
                    <div key={index} className="relative flex items-start space-x-8">
                      {/* Timeline dot */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-sage-600 to-sage-700 rounded-full flex items-center justify-center shadow-lg luxury-card">
                        <IconComponent className="w-9 h-9 text-cream-50" />
                      </div>

                      {/* Event card */}
                      <Card className="flex-1 luxury-card border-0 shadow-lg elegant-hover">
                        <CardContent className="p-8">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h3 className="text-3xl font-display text-stone-800 mb-2 md:mb-0 heading-secondary">
                              {event.title}
                            </h3>
                            <div className="flex items-center text-bordeaux-700">
                              <Clock className="w-5 h-5 mr-3" />
                              <span className="text-xl font-serif font-medium">{event.time}</span>
                            </div>
                          </div>
                          <p className="text-stone-700 text-lg font-elegant leading-relaxed">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-20 text-center">
            <Card className="luxury-card border-0 shadow-lg max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display text-stone-800 mb-4 heading-secondary">Note importante</h3>
                <p className="text-stone-700 font-elegant leading-relaxed">
                  Nous vous prions de bien vouloir respecter les horaires indiqués afin que cette journée se déroule
                  dans l'harmonie et la sérénité. Un vestiaire sera à votre disposition pour vos effets personnels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
