import { Card, CardContent } from "@/components/ui/card"
import { Clock, Heart, Utensils, Music, Camera, Wine, Users, Sparkles } from "lucide-react"
import PageLayout from "@/components/page-layout"

export default function ProgramPage() {
  const schedule = [
    {
      time: "17h00",
      title: "Accueil des invités",
      description: "Cocktail de bienvenue dans les jardins du domaine",
      icon: Users,
    },
    {
      time: "17h20",
      title: "Cérémonie laïque",
      description: "Échange des vœux dans la roseraie",
      icon: Heart,
      featured: true,
    },
    {
      time: "18h00",
      title: "Vin d'honneur",
      description: "Apéritif raffiné et amuse-bouche dans les jardins",
      icon: Wine,
    },
    {
      time: "19h10",
      title: "Séance photographique",
      description: "Portraits des mariés et photos de groupe dans les jardins",
      icon: Camera,
    },
    {
      time: "20h00",
      title: "Dîner",
      description: "Repas servi dans la grande salle de réception et arrivée des mariés",
      icon: Utensils,
    },
    {
      time: "23h30",
      title: "Ouverture de bal",
      description: "Première danse des mariés",
      icon: Music,
      featured: true,
    },
    {
      time: "00h00",
      title: "Soirée dansante",
      description: "Musique et danse jusqu'aux premières lueurs de l'aube",
      icon: Sparkles,
    },
  ]

  return (
    <PageLayout
      title="Programme de la journée"
      subtitle="Découvrez le déroulement de notre célébration, pensée dans le respect des traditions et l'art de recevoir à la française."
    >
      <div className="max-w-4xl mx-auto">
        {/* Modern Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-24">
            {schedule.map((event, index) => {
              const IconComponent = event.icon
              const isLeft = index % 2 === 0
              
              return (
                <div 
                  key={index} 
                  className={`relative animate-fade-in group ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex items-center`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 mb-8 lg:mb-0 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <Card className={`group-hover:shadow-2xl transition-all duration-500 border-0 ${
                      event.featured 
                        ? 'bg-gradient-to-br from-bordeaux-50 to-rose-50 shadow-xl' 
                        : 'bg-white/80 backdrop-blur-sm shadow-lg'
                    } luxury-card overflow-hidden`}>
                      <CardContent className="p-8 lg:p-10">
                        {/* Time badge - modern style */}
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                          event.featured
                            ? 'bg-bordeaux-100 text-bordeaux-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>

                        {/* Title */}
                        <h3 className={`text-2xl lg:text-3xl font-display mb-4 leading-tight ${
                          event.featured 
                            ? 'text-bordeaux-900' 
                            : 'text-stone-900'
                        }`}>
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-stone-600 font-elegant text-lg leading-relaxed">
                          {event.description}
                        </p>

                        {/* Featured decoration */}
                        {event.featured && (
                          <div className="mt-6 flex items-center">
                            <div className="h-px bg-gradient-to-r from-bordeaux-300 to-transparent flex-1"></div>
                            <div className="w-2 h-2 bg-bordeaux-400 rounded-full mx-3"></div>
                            <div className="h-px bg-gradient-to-l from-bordeaux-300 to-transparent flex-1"></div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Central Icon - modern floating style */}
                  <div className="relative flex-shrink-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10 mb-6 lg:mb-0">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 ${
                      event.featured
                        ? 'bg-gradient-to-br from-bordeaux-600 to-bordeaux-700'
                        : 'bg-gradient-to-br from-stone-600 to-stone-700'
                    } ring-4 ring-white`}>
                      <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    
                    {/* Pulse effect for featured events */}
                    {event.featured && (
                      <div className="absolute inset-0 rounded-full bg-bordeaux-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
                    )}
                  </div>

                  {/* Spacer for alignment */}
                  <div className="w-full lg:w-5/12 hidden lg:block"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modern Information Card */}
      <div className="mt-24 max-w-3xl mx-auto">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-stone-50 luxury-card overflow-hidden">
          <CardContent className="p-8 lg:p-12 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sage-600 to-sage-700 rounded-full mb-8 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-display text-stone-900 mb-6">
              Informations pratiques
            </h3>

            {/* Separator */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mb-8"></div>

            {/* Content */}
            <div className="space-y-6 text-stone-700 font-elegant text-lg leading-relaxed max-w-2xl mx-auto">
              <p>
                Nous vous prions de bien vouloir respecter les horaires indiqués afin que cette journée se déroule dans l'harmonie et la sérénité.
              </p>
              <p className="text-base text-stone-600">
                Un vestiaire sera à votre disposition pour vos effets personnels.
              </p>
            </div>

            {/* Modern decorative element */}
            <div className="flex items-center justify-center mt-8 space-x-2">
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              <div className="w-2 h-2 bg-stone-500 rounded-full"></div>
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subtle background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-sage-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-stone-100/20 rounded-full blur-3xl"></div>
      </div>
    </PageLayout>
  )
}
