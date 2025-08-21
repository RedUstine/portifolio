"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import "./Testimonials.css"

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      project: "Kitchen Renovation",
      image: "/professional-woman-portrait.png",
      rating: 5,
      text: "Stone & Tile Co. transformed our kitchen with beautiful Calacatta marble countertops. The craftsmanship is exceptional, and the team was professional throughout the entire process. Highly recommended!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Interior Designer",
      project: "Commercial Lobby",
      image: "/professional-man-portrait.png",
      rating: 5,
      text: "I've worked with many stone suppliers, but Stone & Tile Co. stands out for their quality and service. They delivered exactly what we needed for our luxury hotel lobby project.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Architect",
      project: "Residential Complex",
      image: "/confident-businesswoman.png",
      rating: 5,
      text: "Outstanding quality and attention to detail. The team at Stone & Tile Co. helped us achieve the perfect aesthetic for our high-end residential project. Their expertise is unmatched.",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ))
  }

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>Hear from satisfied customers who chose Stone & Tile Co. for their projects</p>
        </div>

        <div className="testimonials-container">
          <button className="nav-button prev" onClick={prevTestimonial}>
            ‹
          </button>

          <Card className="testimonial-card">
            <CardContent className="testimonial-content">
              <div className="testimonial-header">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="client-image"
                />
                <div className="client-info">
                  <h3 className="client-name">{testimonials[currentTestimonial].name}</h3>
                  <p className="client-role">{testimonials[currentTestimonial].role}</p>
                  <p className="project-type">{testimonials[currentTestimonial].project}</p>
                  <div className="rating">{renderStars(testimonials[currentTestimonial].rating)}</div>
                </div>
              </div>
              <blockquote className="testimonial-text">"{testimonials[currentTestimonial].text}"</blockquote>
            </CardContent>
          </Card>

          <button className="nav-button next" onClick={nextTestimonial}>
            ›
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentTestimonial ? "active" : ""}`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
