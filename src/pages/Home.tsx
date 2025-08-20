"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Globe,
  Play,
  Pause,
  Handshake,
  Award,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  HeadphonesIcon,
  Send,
} from "lucide-react"

interface VideoTestimonial {
  videoUrl: string
  thumbnailUrl: string
  duration: string
  clientName: string
  clientTitle: string
  projectType: string
}

interface Project {
  id: number
  title: string
  type: string
  location?: string
  description?: string
  beforeImage: string
  afterImage: string
  details?: string[]
  duration?: string
  budget?: string
  teamSize?: string
  completionDate?: string
  challenges?: string[]
  materials?: string[]
  clientTestimonial?: string
  clientName?: string
  videoTestimonial?: VideoTestimonial
  category: "Residential" | "Commercial" | "Kitchens" | "Bathrooms" | "Other"
}

interface MarbleType {
  name: string
  imageQuery: string
  origin: string
  color: string
  characteristics: string
  commonUses: string[]
  priceRange: string
  availability: string
}

interface SlideData {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonAction: () => void
  stats?: { label: string; value: string }[]
}

const Home: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [showVideoControls, setShowVideoControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "Kitchen Renovation",
    details: "",
  })
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Residential" | "Commercial" | "Kitchens" | "Bathrooms" | "Other"
  >("All")
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(6)
  const [scrolled, setScrolled] = useState(false)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Slideshow data
  const slides: SlideData[] = [
    {
      id: 1,
      title: "Transform Your Space with Premium Marble",
      subtitle: "Excellence in Stone Since 1995",
      description:
        "From contract negotiations to global imports and expert installation, we deliver end-to-end marble solutions for residential and commercial projects across the United States.",
      image: "luxury marble kitchen with calacatta gold countertops",
      buttonText: "Start Your Project",
      buttonAction: () => scrollToSection("contact"),
      stats: [
        { label: "Projects Completed", value: "500+" },
        { label: "Years Experience", value: "15+" },
        { label: "Countries Sourced", value: "50+" },
      ],
    },
    {
      id: 2,
      title: "Global Sourcing Network",
      subtitle: "The World's Finest Materials",
      description:
        "We directly import the most exquisite marble from renowned quarries in Italy, Greece, Turkey, Brazil, and beyond. Our extensive global network ensures access to unique patterns and colors.",
      image: "marble quarry in Carrara Italy with workers",
      buttonText: "Explore Materials",
      buttonAction: () => scrollToSection("marble-types"),
      stats: [
        { label: "Global Quarries", value: "50+" },
        { label: "Marble Varieties", value: "200+" },
        { label: "Quality Guarantee", value: "100%" },
      ],
    },
    {
      id: 3,
      title: "Master Craftsmen at Work",
      subtitle: "Precision in Every Cut",
      description:
        "Our team of certified master craftsmen brings decades of experience to every installation. Using state-of-the-art tools and time-honored techniques for flawless results.",
      image: "skilled craftsman cutting marble with precision tools",
      buttonText: "Meet Our Team",
      buttonAction: () => scrollToSection("team"),
      stats: [
        { label: "Master Craftsmen", value: "25+" },
        { label: "Installation Precision", value: "99.9%" },
        { label: "Customer Satisfaction", value: "98%" },
      ],
    },
    {
      id: 4,
      title: "Commercial Excellence",
      subtitle: "Large-Scale Project Specialists",
      description:
        "From corporate lobbies to luxury hotels, we handle large-scale commercial projects with unmatched expertise. Coordinating with architects, contractors, and designers.",
      image: "elegant commercial lobby with nero marquina marble flooring",
      buttonText: "View Portfolio",
      buttonAction: () => scrollToSection("portfolio"),
      stats: [
        { label: "Commercial Projects", value: "150+" },
        { label: "Square Feet Installed", value: "2M+" },
        { label: "On-Time Delivery", value: "100%" },
      ],
    },
  ]

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for subscribing! We'll send marble inspiration and updates to ${newsletterEmail}`)
    setNewsletterEmail("")
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+15551232672253"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@premiermarbleusa.com"
  }

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=1234+Marble+Way,+Stone+City,+NY+10001", "_blank")
  }

  const openImagePreview = (imageSrc: string) => {
    setPreviewImage(imageSrc)
  }

  const closeImagePreview = () => {
    setPreviewImage(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImagePreview}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
            >
              ✕ Close
            </button>
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Hero Slideshow Section */}
      <section id="hero" className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="relative h-screen">
          {/* Slideshow Container */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={`/abstract-geometric-shapes.png?height=800&width=1200&query=${encodeURIComponent(slide.image)}`}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>

                {/* Slide Content */}
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-3xl text-white">
                    <Badge className="mb-4 bg-white bg-opacity-20 text-white border-white border-opacity-30">
                      {slide.subtitle}
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">{slide.description}</p>

                    {/* Stats */}
                    {slide.stats && (
                      <div className="flex flex-wrap gap-8 mb-8">
                        {slide.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-white opacity-80">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        onClick={slide.buttonAction}
                      >
                        {slide.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                        onClick={() => scrollToSection("portfolio")}
                      >
                        View Portfolio
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Licensed & Insured</h3>
              <p className="text-gray-600 text-sm">Fully bonded and insured for your peace of mind</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Award Winning</h3>
              <p className="text-gray-600 text-sm">Recognized for excellence in craftsmanship</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-gray-600 text-sm">Complimentary delivery on orders over $5,000</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <HeadphonesIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-800">Why Premier Marble USA?</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Premier Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choosing us means partnering with a team dedicated to unparalleled quality, craftsmanship, and client
              satisfaction. Here's what sets us apart from the competition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Unrivaled Expertise</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  With over 15 years in the industry, our team comprises master craftsmen and seasoned professionals who
                  bring extensive knowledge and precision to every project, ensuring flawless execution.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  <li>• 15+ years industry experience</li>
                  <li>• Certified master craftsmen</li>
                  <li>• 500+ completed projects</li>
                  <li>• Precision installation guarantee</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Sourcing Network</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We directly import the most exquisite and rare marble from quarries worldwide, offering you an
                  unparalleled selection of unique materials not found elsewhere.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  <li>• Direct quarry relationships</li>
                  <li>• 50+ countries sourced</li>
                  <li>• Exclusive material access</li>
                  <li>• Quality control at source</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Client-Centric Approach</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your vision is our priority. We provide personalized consultations, transparent communication, and
                  dedicated project management to ensure your complete satisfaction from start to finish.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  <li>• Personalized consultations</li>
                  <li>• Transparent pricing</li>
                  <li>• Dedicated project managers</li>
                  <li>• 98% customer satisfaction</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button type="button" size="lg" onClick={() => scrollToSection("contact")}>
              Get a Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Inspired with Marble Trends</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get exclusive access to design inspiration, new material arrivals, maintenance tips, and special offers
              delivered to your inbox monthly.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <Button type="submit" className="bg-white text-gray-900 hover:bg-gray-100 px-6">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-gray-400 mt-4">Join 5,000+ homeowners and designers. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-white text-gray-900">Contact Us</Badge>
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Marble Project?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get in touch with our team for a consultation and free quote. We're here to bring your vision to life
                with premium marble solutions.
              </p>

              <div className="space-y-6">
                <button
                  type="button"
                  onClick={handlePhoneCall}
                  className="flex items-center gap-4 hover:bg-gray-800 p-3 rounded-lg transition-colors w-full text-left"
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">(555) 123-MARBLE</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleEmailClick}
                  className="flex items-center gap-4 hover:bg-gray-800 p-3 rounded-lg transition-colors w-full text-left"
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">info@premiermarbleusa.com</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleGetDirections}
                  className="flex items-center gap-4 hover:bg-gray-800 p-3 rounded-lg transition-colors w-full text-left"
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-300">
                      1234 Marble Way
                      <br />
                      Stone City, NY 10001
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Get Your Free Quote</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option>Kitchen Renovation</option>
                      <option>Bathroom Remodel</option>
                      <option>Commercial Project</option>
                      <option>Flooring Installation</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Details</label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 py-3">
                    Get Free Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
