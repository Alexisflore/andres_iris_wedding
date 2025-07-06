"use client"

import { getAllRSVPs, getAllBookings, getAdminStats } from "@/app/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, Calendar, MapPin, Mail, Phone, Crown, ChefHat, Utensils, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Navigation from "@/components/navigation"
import { useState, useEffect } from "react"

// Composant pour la pagination
function PaginationControls({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void 
}) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-stone-600 font-elegant">
        Page {currentPage} sur {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="font-serif"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="font-serif"
        >
          Suivant
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

// Composant client pour gérer la pagination des RSVP
function RSVPTable({ rsvps }: { rsvps: any[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(rsvps.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRSVPs = rsvps.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <div className="rounded-lg border-2 border-stone-200 overflow-hidden bg-white shadow-lg">
        <Table>
          <TableHeader className="bg-sage-50">
            <TableRow>
              <TableHead className="font-serif text-sage-800">Nom</TableHead>
              <TableHead className="font-serif text-sage-800">Email</TableHead>
              <TableHead className="font-serif text-sage-800">Statut</TableHead>
              <TableHead className="font-serif text-sage-800">Allergies</TableHead>
              <TableHead className="font-serif text-sage-800">Régime</TableHead>
              <TableHead className="font-serif text-sage-800">Message</TableHead>
              <TableHead className="font-serif text-sage-800">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRSVPs.map((rsvp: any) => (
              <TableRow key={rsvp.id} className="hover:bg-stone-50">
                <TableCell className="font-display text-stone-800">{rsvp.name}</TableCell>
                <TableCell className="font-elegant text-stone-600">{rsvp.email}</TableCell>
                <TableCell>
                  <Badge variant={rsvp.attendance ? "default" : "secondary"} 
                        className={`font-serif px-3 py-1 ${
                          rsvp.attendance 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                    {rsvp.attendance ? '✨ Présent' : '💔 Absent'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {rsvp.allergies && rsvp.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {rsvp.allergies.map((allergy: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs bg-amber-100 border-amber-300 text-amber-800">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-stone-400 font-elegant text-sm">Aucune</span>
                  )}
                </TableCell>
                <TableCell className="font-elegant text-stone-600 text-sm max-w-32 truncate">
                  {rsvp.dietary_restrictions || <span className="text-stone-400">Aucun</span>}
                </TableCell>
                <TableCell className="font-elegant text-stone-600 text-sm max-w-48 truncate">
                  {rsvp.additional_info ? (
                    <span className="italic">"{rsvp.additional_info}"</span>
                  ) : (
                    <span className="text-stone-400">Aucun</span>
                  )}
                </TableCell>
                <TableCell className="font-elegant text-stone-500 text-sm">
                  {formatDate(rsvp.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

// Composant client pour gérer la pagination des réservations
function BookingsTable({ bookings }: { bookings: any[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(bookings.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBookings = bookings.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <div className="rounded-lg border-2 border-amber-200 overflow-hidden bg-white shadow-lg">
        <Table>
          <TableHeader className="bg-amber-50">
            <TableRow>
              <TableHead className="font-serif text-amber-800">Nom</TableHead>
              <TableHead className="font-serif text-amber-800">Email</TableHead>
              <TableHead className="font-serif text-amber-800">Invités</TableHead>
              <TableHead className="font-serif text-amber-800">Hébergement</TableHead>
              <TableHead className="font-serif text-amber-800">Ville</TableHead>
              <TableHead className="font-serif text-amber-800">Type</TableHead>
              <TableHead className="font-serif text-amber-800">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBookings.map((booking: any) => (
              <TableRow key={booking.id} className="hover:bg-amber-50/50">
                <TableCell className="font-display text-stone-800">{booking.guest_name}</TableCell>
                <TableCell className="font-elegant text-stone-600">{booking.guest_email}</TableCell>
                <TableCell>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-serif px-3 py-1">
                    {booking.guest_count} personne{booking.guest_count > 1 ? 's' : ''}
                  </Badge>
                </TableCell>
                <TableCell className="font-display text-amber-900 font-medium">
                  {booking.accommodations?.name || 'N/A'}
                </TableCell>
                <TableCell className="font-elegant text-amber-700">
                  {booking.accommodations?.city || 'N/A'}
                </TableCell>
                <TableCell>
                  {booking.accommodations?.type && (
                    <Badge variant="outline" className="text-xs bg-amber-100 border-amber-300 text-amber-800">
                      {booking.accommodations.type}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-elegant text-stone-500 text-sm">
                  {formatDate(booking.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default function AdminPage() {
  const [rsvpResult, setRsvpResult] = useState<any>({ success: false, data: [], error: null })
  const [bookingResult, setBookingResult] = useState<any>({ success: false, data: [], error: null })
  const [statsResult, setStatsResult] = useState<any>({ success: false, data: null, error: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [rsvp, booking, stats] = await Promise.all([
          getAllRSVPs(),
          getAllBookings(),
          getAdminStats()
        ])
        
        setRsvpResult(rsvp)
        setBookingResult(booking)
        setStatsResult(stats)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-stone-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
            <p className="text-stone-600 font-elegant">Chargement des données...</p>
          </div>
        </div>
      </div>
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
              <Shield className="w-6 h-6 text-sage-600 mx-6" />
              <div className="h-px bg-sage-300 w-24"></div>
            </div>
            <h1 className="text-6xl font-display text-stone-800 mb-6 heading-primary">Administration</h1>
            <p className="text-xl text-stone-600 max-w-4xl mx-auto font-elegant leading-relaxed">
              Tableau de bord pour gérer et visualiser toutes les réponses des invités
            </p>
          </div>

          {/* Statistiques */}
          {statsResult.success && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="bg-gradient-to-br from-sage-50 to-sage-100 border-2 border-sage-200/60 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-serif text-sage-800">Total RSVP</CardTitle>
                  <Users className="h-4 w-4 text-sage-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-display text-sage-900">{statsResult.data?.rsvp.total}</div>
                  <p className="text-xs text-sage-600">réponses reçues</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200/60 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-serif text-green-800">Présents</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-display text-green-900">{statsResult.data?.rsvp.attending}</div>
                  <p className="text-xs text-green-600">confirmations positives</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200/60 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-serif text-amber-800">Hébergements</CardTitle>
                  <Crown className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-display text-amber-900">{statsResult.data?.bookings.total}</div>
                  <p className="text-xs text-amber-600">réservations</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200/60 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-serif text-purple-800">Invités logés</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-display text-purple-900">{statsResult.data?.bookings.guests}</div>
                  <p className="text-xs text-purple-600">personnes hébergées</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sections des tableaux */}
          <div className="space-y-16">
            {/* Section RSVP */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <ChefHat className="w-6 h-6 text-sage-600 mr-4" />
                  <h2 className="text-3xl font-display text-stone-800 heading-secondary">Réponses RSVP</h2>
                </div>
                {rsvpResult.success && (
                  <Badge variant="outline" className="bg-sage-100 text-sage-800 border-sage-200 font-serif px-4 py-2">
                    {rsvpResult.data.length} réponse{rsvpResult.data.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              {rsvpResult.success ? (
                <RSVPTable rsvps={rsvpResult.data} />
              ) : (
                <Card className="bg-red-50 border-2 border-red-200 shadow-lg">
                  <CardContent className="flex items-center justify-center p-8">
                    <AlertCircle className="w-8 h-8 text-red-600 mr-4" />
                    <div>
                      <h3 className="text-lg font-display text-red-800 mb-2">Erreur de chargement</h3>
                      <p className="text-red-600 font-elegant">{rsvpResult.error}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Section Hébergements */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Crown className="w-6 h-6 text-amber-600 mr-4" />
                  <h2 className="text-3xl font-display text-stone-800 heading-secondary">Réservations d'hébergement</h2>
                </div>
                {bookingResult.success && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-serif px-4 py-2">
                    {bookingResult.data.length} réservation{bookingResult.data.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              {bookingResult.success ? (
                <BookingsTable bookings={bookingResult.data} />
              ) : (
                <Card className="bg-red-50 border-2 border-red-200 shadow-lg">
                  <CardContent className="flex items-center justify-center p-8">
                    <AlertCircle className="w-8 h-8 text-red-600 mr-4" />
                    <div>
                      <h3 className="text-lg font-display text-red-800 mb-2">Erreur de chargement</h3>
                      <p className="text-red-600 font-elegant">{bookingResult.error}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 