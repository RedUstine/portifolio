"use client"

import type React from "react"

import { useState, useRef, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Wrench,
  Menu,
  X,
  ZoomIn,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Handshake,
  Award,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  HeadphonesIcon,
  Zap,
  Target,
  TrendingUp,
  MessageCircle,
  Send,
} from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export default function MarbleWebsite() {
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

  const featuredProjects: Project[] = [
    {
      id: 1,
      title: "Luxury Kitchen Transformation",
      type: "Residential",
      location: "Beverly Hills, CA",
      description:
        "Complete kitchen renovation featuring Calacatta Gold marble countertops and backsplash. The transformation elevated this ordinary kitchen into a stunning culinary masterpiece with waterfall edges and custom lighting.",
      beforeImage: "old outdated kitchen with laminate countertops",
      afterImage: "luxury kitchen with white marble countertops and backsplash",
      details: [
        "Calacatta Gold Marble",
        "Waterfall Edge Island",
        "Custom Backsplash",
        "Undermount Sink Integration",
        "LED Under-Cabinet Lighting",
        "Custom Edge Profiling",
      ],
      duration: "6 weeks",
      budget: "$45,000 - $60,000",
      teamSize: "4 specialists",
      completionDate: "March 2024",
      challenges: [
        "Working around existing plumbing layout",
        "Matching marble veining across multiple slabs",
        "Coordinating with other contractors during renovation",
        "Installing waterfall edge without visible seams",
      ],
      materials: [
        "Calacatta Gold Marble - 85 sq ft",
        "Custom edge profiling",
        "Premium sealant application",
        "Stainless steel undermount sink",
        "LED lighting integration",
      ],
      clientTestimonial:
        "The transformation exceeded our expectations. The attention to detail and craftsmanship is outstanding. Our kitchen is now the centerpiece of our home and we love entertaining here.",
      clientName: "Jennifer & Michael Thompson",
      videoTestimonial: {
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl: "/placeholder.svg?height=400&width=700",
        duration: "2:15",
        clientName: "Jennifer & Michael Thompson",
        clientTitle: "Homeowners - Beverly Hills",
        projectType: "Luxury Kitchen Marble Installation",
      },
      category: "Kitchens",
    },
    {
      id: 2,
      title: "Corporate Lobby Redesign",
      type: "Commercial",
      location: "Manhattan, NY",
      description:
        "Modern office lobby featuring imported Nero Marquina marble flooring and accent walls. This project created a sophisticated first impression for visitors and elevated the building's prestige.",
      beforeImage: "plain corporate lobby with basic flooring",
      afterImage: "elegant marble lobby with black and white marble flooring",
      details: [
        "Nero Marquina Flooring",
        "Carrara Accent Walls",
        "Custom Reception Desk",
        "LED Accent Lighting",
        "Integrated Planters",
        "Security Desk Integration",
      ],
      duration: "8 weeks",
      budget: "$120,000 - $150,000",
      teamSize: "8 specialists",
      completionDate: "January 2024",
      challenges: [
        "Minimizing business disruption during installation",
        "Coordinating with building management",
        "Meeting strict commercial building codes",
        "Installing during limited weekend hours",
      ],
      materials: [
        "Nero Marquina Marble - 1,200 sq ft flooring",
        "Carrara Marble - 400 sq ft wall cladding",
        "Custom reception desk with integrated lighting",
        "Anti-slip surface treatment",
        "Commercial-grade sealants",
      ],
      clientTestimonial:
        "The new lobby has completely transformed our building's image. Clients are impressed from the moment they walk in. The quality and professionalism were exceptional.",
      clientName: "David Chen, Property Manager",
      videoTestimonial: {
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnailUrl: "/placeholder.svg?height=400&width=700",
        duration: "1:45",
        clientName: "David Chen",
        clientTitle: "Property Manager - Manhattan Office Complex",
        projectType: "Commercial Marble Lobby Renovation",
      },
      category: "Commercial",
    },
    {
      id: 3,
      title: "Master Bathroom Spa Retreat",
      type: "Residential",
      location: "Malibu, CA",
      description:
        "Luxurious master bathroom featuring Statuario marble throughout. The space was transformed from basic to breathtaking with premium materials, heated floors, and spa-like amenities.",
      beforeImage: "basic bathroom with standard tiles",
      afterImage: "luxury marble bathroom with walk-in shower",
      details: [
        "Statuario Marble Walls",
        "Heated Marble Floors",
        "Custom Vanity Top",
        "Walk-in Shower",
        "Steam Shower System",
        "Floating Vanity Design",
      ],
      duration: "4 weeks",
      budget: "$35,000 - $45,000",
      teamSize: "3 specialists",
      completionDate: "February 2024",
      challenges: [
        "Waterproofing in high-moisture environment",
        "Installing heated flooring system",
        "Creating seamless shower enclosure",
        "Integrating steam shower components",
      ],
      materials: [
        "Statuario Marble - 180 sq ft walls",
        "Heated marble flooring - 120 sq ft",
        "Custom vanity top with integrated sink",
        "Waterproof membrane system",
        "Steam shower integration",
      ],
      clientTestimonial:
        "It's like having a luxury spa in our own home. The marble work is absolutely beautiful and the heated floors are amazing. We start and end every day in luxury.",
      clientName: "Sarah & Robert Martinez",
      videoTestimonial: {
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnailUrl: "/placeholder.svg?height=400&width=700",
        duration: "2:30",
        clientName: "Sarah & Robert Martinez",
        clientTitle: "Homeowners - Malibu Residence",
        projectType: "Master Bathroom Marble Transformation",
      },
      category: "Bathrooms",
    },
  ]

  const allAdditionalProjects: Project[] = [
    {
      id: 4,
      title: "Modern Fireplace Surround",
      type: "Residential",
      beforeImage: "old brick fireplace",
      afterImage: "modern marble fireplace surround",
      category: "Residential",
    },
    {
      id: 5,
      title: "Restaurant Bar Counter",
      type: "Commercial",
      beforeImage: "basic restaurant bar",
      afterImage: "elegant marble bar counter",
      category: "Commercial",
    },
    {
      id: 6,
      title: "Hotel Reception Desk",
      type: "Commercial",
      beforeImage: "plain hotel reception",
      afterImage: "luxury marble hotel reception",
      category: "Commercial",
    },
    {
      id: 7,
      title: "Powder Room Vanity",
      type: "Residential",
      beforeImage: "basic powder room",
      afterImage: "marble powder room vanity",
      category: "Bathrooms",
    },
    {
      id: 8,
      title: "Office Building Entrance",
      type: "Commercial",
      beforeImage: "plain office entrance",
      afterImage: "marble office building entrance",
      category: "Commercial",
    },
    {
      id: 9,
      title: "Wine Cellar Design",
      type: "Residential",
      beforeImage: "basic wine storage",
      afterImage: "marble wine cellar with tasting area",
      category: "Residential",
    },
    {
      id: 10,
      title: "Luxury Apartment Flooring",
      type: "Residential",
      beforeImage: "old apartment flooring",
      afterImage: "luxury marble apartment flooring",
      category: "Residential",
    },
    {
      id: 11,
      title: "Spa & Wellness Center",
      type: "Commercial",
      beforeImage: "plain spa interior",
      afterImage: "marble spa and wellness center",
      category: "Commercial",
    },
    {
      id: 12,
      title: "Outdoor Patio & BBQ Area",
      type: "Residential",
      beforeImage: "basic outdoor patio",
      afterImage: "marble outdoor patio with BBQ",
      category: "Residential",
    },
    {
      id: 13,
      title: "Boutique Store Facade",
      type: "Commercial",
      beforeImage: "old store facade",
      afterImage: "marble boutique store facade",
      category: "Commercial",
    },
    {
      id: 14,
      title: "Custom Dining Table",
      type: "Residential",
      beforeImage: "wooden dining table",
      afterImage: "custom marble dining table",
      category: "Other",
    },
    {
      id: 15,
      title: "Hotel Bathroom Suites",
      type: "Commercial",
      beforeImage: "standard hotel bathroom",
      afterImage: "luxury marble hotel bathroom suites",
      category: "Bathrooms",
    },
  ]

  const marbleTypes: MarbleType[] = [
    {
      name: "Carrara Marble",
      imageQuery: "Carrara marble slab with grey veins",
      origin: "Carrara, Italy",
      color: "White with soft grey veins",
      characteristics: "Classic, timeless, subtle veining, often used for sculptures and traditional designs.",
      commonUses: ["Countertops", "Backsplashes", "Flooring", "Wall Cladding", "Sculptures"],
      priceRange: "$40-60/sq ft",
      availability: "Readily Available",
    },
    {
      name: "Calacatta Gold Marble",
      imageQuery: "Calacatta Gold marble slab with bold gold veins",
      origin: "Carrara, Italy",
      color: "White with dramatic gold and grey veins",
      characteristics: "Luxurious, rare, bold veining, highly sought after for high-end projects.",
      commonUses: ["Kitchen Islands", "Feature Walls", "Luxury Bathrooms", "Fireplace Surrounds"],
      priceRange: "$80-120/sq ft",
      availability: "Limited - Premium Selection",
    },
    {
      name: "Nero Marquina Marble",
      imageQuery: "Nero Marquina marble slab with white veins",
      origin: "Markina, Spain",
      color: "Deep black with striking white veins",
      characteristics: "Elegant, modern, high contrast, adds a sophisticated touch to any space.",
      commonUses: ["Flooring", "Accent Walls", "Vanity Tops", "Commercial Lobbies"],
      priceRange: "$50-75/sq ft",
      availability: "Good Availability",
    },
    {
      name: "Statuario Marble",
      imageQuery: "Statuario marble slab with prominent grey veins",
      origin: "Carrara, Italy",
      color: "Bright white with prominent grey veining",
      characteristics: "Prestigious, distinct veining, similar to Carrara but with bolder patterns.",
      commonUses: ["Bathroom Walls", "Shower Enclosures", "High-Traffic Flooring", "Table Tops"],
      priceRange: "$70-95/sq ft",
      availability: "Moderate Availability",
    },
    {
      name: "Emperador Dark Marble",
      imageQuery: "Emperador Dark marble slab with light brown veins",
      origin: "Spain",
      color: "Dark brown with lighter brown and white veins",
      characteristics: "Warm, earthy, rich tones, adds depth and warmth to interiors.",
      commonUses: ["Flooring", "Countertops", "Fireplaces", "Decorative Accents"],
      priceRange: "$35-55/sq ft",
      availability: "Good Availability",
    },
    {
      name: "Crema Marfil Marble",
      imageQuery: "Crema Marfil marble slab with beige tones",
      origin: "Alicante, Spain",
      color: "Creamy beige with subtle veining",
      characteristics: "Versatile, neutral, warm, blends well with various design styles.",
      commonUses: ["Flooring", "Wall Tiles", "Vanities", "Staircases"],
      priceRange: "$30-50/sq ft",
      availability: "Excellent Availability",
    },
    {
      name: "Thassos White Marble",
      imageQuery: "Thassos White marble slab, pure white",
      origin: "Thassos Island, Greece",
      color: "Pure white, crystalline",
      characteristics: "Brightest white marble, minimal veining, creates a clean and expansive feel.",
      commonUses: ["Luxury Bathrooms", "Flooring", "Wall Cladding", "Countertops", "Sculptures"],
      priceRange: "$60-85/sq ft",
      availability: "Limited - Specialty Item",
    },
    {
      name: "Verde Alpi Marble",
      imageQuery: "Verde Alpi marble slab with deep green and white veins",
      origin: "Aosta Valley, Italy",
      color: "Deep green with white and light green veins",
      characteristics: "Exotic, vibrant, rich green tones, adds a touch of nature and luxury.",
      commonUses: ["Feature Walls", "Bar Tops", "Decorative Panels", "Fireplace Surrounds"],
      priceRange: "$65-90/sq ft",
      availability: "Limited - Specialty Item",
    },
    {
      name: "Travertine",
      imageQuery: "Travertine stone with porous texture",
      origin: "Tivoli, Italy",
      color: "Beige, cream, tan, and rustic red tones",
      characteristics: "Porous, earthy, warm, often filled and polished for smooth surfaces.",
      commonUses: ["Flooring", "Wall Tiles", "Outdoor Paving", "Bathroom Vanities"],
      priceRange: "$25-40/sq ft",
      availability: "Excellent Availability",
    },
    {
      name: "Arabescato Corchia Marble",
      imageQuery: "Arabescato Corchia marble slab with bold grey patterns",
      origin: "Carrara, Italy",
      color: "White with bold, dark grey veining",
      characteristics: "Dramatic, artistic, intricate patterns, ideal for statement pieces.",
      commonUses: ["Kitchen Countertops", "Bookmatched Walls", "Luxury Flooring", "Table Tops"],
      priceRange: "$75-110/sq ft",
      availability: "Limited - Premium Selection",
    },
  ]

  const testimonials = [
    {
      quote:
        "Premier Marble USA transformed our kitchen beyond our wildest dreams. The Calacatta Gold countertops are simply breathtaking, and the installation was seamless. True professionals!",
      name: "Emily & John D.",
      title: "Homeowners, New York",
      rating: 5,
      project: "Kitchen Renovation",
      image: "happy couple in luxury kitchen",
    },
    {
      quote:
        "We needed a sophisticated look for our new corporate headquarters, and Premier Marble USA delivered. The Nero Marquina flooring in our lobby makes an incredible first impression. Highly recommend their commercial services.",
      name: "Robert L.",
      title: "CEO, Tech Solutions Inc.",
      rating: 5,
      project: "Commercial Lobby",
      image: "professional businessman in modern office",
    },
    {
      quote:
        "Our master bathroom is now a luxurious spa retreat thanks to Premier Marble USA. The Statuario marble work is flawless, and their team was incredibly efficient and tidy. An outstanding experience from start to finish.",
      name: "Sarah M.",
      title: "Homeowner, California",
      rating: 5,
      project: "Bathroom Renovation",
      image: "elegant woman in luxury bathroom",
    },
    {
      quote:
        "The precision and artistry of Premier Marble USA's installation team are unmatched. They handled our complex fireplace surround with such care, and the result is a true masterpiece. We couldn't be happier!",
      name: "David P.",
      title: "Interior Designer, Florida",
      rating: 5,
      project: "Fireplace Installation",
      image: "interior designer next to marble fireplace",
    },
    {
      quote:
        "From the initial design consultation to the final polish, Premier Marble USA demonstrated unparalleled professionalism. Our new marble floors are the envy of the neighborhood!",
      name: "Jessica R.",
      title: "Homeowner, Texas",
      rating: 5,
      project: "Flooring Installation",
      image: "homeowner in elegant marble foyer",
    },
    {
      quote:
        "The team at Premier Marble USA made our commercial project a breeze. Their global sourcing capabilities meant we got the exact unique marble we envisioned, delivered on time and within budget.",
      name: "Mark T.",
      title: "Hotel Developer, Nevada",
      rating: 5,
      project: "Hotel Renovation",
      image: "hotel developer in luxury hotel lobby",
    },
    {
      quote:
        "I was amazed by the restoration work on our antique marble fireplace. It looks brand new! Premier Marble USA truly has master craftsmen.",
      name: "Olivia K.",
      title: "Collector, Massachusetts",
      rating: 5,
      project: "Restoration Work",
      image: "art collector next to restored marble fireplace",
    },
  ]

  const filteredAdditionalProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return allAdditionalProjects
    }
    return allAdditionalProjects.filter((project) => project.category === selectedCategory)
  }, [selectedCategory, allAdditionalProjects])

  const displayedAdditionalProjects = useMemo(() => {
    return filteredAdditionalProjects.slice(0, visibleProjectsCount)
  }, [filteredAdditionalProjects, visibleProjectsCount])

  const handleLoadMore = () => {
    setVisibleProjectsCount((prevCount) => prevCount + 6)
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

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsVideoPlaying(false)
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const toggleVideoPlay = async () => {
    if (videoRef.current) {
      try {
        if (isVideoPlaying) {
          videoRef.current.pause()
          setIsVideoPlaying(false)
        } else {
          await videoRef.current.play()
          setIsVideoPlaying(true)
        }
      } catch (error) {
        console.log("Video play interrupted:", error)
        setIsVideoPlaying(false)
      }
    }
  }

  const handleVideoClick = async () => {
    await toggleVideoPlay()
  }

  const handleVideoEnded = () => {
    setIsVideoPlaying(false)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
    setIsVideoPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const goToNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToPreviousTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
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
            <Image
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
              <button onClick={closeProjectDetails} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* Project Images */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div
                  className="relative group cursor-pointer"
                  onClick={() =>
                    openImagePreview(
                      `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(selectedProject.beforeImage)}`,
                    )
                  }
                >
                  <Image
                    src={`/abstract-geometric-shapes.png?height=400&width=600&query=${encodeURIComponent(selectedProject.beforeImage)}`}
                    alt={`${selectedProject.title} - Before`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">BEFORE</Badge>
                </div>

                <div
                  className="relative group cursor-pointer"
                  onClick={() =>
                    openImagePreview(
                      `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(selectedProject.afterImage)}`,
                    )
                  }
                >
                  <Image
                    src={`/abstract-geometric-shapes.png?height=400&width=600&query=${encodeURIComponent(selectedProject.afterImage)}`}
                    alt={`${selectedProject.title} - After`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">AFTER</Badge>
                </div>
              </div>

              {/* Video Testimonial Section */}
              {selectedProject.videoTestimonial && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-500" />
                    Video Testimonial
                  </h3>
                  <div className="bg-gray-900 rounded-2xl overflow-hidden">
                    <div className="relative">
                      {/* Video Player */}
                      <div className="relative aspect-video bg-black">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          poster={selectedProject.videoTestimonial.thumbnailUrl}
                          onEnded={handleVideoEnded}
                          onPlay={() => setIsVideoPlaying(true)}
                          onPause={() => setIsVideoPlaying(false)}
                          onClick={handleVideoClick}
                          onMouseEnter={() => setShowVideoControls(true)}
                          onMouseLeave={() => setShowVideoControls(false)}
                          preload="metadata"
                        >
                          <source src={selectedProject.videoTestimonial.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>

                        {/* Video Controls Overlay */}
                        <div
                          className={`absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center ${
                            showVideoControls || !isVideoPlaying ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {/* Play/Pause Button */}
                          <button
                            type="button"
                            onClick={toggleVideoPlay}
                            className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                          >
                            {isVideoPlaying ? (
                              <Pause className="w-8 h-8 text-gray-900" />
                            ) : (
                              <Play className="w-8 h-8 text-gray-900 ml-1" />
                            )}
                          </button>
                        </div>

                        {/* Video Controls Bar */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
                            showVideoControls || !isVideoPlaying ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={toggleVideoPlay}
                                className="hover:text-blue-400 transition-colors"
                              >
                                {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                              </button>
                              <button
                                type="button"
                                onClick={toggleVideoMute}
                                className="hover:text-blue-400 transition-colors"
                              >
                                {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                              </button>
                              <span className="text-sm">{selectedProject.videoTestimonial.duration}</span>
                            </div>
                            <button
                              type="button"
                              onClick={enterFullscreen}
                              className="hover:text-blue-400 transition-colors"
                            >
                              <Maximize className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <Badge className="absolute top-4 right-4 bg-black bg-opacity-70 text-white">
                          {selectedProject.videoTestimonial.duration}
                        </Badge>
                      </div>

                      {/* Video Info */}
                      <div className="p-6 text-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold mb-1">
                              {selectedProject.videoTestimonial.clientName}
                            </h4>
                            <p className="text-gray-300 text-sm mb-2">{selectedProject.videoTestimonial.clientTitle}</p>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {selectedProject.videoTestimonial.projectType}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400 mb-1">Project Completed</div>
                            <div className="text-sm font-medium">{selectedProject.completionDate}</div>
                          </div>
                        </div>

                        {/* Video Description */}
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            "Hear directly from our satisfied clients about their marble installation experience. From
                            the initial design consultation to the final polishing, discover why Premier Marble USA is
                            the trusted choice for luxury stone installations across the United States."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Overview */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{selectedProject.type}</Badge>
                      <span className="text-gray-600">{selectedProject.location}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Project Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Duration</div>
                        <div className="text-gray-600">{selectedProject.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">Investment Range</div>
                        <div className="text-gray-600">{selectedProject.budget}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-500" />
                      <div>
                        <div className="font-medium">Team Size</div>
                        <div className="text-gray-600">{selectedProject.teamSize}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="font-medium">Completed</div>
                        <div className="text-gray-600">{selectedProject.completionDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Highlights */}
              {selectedProject.details && selectedProject.details.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Project Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedProject.details.map((detail, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials Used */}
              {selectedProject.materials && selectedProject.materials.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Materials & Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedProject.materials.map((material, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-700">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Challenges & Solutions */}
              {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Challenges & Solutions</h3>
                  <div className="space-y-3">
                    {selectedProject.challenges.map((challenge, index) => (
                      <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-gray-700">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Written Testimonial */}
              {selectedProject.clientTestimonial && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Written Testimonial</h3>
                  <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-lg">
                    <blockquote className="text-lg italic mb-4 text-gray-700">
                      "{selectedProject.clientTestimonial}"
                    </blockquote>
                    <cite className="text-gray-600 font-medium">— {selectedProject.clientName}</cite>
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Inspired by This Project?</h3>
                <p className="text-gray-600 mb-4">Let's discuss how we can create something similar for your space.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    className="bg-gray-900 hover:bg-gray-800"
                    onClick={() => {
                      closeProjectDetails()
                      scrollToSection("contact")
                    }}
                  >
                    Get Free Consultation
                  </Button>
                  <Button variant="outline" onClick={handlePhoneCall}>
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className={`bg-white border-b sticky top-0 z-40 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Premier Marble USA</h1>
                <p className="text-sm text-gray-600">Excellence in Stone</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                type="button"
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("marble-types")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
              >
                Materials
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
              >
                Reviews
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("portfolio")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("team")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
              >
                Team
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
              >
                Contact
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            <Button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="bg-gray-900 hover:bg-gray-800 hidden md:block"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 pt-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                  className="text-gray-700 hover:text-gray-900 font-medium text-left transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
                >
                  Services
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("marble-types")}
                  className="text-gray-700 hover:text-gray-900 font-medium text-left transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
                >
                  Materials
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  className="text-gray-700 hover:text-gray-900 font-medium text-left transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-700 hover:text-gray-900 font-medium text-left transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
                >
                  Reviews
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("portfolio")}
                  className="text-gray-700 hover:text-gray-900 font-medium text-left transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
                >
                  Portfolio
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("team")}
                  className="text-gray-700 hover:text-gray-900 font-medium text-left transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
                >
                  Team
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-gray-900 font-medium text-left transition-all duration-300 border-b-2 border-transparent hover:border-gray-900 pb-1"
                >
                  Contact
                </button>
                <Button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="bg-gray-900 hover:bg-gray-800 w-fit"
                >
                  Get Quote
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

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
                  <Image
                    src={`/abstract-geometric-shapes.png?height=800&width=1200&query=${encodeURIComponent(slide.image)}`}
                    alt={slide.title}
                    width={1200}
                    height={800}
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

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cutting-Edge Technology</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We utilize the latest technology in stone cutting, fabrication, and installation to ensure precision
                  and efficiency while maintaining the highest quality standards.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  <li>• CNC precision cutting</li>
                  <li>• 3D templating systems</li>
                  <li>• Laser measurement tools</li>
                  <li>• Digital project tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Warranty</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We stand behind our work with comprehensive warranties on both materials and installation, giving you
                  confidence in your investment for years to come.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  <li>• 10-year installation warranty</li>
                  <li>• Material defect coverage</li>
                  <li>• Free maintenance guidance</li>
                  <li>• Lifetime support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Practices</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We're committed to environmental responsibility through sustainable sourcing, waste reduction, and
                  eco-friendly installation practices that protect our planet.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  <li>• Sustainable quarry partnerships</li>
                  <li>• Waste reduction programs</li>
                  <li>• Eco-friendly sealants</li>
                  <li>• Carbon footprint reduction</li>
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-800">Our Services</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Marble Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a full spectrum of services, ensuring your marble project is handled with expertise from concept
              to completion and beyond. Every service is backed by our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contract Services</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  From initial consultation to final sign-off, our contract services ensure seamless project execution.
                  We manage all aspects, including detailed planning, transparent cost estimation, and strict adherence
                  to timelines, guaranteeing a smooth and efficient process for both residential and large-scale
                  commercial projects.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Detailed Project Planning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Transparent Cost Estimation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Efficient Timeline Management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Regulatory Compliance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Risk Management</span>
                  </li>
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  Request a Proposal
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Import</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We directly source the world's most exquisite marble, granite, and quartz from renowned quarries in
                  Italy, Greece, Turkey, Brazil, and beyond. Our extensive global network ensures access to unique
                  patterns and colors, while our rigorous quality control and logistics expertise guarantee safe and
                  timely delivery of pristine materials to your project site.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Exclusive Material Access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Rigorous Quality Control</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Seamless Customs & Logistics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Sustainable Sourcing Practices</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Direct Quarry Relationships</span>
                  </li>
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => alert("Explore our extensive marble catalog by contacting our sales team!")}
                >
                  Explore Materials
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Installation</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our team of highly skilled and certified craftsmen brings decades of experience to every installation.
                  Utilizing state-of-the-art tools and techniques, we ensure precise cutting, flawless fitting, and
                  meticulous finishing. From intricate patterns to large-format slabs, our attention to detail
                  guarantees a stunning and durable result that stands the test of time.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Certified Master Craftsmen</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Precision Cutting & Fitting</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Advanced Sealing Techniques</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Post-Installation Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Clean Installation Process</span>
                  </li>
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  Schedule Installation
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Maintenance & Restoration</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Preserve the beauty and longevity of your marble surfaces with our specialized maintenance and
                  restoration services. We offer professional cleaning, polishing, sealing, and repair to address
                  etching, scratches, and dullness, ensuring your marble retains its pristine condition and luxurious
                  sheen for years to come.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Professional Cleaning & Polishing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Sealing & Stain Protection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Scratch & Etch Repair</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Crack & Chip Restoration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Preventive Maintenance Plans</span>
                  </li>
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  Schedule Service
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Services */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Additional Specialized Services</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">3D Design & Visualization</h4>
                  <p className="text-gray-600 text-sm">
                    See your project before installation with our advanced 3D modeling and visualization services.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Design Consultation</h4>
                  <p className="text-gray-600 text-sm">
                    Work with our design experts to select the perfect materials and create stunning layouts.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Emergency Repair</h4>
                  <p className="text-gray-600 text-sm">
                    24/7 emergency repair services for urgent marble damage or installation issues.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="our-process" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-900 text-white">Our Process</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Journey to Marble Perfection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We guide you through every step, ensuring a smooth, transparent, and enjoyable experience from concept to
              the stunning finished product. Our proven process guarantees exceptional results.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            {/* Vertical Line for Desktop */}
            <div className="absolute hidden md:block h-full w-1 bg-gray-200 left-1/2 transform -translate-x-1/2 top-0 bottom-0"></div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl">
              {/* Step 1 */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right relative md:pr-12">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 md:mb-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2 z-10 shadow-lg">
                  1
                </div>
                <Card className="w-full md:w-[calc(100%-4rem)] border-0 shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-3 md:justify-end">
                      <MessageCircle className="w-6 h-6 text-blue-500" />
                      <h3 className="text-2xl font-bold text-gray-900">Initial Consultation & Design</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      We begin with a thorough discussion of your vision, project requirements, and budget. Our design
                      experts will help you select the perfect marble type and finish to complement your space
                      perfectly.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• In-home or showroom consultation</li>
                      <li>• 3D design visualization</li>
                      <li>• Material selection guidance</li>
                      <li>• Budget planning and options</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left relative md:pl-12">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 md:mb-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10 shadow-lg">
                  2
                </div>
                <Card className="w-full md:w-[calc(100%-4rem)] border-0 shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-6 h-6 text-green-500" />
                      <h3 className="text-2xl font-bold text-gray-900">Material Sourcing & Fabrication</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Once selections are made, we meticulously source your chosen marble from our global network. Our
                      skilled fabricators then precisely cut and prepare each slab to your project's exact
                      specifications using advanced CNC technology.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Global quarry sourcing</li>
                      <li>• Quality inspection at origin</li>
                      <li>• Precision CNC fabrication</li>
                      <li>• Custom edge profiling</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right relative md:pr-12">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 md:mb-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2 z-10 shadow-lg">
                  3
                </div>
                <Card className="w-full md:w-[calc(100%-4rem)] border-0 shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-3 md:justify-end">
                      <Wrench className="w-6 h-6 text-purple-500" />
                      <h3 className="text-2xl font-bold text-gray-900">Expert Installation</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Our certified installation team brings your design to life. With state-of-the-art tools and
                      techniques, they ensure a seamless, durable, and aesthetically perfect installation with minimal
                      disruption to your daily routine.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Professional site preparation</li>
                      <li>• Precision template creation</li>
                      <li>• Expert installation techniques</li>
                      <li>• Clean and tidy work process</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left relative md:pl-12">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 md:mb-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10 shadow-lg">
                  4
                </div>
                <Card className="w-full md:w-[calc(100%-4rem)] border-0 shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-orange-500" />
                      <h3 className="text-2xl font-bold text-gray-900">Final Inspection & Aftercare</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Upon completion, we conduct a thorough final inspection to ensure every detail meets our high
                      standards. We also provide comprehensive guidance on proper care and offer ongoing maintenance
                      services to preserve your marble's beauty.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Comprehensive quality inspection</li>
                      <li>• Care and maintenance training</li>
                      <li>• Warranty documentation</li>
                      <li>• Ongoing support services</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button type="button" size="lg" onClick={() => scrollToSection("contact")}>
              Begin Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Marble Types Section */}
      <section id="marble-types" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-900 text-white">Our Materials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Exquisite Marble Collection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the unique beauty and characteristics of the world's most sought-after marble types, each with
              its own story and aesthetic appeal. From classic Italian Carrara to exotic Verde Alpi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marbleTypes.map((marble, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div
                    className="relative group cursor-pointer mb-6"
                    onClick={() =>
                      openImagePreview(
                        `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(marble.imageQuery)}`,
                      )
                    }
                  >
                    <Image
                      src={`/abstract-geometric-shapes.png?height=300&width=400&query=${encodeURIComponent(marble.imageQuery)}`}
                      alt={marble.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{marble.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700">
                      {marble.origin}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {marble.priceRange}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-900 mb-1">Color:</div>
                    <div className="text-sm text-gray-600 mb-3">{marble.color}</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">Availability:</div>
                    <div className="text-sm text-gray-600 mb-3">{marble.availability}</div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{marble.characteristics}</p>
                  <h4 className="font-semibold text-gray-900 mb-2">Common Uses:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-4">
                    {marble.commonUses.map((use, i) => (
                      <li key={i}>{use}</li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => alert(`Request a sample of ${marble.name} by contacting our team!`)}
                  >
                    Request Sample
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button type="button" size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              Request Material Samples
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gray-900 text-white">About Us</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Crafting Elegance, One Stone at a Time</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                At Premier Marble USA, we are more than just a marble company; we are artisans dedicated to transforming
                spaces with the timeless beauty of natural stone. With over 15 years of experience, we have established
                ourselves as a leading provider of comprehensive marble solutions across the United States.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our journey began with a passion for exquisite marble and a commitment to unparalleled craftsmanship.
                From sourcing the finest materials from renowned quarries worldwide to executing intricate
                installations, every project reflects our dedication to quality, precision, and client satisfaction. We
                believe that each slab of marble tells a unique story, and we are here to help you weave that story into
                your home or commercial space.
              </p>

              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Countries Sourced</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800" onClick={() => scrollToSection("contact")}>
                  Get a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 bg-transparent"
                  onClick={() => scrollToSection("team")}
                >
                  Meet Our Team
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="cursor-pointer group" onClick={() => openImagePreview("/marble-warehouse.png")}>
                <Image
                  src="/marble-warehouse.png"
                  alt="Marble slab warehouse"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Global Sourcing</div>
                      <div className="text-sm text-gray-600">From 50+ Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Enhanced Carousel) */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-800">Client Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from homeowners and businesses who have experienced the Premier Marble USA difference. Real
              stories from real clients about their marble transformation journey.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl p-8 min-h-[350px] flex flex-col justify-center">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  {/* Client Image */}
                  <div className="text-center">
                    <div
                      className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden cursor-pointer"
                      onClick={() =>
                        openImagePreview(
                          `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(testimonials[currentTestimonialIndex].image)}`,
                        )
                      }
                    >
                      <Image
                        src={`/abstract-geometric-shapes.png?height=200&width=200&query=${encodeURIComponent(testimonials[currentTestimonialIndex].image)}`}
                        alt={testimonials[currentTestimonialIndex].name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonials[currentTestimonialIndex].project}
                    </Badge>
                  </div>

                  {/* Testimonial Content */}
                  <div className="md:col-span-2">
                    <blockquote className="text-xl italic text-gray-700 mb-6 leading-relaxed">
                      "{testimonials[currentTestimonialIndex].quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {testimonials[currentTestimonialIndex].name}
                      </p>
                      <p className="text-gray-600">{testimonials[currentTestimonialIndex].title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carousel Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
              onClick={goToPreviousTestimonial}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
              onClick={goToNextTestimonial}
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>

            {/* Carousel Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex ? "bg-gray-900 w-8" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Additional Testimonial Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Referral Rate</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Project Completion</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button type="button" size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              Share Your Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-900 text-white">Portfolio</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transformations That Inspire</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the dramatic before and after results of our marble installations. Each project tells a story of
              transformation and craftsmanship, showcasing our commitment to excellence and attention to detail.
            </p>
          </div>

          {/* Featured Before/After Projects */}
          <div className="space-y-16 mb-16">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Before/After Images */}
                  <div className="relative">
                    <div className="grid grid-cols-2 h-full">
                      {/* Before Image */}
                      <div
                        className="relative group cursor-pointer"
                        onClick={() =>
                          openImagePreview(
                            `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(project.beforeImage)}`,
                          )
                        }
                      >
                        <Image
                          src={`/abstract-geometric-shapes.png?height=400&width=300&query=${encodeURIComponent(project.beforeImage)}`}
                          alt={`${project.title} - Before`}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                          <Badge className="m-4 bg-red-500 text-white">BEFORE</Badge>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      {/* After Image */}
                      <div
                        className="relative group cursor-pointer"
                        onClick={() =>
                          openImagePreview(
                            `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(project.afterImage)}`,
                          )
                        }
                      >
                        <Image
                          src={`/abstract-geometric-shapes.png?height=400&width=300&query=${encodeURIComponent(project.afterImage)}`}
                          alt={`${project.title} - After`}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                          <Badge className="m-4 bg-green-500 text-white">AFTER</Badge>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="bg-gray-100">
                        {project.type}
                      </Badge>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{project.location}</span>
                      {project.videoTestimonial && (
                        <>
                          <span className="text-gray-500">•</span>
                          <Badge className="bg-blue-500 text-white flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            Video
                          </Badge>
                        </>
                      )}
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">{project.description}</p>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{project.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">{project.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600">{project.completionDate}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Project Highlights:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {project.details?.slice(0, 4).map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="bg-gray-900 hover:bg-gray-800 w-fit"
                      onClick={() => openProjectDetails(project)}
                    >
                      {project.videoTestimonial ? "View Case Study & Video" : "View Full Case Study"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Portfolio Grid with Filters */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Recent Projects</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["All", "Residential", "Commercial", "Kitchens", "Bathrooms", "Other"].map((category) => (
                <Button
                  type="button"
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-gray-900 text-white" : "bg-transparent"}
                  onClick={() => {
                    setSelectedCategory(category as typeof selectedCategory)
                    setVisibleProjectsCount(6)
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedAdditionalProjects.map((project, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="relative">
                    {/* Before/After Slider Effect */}
                    <div className="relative h-64 overflow-hidden">
                      <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() =>
                          openImagePreview(
                            `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(project.beforeImage)}`,
                          )
                        }
                      >
                        <Image
                          src={`/abstract-geometric-shapes.png?height=300&width=400&query=${encodeURIComponent(project.beforeImage)}`}
                          alt={`${project.title} - Before`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                      </div>
                      <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() =>
                          openImagePreview(
                            `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(project.afterImage)}`,
                          )
                        }
                      >
                        <Image
                          src={`/abstract-geometric-shapes.png?height=300&width=400&query=${encodeURIComponent(project.afterImage)}`}
                          alt={`${project.title} - After`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                          <ZoomIn className="w-8 h-8 text-white mx-auto mb-2" />
                          <div className="text-white font-semibold mb-2">Click to preview</div>
                          <div className="flex gap-2 justify-center">
                            <Badge className="bg-red-500 text-white text-xs">BEFORE</Badge>
                            <Badge className="bg-green-500 text-white text-xs">AFTER</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Badge className="absolute top-4 left-4 bg-white text-gray-900 shadow-md">{project.type}</Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">
                      See the dramatic transformation achieved through expert marble installation and craftsmanship.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() =>
                        alert(
                          `Detailed case study for "${project.title}" coming soon! Contact us to learn more about this project.`,
                        )
                      }
                    >
                      View Project Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredAdditionalProjects.length > displayedAdditionalProjects.length && (
              <div className="text-center mt-8">
                <Button type="button" size="lg" variant="outline" onClick={handleLoadMore}>
                  Load More Projects
                </Button>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Your Own Transformation?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let us help you create a stunning marble transformation for your space. Our team of experts will guide you
              through every step of the process, from design to installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800" onClick={() => scrollToSection("contact")}>
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-800">Our Team</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expert Craftsmen & Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our dedicated team of marble specialists, from master craftsmen to project managers, all committed to
              delivering excellence. Each team member brings unique expertise and passion to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Michael Rodriguez",
                role: "Master Installer",
                experience: "20+ Years",
                specialty: "Precision Cutting",
                imageQuery: "professional male marble installer portrait",
                bio: "With over two decades of experience, Michael is our lead master installer, renowned for his meticulous precision and ability to handle the most complex marble designs. His passion for stone ensures every cut and placement is flawless.",
                quote: "Every slab tells a story, and it's my job to make sure it's a masterpiece.",
                certifications: ["Certified Stone Installer", "OSHA Safety Certified", "Advanced Fabrication"],
                achievements: ["500+ Installations", "Zero Defect Record", "Master Craftsman Award 2023"],
              },
              {
                name: "Sarah Chen",
                role: "Import Manager",
                experience: "15+ Years",
                specialty: "Global Sourcing",
                imageQuery: "professional female import manager portrait",
                bio: "Sarah's extensive network and keen eye for quality allow us to source the world's most exquisite and rare marble. She manages our global supply chain, ensuring sustainable practices and timely delivery of pristine materials.",
                quote: "Bringing the world's finest stone to your doorstep, with integrity and efficiency.",
                certifications: ["International Trade Certified", "Quality Control Specialist", "Sustainable Sourcing"],
                achievements: ["50+ Quarry Partnerships", "99.9% Quality Rating", "Sustainability Award 2024"],
              },
              {
                name: "David Thompson",
                role: "Project Manager",
                experience: "18+ Years",
                specialty: "Contract Management",
                imageQuery: "professional male project manager portrait",
                bio: "David oversees all project phases, from initial consultation to final completion. His exceptional organizational skills and client-focused approach ensure every project runs smoothly, on time, and within budget.",
                quote: "My goal is to make your marble journey seamless and stress-free.",
                certifications: ["PMP Certified", "Construction Management", "Client Relations Specialist"],
                achievements: ["200+ Projects Managed", "100% On-Time Delivery", "Client Satisfaction Award"],
              },
              {
                name: "Maria Gonzalez",
                role: "Quality Inspector",
                experience: "12+ Years",
                specialty: "Quality Assurance",
                imageQuery: "professional female quality inspector portrait",
                bio: "Maria is our guardian of excellence. With a sharp eye for detail, she conducts rigorous quality checks at every stage, from material selection to post-installation inspection, guaranteeing the highest standards.",
                quote: "Perfection isn't just a goal; it's the standard we uphold for every client.",
                certifications: ["Quality Assurance Certified", "Stone Inspection Specialist", "ISO 9001 Auditor"],
                achievements: ["Zero Quality Issues", "Industry Recognition", "Excellence in Inspection Award"],
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center cursor-pointer group"
                onClick={() =>
                  alert(
                    `Meet ${member.name}, our ${member.role}. With ${member.experience} experience in ${member.specialty}, ${member.bio} Quote: "${member.quote}"\n\nCertifications: ${member.certifications.join(", ")}\n\nAchievements: ${member.achievements.join(", ")}`,
                  )
                }
              >
                <CardContent className="p-6">
                  <div
                    className="cursor-pointer mb-4"
                    onClick={(e) => {
                      e.stopPropagation()
                      openImagePreview(
                        `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(member.imageQuery)}`,
                      )
                    }}
                  >
                    <Image
                      src={`/abstract-geometric-shapes.png?height=200&width=200&query=${encodeURIComponent(member.imageQuery)}`}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full mx-auto object-cover hover:shadow-lg transition-shadow group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-3">
                    {member.experience}
                  </Badge>
                  <p className="text-sm text-gray-500 mb-4">{member.specialty}</p>
                  <p className="text-gray-700 text-sm italic mb-4">"{member.quote}"</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>

                  {/* Certifications */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">CERTIFICATIONS</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.certifications.map((cert, certIndex) => (
                        <Badge key={certIndex} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">KEY ACHIEVEMENTS</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {member.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Team Stats */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Team by the Numbers</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
                <div className="text-gray-600">Years Combined Experience</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600">Certified Professionals</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-900 text-white">FAQ</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our marble products, services, and processes. Can't find what
              you're looking for? Contact our team for personalized assistance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  What types of marble do you offer and how do I choose the right one?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  We offer a comprehensive range of premium marble types, including classic Carrara, luxurious Calacatta
                  Gold, striking Nero Marquina, elegant Statuario, warm Emperador Dark, versatile Crema Marfil, pure
                  Thassos White, vibrant Verde Alpi, earthy Travertine, and dramatic Arabescato Corchia. Our design
                  consultants will help you choose based on your project requirements, aesthetic preferences, budget,
                  and intended use. We also provide samples so you can see and feel the materials before making your
                  decision.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  Do you provide installation services and what does it include?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, we provide comprehensive installation services performed by our team of certified master
                  craftsmen. Our installation includes: site preparation, precise templating, professional cutting and
                  fabrication, expert installation with advanced techniques, sealing and finishing, thorough cleanup,
                  and post-installation inspection. We ensure minimal disruption to your daily routine and maintain the
                  highest safety standards throughout the process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  How do I maintain my marble surfaces and what warranty do you provide?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Marble requires proper care to maintain its beauty. We recommend regular cleaning with pH-neutral
                  cleaners, avoiding acidic substances, prompt spill cleanup, and periodic professional sealing. We
                  provide detailed care instructions and offer professional maintenance services. Our warranty includes
                  10 years on installation workmanship, material defect coverage, and lifetime support. We also offer
                  preventive maintenance plans to keep your marble looking pristine.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  What is the typical timeline and cost for a marble project?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Project timelines vary based on complexity, size, and material availability. Typical residential
                  projects take 2-6 weeks from consultation to completion, while commercial projects may take 4-12
                  weeks. Costs depend on material selection, project size, complexity, and location. We provide
                  detailed, transparent estimates during consultation. Our process includes: consultation (1-2 days),
                  design and material selection (3-7 days), fabrication (1-2 weeks), and installation (1-3 days for most
                  residential projects).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  Can you create custom designs and work with my architect or designer?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  We specialize in custom marble solutions and regularly collaborate with architects, interior
                  designers, and contractors. Our services include: custom cutting and fabrication, unique edge
                  profiles, book-matching for dramatic patterns, intricate inlays and borders, 3D design visualization,
                  and coordination with your design team. We can work from your plans or help develop custom designs
                  that perfectly match your vision.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  Do you handle commercial projects and what makes you different?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, we handle large-scale commercial projects including hotels, restaurants, office buildings, retail
                  spaces, and public facilities. What sets us apart: extensive experience with commercial building
                  codes, ability to coordinate with multiple contractors, flexible scheduling to minimize business
                  disruption, bulk material sourcing capabilities, dedicated commercial project managers, and
                  comprehensive insurance coverage. We've completed over 150 commercial projects with 100% on-time
                  delivery.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  What areas do you serve and do you offer delivery?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  We serve clients across the United States with our headquarters in New York. Our service areas include
                  the Northeast, Southeast, Midwest, and West Coast regions. We offer: free delivery on orders over
                  $5,000, professional handling and transportation, secure packaging for material protection, flexible
                  delivery scheduling, and white-glove service for high-value installations. For projects outside our
                  primary service areas, we can arrange specialized logistics and partner with local certified
                  installers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  How do you ensure quality and what if I'm not satisfied?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Quality is our top priority. Our quality assurance process includes: material inspection at the
                  quarry, quality checks upon arrival, precision fabrication with advanced equipment, thorough
                  pre-installation inspection, professional installation by certified craftsmen, and comprehensive final
                  inspection. We maintain a 98% customer satisfaction rate. If you're not completely satisfied, we'll
                  work with you to address any concerns and ensure the final result meets your expectations, backed by
                  our comprehensive warranty.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <Button type="button" size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              Have More Questions? Contact Us
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
                with premium marble solutions. Our experts are standing by to help you every step of the way.
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
                    <div className="text-sm text-gray-400">Available 24/7 for emergencies</div>
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
                    <div className="text-sm text-gray-400">We respond within 2 hours</div>
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
                    <div className="font-semibold">Showroom & Warehouse</div>
                    <div className="text-gray-300">
                      1234 Marble Way
                      <br />
                      Stone City, NY 10001
                    </div>
                    <div className="text-sm text-gray-400">Visit by appointment - Free consultation</div>
                  </div>
                </button>

                <div className="flex items-center gap-4 p-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Business Hours</div>
                    <div className="text-gray-300">
                      Monday - Friday: 7AM - 7PM
                      <br />
                      Saturday: 8AM - 5PM
                      <br />
                      Sunday: 10AM - 4PM
                    </div>
                    <div className="text-sm text-gray-400">Extended hours for project consultations</div>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="mt-8 p-6 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-3">Service Areas</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>• New York</div>
                  <div>• New Jersey</div>
                  <div>• Connecticut</div>
                  <div>• Pennsylvania</div>
                  <div>• Massachusetts</div>
                  <div>• Florida</div>
                  <div>• California</div>
                  <div>• Texas</div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Additional areas available. Contact us for service availability in your location.
                </p>
              </div>
            </div>

            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Get Your Free Quote</h3>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you within 2 hours with a detailed estimate.
                </p>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
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
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
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
                    <label className="block text-sm font-medium mb-2">Email *</label>
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
                    <label className="block text-sm font-medium mb-2">Phone *</label>
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
                    <label className="block text-sm font-medium mb-2">Project Type *</label>
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
                      <option>Fireplace Surround</option>
                      <option>Countertops Only</option>
                      <option>Full Home Renovation</option>
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
                      placeholder="Tell us about your project, including room dimensions, style preferences, timeline, and any specific requirements..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 py-3">
                    Get Free Quote & Consultation
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• We'll contact you within 2 hours</li>
                    <li>• Schedule a free in-home consultation</li>
                    <li>• Provide detailed estimate and timeline</li>
                    <li>• Begin your marble transformation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">PM</span>
                </div>
                <span className="text-xl font-bold">Premier Marble USA</span>
              </button>
              <p className="text-gray-400 mb-4">
                Excellence in marble solutions since 2008. Your trusted partner for premium stone installations across
                the United States.
              </p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => window.open("https://facebook.com", "_blank")}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <span className="text-xs">f</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.open("https://linkedin.com", "_blank")}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <span className="text-xs">in</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <span className="text-xs">ig</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.open("https://youtube.com", "_blank")}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <span className="text-xs">yt</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors"
                  >
                    Contract Services
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors"
                  >
                    Global Import
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors"
                  >
                    Expert Installation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors"
                  >
                    Maintenance & Restoration
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => alert("3D Design services - Contact us for details!")}
                    className="hover:text-white transition-colors"
                  >
                    3D Design & Visualization
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("marble-types")}
                    className="hover:text-white transition-colors"
                  >
                    Marble Types
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("testimonials")}
                    className="hover:text-white transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("team")}
                    className="hover:text-white transition-colors"
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => alert("Careers page - Join our team! Email careers@premiermarbleusa.com")}
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => alert("News & Updates - Follow us on social media for the latest!")}
                    className="hover:text-white transition-colors"
                  >
                    News & Updates
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button type="button" onClick={handlePhoneCall} className="hover:text-white transition-colors">
                    (555) 123-MARBLE
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleEmailClick} className="hover:text-white transition-colors">
                    info@premiermarbleusa.com
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleGetDirections} className="hover:text-white transition-colors">
                    1234 Marble Way
                    <br />
                    Stone City, NY 10001
                  </button>
                </li>
                <li className="pt-2">
                  <div className="text-sm">
                    <div className="font-semibold text-white">Emergency Service:</div>
                    <div>24/7 Available</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2024 Premier Marble USA. All rights reserved. | Licensed & Insured | BBB A+ Rating</p>
              </div>
              <div className="flex space-x-6">
                <button
                  type="button"
                  onClick={() => alert("Privacy Policy - We protect your personal information.")}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => alert("Terms of Service - Our service terms and conditions.")}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  type="button"
                  onClick={() => alert("Warranty Information - Comprehensive coverage details.")}
                  className="hover:text-white transition-colors"
                >
                  Warranty
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
