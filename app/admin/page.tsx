import { getAllRSVPs, getAllBookings, getAdminStats } from "@/app/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, Calendar, MapPin, Mail, Phone, Crown, ChefHat, Utensils, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Navigation from "@/components/navigation"

export default async function AdminPage() {
  const [rsvpResult, bookingResult, statsResult] = await Promise.all([
    getAllRSVPs(),
    getAllBookings(),
    getAdminStats()
  ])

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

          {/* Tabs-like sections */}
          <div className="space-y-16">
            {/* Section RSVP */}
            <div>
              <div className="flex items-center mb-8">
                <ChefHat className="w-6 h-6 text-sage-600 mr-4" />
                <h2 className="text-3xl font-display text-stone-800 heading-secondary">Réponses RSVP</h2>
              </div>
              
              {rsvpResult.success ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {rsvpResult.data.map((rsvp: any) => (
                    <Card key={rsvp.id} className="bg-gradient-to-br from-cream-50 via-stone-50 to-sage-50 border-2 border-stone-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-display text-stone-800 flex items-center">
                            <Utensils className="w-4 h-4 mr-2 text-sage-600" />
                            {rsvp.name}
                          </CardTitle>
                          <Badge variant={rsvp.attendance ? "default" : "secondary"} 
                                className={`font-serif px-3 py-1 ${
                                  rsvp.attendance 
                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                    : 'bg-red-100 text-red-800 border-red-200'
                                }`}>
                            {rsvp.attendance ? '✨ Présent' : '💔 Absent'}
                          </Badge>
                        </div>
                        <p className="text-sm text-stone-600 font-elegant">{formatDate(rsvp.created_at)}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center text-stone-700">
                          <Mail className="w-4 h-4 mr-3 text-sage-600" />
                          <span className="font-elegant text-sm">{rsvp.email}</span>
                        </div>
                        
                        {rsvp.allergies && rsvp.allergies.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <h4 className="font-serif text-amber-800 text-sm font-medium mb-2">Allergies</h4>
                            <div className="flex flex-wrap gap-2">
                              {rsvp.allergies.map((allergy: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs bg-amber-100 border-amber-300 text-amber-800">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {rsvp.dietary_restrictions && (
                          <div className="bg-sage-50 border border-sage-200 rounded-lg p-3">
                            <h4 className="font-serif text-sage-800 text-sm font-medium mb-2">Régime alimentaire</h4>
                            <p className="text-sm text-sage-700 font-elegant">{rsvp.dietary_restrictions}</p>
                          </div>
                        )}
                        
                        {rsvp.additional_info && (
                          <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                            <h4 className="font-serif text-stone-800 text-sm font-medium mb-2">Message personnel</h4>
                            <p className="text-sm text-stone-700 font-elegant italic">"{rsvp.additional_info}"</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
              <div className="flex items-center mb-8">
                <Crown className="w-6 h-6 text-amber-600 mr-4" />
                <h2 className="text-3xl font-display text-stone-800 heading-secondary">Réservations d'hébergement</h2>
              </div>
              
              {bookingResult.success ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {bookingResult.data.map((booking: any) => (
                    <Card key={booking.id} className="bg-gradient-to-br from-cream-50 via-amber-50 to-stone-50 border-2 border-amber-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-display text-stone-800 flex items-center">
                            <Crown className="w-4 h-4 mr-2 text-amber-600" />
                            {booking.guest_name}
                          </CardTitle>
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-serif px-3 py-1">
                            {booking.guest_count} personne{booking.guest_count > 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <p className="text-sm text-stone-600 font-elegant">{formatDate(booking.created_at)}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center text-stone-700">
                          <Mail className="w-4 h-4 mr-3 text-amber-600" />
                          <span className="font-elegant text-sm">{booking.guest_email}</span>
                        </div>
                        
                        {booking.accommodations && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h4 className="font-serif text-amber-800 text-sm font-medium mb-2 flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              Hébergement réservé
                            </h4>
                            <div className="space-y-2">
                              <p className="font-display text-amber-900 font-medium">{booking.accommodations.name}</p>
                              <p className="text-sm text-amber-700 font-elegant">{booking.accommodations.city}</p>
                              <Badge variant="outline" className="text-xs bg-amber-100 border-amber-300 text-amber-800">
                                {booking.accommodations.type}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
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