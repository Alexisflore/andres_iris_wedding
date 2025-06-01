"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Utensils, Bed, Crown } from "lucide-react"
import Navigation from "@/components/navigation"

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
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto text-center max-w-6xl">
          {/* Monogram */}
          <div className="mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-2 border-sage-300 bg-cream-50 shadow-lg luxury-card">
              <span className="text-4xl font-display text-sage-800 monogram">A&I</span>
            </div>
          </div>

          {/* Names */}
          <h1 className="text-7xl md:text-9xl font-display text-stone-800 mb-8 tracking-wider heading-primary">
            ANDRES & IRIS
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-sage-300 w-24"></div>
            <Crown className="w-6 h-6 text-sage-600 mx-6" />
            <div className="h-px bg-sage-300 w-24"></div>
          </div>

          {/* Date */}
          <p className="text-2xl md:text-3xl text-stone-600 mb-4 tracking-widest font-serif">26 SEPTEMBRE 2026</p>
          <p className="text-lg text-sage-700 mb-16 font-elegant italic">Tourelles de Fonville, France</p>

          {/* Countdown */}
          <div className="flex justify-center space-x-12 mb-20">
            {[
              { value: timeLeft.days, label: "Jours" },
              { value: timeLeft.hours, label: "Heures" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Secondes" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-display text-bordeaux-700 mb-2">{item.value}</div>
                <div className="text-sm text-stone-600 uppercase tracking-widest font-serif">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl elegant-border">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Andres & Iris"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-24 px-6 bg-stone-50/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display text-center text-stone-800 mb-16 heading-secondary">
            Découvrez notre célébration
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { href: "/venue", icon: MapPin, title: "Le Lieu", subtitle: "Château historique" },
              { href: "/program", icon: Calendar, title: "Programme", subtitle: "Déroulement" },
              { href: "/theme", icon: Crown, title: "Thème", subtitle: "Dress code" },
              { href: "/catering", icon: Utensils, title: "Restauration", subtitle: "Menu raffiné" },
              { href: "/accommodation", icon: Bed, title: "Hébergement", subtitle: "Logements" },
            ].map((item, index) => (
              <Link key={index} href={item.href} className="group">
                <Card className="luxury-card elegant-hover border-0 h-full">
                  <CardContent className="p-8 text-center">
                    <item.icon className="w-10 h-10 text-sage-600 mx-auto mb-4 group-hover:text-bordeaux-600 transition-colors" />
                    <h3 className="font-serif font-medium text-stone-800 mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm text-stone-600 font-elegant italic">{item.subtitle}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 bg-sage-50/30">
        <div className="container mx-auto max-w-4xl text-center">
          <blockquote className="text-2xl md:text-3xl font-elegant italic text-stone-700 leading-relaxed">
            "L'amour ne se voit pas avec les yeux, mais avec l'âme."
          </blockquote>
          <cite className="block mt-6 text-lg text-stone-600 font-elegant">— William Shakespeare</cite>
        </div>
      </section>
    </div>
  )
}
