"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  CheckCircle,
  Calendar,
  ThumbsUp,
} from "lucide-react"

// Slideshow data
const slides = [
  {
    image: "/luxury-marble-showroom.png",
    title: "Premium Marble Collection",
    subtitle: "Discover our exclusive selection of luxury marble",
    description:
      "Transform your space with the finest Italian Carrara and Calacatta marble, expertly crafted for perfection.",
    cta: "Explore Collection",
  },
  {
    image: "/carrara-marble-tile.png",
    title: "Expert Installation Services",
    subtitle: "Professional craftsmanship for your dream space",
    description:
      "Our certified artisans deliver precision installation with 25+ years of experience and attention to detail.",
    cta: "Get Quote",
  },
  {
    image: "/travertine-stone-sample.png",
    title: "Custom Stone Solutions",
    subtitle: "Tailored designs for residential & commercial",
    description: "From concept to completion, we create bespoke stone solutions that perfectly match your vision.",
    cta: "View Projects",
  },
  {
    image: "/calacatta-gold-marble.png",
    title: "25+ Years of Excellence",
    subtitle: "Trusted by thousands of satisfied customers",
    description: "Award-winning quality with lifetime warranty and 24/7 customer support for complete peace of mind.",
    cta: "Learn More",
  },
]

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Carrara White Marble",
    price: "From $89/sq ft",
    image: "/carrara-white-marble.png",
    category: "Premium Marble",
    availability: "In Stock",
    description: "Classic Italian marble with subtle gray veining",
    features: ["Natural stone", "Polished finish", "Heat resistant"],
  },
  {
    id: 2,
    name: "Calacatta Gold Marble",
    price: "From $125/sq ft",
    image: "/calacatta-gold-marble.png",
    category: "Luxury Collection",
    availability: "Limited",
    description: "Luxurious marble with dramatic gold veining",
    features: ["Premium quality", "Unique patterns", "Bookmatched available"],
  },
  {
    id: 3,
    name: "Travertine Stone",
    price: "From $65/sq ft",
    image: "/travertine-stone-sample.png",
    category: "Natural Stone",
    availability: "In Stock",
    description: "Warm, textured natural stone perfect for outdoor spaces",
    features: ["Weather resistant", "Non-slip surface", "Natural beauty"],
  },
  {
    id: 4,
    name: "Large Format Ceramic",
    price: "From $45/sq ft",
    image: "/large-format-ceramic-tile.png",
    category: "Modern Ceramic",
    availability: "In Stock",
    description: "Contemporary ceramic tiles with minimal grout lines",
    features: ["Easy maintenance", "Water resistant", "Contemporary look"],
  },
]

