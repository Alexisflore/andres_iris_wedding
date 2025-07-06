"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Utensils, Wine, Cake, ChefHat, CheckCircle, XCircle, X } from "lucide-react"
import { submitRSVP, updateRSVP } from "@/app/actions/rsvp"
import { useActionState } from "react"
import PageLayout from "@/components/page-layout"

// Modal de confirmation pour le catering
function CateringModal({ 
  isOpen, 
  onClose, 
  message, 
  isSuccess
}: { 
  isOpen: boolean
  onClose: () => void
  message: string
  isSuccess: boolean
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
      <div className="relative bg-gradient-to-br from-cream-50 via-stone-50 to-sage-50 border-2 border-stone-200/60 shadow-2xl rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200 group"
        >
          <X className="w-4 h-4 text-stone-600 group-hover:text-stone-800" />
        </button>

        {/* Decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sage-300/80 to-transparent rounded-t-2xl"></div>

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
          {isSuccess ? 'Confirmation reçue !' : 'Erreur de soumission'}
        </h3>

        {/* Message */}
        <p className="text-stone-700 text-center mb-6 font-elegant leading-relaxed">
          {message}
        </p>

        {/* Culinary icon for success */}
        {isSuccess && (
          <div className="bg-sage-50 border border-sage-200/60 rounded-lg p-4 mb-6">
            <p className="text-sage-800 text-center font-serif flex items-center justify-center">
              <ChefHat className="w-4 h-4 mr-2" />
              Notre chef prendra en compte vos préférences
            </p>
          </div>
        )}

        {/* Elegant separator */}
        <div className="flex items-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent flex-1"></div>
          <div className="w-2 h-2 bg-sage-300 rounded-full mx-3"></div>
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
          <div className="flex items-center justify-center space-x-2">
            {isSuccess ? (
              <>
                <Utensils className="w-4 h-4" />
                <span>Parfait !</span>
              </>
            ) : (
              <span>Compris</span>
            )}
          </div>
        </Button>
      </div>
    </div>
  )
}

