"use client"

import type React from "react"
import { useState } from "react"
import "./Contact.css"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  message: string
  preferredContact: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    preferredContact: "email",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
        preferredContact: "email",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-description">
            Ready to start your project? Get in touch with our team for a free consultation and quote.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Get In Touch</h2>
            <p>We're here to help bring your vision to life. Contact us today to discuss your project.</p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-info">
                  <h3>Phone</h3>
                  <p>(123) 456-7890</p>
                  <span>Mon-Fri: 8AM-6PM</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">✉️</div>
                <div className="method-info">
                  <h3>Email</h3>
                  <p>info@stonetileco.com</p>
                  <span>We respond within 24 hours</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-info">
                  <h3>Showroom</h3>
                  <p>
                    123 Stone Avenue
                    <br />
                    New York, NY 10001
                  </p>
                  <span>Visit by appointment</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">🕒</div>
                <div className="method-info">
                  <h3>Business Hours</h3>
                  <p>
                    Monday - Friday: 8AM - 6PM
                    <br />
                    Saturday: 9AM - 4PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="map-section">
              <h3>Visit Our Showroom</h3>
              <div className="map-placeholder">
                <img src="/showroom-map.png" alt="Showroom Location Map" />
                <div className="map-overlay">
                  <button className="directions-btn">Get Directions</button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-container">
              <h2>Request a Free Quote</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>

              {submitStatus === "success" && (
                <div className="alert alert-success">
                  <h4>Thank you for your inquiry!</h4>
                  <p>We've received your message and will contact you within 24 hours.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="alert alert-error">
                  <h4>Something went wrong</h4>
                  <p>Please try again or contact us directly at (123) 456-7890.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type *</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Project Type</option>
                      <option value="kitchen">Kitchen Renovation</option>
                      <option value="bathroom">Bathroom Remodel</option>
                      <option value="flooring">Flooring Installation</option>
                      <option value="commercial">Commercial Project</option>
                      <option value="outdoor">Outdoor/Patio</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange}>
                      <option value="">Select Budget Range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-30k">$15,000 - $30,000</option>
                      <option value="30k-50k">$30,000 - $50,000</option>
                      <option value="over-50k">Over $50,000</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="timeline">Project Timeline</label>
                    <select id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange}>
                      <option value="">Select Timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="6-months">Within 6 months</option>
                      <option value="planning">Just planning</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="preferredContact">Preferred Contact Method</label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="text">Text Message</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell us about your project, including room dimensions, style preferences, and any specific requirements..."
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <p className="form-note">
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long does installation take?</h3>
              <p>
                Installation time varies by project size and complexity. Most residential projects take 2-5 days, while
                larger commercial projects may take 1-3 weeks.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you provide free estimates?</h3>
              <p>
                Yes! We provide free, no-obligation estimates for all projects. We'll visit your space to provide
                accurate measurements and recommendations.
              </p>
            </div>
            <div className="faq-item">
              <h3>What's included in your service?</h3>
              <p>
                Our full-service approach includes consultation, material selection, professional installation, and
                post-installation support and maintenance guidance.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you work with contractors?</h3>
              <p>
                We work with contractors, architects, and designers. We can coordinate with your team to ensure seamless
                project execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
