"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import "./Header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleCallClick = () => {
    window.location.href = "tel:+15551234567"
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">S&T</div>
            <div className="logo-text">
              <h1>Stone & Tile Co.</h1>
              <span>Premium Stone Solutions</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <button onClick={() => scrollToSection("home")} className="nav-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("featured-products")} className="nav-link">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="nav-link">
                  Services
                </button>
              </li>
              <li>
                <a href="/gallery" className="nav-link">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/about" className="nav-link">
                  About
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="nav-link">
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <Button onClick={handleCallClick} variant="outline" className="call-button bg-transparent">
              <svg className="phone-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Now
            </Button>
            <Button onClick={() => scrollToSection("contact")} className="quote-button">
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-links">
            <li>
              <button onClick={() => scrollToSection("home")} className="mobile-nav-link">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("featured-products")} className="mobile-nav-link">
                Products
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("services")} className="mobile-nav-link">
                Services
              </button>
            </li>
            <li>
              <a href="/gallery" className="mobile-nav-link">
                Gallery
              </a>
            </li>
            <li>
              <a href="/about" className="mobile-nav-link">
                About
              </a>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")} className="mobile-nav-link">
                Contact
              </button>
            </li>
            <li className="mobile-actions">
              <Button onClick={handleCallClick} variant="outline" className="mobile-call-button bg-transparent">
                Call Now
              </Button>
              <Button onClick={() => scrollToSection("contact")} className="mobile-quote-button">
                Get Quote
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
