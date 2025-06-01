"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Utensils, Wine, Cake, Crown, ChefHat } from "lucide-react"
import { submitRSVP } from "@/app/actions/rsvp"
import { useActionState } from "react"
import Navigation from "@/components/navigation"

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
            <h1 className="text-6xl font-display text-stone-800 mb-6 heading-primary">Restauration</h1>
            <p className="text-xl text-stone-600 max-w-4xl mx-auto font-elegant leading-relaxed">
              Un menu d'exception conçu par notre chef, dans la plus pure tradition de la gastronomie française, pour
              célébrer notre union avec raffinement.
            </p>
          </div>

          {/* Menu Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Card className="luxury-card border-0 shadow-lg elegant-hover">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex flex-col items-center text-stone-800 text-2xl font-display">
                  <ChefHat className="w-8 h-8 mb-3 text-sage-600" />
                  Cocktail d'accueil
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-stone-700 font-elegant">
                  <li>• Verrines de saumon fumé d'Écosse</li>
                  <li>• Canapés au foie gras du Périgord</li>
                  <li>• Macarons salés aux herbes fines</li>
                  <li>• Tartines d'avocat et crevettes grises</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="luxury-card border-0 shadow-lg elegant-hover">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex flex-col items-center text-stone-800 text-2xl font-display">
                  <Wine className="w-8 h-8 mb-3 text-sage-600" />
                  Entrée
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-stone-700 font-elegant">
                  <li>• Salade de homard breton</li>
                  <li>• Vinaigrette à la passion</li>
                  <li>• Mesclun de jeunes pousses</li>
                  <li>• Tuile de parmesan affiné</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="luxury-card border-0 shadow-lg elegant-hover">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex flex-col items-center text-stone-800 text-2xl font-display">
                  <Utensils className="w-8 h-8 mb-3 text-sage-600" />
                  Plat Principal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-stone-700 font-elegant">
                  <li>• Filet de bœuf Wellington</li>
                  <li>• Gratin dauphinois aux truffes</li>
                  <li>• Légumes de saison du potager</li>
                  <li>• Sauce au porto millésimé</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="luxury-card border-0 shadow-lg elegant-hover">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex flex-col items-center text-stone-800 text-2xl font-display">
                  <Cake className="w-8 h-8 mb-3 text-sage-600" />
                  Dessert
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-stone-700 font-elegant">
                  <li>• Pièce montée traditionnelle</li>
                  <li>• Mignardises du pâtissier</li>
                  <li>• Fruits de saison confits</li>
                  <li>• Café gourmand et digestifs</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Wine Pairing */}
          <div className="mb-20">
            <Card className="luxury-card border-0 shadow-lg max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-display text-stone-800 heading-secondary">
                  Accord des vins
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-stone-700 font-elegant leading-relaxed text-lg mb-6">
                  Notre sommelier a sélectionné des crus d'exception pour accompagner chaque service, privilégiant les
                  domaines familiaux et les millésimes de caractère.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
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
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-4xl font-display text-stone-800 heading-secondary">
                  Confirmation de présence
                </CardTitle>
                <p className="text-stone-600 font-elegant mt-4">
                  Merci de nous faire part de vos préférences alimentaires
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form action={action} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="font-serif text-stone-800">
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
                      <Label htmlFor="email" className="font-serif text-stone-800">
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

                  <div className="bg-sage-50 p-6 rounded-lg elegant-border">
                    <Label className="font-serif text-stone-800 text-lg mb-4 block">Présence au repas</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input type="radio" value="yes" id="yes" name="attendance" className="text-sage-600" />
                        <Label htmlFor="yes" className="font-elegant text-stone-700">
                          Oui, j'aurai l'honneur d'être présent(e)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="radio" value="no" id="no" name="attendance" className="text-sage-600" />
                        <Label htmlFor="no" className="font-elegant text-stone-700">
                          Non, je ne pourrai malheureusement pas être présent(e)
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="font-serif text-stone-800 text-lg mb-4 block">Allergies alimentaires</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {allergyOptions.map((allergy) => (
                        <div key={allergy} className="flex items-center space-x-2">
                          <Checkbox
                            id={allergy}
                            checked={allergies.includes(allergy)}
                            onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                          />
                          <Label htmlFor={allergy} className="font-elegant text-stone-700 text-sm">
                            {allergy}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <input type="hidden" name="allergies" value={allergies.join(",")} />
                  </div>

                  <div>
                    <Label htmlFor="dietary_restrictions" className="font-serif text-stone-800">
                      Régimes alimentaires spécifiques
                    </Label>
                    <Input
                      id="dietary_restrictions"
                      name="dietary_restrictions"
                      placeholder="Végétarien, végétalien, sans gluten..."
                      className="mt-2 elegant-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additional_info" className="font-serif text-stone-800">
                      Informations complémentaires
                    </Label>
                    <Textarea
                      id="additional_info"
                      name="additional_info"
                      placeholder="Autres informations importantes que nous devrions connaître..."
                      className="mt-2 elegant-border"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-sage-700 hover:bg-sage-800 text-cream-50 font-serif text-lg py-6 elegant-hover"
                  >
                    {isPending ? "Envoi en cours..." : "Confirmer ma présence"}
                  </Button>
                </form>
                {state && (
                  <div
                    className={`mt-6 text-center font-elegant ${state.success ? "text-sage-700" : "text-bordeaux-600"}`}
                  >
                    {state.message}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
