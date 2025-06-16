import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Car, Users, Music, Sparkles, Crown } from "lucide-react"
import Navigation from "@/components/navigation"

export default function InfoPage() {
  const rules = [
    {
      icon: Sparkles,
      title: "Interdiction de feux d'artifice",
      description:
        "Par respect pour le domaine historique et la sécurité de tous, les feux d'artifice sont strictement proscrits.",
    },
    {
      icon: Music,
      title: "Fin de la musique à 4h",
      description: "La musique cessera à 4h du matin, par courtoisie envers le voisinage et conformément aux usages.",
    },
    {
      icon: Car,
      title: "Transport individuel",
      description:
        "Aucun transport collectif n'est organisé. Nous vous prions de prévoir votre acheminement personnel.",
    },
    {
      icon: Users,
      title: "Invitations nominatives",
      description: "Seules les personnes officiellement conviées sont autorisées à prendre part aux festivités.",
    },
  ]

  const faq = [
    {
      question: "À quelle heure convient-il d'arriver ?",
      answer:
        "L'accueil des invités débute à 17h. Nous vous recommandons d'arriver à 16h45",
    },
    {
      question: "Le stationnement est-il assuré ?",
      answer:
        "Quarante places de stationnement sont gracieusement mises à disposition sur le domaine, dans le respect de l'ordre d'arrivée.",
    },
    {
      question: "Que prévoir en cas d'intempéries ?",
      answer:
        "Le château dispose d'espaces de réception couverts suffisants pour accueillir l'ensemble des convives en toute sérénité.",
    },
    {
      question: "Comment signaler mes restrictions alimentaires ?",
      answer:
        "Nous vous prions de bien vouloir nous faire part de vos allergies et régimes particuliers via le formulaire de restauration.",
    },
    {
      question: "La photographie est-elle autorisée ?",
      answer:
        "Les prises de vue sont permises, dans le respect de l'intimité des moments de cérémonie et avec la discrétion qui sied à l'événement.",
    },
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
            <h1 className="text-6xl font-display text-stone-800 mb-6 heading-primary">Informations pratiques</h1>
            <p className="text-xl text-stone-600 max-w-4xl mx-auto font-elegant leading-relaxed">
              Tout ce qu'il convient de savoir pour que cette journée se déroule dans l'harmonie et selon les règles de
              l'art de recevoir.
            </p>
          </div>

          {/* Important Rules */}
          <div className="mb-20">
            <h2 className="text-4xl font-display text-stone-800 text-center mb-12 heading-secondary">
              Règles de bienséance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rules.map((rule, index) => {
                const IconComponent = rule.icon
                return (
                  <Card key={index} className="luxury-card border-0 shadow-lg border-l-4 border-l-sage-500">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center text-stone-800 text-xl font-display heading-secondary">
                        <IconComponent className="w-7 h-7 mr-4 text-sage-600" />
                        {rule.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-stone-700 font-elegant leading-relaxed">{rule.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-display text-stone-800 text-center mb-12 heading-secondary">
              Questions fréquemment posées
            </h2>
            <div className="max-w-5xl mx-auto space-y-6">
              {faq.map((item, index) => (
                <Card key={index} className="luxury-card border-0 shadow-lg elegant-hover">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-stone-800 text-xl font-display heading-secondary">
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-700 font-elegant leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="text-center">
            <Card className="luxury-card border-0 shadow-lg max-w-3xl mx-auto bg-sage-50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-center text-stone-800 text-2xl font-display heading-secondary">
                  <AlertTriangle className="w-7 h-7 mr-3 text-bordeaux-600" />
                  Contact d'urgence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-stone-700 font-elegant mb-4 text-lg">
                  Pour toute question ou urgence le jour de la célébration :
                </p>
                <div className="space-y-2">
                  <p className="text-xl font-serif text-stone-800">
                    <span className="text-stone-600">Vincent S. :</span> 06 13 95 02 45
                  </p>
                  <p className="text-xl font-serif text-stone-800">
                    <span className="text-stone-600">Andrea E. :</span> 06 63 51 41 39
                  </p>
                  <p className="text-xl font-serif text-stone-800">
                    <span className="text-stone-600">Camille R. :</span> 07 62 23 66 50
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
