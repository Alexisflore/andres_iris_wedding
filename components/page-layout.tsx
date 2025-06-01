import React from "react"
import Navigation from "./navigation"
import { Crown } from "lucide-react"

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export default function PageLayout({ children, title, subtitle, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-cream-50 to-stone-50 ${className}`}>
      <Navigation />
      <div className="pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-7xl">
          {(title || subtitle) && (
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="h-px bg-sage-300 w-16 sm:w-24"></div>
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-sage-600 mx-4 sm:mx-6" />
                <div className="h-px bg-sage-300 w-16 sm:w-24"></div>
              </div>
              {title && (
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-stone-800 mb-4 sm:mb-6 heading-primary px-4">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-base sm:text-lg lg:text-xl text-stone-600 max-w-4xl mx-auto font-elegant leading-relaxed px-4">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
} 