"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroCarouselProps {
  images: string[]
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000) // Change image every 4 seconds for more relaxed viewing

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, images.length])

  // Handle mouse enter to pause auto-play
  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  // Handle mouse leave to resume auto-play
  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  // Restart auto-play after user interaction
  const handleUserInteraction = () => {
    setIsAutoPlaying(false) // Stop auto-play immediately
    
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    
    // Start new timer to resume auto-play after 5 seconds of inactivity
    inactivityTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
    handleUserInteraction()
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    handleUserInteraction()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    handleUserInteraction()
  }

  if (images.length === 0) {
    return (
      <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl elegant-border bg-stone-100 h-96 flex items-center justify-center">
        <p className="text-stone-500 font-elegant">Aucune image disponible</p>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl elegant-border">
        <Image
          src={images[0]}
          alt="Andres & Iris"
          width={1200}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
    )
  }

  return (
    <div 
      className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl elegant-border relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full relative">
              <Image
                src={image}
                alt={`Andres & Iris - Photo ${index + 1}`}
                width={1200}
                height={600}
                className="w-full h-auto"
                priority={index === 0}
              />
              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/95 text-stone-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="sr-only">Photo précédente</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/95 text-stone-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-10"
      >
        <ChevronRight className="w-6 h-6" />
        <span className="sr-only">Photo suivante</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white shadow-lg scale-125"
                : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Aller à la photo ${index + 1}`}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-elegant opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isAutoPlaying ? (
          <div className="bg-sage-600/80 text-white px-3 py-1 rounded-full text-xs font-elegant flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Auto</span>
          </div>
        ) : (
          <div className="bg-stone-600/80 text-white px-3 py-1 rounded-full text-xs font-elegant">
            Pause
          </div>
        )}
      </div>
    </div>
  )
} 