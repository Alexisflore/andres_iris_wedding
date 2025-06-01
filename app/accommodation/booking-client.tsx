"use client"

import { useState } from "react"
import { createBooking } from "@/app/actions/booking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Phone, Mail, Car, Crown, ChevronDown } from "lucide-react"

type Accommodation = {
  id: string
  name: string
  capacity: number
  available: number
  address: string
  city: string
  phone: string | null
  email: string | null
  distance: string
  type: string
}

export default function BookingClient({ accommodations }: { accommodations: Accommodation[] }) {
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReservation = async (accommodationId: string) => {
    if (!guestName || !guestEmail) {
      alert("Veuillez remplir tous les champs.")
      return
    }

    setIsSubmitting(true)
    const result = await createBooking(accommodationId, guestName, guestEmail, guestCount)
    alert(result.message)

    if (result.success) {
      setSelectedAccommodation(null)
      setGuestCount(1)
      setGuestName("")
      setGuestEmail("")
    }
    setIsSubmitting(false)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {accommodations.map((accommodation) => (
        <div key={accommodation.id} className="h-[500px] perspective-1000">
          <div 
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              selectedAccommodation === accommodation.id ? 'rotate-y-180' : ''
            }`}
          >
            {/* Face avant de la carte */}
            <Card
              className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-cream-50 via-stone-50 to-amber-50 border-2 border-stone-200/60 shadow-2xl transition-all duration-500 hover:shadow-stone-300/30 ${
                accommodation.available === 0 ? "opacity-60 grayscale" : "hover:scale-[1.02] hover:border-amber-200/80"
              }`}
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
              }}
            >
              {/* Decorative border element */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"></div>
              
              <CardHeader className="pb-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <CardTitle className="text-stone-800 font-display text-xl heading-secondary tracking-wide">
                    {accommodation.name}
                  </CardTitle>
                  <Badge
                    variant={accommodation.available > 0 ? "default" : "secondary"}
                    className="bg-gradient-to-r from-sage-100 to-sage-200 text-sage-800 font-serif px-3 py-1 border border-sage-300/50 shadow-sm"
                  >
                    {accommodation.type}
                  </Badge>
                </div>
                
                {/* Elegant separator */}
                <div className="flex items-center mb-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent flex-1"></div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full mx-3"></div>
                  <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent flex-1"></div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5">
                <div className="flex items-center text-stone-700 group/item">
                  <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center mr-3 group-hover/item:bg-sage-200 transition-colors">
                    <Users className="w-4 h-4 text-sage-700" />
                  </div>
                  <span className="font-elegant text-sm">
                    <span className="font-semibold text-stone-800">{accommodation.available}</span>
                    <span className="text-stone-600">/{accommodation.capacity} places disponibles</span>
                  </span>
                </div>

                <div className="flex items-start text-stone-700 group/item">
                  <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center mr-3 mt-0.5 group-hover/item:bg-sage-200 transition-colors">
                    <MapPin className="w-4 h-4 text-sage-700" />
                  </div>
                  <div className="font-elegant text-sm">
                    <p className="font-medium text-stone-800">{accommodation.address}</p>
                    <p className="text-stone-600 italic">{accommodation.city}</p>
                  </div>
                </div>

                <div className="flex items-center text-stone-700 group/item">
                  <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center mr-3 group-hover/item:bg-sage-200 transition-colors">
                    <Car className="w-4 h-4 text-sage-700" />
                  </div>
                  <span className="font-elegant text-sm text-stone-600">{accommodation.distance} des Tourelles</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-stone-200/60">
                  {accommodation.phone && (
                    <div className="flex items-center text-stone-600 group/contact">
                      <Phone className="w-3 h-3 mr-3 text-sage-600 group-hover/contact:text-sage-700 transition-colors" />
                      <span className="font-elegant text-xs tracking-wide">{accommodation.phone}</span>
                    </div>
                  )}
                  {accommodation.email && (
                    <div className="flex items-center text-stone-600 group/contact">
                      <Mail className="w-3 h-3 mr-3 text-sage-600 group-hover/contact:text-sage-700 transition-colors" />
                      <span className="font-elegant text-xs tracking-wide">{accommodation.email}</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  {accommodation.available > 0 ? (
                    <Button
                      onClick={() => setSelectedAccommodation(accommodation.id)}
                      className="w-full bg-gradient-to-r from-sage-700 to-sage-800 hover:from-sage-800 hover:to-sage-900 text-cream-50 font-serif py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Crown className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Réserver ce logement</span>
                      </div>
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-stone-300 text-stone-500 font-serif py-4 rounded-lg opacity-60">
                      <div className="flex items-center justify-center space-x-2">
                        <span>Complet</span>
                      </div>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Face arrière de la carte (formulaire) */}
            <Card 
              className="absolute inset-0 w-full h-full backface-hidden rotate-y-180-base bg-gradient-to-br from-sage-50/95 via-cream-50/95 to-amber-50/95 border-2 border-amber-200/60 shadow-2xl"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>
              
              <CardHeader className="pb-4">
                <div className="text-center">
                  <CardTitle className="text-stone-800 font-display text-lg mb-1">Réservation</CardTitle>
                  <p className="font-elegant text-sm text-stone-600 italic">Veuillez remplir vos informations</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 h-[calc(100%-140px)] flex flex-col">
                <div className="space-y-4 flex-1">
                  <div className="relative">
                    <Label htmlFor={`name-${accommodation.id}`} className="font-serif text-stone-800 text-sm font-medium mb-2 block">
                      Nom complet
                    </Label>
                    <Input
                      id={`name-${accommodation.id}`}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Votre nom complet"
                      className="bg-white/80 border-2 border-stone-200/60 rounded-lg px-4 py-3 font-elegant text-stone-700 placeholder:text-stone-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Label htmlFor={`email-${accommodation.id}`} className="font-serif text-stone-800 text-sm font-medium mb-2 block">
                      Adresse électronique
                    </Label>
                    <Input
                      id={`email-${accommodation.id}`}
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="bg-white/80 border-2 border-stone-200/60 rounded-lg px-4 py-3 font-elegant text-stone-700 placeholder:text-stone-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Label htmlFor={`guests-${accommodation.id}`} className="font-serif text-stone-800 text-sm font-medium mb-2 block">
                      Nombre de personnes
                    </Label>
                    <div className="relative">
                      <select
                        id={`guests-${accommodation.id}`}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-white/80 border-2 border-stone-200/60 rounded-lg px-4 py-3 font-elegant text-stone-700 focus:border-amber-300 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                      >
                        {Array.from({ length: accommodation.available }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} personne{i > 0 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleReservation(accommodation.id)}
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-sage-700 to-sage-800 hover:from-sage-800 hover:to-sage-900 text-cream-50 font-serif py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></div>
                        <span>Réservation...</span>
                      </div>
                    ) : (
                      "Confirmer"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedAccommodation(null)
                      setGuestName("")
                      setGuestEmail("")
                      setGuestCount(1)
                    }}
                    className="flex-1 border-2 border-stone-300/60 bg-white/80 text-stone-700 hover:bg-stone-50 hover:border-stone-400/60 font-serif py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}
