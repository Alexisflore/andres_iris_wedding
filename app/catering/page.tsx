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
      <div className="max-w-3xl mx-auto">
        <Card className="luxury-card border-0 shadow-lg">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-display text-stone-800 heading-secondary">
              Confirmation de présence
            </CardTitle>
            <p className="text-stone-600 font-elegant mt-3 sm:mt-4 text-sm sm:text-base">
              Merci de nous faire part de vos préférences alimentaires
            </p>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <form action={action} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="name" className="font-serif text-stone-800 text-sm sm:text-base">
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="mt-2 elegant-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-serif text-stone-800 text-sm sm:text-base">
                    Adresse électronique
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    className="mt-2 elegant-border"
                    required
                  />
                </div>
              </div>

              <div className="bg-sage-50 p-4 sm:p-6 rounded-lg elegant-border">
                <Label className="font-serif text-stone-800 text-base sm:text-lg mb-3 sm:mb-4 block">Présence au repas</Label>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="radio" value="yes" id="yes" name="attendance" className="text-sage-600" />
                    <Label htmlFor="yes" className="font-elegant text-stone-700 text-sm sm:text-base">
                      Oui, j'aurai l'honneur d'être présent(e)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="radio" value="no" id="no" name="attendance" className="text-sage-600" />
                    <Label htmlFor="no" className="font-elegant text-stone-700 text-sm sm:text-base">
                      Non, je ne pourrai malheureusement pas être présent(e)
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-serif text-stone-800 text-base sm:text-lg mb-3 sm:mb-4 block">
                  Allergies et intolérances alimentaires
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {allergyOptions.map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={allergy}
                        onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                        className="border-sage-300"
                      />
                      <Label htmlFor={allergy} className="font-elegant text-stone-700 text-xs sm:text-sm">
                        {allergy}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="dietary" className="font-serif text-stone-800 text-base sm:text-lg">
                  Régime alimentaire particulier
                </Label>
                <Textarea
                  id="dietary"
                  name="dietary"
                  placeholder="Végétarien, végan, sans gluten, halal, casher..."
                  className="mt-2 elegant-border resize-none"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-serif text-stone-800 text-base sm:text-lg">
                  Message (optionnel)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Vos souhaits particuliers pour cette journée..."
                  className="mt-2 elegant-border resize-none"
                  rows={4}
                />
              </div>

              {state?.success && (
                <div className="bg-sage-50 border border-sage-200 rounded-lg p-4 text-center">
                  <p className="text-sage-800 font-elegant">
                    Merci ! Votre réponse a été enregistrée avec succès.
                  </p>
                </div>
              )}

              {state && !state.success && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-800 font-elegant">
                    Une erreur s'est produite. Veuillez réessayer.
                  </p>
                </div>
              )}

              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-sage-600 hover:bg-sage-700 text-cream-50 px-8 sm:px-12 py-2 sm:py-3 font-serif text-base sm:text-lg elegant-hover"
                >
                  {isPending ? "Envoi..." : "Confirmer ma présence"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
