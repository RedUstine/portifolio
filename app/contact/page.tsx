"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Calendar,
  Calculator,
  Users,
  Award,
  Shield,
} from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  projectSize: string
  timeline: string
  budget: string
  message: string
  preferredContact: string
  address: string
}

const projectTypes = [
  "Kitchen Renovation",
  "Bathroom Remodel",
  "Flooring Installation",
  "Countertops",
  "Backsplash",
  "Fireplace Surround",
  "Commercial Project",
  "Outdoor Installation",
  "Other",
]

const projectSizes = [
  "Small (< 100 sq ft)",
  "Medium (100-500 sq ft)",
  "Large (500-1000 sq ft)",
  "Extra Large (> 1000 sq ft)",
]

const timelines = ["ASAP", "Within 1 month", "1-3 months", "3-6 months", "6+ months", "Just exploring"]

const budgets = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $30,000",
  "$30,000 - $50,000",
  "$50,000+",
  "Not sure yet",
]

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    projectSize: "",
    timeline: "",
    budget: "",
    message: "",
    preferredContact: "email",
    address: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Pre-fill form from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const product = urlParams.get("product")
    const project = urlParams.get("project")
    const message = urlParams.get("message")

    if (product || project || message) {
      setFormData((prev) => ({
        ...prev,
        message: message || `I'm interested in ${product || project}. Please provide more information.`,
        projectType: project ? "Other" : prev.projectType,
      }))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.projectType) newErrors.projectType = "Project type is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after successful submission
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        projectSize: "",
        timeline: "",
        budget: "",
        message: "",
        preferredContact: "email",
        address: "",
      })
    }, 3000)
  }

  const handlePhoneClick = () => {
    window.location.href = "tel:+15551234567"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@stonetileco.com"
  }

  const handleDirectionsClick = () => {
    window.open("https://maps.google.com/?q=123+Stone+Avenue,+New+York,+NY+10001", "_blank")
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you within 24 hours with a detailed response.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                <Link href="/">Return Home</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/gallery">View Our Work</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm text-gray-300 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 inline mx-2" />
              <span>Contact</span>
            </nav>
            <h1 className="text-5xl font-bold mb-6">Get Your Free Consultation</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Ready to transform your space? Contact our expert team for a free consultation and personalized quote.
              We're here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700" onClick={handlePhoneClick}>
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (123) 456-7890
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Your Free Quote</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Fill out the form below and we'll get back to you within 24 hours with a detailed quote and
                    consultation scheduling options.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                          Project Type *
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                            errors.projectType ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>}
                      </div>

                      <div>
                        <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700 mb-2">
                          Project Size
                        </label>
                        <select
                          id="projectSize"
                          name="projectSize"
                          value={formData.projectSize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">Select project size</option>
                          {projectSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">Select budget range</option>
                          {budgets.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Please describe your project, including any specific materials, styles, or requirements you have in mind..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === "email"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Email
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === "phone"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Phone
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="both"
                          checked={formData.preferredContact === "both"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Both
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send My Request
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <button
                    onClick={handlePhoneClick}
                    className="flex items-center w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-amber-600 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">(123) 456-7890</div>
                      <div className="text-sm text-gray-600">Call for immediate assistance</div>
                    </div>
                  </button>

                  <button
                    onClick={handleEmailClick}
                    className="flex items-center w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-amber-600 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">info@stonetileco.com</div>
                      <div className="text-sm text-gray-600">Email us your questions</div>
                    </div>
                  </button>

                  <button
                    onClick={handleDirectionsClick}
                    className="flex items-center w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-amber-600 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">123 Stone Avenue</div>
                      <div className="text-sm text-gray-600">New York, NY 10001</div>
                    </div>
                  </button>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-amber-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Business Hours</div>
                      <div className="text-sm text-gray-600">
                        Mon-Fri: 8AM-6PM
                        <br />
                        Sat: 9AM-4PM
                        <br />
                        Sun: By appointment
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img src="/showroom-map.png" alt="Our Location" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100" onClick={handleDirectionsClick}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-amber-600 mr-3 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">25+ Years Experience</div>
                      <div className="text-sm text-gray-600">Industry-leading expertise and craftsmanship</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">10-Year Warranty</div>
                      <div className="text-sm text-gray-600">Comprehensive warranty on all installations</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Certified Team</div>
                      <div className="text-sm text-gray-600">Licensed and insured professionals</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calculator className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Free Estimates</div>
                      <div className="text-sm text-gray-600">No obligation quotes and consultations</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Service */}
            <Card className="shadow-lg bg-red-50 border-red-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4">Emergency Service Available</h3>
                <p className="text-red-700 mb-4">
                  Need urgent stone repair or replacement? We offer 24/7 emergency services for critical situations.
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handlePhoneClick}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
