"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCallClick = () => {
    window.location.href = "tel:+15551234567"
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-amber-100 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S&T</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Stone & Tile Co.</span>
              <div className="text-xs text-gray-600">Premium Stone Solutions</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-amber-600 transition-colors">
              Products
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-amber-600 transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleCallClick}>
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700" asChild>
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-amber-600 transition-colors"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                href="/gallery"
                className="text-gray-700 hover:text-amber-600 transition-colors"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors" onClick={toggleMenu}>
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-amber-600 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" onClick={handleCallClick}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
