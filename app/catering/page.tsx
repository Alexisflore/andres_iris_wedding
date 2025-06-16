"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Utensils, Wine, Cake, ChefHat } from "lucide-react"
import { submitRSVP } from "@/app/actions/rsvp"
import { useActionState } from "react"
import PageLayout from "@/components/page-layout"

export default function CateringPage() {
  const [allergies, setAllergies] = useState<string[]>([])
  const [state, action, isPending] = useActionState(submitRSVP, null)

  const allergyOptions = ["Gluten", "Lactose", "Fruits à coque", "Œufs", "Poisson", "Crustacés", "Soja", "Céleri"]

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setAllergies((prev) => 
      checked ? [...prev, allergy] : prev.filter((a) => a !== allergy)
    )
  }

  return (
    <PageLayout
      title="Restauration"
      subtitle="Un menu d'exception conçu par notre chef, dans la plus pure tradition de la gastronomie française, pour célébrer notre union avec raffinement."
    >
      {/* Menu Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
        <Card className="luxury-card border-0 shadow-lg elegant-hover">
          <CardHeader className="text-center pb-3 sm:pb-4">
            <CardTitle className="flex flex-col items-center text-stone-800 text-lg sm:text-xl lg:text-2xl font-display">
              <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-sage-600" />
              Cocktail d'accueil
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="space-y-2 sm:space-y-3 text-stone-700 font-elegant text-sm sm:text-base">
              <li>• Verrines de saumon fumé d'Écosse</li>
              <li>• Canapés au foie gras du Périgord</li>
              <li>• Macarons salés aux herbes fines</li>
              <li>• Tartines d'avocat et crevettes grises</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="luxury-card border-0 shadow-lg elegant-hover">
          <CardHeader className="text-center pb-3 sm:pb-4">
            <CardTitle className="flex flex-col items-center text-stone-800 text-lg sm:text-xl lg:text-2xl font-display">
              <Wine className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-sage-600" />
              Entrée
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="space-y-2 sm:space-y-3 text-stone-700 font-elegant text-sm sm:text-base">
              <li>• Salade de homard breton</li>
              <li>• Vinaigrette à la passion</li>
              <li>• Mesclun de jeunes pousses</li>
              <li>• Tuile de parmesan affiné</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="luxury-card border-0 shadow-lg elegant-hover">
          <CardHeader className="text-center pb-3 sm:pb-4">
            <CardTitle className="flex flex-col items-center text-stone-800 text-lg sm:text-xl lg:text-2xl font-display">
              <Utensils className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-sage-600" />
              Plat Principal
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="space-y-2 sm:space-y-3 text-stone-700 font-elegant text-sm sm:text-base">
              <li>• Filet de bœuf Wellington</li>
              <li>• Gratin dauphinois aux truffes</li>
              <li>• Légumes de saison du potager</li>
              <li>• Sauce au porto millésimé</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="luxury-card border-0 shadow-lg elegant-hover">
          <CardHeader className="text-center pb-3 sm:pb-4">
            <CardTitle className="flex flex-col items-center text-stone-800 text-lg sm:text-xl lg:text-2xl font-display">
              <Cake className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-sage-600" />
              Dessert
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="space-y-2 sm:space-y-3 text-stone-700 font-elegant text-sm sm:text-base">
              <li>• Pièce montée traditionnelle</li>
              <li>• Mignardises du pâtissier</li>
              <li>• Fruits de saison confits</li>
              <li>• Café gourmand et digestifs</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Wine Pairing */}
      <div className="mb-16 sm:mb-20">
        <Card className="luxury-card border-0 shadow-lg max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-display text-stone-800 heading-secondary">
              Accord des vins
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-stone-700 font-elegant leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
              Notre sommelier a sélectionné des crus d'exception pour accompagner chaque service, privilégiant les
              domaines familiaux et les millésimes de caractère.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base">
              <div>
                <h4 className="font-serif font-medium text-stone-800 mb-2">Champagne</h4>
                <p className="text-stone-600 font-elegant">Bollinger Grande Cuvée</p>
              </div>
              <div>
                <h4 className="font-serif font-medium text-stone-800 mb-2">Vin blanc</h4>
                <p className="text-stone-600 font-elegant">Chablis Premier Cru 2020</p>
              </div>
              <div>
                <h4 className="font-serif font-medium text-stone-800 mb-2">Vin rouge</h4>
                <p className="text-stone-600 font-elegant">Châteauneuf-du-Pape 2018</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RSVP Form */}
      <div className="max-w-4xl mx-auto">
        <Card className="luxury-card border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-cream-50 to-stone-50">
          <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-sage-50 to-cream-50 border-b border-sage-100">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sage-100 mb-4 sm:mb-6">
              <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-sage-600" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-display text-stone-800 heading-secondary mb-2">
              Confirmation de présence
            </CardTitle>
            <p className="text-stone-600 font-elegant text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Merci de nous faire part de vos préférences alimentaires afin que notre chef puisse préparer 
              un menu parfaitement adapté à tous nos invités.
            </p>
          </CardHeader>
          <CardContent className="px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
            <form action={action} className="space-y-8 sm:space-y-10">
              {/* Informations personnelles */}
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-display text-stone-800 text-center border-b border-sage-200 pb-3">
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="font-serif text-stone-800 text-sm sm:text-base font-medium">
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    name="name"
                      className="elegant-border h-12 sm:h-14 bg-white/70 backdrop-blur-sm border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 transition-all duration-300"
                      placeholder="Prénom Nom"
                    required
                  />
                </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="font-serif text-stone-800 text-sm sm:text-base font-medium">
                    Adresse électronique
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                      className="elegant-border h-12 sm:h-14 bg-white/70 backdrop-blur-sm border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 transition-all duration-300"
                      placeholder="votre@email.fr"
                    required
                  />
                  </div>
                </div>
              </div>

              {/* Présence */}
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-display text-stone-800 text-center border-b border-sage-200 pb-3">
                  Présence au repas
                </h3>
                <div className="bg-gradient-to-br from-sage-50/50 to-cream-50/50 p-6 sm:p-8 rounded-xl border border-sage-100 backdrop-blur-sm">
                  <RadioGroup name="attendance" className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/60 border border-sage-100 hover:bg-sage-50/60 transition-all duration-300 group">
                      <RadioGroupItem value="yes" id="yes" className="border-sage-300 text-sage-600" />
                      <Label htmlFor="yes" className="font-elegant text-stone-700 text-sm sm:text-base cursor-pointer flex-1 group-hover:text-sage-800 transition-colors">
                        ✨ Oui, j'aurai l'honneur d'être présent(e)
                    </Label>
                  </div>
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/60 border border-sage-100 hover:bg-sage-50/60 transition-all duration-300 group">
                      <RadioGroupItem value="no" id="no" className="border-sage-300 text-sage-600" />
                      <Label htmlFor="no" className="font-elegant text-stone-700 text-sm sm:text-base cursor-pointer flex-1 group-hover:text-sage-800 transition-colors">
                        💔 Non, je ne pourrai malheureusement pas être présent(e)
                    </Label>
                  </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Allergies */}
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-display text-stone-800 text-center border-b border-sage-200 pb-3">
                  Allergies et intolérances alimentaires
                </h3>
                <div className="bg-gradient-to-br from-cream-50/50 to-sage-50/50 p-6 sm:p-8 rounded-xl border border-sage-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {allergyOptions.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-3 p-3 rounded-lg bg-white/60 border border-sage-100 hover:bg-sage-50/60 transition-all duration-300 group">
                      <Checkbox
                        id={allergy}
                        onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                          className="border-sage-300 data-[state=checked]:bg-sage-600"
                      />
                        <Label htmlFor={allergy} className="font-elegant text-stone-700 text-xs sm:text-sm cursor-pointer group-hover:text-sage-800 transition-colors">
                        {allergy}
                      </Label>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              {/* Régime particulier */}
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-display text-stone-800 text-center border-b border-sage-200 pb-3">
                  Préférences alimentaires
                </h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="dietary" className="font-serif text-stone-800 text-sm sm:text-base font-medium">
                  Régime alimentaire particulier
                </Label>
                <Textarea
                  id="dietary"
                  name="dietary"
                  placeholder="Végétarien, végan, sans gluten, halal, casher..."
                      className="elegant-border resize-none bg-white/70 backdrop-blur-sm border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 transition-all duration-300 min-h-[80px]"
                  rows={3}
                />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-display text-stone-800 text-center border-b border-sage-200 pb-3">
                  Message personnel
                </h3>
                <div className="space-y-3">
                  <Label htmlFor="message" className="font-serif text-stone-800 text-sm sm:text-base font-medium">
                    Vos souhaits pour cette journée (optionnel)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                    placeholder="Partagez vos souhaits particuliers pour cette journée magique..."
                    className="elegant-border resize-none bg-white/70 backdrop-blur-sm border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 transition-all duration-300 min-h-[100px]"
                  rows={4}
                />
                </div>
              </div>

              {/* Messages de statut */}
              {state?.success && (
                <div className="bg-gradient-to-r from-sage-50 to-sage-100 border border-sage-200 rounded-xl p-6 text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-200 mb-3">
                    ✓
                  </div>
                  <p className="text-sage-800 font-elegant text-lg">
                    Merci ! Votre réponse a été enregistrée avec succès.
                  </p>
                </div>
              )}

              {state && !state.success && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-200 mb-3">
                    ⚠
                  </div>
                  <p className="text-red-800 font-elegant text-lg">
                    Une erreur s'est produite. Veuillez réessayer.
                  </p>
                </div>
              )}

              {/* Bouton de soumission */}
              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-cream-50 px-12 sm:px-16 py-4 sm:py-5 font-serif text-base sm:text-lg elegant-hover shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isPending ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-cream-200 border-t-transparent rounded-full animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </span>
                  ) : (
                    "Confirmer ma présence"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
