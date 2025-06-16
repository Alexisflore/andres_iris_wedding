"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Utensils, Bed, Crown } from "lucide-react"
import Navigation from "@/components/navigation"
import HeroCarousel from "@/components/hero-carousel"
import { HERO_IMAGES } from "@/lib/config"

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const weddingDate = new Date("2026-09-26T14:00:00")

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-stone-50 to-cream-100">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-6xl">
          {/* Monogram */}
          <div className="mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-2 border-sage-300 bg-cream-50 shadow-lg luxury-card">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-sage-800 monogram">A&I</span>
            </div>
          </div>

          {/* Names */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display text-stone-800 mb-6 sm:mb-8 tracking-wider heading-primary">
            ANDRES & IRIS
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="h-px bg-sage-300 w-16 sm:w-20 lg:w-24"></div>
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mx-4 sm:mx-6" />
            <div className="h-px bg-sage-300 w-16 sm:w-20 lg:w-24"></div>
          </div>

          {/* Date */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-stone-600 mb-3 sm:mb-4 tracking-widest font-serif">26 SEPTEMBRE 2026</p>
          <p className="text-base sm:text-lg text-sage-700 mb-12 sm:mb-14 lg:mb-16 font-elegant italic">Tourelles de Fonville, France</p>

          {/* Countdown */}
          <div className="grid grid-cols-2 sm:flex sm:justify-center gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-18 lg:mb-20">
            {[
              { value: timeLeft.days, label: "Jours" },
              { value: timeLeft.hours, label: "Heures" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Secondes" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-bordeaux-700 mb-1 sm:mb-2">{item.value}</div>
                <div className="text-xs sm:text-sm text-stone-600 uppercase tracking-widest font-serif">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Hero Carousel */}
          <HeroCarousel images={HERO_IMAGES} />
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-stone-50/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-center text-stone-800 mb-12 sm:mb-14 lg:mb-16 heading-secondary">
            Découvrez notre célébration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
            {[
              { href: "/venue", icon: MapPin, title: "Le Lieu", subtitle: "Château historique" },
              { href: "/program", icon: Calendar, title: "Programme", subtitle: "Déroulement" },
              { href: "/theme", icon: Crown, title: "Thème", subtitle: "Dress code" },
              { href: "/catering", icon: Utensils, title: "Restauration", subtitle: "Menu raffiné" },
              { href: "/accommodation", icon: Bed, title: "Hébergement", subtitle: "Logements" },
            ].map((item, index) => (
              <Link key={index} href={item.href} className="group">
                <Card className="luxury-card elegant-hover border-0 h-full">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-sage-600 mx-auto mb-3 sm:mb-4 group-hover:text-bordeaux-600 transition-colors" />
                    <h3 className="font-serif font-medium text-stone-800 mb-2 text-base sm:text-lg">{item.title}</h3>
                    <p className="text-sm text-stone-600 font-elegant italic">{item.subtitle}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-sage-50/30">
        <div className="container mx-auto max-w-4xl text-center">
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-elegant italic text-stone-700 leading-relaxed px-4">
            "L'amour ne se voit pas avec les yeux, mais avec l'âme."
          </blockquote>
          <cite className="block mt-4 sm:mt-6 text-base sm:text-lg text-stone-600 font-elegant">— William Shakespeare</cite>
        </div>
      </section>
    </div>
  )
}
