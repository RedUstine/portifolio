"use client"

import { useState } from "react"
import Hero from "../components/Hero"
import Stats from "../components/Stats"
import FeaturedProducts from "../components/FeaturedProducts"
import Services from "../components/Services"
import Testimonials from "../components/Testimonials"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import "./Home.css"

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "Kitchen Renovation",
    details: "",
  })
  const [newsletterEmail, setNewsletterEmail] = useState("")

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you ${formData.firstName}! We'll contact you soon about your ${formData.projectType} project.`)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectType: "Kitchen Renovation",
      details: "",
    })
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for subscribing! We'll send marble inspiration and updates to ${newsletterEmail}`)
    setNewsletterEmail("")
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+15551234567"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@stonetileco.com"
  }

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=123+Stone+Avenue,+New+York,+NY+10001", "_blank")
  }

  return (
    <div className="home">
      <Hero />
      <Stats />

      {/* Trust Indicators */}
      <section className="trust-indicators">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <svg className="trust-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3>Award Winning</h3>
              <p>Recognized for excellence in stone installation</p>
            </div>
            <div className="trust-item">
              <svg className="trust-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3>Fully Insured</h3>
              <p>Complete protection for your peace of mind</p>
            </div>
            <div className="trust-item">
              <svg className="trust-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3>24/7 Emergency</h3>
              <p>Round-the-clock support when you need it</p>
            </div>
            <div className="trust-item">
              <svg className="trust-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3>Expert Team</h3>
              <p>Certified professionals with 15+ years experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Stone & Tile Co.</h2>
            <p>Discover what sets us apart in the luxury stone industry</p>
          </div>
          <div className="features-grid">
            <Card className="feature-card">
              <CardContent className="feature-content">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3>Premium Quality Materials</h3>
                <p>
                  We source only the finest marble, granite, and natural stones from quarries worldwide, ensuring
                  exceptional quality and beauty.
                </p>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-content">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3>Expert Craftsmanship</h3>
                <p>
                  Our certified artisans bring decades of experience, delivering precision installation and flawless
                  finishes every time.
                </p>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-content">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3>Lifetime Warranty</h3>
                <p>
                  We stand behind our work with comprehensive warranties, giving you confidence in your investment for
                  years to come.
                </p>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-content">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3>Timely Delivery</h3>
                <p>
                  We respect your schedule with precise project timelines and efficient installation processes that
                  minimize disruption.
                </p>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-content">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <h3>Custom Design Service</h3>
                <p>
                  From concept to completion, our design team creates bespoke solutions tailored to your unique vision
                  and space.
                </p>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-content">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <h3>24/7 Support</h3>
                <p>
                  Our dedicated customer service team is available around the clock for emergency support and
                  maintenance needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <Services />
      <Testimonials />

      {/* Marble Types with Pricing */}
      <section className="marble-types">
        <div className="container">
          <div className="section-header">
            <h2>Premium Marble Collection</h2>
            <p>Discover our curated selection of world-class marble</p>
          </div>
          <div className="marble-grid">
            <Card className="marble-card">
              <div className="marble-image">
                <img src="/carrara-white-marble.png" alt="Carrara White" />
              </div>
              <CardContent className="marble-info">
                <h3>Carrara White</h3>
                <p>Classic Italian marble with subtle gray veining</p>
                <div className="marble-details">
                  <span className="price">From $85/sq ft</span>
                  <Badge variant="secondary">In Stock</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="marble-card">
              <div className="marble-image">
                <img src="/calacatta-gold-marble.png" alt="Calacatta Gold" />
              </div>
              <CardContent className="marble-info">
                <h3>Calacatta Gold</h3>
                <p>Luxurious marble with dramatic gold veining</p>
                <div className="marble-details">
                  <span className="price">From $120/sq ft</span>
                  <Badge variant="outline">Limited Stock</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="marble-card">
              <div className="marble-image">
                <img src="/nero-marquina-marble.png" alt="Nero Marquina" />
              </div>
              <CardContent className="marble-info">
                <h3>Nero Marquina</h3>
                <p>Elegant black marble with white veining</p>
                <div className="marble-details">
                  <span className="price">From $95/sq ft</span>
                  <Badge variant="secondary">In Stock</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our services</p>
          </div>
          <div className="faq-content">
            <Accordion type="single" collapsible className="faq-accordion">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does a typical installation take?</AccordionTrigger>
                <AccordionContent>
                  Installation time varies by project size and complexity. Kitchen countertops typically take 1-2 days,
                  while full bathroom renovations may take 3-5 days. We provide detailed timelines during consultation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you offer warranties on your work?</AccordionTrigger>
                <AccordionContent>
                  Yes, we provide comprehensive warranties on all installations. Our craftsmanship warranty covers 5
                  years, and material warranties vary by stone type. We also offer extended warranty options.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can you match existing stone work?</AccordionTrigger>
                <AccordionContent>
                  Our experts can match existing stone work for additions or repairs. We maintain extensive samples and
                  work with quarries worldwide to find the perfect match.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What maintenance is required for marble surfaces?</AccordionTrigger>
                <AccordionContent>
                  Marble requires regular sealing (annually) and gentle cleaning with pH-neutral products. We provide
                  detailed care instructions and offer maintenance services to keep your surfaces beautiful.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Do you handle commercial projects?</AccordionTrigger>
                <AccordionContent>
                  Yes, we specialize in both residential and commercial projects. Our team has experience with hotels,
                  restaurants, offices, and retail spaces, providing full project management services.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>How do I get a quote for my project?</AccordionTrigger>
                <AccordionContent>
                  Contact us for a free consultation. We'll assess your space, discuss your vision, and provide a
                  detailed quote. Most quotes are provided within 24-48 hours of site visit.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>What areas do you serve?</AccordionTrigger>
                <AccordionContent>
                  We serve the greater metropolitan area within a 50-mile radius. For larger commercial projects, we can
                  extend our service area. Contact us to confirm service availability in your location.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>Do you offer financing options?</AccordionTrigger>
                <AccordionContent>
                  Yes, we partner with leading financing companies to offer flexible payment options. We have programs
                  for both residential and commercial clients with competitive rates and terms.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Inspired with Stone Trends</h2>
            <p>Get exclusive access to design inspiration, new arrivals, and special offers delivered monthly.</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <Button type="submit" className="newsletter-button">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Subscribe
              </Button>
            </form>
            <p className="newsletter-note">Join 5,000+ homeowners and designers. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <Badge className="contact-badge">Contact Us</Badge>
              <h2>Ready to Start Your Project?</h2>
              <p>
                Get in touch with our team for a consultation and free quote. We're here to bring your vision to life
                with premium stone solutions.
              </p>

              <div className="contact-methods">
                <button type="button" onClick={handlePhoneCall} className="contact-method">
                  <div className="method-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="method-info">
                    <div className="method-title">Phone</div>
                    <div className="method-detail">(123) 456-7890</div>
                    <div className="method-note">Available 24/7 for emergencies</div>
                  </div>
                </button>

                <button type="button" onClick={handleEmailClick} className="contact-method">
                  <div className="method-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="method-info">
                    <div className="method-title">Email</div>
                    <div className="method-detail">info@stonetileco.com</div>
                    <div className="method-note">We respond within 2 hours</div>
                  </div>
                </button>

                <button type="button" onClick={handleGetDirections} className="contact-method">
                  <div className="method-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="method-info">
                    <div className="method-title">Showroom</div>
                    <div className="method-detail">
                      123 Stone Avenue
                      <br />
                      New York, NY 10001
                    </div>
                    <div className="method-note">Visit by appointment</div>
                  </div>
                </button>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="method-info">
                    <div className="method-title">Business Hours</div>
                    <div className="method-detail">
                      Monday - Friday: 8AM - 6PM
                      <br />
                      Saturday: 9AM - 4PM
                      <br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="contact-form-card">
              <CardContent className="contact-form-content">
                <h3>Get Your Free Quote</h3>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                <form onSubmit={handleFormSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Project Type *</label>
                    <select name="projectType" value={formData.projectType} onChange={handleFormChange}>
                      <option>Kitchen Renovation</option>
                      <option>Bathroom Remodel</option>
                      <option>Commercial Project</option>
                      <option>Flooring Installation</option>
                      <option>Fireplace Surround</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Project Details</label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Tell us about your project, including room dimensions, style preferences, and any specific requirements..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="submit-button">
                    Get Free Quote & Consultation
                  </Button>
                </form>

                <div className="form-note">
                  <h4>What happens next?</h4>
                  <ul>
                    <li>We'll contact you within 24 hours</li>
                    <li>Schedule a free in-home consultation</li>
                    <li>Provide detailed estimate and timeline</li>
                    <li>Begin your stone transformation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
