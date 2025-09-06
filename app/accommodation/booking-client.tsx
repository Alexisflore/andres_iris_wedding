"use client"

import { useState } from "react"
import { createBooking, updateBooking, forceCreateBooking } from "@/app/actions/booking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Phone, Mail, Car, Crown, ChevronDown, CheckCircle, XCircle, X } from "lucide-react"

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

// Modal de confirmation
function ConfirmationModal({ 
  isOpen, 
  onClose, 
  message, 
  isSuccess,
  accommodationName 
}: { 
  isOpen: boolean
  onClose: () => void
  message: string
  isSuccess: boolean
  accommodationName?: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-cream-50 via-stone-50 to-amber-50 border-2 border-stone-200/60 shadow-2xl rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200 group"
        >
          <X className="w-4 h-4 text-stone-600 group-hover:text-stone-800" />
        </button>

        {/* Decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent rounded-t-2xl"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isSuccess 
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 shadow-lg' 
              : 'bg-gradient-to-r from-red-100 to-rose-100 shadow-lg'
          }`}>
            {isSuccess ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-display text-stone-800 text-center mb-4 heading-secondary">
          {isSuccess ? 'Information enregistrée !' : 'Erreur d\'enregistrement'}
        </h3>

        {/* Message */}
        <p className="text-stone-700 text-center mb-6 font-elegant leading-relaxed">
          {message}
        </p>

        {/* Accommodation name for success */}
        {isSuccess && accommodationName && (
          <div className="bg-sage-50 border border-sage-200/60 rounded-lg p-4 mb-6">
            <p className="text-sage-800 text-center font-serif">
              <Crown className="w-4 h-4 inline mr-2" />
              {accommodationName}
            </p>
          </div>
        )}

        {/* Elegant separator */}
        <div className="flex items-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent flex-1"></div>
          <div className="w-2 h-2 bg-amber-300 rounded-full mx-3"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent flex-1"></div>
        </div>

        {/* Button */}
        <Button
          onClick={onClose}
          className={`w-full font-serif py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
            isSuccess
              ? 'bg-gradient-to-r from-sage-700 to-sage-800 hover:from-sage-800 hover:to-sage-900 text-cream-50'
              : 'bg-gradient-to-r from-stone-600 to-stone-700 hover:from-stone-700 hover:to-stone-800 text-cream-50'
          }`}
        >
          {isSuccess ? 'Parfait !' : 'Compris'}
        </Button>
      </div>
    </div>
  )
}

