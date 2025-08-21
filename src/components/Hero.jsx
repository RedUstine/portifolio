"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import "./Hero.css"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      image: "/luxury-marble-showroom.png",
      title: "Premium Stone & Tile Solutions",
      subtitle: "Transform Your Space with Luxury",
      description:
        "Discover our exquisite collection of marble, granite, and natural stone for residential and commercial projects.",
      cta: "Explore Collection",
    },
    {
      id: 2,
      image: "/carrara-marble-tile.png",
      title: "Expert Craftsmanship",
      subtitle: "15+ Years of Excellence",
      description: "Our certified artisans deliver precision installation and flawless finishes for every project.",
      cta: "View Our Work",
    },
    {
      id: 3,
      image: "/marble-warehouse.png",
      title: "Custom Design Services",
      subtitle: "Bring Your Vision to Life",
      description: "From concept to completion, we create bespoke stone solutions tailored to your unique style.",
      cta: "Start Your Project",
    },
    {
      id: 4,
      image: "/abstract-geometric-shapes.png",
      title: "Quality Guaranteed",
      subtitle: "Lifetime Warranty",
      description: "We stand behind our work with comprehensive warranties and 24/7 customer support.",
      cta: "Learn More",
    },
  ]

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleCTAClick = () => {
    const element = document.getElementById("featured-products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="hero">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
            }}
          >
            <div className="slide-content">
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <h2 className="hero-subtitle">{slide.subtitle}</h2>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-actions">
                    <Button onClick={handleCTAClick} className="cta-button primary">
                      {slide.cta}
                    </Button>
                    <Button variant="outline" className="cta-button secondary bg-transparent">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="slideshow-controls">
        <button className="nav-btn prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="nav-btn next" onClick={nextSlide}>
          ›
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="slideshow-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button className="play-pause-btn" onClick={togglePlayPause}>
        {isPlaying ? "⏸️" : "▶️"}
      </button>

      {/* Stats Overlay */}
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">1500+</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">850+</span>
          <span className="stat-label">Clients</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">15+</span>
          <span className="stat-label">Years</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">99%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
