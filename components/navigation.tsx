"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/venue", label: "Le Lieu" },
    { href: "/program", label: "Programme" },
    { href: "/theme", label: "Thème" },
    { href: "/catering", label: "Restauration" },
    { href: "/accommodation", label: "Hébergement" },
    { href: "/info", label: "Informations" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 w-full bg-cream-50/95 backdrop-blur-md z-50 border-b border-stone-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center space-x-8 xl:space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-serif text-sm xl:text-base tracking-wide transition-all duration-300 hover:text-bordeaux-600 relative ${
                  pathname === item.href ? "text-bordeaux-700 font-medium" : "text-stone-700 hover:text-bordeaux-600"
                }`}
              >
                {item.label}
                {pathname === item.href && <div className="absolute -bottom-1 left-0 right-0 h-px bg-bordeaux-600"></div>}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Header */}
          <div className="lg:hidden flex justify-between items-center">
            <div className="text-lg font-display text-stone-800">Andres & Iris</div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-stone-700 hover:text-bordeaux-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] bg-cream-50 z-40 shadow-lg">
            <div className="container mx-auto px-4 py-8 bg-cream-50 min-h-full">
              <div className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`font-serif text-xl tracking-wide transition-all duration-300 py-4 px-2 border-b border-stone-200 ${
                      pathname === item.href 
                        ? "text-bordeaux-700 font-medium border-bordeaux-300 bg-sage-50/50" 
                        : "text-stone-700 hover:text-bordeaux-600 hover:border-bordeaux-200 hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