// Modal de confirmation pour booking existant
function BookingConfirmationModal({
  isOpen,
  onClose,
  existingBooking,
  newData,
  onUpdate,
  onAddNew,
  message,
  isLoading,
  accommodations
}: {
  isOpen: boolean
  onClose: () => void
  existingBooking: any
  newData: any
  onUpdate: () => void
  onAddNew: () => void
  message: string
  isLoading: boolean
  accommodations: Accommodation[]
}) {
  if (!isOpen) return null

  const currentAccommodation = accommodations.find(acc => acc.id === existingBooking?.accommodation_id)
  const newAccommodation = accommodations.find(acc => acc.id === newData?.accommodationId)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-cream-50 via-stone-50 to-amber-50 border-2 border-stone-200/60 shadow-2xl rounded-2xl p-8 max-w-lg w-full mx-4 transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200 group disabled:opacity-50"
        >
          <X className="w-4 h-4 text-stone-600 group-hover:text-stone-800" />
        </button>

        {/* Decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent rounded-t-2xl"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-100 to-orange-100 shadow-lg">
            <Crown className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-display text-stone-800 text-center mb-4 heading-secondary">
          Information existante
        </h3>

        {/* Message */}
        <p className="text-stone-700 text-center mb-6 font-elegant leading-relaxed">
          {message}
        </p>

        {/* Comparaison des données */}
        <div className="bg-white/70 rounded-lg p-4 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-serif text-stone-800 font-semibold mb-2">Information actuelle :</p>
              <p className="text-stone-600">{existingBooking?.guest_name}</p>
              <p className="text-stone-600">{existingBooking?.guest_count} personne(s)</p>
              <p className="text-stone-600 text-xs text-amber-700">{currentAccommodation?.name}</p>
            </div>
            <div>
              <p className="font-serif text-stone-800 font-semibold mb-2">Nouvelle information :</p>
              <p className="text-stone-600">{newData?.guestName}</p>
              <p className="text-stone-600">{newData?.guestCount} personne(s)</p>
              <p className="text-stone-600 text-xs text-amber-700">{newAccommodation?.name}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onUpdate}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-sage-700 to-sage-800 hover:from-sage-800 hover:to-sage-900 text-cream-50 font-serif py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></div>
                <span>Modification...</span>
              </div>
            ) : (
              "Modifier l'information existante"
            )}
          </Button>
          
          <Button
            onClick={onAddNew}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-cream-50 font-serif py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></div>
                <span>Ajout...</span>
              </div>
            ) : (
              "Ajouter une nouvelle information"
            )}
          </Button>
          
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="w-full border-2 border-stone-300/60 bg-white/80 text-stone-700 hover:bg-stone-50 hover:border-stone-400/60 font-serif py-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50"
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function BookingClient({ accommodations }: { accommodations: Accommodation[] }) {
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  
  // État pour le modal de résultat
  const [modal, setModal] = useState<{
    isOpen: boolean
    message: string
    isSuccess: boolean
    accommodationName?: string
  }>({
    isOpen: false,
    message: "",
    isSuccess: false,
    accommodationName: undefined
  })

  // État pour le modal de confirmation
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    existingBooking: any
    newData: any
    message: string
  }>({
    isOpen: false,
    existingBooking: null,
    newData: null,
    message: ""
  })

  const handleReservation = async (accommodationId: string) => {
    if (!guestName || !guestEmail) {
      setModal({
        isOpen: true,
        message: "Veuillez remplir tous les champs obligatoires.",
        isSuccess: false
      })
      return
    }

    setIsSubmitting(true)
    const result = await createBooking(accommodationId, guestName, guestEmail, guestCount)
    
    if (result.needsConfirmation) {
      // Afficher la modal de confirmation
      setConfirmModal({
        isOpen: true,
        existingBooking: result.existingBooking,
        newData: result.newData,
        message: result.message
      })
    } else {
      // Afficher la modal de résultat
      const accommodation = accommodations.find(acc => acc.id === accommodationId)
      
      setModal({
        isOpen: true,
        message: result.message,
        isSuccess: result.success,
        accommodationName: result.success ? accommodation?.name : undefined
      })

      if (result.success) {
        setSelectedAccommodation(null)
        setGuestCount(1)
        setGuestName("")
        setGuestEmail("")
      }
    }
    setIsSubmitting(false)
  }

  const closeModal = () => {
    setModal({ isOpen: false, message: "", isSuccess: false, accommodationName: undefined })
  }

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, existingBooking: null, newData: null, message: "" })
  }

  const handleUpdateBooking = async () => {
    setIsUpdating(true)
    
    try {
      const result = await updateBooking(confirmModal.existingBooking.id, confirmModal.newData)
      
      // Fermer la modal de confirmation
      setConfirmModal({ isOpen: false, existingBooking: null, newData: null, message: "" })
      
      // Afficher la modal de résultat
      const accommodation = accommodations.find(acc => acc.id === confirmModal.newData.accommodationId)
      
      setModal({
        isOpen: true,
        message: result.message,
        isSuccess: result.success,
        accommodationName: result.success ? accommodation?.name : undefined
      })

      if (result.success) {
        setSelectedAccommodation(null)
        setGuestCount(1)
        setGuestName("")
        setGuestEmail("")
      }
    } catch (error) {
      console.error("Error updating booking:", error)
      setModal({
        isOpen: true,
        message: "Une erreur inattendue s'est produite.",
        isSuccess: false
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddNewBooking = async () => {
    setIsUpdating(true)
    
    try {
      const result = await forceCreateBooking(
        confirmModal.newData.accommodationId,
        confirmModal.newData.guestName,
        confirmModal.newData.guestEmail,
        confirmModal.newData.guestCount
      )
      
      // Fermer la modal de confirmation
      setConfirmModal({ isOpen: false, existingBooking: null, newData: null, message: "" })
      
      // Afficher la modal de résultat
      const accommodation = accommodations.find(acc => acc.id === confirmModal.newData.accommodationId)
      
      setModal({
        isOpen: true,
        message: result.message,
        isSuccess: result.success,
        accommodationName: result.success ? accommodation?.name : undefined
      })

      if (result.success) {
        setSelectedAccommodation(null)
        setGuestCount(1)
        setGuestName("")
        setGuestEmail("")
      }
    } catch (error) {
      console.error("Error adding new booking:", error)
      setModal({
        isOpen: true,
        message: "Une erreur inattendue s'est produite.",
        isSuccess: false
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      {/* Modal de confirmation pour booking existant */}
      <BookingConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        existingBooking={confirmModal.existingBooking}
        newData={confirmModal.newData}
        message={confirmModal.message}
        onUpdate={handleUpdateBooking}
        onAddNew={handleAddNewBooking}
        isLoading={isUpdating}
        accommodations={accommodations}
      />

      {/* Modal de résultat */}
      <ConfirmationModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        message={modal.message}
        isSuccess={modal.isSuccess}
        accommodationName={modal.accommodationName}
      />

      {/* Grille des hébergements */}
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
                          <span>J'ai réservé ici</span>
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
                    <CardTitle className="text-stone-800 font-display text-lg mb-1">Indiquer ma réservation</CardTitle>
                    <p className="font-elegant text-sm text-stone-600 italic">Informez-nous de votre réservation</p>
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
                          <span>Enregistrement...</span>
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
    </>
  )
}
