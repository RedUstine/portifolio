"use client"

import type React from "react"
import { useState } from "react"
import "./Testimonials.css"

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      location: "Beverly Hills, CA",
      rating: 5,
      text: "Absolutely stunning work! The Carrara marble in our kitchen is breathtaking. The installation team was professional and the quality exceeded our expectations.",
      image: "/professional-woman-portrait.png",
    },
    {
      name: "Michael Chen",
      role: "Interior Designer",
      location: "New York, NY",
      rating: 5,
      text: "I've worked with Stone & Tile Co. on multiple projects. Their attention to detail and product quality is unmatched. Highly recommended for luxury projects.",
      image: "/professional-man-portrait.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Restaurant Owner",
      location: "Miami, FL",
      rating: 5,
      text: "The ceramic tiles transformed our restaurant completely. Durable, beautiful, and easy to maintain. The team delivered exactly what we envisioned.",
      image: "/confident-businesswoman.png",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="star">
                    ⭐
                  </span>
                ))}
              </div>

              <blockquote className="testimonial-text">"{testimonials[currentTestimonial].text}"</blockquote>

              <div className="testimonial-author">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="author-image"
                />
                <div className="author-info">
                  <h4 className="author-name">{testimonials[currentTestimonial].name}</h4>
                  <p className="author-role">{testimonials[currentTestimonial].role}</p>
                  <p className="author-location">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-controls">
            <button onClick={prevTestimonial} className="carousel-btn prev">
              ←
            </button>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? "active" : ""}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
            <button onClick={nextTestimonial} className="carousel-btn next">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
