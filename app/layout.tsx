import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stone & Tile Co. - Premium Marble & Stone Solutions",
  description:
    "Transform your space with our premium marble, granite, and natural stone. Professional installation, custom fabrication, and expert design services for residential and commercial projects.",
  keywords: "marble, granite, natural stone, countertops, flooring, installation, stone tile company",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