// Modal de confirmation pour RSVP existant
function RSVPConfirmationModal({
  isOpen,
  onClose,
  existingRSVP,
  newData,
  onConfirm,
  message,
  isLoading
}: {
  isOpen: boolean
  onClose: () => void
  existingRSVP: any
  newData: any
  onConfirm: () => void
  message: string
  isLoading: boolean
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
      <div className="relative bg-gradient-to-br from-cream-50 via-stone-50 to-sage-50 border-2 border-stone-200/60 shadow-2xl rounded-2xl p-8 max-w-lg w-full mx-4 transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200 group disabled:opacity-50"
        >
          <X className="w-4 h-4 text-stone-600 group-hover:text-stone-800" />
        </button>

        {/* Decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sage-300/80 to-transparent rounded-t-2xl"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-sage-100 to-sage-200 shadow-lg">
            <ChefHat className="w-8 h-8 text-sage-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-display text-stone-800 text-center mb-4 heading-secondary">
          Réponse existante
        </h3>

        {/* Message */}
        <p className="text-stone-700 text-center mb-6 font-elegant leading-relaxed">
          {message}
        </p>

        {/* Comparaison des données */}
        <div className="bg-white/70 rounded-lg p-4 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-serif text-stone-800 font-semibold mb-2">Réponse actuelle :</p>
              <p className="text-stone-600">{existingRSVP?.name}</p>
              <p className="text-stone-600">{existingRSVP?.attendance ? '✨ Présent' : '💔 Absent'}</p>
            </div>
            <div>
              <p className="font-serif text-stone-800 font-semibold mb-2">Nouvelle réponse :</p>
              <p className="text-stone-600">{newData?.name}</p>
              <p className="text-stone-600">{newData?.attendance ? '✨ Présent' : '💔 Absent'}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-sage-700 to-sage-800 hover:from-sage-800 hover:to-sage-900 text-cream-50 font-serif py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></div>
                <span>Modification...</span>
              </div>
            ) : (
              "Oui, modifier"
            )}
          </Button>
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="flex-1 border-2 border-stone-300/60 bg-white/80 text-stone-700 hover:bg-stone-50 hover:border-stone-400/60 font-serif py-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50"
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CateringPage() {
  const [allergies, setAllergies] = useState<string[]>([])
  const [state, action, isPending] = useActionState(submitRSVP, null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  // État pour le modal de résultat
  const [modal, setModal] = useState<{
    isOpen: boolean
    message: string
    isSuccess: boolean
  }>({
    isOpen: false,
    message: "",
    isSuccess: false
  })

  // État pour le modal de confirmation
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    existingRSVP: any
    newData: any
    message: string
  }>({
    isOpen: false,
    existingRSVP: null,
    newData: null,
    message: ""
  })

  // Afficher le modal quand une réponse arrive
  useEffect(() => {
    if (state) {
      if (state.needsConfirmation) {
        // Afficher la modal de confirmation
        setConfirmModal({
          isOpen: true,
          existingRSVP: state.existingRSVP,
          newData: state.newData,
          message: state.message
        })
      } else if (state.success !== undefined) {
        // Afficher la modal de résultat
        setModal({
          isOpen: true,
          message: state.message,
          isSuccess: state.success
        })
      }
    }
  }, [state])

  const allergyOptions = ["Gluten", "Lactose", "Fruits à coque", "Œufs", "Poisson", "Crustacés", "Soja", "Céleri"]

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setAllergies((prev) => 
      checked ? [...prev, allergy] : prev.filter((a) => a !== allergy)
    )
  }

  const closeModal = () => {
    setModal({ isOpen: false, message: "", isSuccess: false })
  }

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, existingRSVP: null, newData: null, message: "" })
  }

  const handleConfirmUpdate = async () => {
    setIsUpdating(true)
    
    try {
      const result = await updateRSVP(confirmModal.existingRSVP.id, confirmModal.newData)
      
      // Fermer la modal de confirmation
      setConfirmModal({ isOpen: false, existingRSVP: null, newData: null, message: "" })
      
      // Afficher la modal de résultat
      setModal({
        isOpen: true,
        message: result.message,
        isSuccess: result.success
      })
    } catch (error) {
      console.error("Error updating RSVP:", error)
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
      {/* Modal de confirmation de mise à jour */}
      <RSVPConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        existingRSVP={confirmModal.existingRSVP}
        newData={confirmModal.newData}
        message={confirmModal.message}
        onConfirm={handleConfirmUpdate}
        isLoading={isUpdating}
      />

      {/* Modal de résultat */}
      <CateringModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        message={modal.message}
        isSuccess={modal.isSuccess}
      />

      <PageLayout
        title="Restauration"
        subtitle="Un menu d'exception conçu par notre chef, dans la plus pure tradition de la gastronomie française, pour célébrer notre union avec raffinement."
      >
        {/* Message temporaire */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sage-100 mb-4 sm:mb-6">
            <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 text-sage-600" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-display text-stone-800 mb-3">
            Découvrez bientôt notre menu d'exception
          </h3>
          <p className="text-stone-600 font-elegant text-base sm:text-lg max-w-2xl mx-auto">
            Notre chef travaille actuellement sur un menu raffiné qui saura émerveiller vos papilles. 
            Les détails seront dévoilés très prochainement.
          </p>
        </div>

        {/* Wine Pairing - Caché */}
        <div className="mb-16 sm:mb-20">
          <Card className="luxury-card border-0 shadow-lg max-w-4xl mx-auto opacity-20 pointer-events-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl font-display text-stone-800 heading-secondary blur-sm">
                ●●●●● ●●● ●●●●
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="blur-sm">
                <div className="h-4 bg-stone-300 rounded mb-4 mx-auto max-w-lg"></div>
                <div className="h-3 bg-stone-300 rounded mb-6 mx-auto max-w-md"></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="h-4 bg-stone-400 rounded mb-2"></div>
                    <div className="h-3 bg-stone-300 rounded"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-stone-400 rounded mb-2"></div>
                    <div className="h-3 bg-stone-300 rounded"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-stone-400 rounded mb-2"></div>
                    <div className="h-3 bg-stone-300 rounded"></div>
                  </div>
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
                    {/* Hidden input to send allergies data */}
                    <input type="hidden" name="allergies" value={allergies.join(",")} />
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
    </>
  )
}
