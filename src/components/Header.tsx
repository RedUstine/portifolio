"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import ShoppingCart from "./ShoppingCart"
import CartButton from "./CartButton"
import "./Header.css"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <div className="logo-icon">
              <span>ST</span>
            </div>
            <div className="logo-text">
              <h1>Stone & Tile Co.</h1>
              <p>Premium Marble & Ceramics</p>
            </div>
          </Link>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMenu}>
              Home
            </Link>
            <Link to="/products" className={location.pathname === "/products" ? "active" : ""} onClick={closeMenu}>
              Products
            </Link>
            <Link to="/gallery" className={location.pathname === "/gallery" ? "active" : ""} onClick={closeMenu}>
              Gallery
            </Link>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""} onClick={closeMenu}>
              About
            </Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={closeMenu}>
              Contact
            </Link>
          </nav>

          <div className="header-actions">
            <a href="tel:+1234567890" className="phone-btn">
              📞 (123) 456-7890
            </a>
            <Link to="/contact" className="quote-btn">
              Get Quote
            </Link>
            <CartButton onClick={openCart} />
          </div>

          <button className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <ShoppingCart isOpen={isCartOpen} onClose={closeCart} />
    </header>
  )
}

export default Header
