"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/venue", label: "Le Lieu" },
    { href: "/program", label: "Programme" },
    { href: "/theme", label: "Thème" },
    { href: "/catering", label: "Restauration" },
    { href: "/accommodation", label: "Hébergement" },
    { href: "/info", label: "Informations" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-cream-50/95 backdrop-blur-md z-50 border-b border-stone-200/50 shadow-sm">
      <div className="container mx-auto px-6 py-5">
        <div className="flex justify-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-serif text-sm tracking-wide transition-all duration-300 hover:text-bordeaux-600 relative ${
                pathname === item.href ? "text-bordeaux-700 font-medium" : "text-stone-700 hover:text-bordeaux-600"
              }`}
            >
              {item.label}
              {pathname === item.href && <div className="absolute -bottom-1 left-0 right-0 h-px bg-bordeaux-600"></div>}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
