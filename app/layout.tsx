import type React from "react"
import type { Metadata } from "next/metadata"
import { Inter, Playfair_Display, Crimson_Text } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})
const crimson = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-crimson",
  weight: ["400", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Andres & Iris - 26 Septembre 2026",
  description: "Célébrez notre union aux Tourelles de Fonville",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${playfair.variable} ${crimson.variable} font-sans bg-cream-50 text-stone-800`}
      >
        {children}
      </body>
    </html>
  )
}