// Services data
const services = [
  {
    title: "Custom Fabrication",
    description: "Precision cutting and shaping with state-of-the-art CNC technology for perfect fit and finish.",
    icon: "🔧",
    features: ["CNC precision cutting", "Edge profiling", "Custom shapes", "Quality control"],
  },
  {
    title: "Professional Installation",
    description: "Expert installation by certified craftsmen with 25+ years of experience and attention to detail.",
    icon: "🏗️",
    features: ["Certified installers", "Quality guarantee", "Timely completion", "Clean workspace"],
  },
  {
    title: "Design Consultation",
    description: "Free design consultation with 3D visualization to help you make the perfect choice for your space.",
    icon: "📐",
    features: ["Free consultation", "3D visualization", "Material selection", "Custom designs"],
  },
  {
    title: "Maintenance Services",
    description: "Professional cleaning, sealing, and restoration services to keep your stone looking beautiful.",
    icon: "✨",
    features: ["Professional cleaning", "Sealing services", "Restoration", "Maintenance plans"],
  },
]

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "/professional-woman-portrait.png",
    rating: 5,
    text: "Absolutely stunning work! The Carrara marble in our kitchen exceeded all expectations. The team was professional, punctual, and left everything spotless.",
    project: "Kitchen Renovation",
    location: "Beverly Hills, CA",
  },
  {
    name: "Michael Chen",
    role: "Interior Designer",
    image: "/professional-man-portrait.png",
    rating: 5,
    text: "I've worked with many stone suppliers, but Stone & Tile Co. stands out for their quality and service. They delivered exactly what we needed for our luxury hotel lobby.",
    project: "Commercial Lobby",
    location: "Manhattan, NY",
  },
  {
    name: "Emily Rodriguez",
    role: "Business Owner",
    image: "/confident-businesswoman.png",
    rating: 5,
    text: "Outstanding quality and attention to detail. The team helped us achieve the perfect aesthetic for our high-end residential project. Highly recommended!",
    project: "Office Renovation",
    location: "Miami, FL",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slideshow */}
      <section className="relative h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl text-white">
                  <h1 className="text-6xl font-bold mb-4 leading-tight">{slide.title}</h1>
                  <h2 className="text-2xl mb-6 text-amber-200">{slide.subtitle}</h2>
                  <p className="text-xl mb-8 opacity-90 leading-relaxed">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-4">
                      {slide.cta}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slideshow Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Stats Overlay */}
        <div className="absolute bottom-24 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm opacity-90">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm opacity-90">Years</div>
            </div>
            <div>
              <div className="text-2xl font-bold">850+</div>
              <div className="text-sm opacity-90">Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold">99%</div>
              <div className="text-sm opacity-90">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600 font-medium">Years Experience</p>
              <p className="text-sm text-gray-500 mt-1">Industry Leading</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5000+</h3>
              <p className="text-gray-600 font-medium">Projects Completed</p>
              <p className="text-sm text-gray-500 mt-1">Residential & Commercial</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600 font-medium">Customer Rating</p>
              <p className="text-sm text-gray-500 mt-1">Google & Yelp Reviews</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600 font-medium">Emergency Service</p>
              <p className="text-sm text-gray-500 mt-1">Always Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Featured Collection</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Premium Stone & Marble</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated selection of the world's finest natural stone and marble, sourced directly
              from premium quarries and crafted to perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge
                    className={`absolute top-4 right-4 ${
                      product.availability === "Limited"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {product.availability}
                  </Badge>
                  <Badge variant="outline" className="absolute top-4 left-4 bg-white/90 text-gray-800">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  <div className="space-y-2 mb-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-amber-600">{product.price}</p>
                    <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white bg-transparent"
              asChild
            >
              <Link href="/products">
                View All Products
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Our Services</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Stone Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From initial consultation to final installation, we provide comprehensive stone and marble services with
              unmatched expertise and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white">Client Testimonials</Badge>
            <h2 className="text-4xl font-bold text-white mb-6">What Our Clients Say</h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our satisfied customers have to say about our exceptional
              service and craftsmanship.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-xl italic mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>
                    <div>
                      <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                      <div className="text-amber-200">{testimonials[currentTestimonial].role}</div>
                      <div className="flex items-center justify-center md:justify-start mt-2 space-x-4 text-sm text-amber-100">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {testimonials[currentTestimonial].location}
                        </span>
                        <Badge variant="outline" className="border-white/30 text-white">
                          {testimonials[currentTestimonial].project}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-white scale-125" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">FAQ</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get answers to the most common questions about our stone and marble services, installation process, and
              maintenance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-amber-600">
                  How long does a typical installation take?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  Installation time varies by project size and complexity. Kitchen countertops typically take 1-2 days,
                  while full bathroom renovations may take 3-5 days. Large commercial projects can take 1-3 weeks. We
                  provide detailed timelines during our free consultation and keep you informed throughout the process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-amber-600">
                  Do you offer warranties on your work?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  Yes, we provide comprehensive warranties on all installations. Our craftsmanship warranty covers 10
                  years, and material warranties vary by stone type (typically 15-25 years). We also offer extended
                  warranty options and annual maintenance plans to keep your stone looking perfect.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-amber-600">
                  What maintenance is required for marble surfaces?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  Marble requires regular sealing (annually for high-use areas) and gentle cleaning with pH-neutral
                  products. Avoid acidic cleaners like vinegar or lemon juice. We provide detailed care instructions and
                  offer professional maintenance services including cleaning, sealing, and restoration to keep your
                  marble beautiful for decades.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-amber-600">
                  Can you match existing stone work?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  Our experts can match existing stone work for additions or repairs. We maintain extensive samples and
                  work with quarries worldwide to find the perfect match. For unique or discontinued stones, we can
                  often source similar materials or create custom solutions that blend seamlessly with your existing
                  installation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-amber-600">
                  Do you handle commercial projects?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  Yes, we specialize in both residential and commercial projects. Our portfolio includes hotels,
                  restaurants, offices, retail spaces, and healthcare facilities. We provide full project management
                  services, work with architects and contractors, and can handle large-scale installations with tight
                  deadlines.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg shadow-sm border">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-amber-600">
                  How do I get a quote for my project?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  Contact us for a free consultation. We'll assess your space, discuss your vision, and provide a
                  detailed quote within 24-48 hours of our site visit. Our quotes include materials, fabrication,
                  installation, and cleanup. We also offer 3D visualization to help you see exactly how your project
                  will look.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white">Ready to Get Started?</Badge>
            <h2 className="text-5xl font-bold mb-6">Transform Your Space Today</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Get a free consultation and quote for your marble and stone project. Our experts are ready to help bring
              your vision to life with premium materials and exceptional craftsmanship.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-300">Get instant answers to your questions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
                <p className="text-gray-300">Schedule an in-home visit</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Quote</h3>
                <p className="text-gray-300">Detailed estimate within 24 hours</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Call (123) 456-7890
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4"
                asChild
              >
                <Link href="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get Free Quote
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Free Consultation
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                No Obligation Quote
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Licensed & Insured
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
