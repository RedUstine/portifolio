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
  location?: string // Made optional as not all additional projects have it
  description?: string // Made optional
  beforeImage: string
  afterImage: string
  details?: string[] // Made optional
  duration?: string // Made optional
  budget?: string // Made optional
  teamSize?: string // Made optional
  completionDate?: string // Made optional
  challenges?: string[] // Made optional
  materials?: string[] // Made optional
  clientTestimonial?: string
  clientName?: string
  videoTestimonial?: VideoTestimonial
  category: "Residential" | "Commercial" | "Kitchens" | "Bathrooms" | "Other" // Added category
}

interface MarbleType {
  name: string
  imageQuery: string
  origin: string
  color: string
  characteristics: string
  commonUses: string[]
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
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Residential" | "Commercial" | "Kitchens" | "Bathrooms" | "Other"
  >("All") // State for selected category
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(6) // State for "Load More"
  const [scrolled, setScrolled] = useState(false)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0) // For testimonial carousel

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

  const featuredProjects: Project[] = [
    {
      id: 1,
      title: "Luxury Kitchen Transformation",
      type: "Residential",
      location: "Beverly Hills, CA",
      description:
        "Complete kitchen renovation featuring Calacatta Gold marble countertops and backsplash. The transformation elevated this ordinary kitchen into a stunning culinary masterpiece.",
      beforeImage: "old outdated kitchen with laminate countertops",
      afterImage: "luxury kitchen with white marble countertops and backsplash",
      details: ["Calacatta Gold Marble", "Waterfall Edge Island", "Custom Backsplash", "Undermount Sink Integration"],
      duration: "6 weeks",
      budget: "$45,000 - $60,000",
      teamSize: "4 specialists",
      completionDate: "March 2024",
      challenges: [
        "Working around existing plumbing layout",
        "Matching marble veining across multiple slabs",
        "Coordinating with other contractors during renovation",
      ],
      materials: [
        "Calacatta Gold Marble - 85 sq ft",
        "Custom edge profiling",
        "Premium sealant application",
        "Stainless steel undermount sink",
      ],
      clientTestimonial:
        "The transformation exceeded our expectations. The attention to detail and craftsmanship is outstanding. Our kitchen is now the centerpiece of our home.",
      clientName: "Jennifer & Michael Thompson",
      videoTestimonial: {
        // Replace with your actual video URL for kitchen renovation testimonial
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        // Replace with your actual thumbnail URL
        thumbnailUrl: "/placeholder.svg?height=400&width=700",
        duration: "2:15",
        clientName: "Jennifer & Michael Thompson",
        clientTitle: "Homeowners - Beverly Hills",
        projectType: "Luxury Kitchen Marble Installation",
      },
      category: "Kitchens", // Added category
    },
    {
      id: 2,
      title: "Corporate Lobby Redesign",
      type: "Commercial",
      location: "Manhattan, NY",
      description:
        "Modern office lobby featuring imported Nero Marquina marble flooring and accent walls. This project created a sophisticated first impression for visitors.",
      beforeImage: "plain corporate lobby with basic flooring",
      afterImage: "elegant marble lobby with black and white marble flooring",
      details: ["Nero Marquina Flooring", "Carrara Accent Walls", "Custom Reception Desk", "LED Accent Lighting"],
      duration: "8 weeks",
      budget: "$120,000 - $150,000",
      teamSize: "8 specialists",
      completionDate: "January 2024",
      challenges: [
        "Minimizing business disruption during installation",
        "Coordinating with building management",
        "Meeting strict commercial building codes",
      ],
      materials: [
        "Nero Marquina Marble - 1,200 sq ft flooring",
        "Carrara Marble - 400 sq ft wall cladding",
        "Custom reception desk with integrated lighting",
        "Anti-slip surface treatment",
      ],
      clientTestimonial:
        "The new lobby has completely transformed our building's image. Clients are impressed from the moment they walk in.",
      clientName: "David Chen, Property Manager",
      videoTestimonial: {
        // Replace with your actual video URL for corporate lobby testimonial
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        // Replace with your actual thumbnail URL
        thumbnailUrl: "/placeholder.svg?height=400&width=700",
        duration: "1:45",
        clientName: "David Chen",
        clientTitle: "Property Manager - Manhattan Office Complex",
        projectType: "Commercial Marble Lobby Renovation",
      },
      category: "Commercial", // Added category
    },
    {
      id: 3,
      title: "Master Bathroom Spa Retreat",
      type: "Residential",
      location: "Malibu, CA",
      description:
        "Luxurious master bathroom featuring Statuario marble throughout. The space was transformed from basic to breathtaking with premium materials.",
      beforeImage: "basic bathroom with standard tiles",
      afterImage: "luxury marble bathroom with walk-in shower",
      details: ["Statuario Marble Walls", "Heated Marble Floors", "Custom Vanity Top", "Walk-in Shower"],
      duration: "4 weeks",
      budget: "$35,000 - $45,000",
      teamSize: "3 specialists",
      completionDate: "February 2024",
      challenges: [
        "Waterproofing in high-moisture environment",
        "Installing heated flooring system",
        "Creating seamless shower enclosure",
      ],
      materials: [
        "Statuario Marble - 180 sq ft walls",
        "Heated marble flooring - 120 sq ft",
        "Custom vanity top with integrated sink",
        "Waterproof membrane system",
      ],
      clientTestimonial:
        "It's like having a luxury spa in our own home. The marble work is absolutely beautiful and the heated floors are amazing.",
      clientName: "Sarah & Robert Martinez",
      videoTestimonial: {
        // Replace with your actual video URL for bathroom renovation testimonial
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        // Replace with your actual thumbnail URL
        thumbnailUrl: "/placeholder.svg?height=400&width=700",
        duration: "2:30",
        clientName: "Sarah & Robert Martinez",
        clientTitle: "Homeowners - Malibu Residence",
        projectType: "Master Bathroom Marble Transformation",
      },
      category: "Bathrooms", // Added category
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
    },
    {
      name: "Calacatta Gold Marble",
      imageQuery: "Calacatta Gold marble slab with bold gold veins",
      origin: "Carrara, Italy",
      color: "White with dramatic gold and grey veins",
      characteristics: "Luxurious, rare, bold veining, highly sought after for high-end projects.",
      commonUses: ["Kitchen Islands", "Feature Walls", "Luxury Bathrooms", "Fireplace Surrounds"],
    },
    {
      name: "Nero Marquina Marble",
      imageQuery: "Nero Marquina marble slab with white veins",
      origin: "Markina, Spain",
      color: "Deep black with striking white veins",
      characteristics: "Elegant, modern, high contrast, adds a sophisticated touch to any space.",
      commonUses: ["Flooring", "Accent Walls", "Vanity Tops", "Commercial Lobbies"],
    },
    {
      name: "Statuario Marble",
      imageQuery: "Statuario marble slab with prominent grey veins",
      origin: "Carrara, Italy",
      color: "Bright white with prominent grey veining",
      characteristics: "Prestigious, distinct veining, similar to Carrara but with bolder patterns.",
      commonUses: ["Bathroom Walls", "Shower Enclosures", "High-Traffic Flooring", "Table Tops"],
    },
    {
      name: "Emperador Dark Marble",
      imageQuery: "Emperador Dark marble slab with light brown veins",
      origin: "Spain",
      color: "Dark brown with lighter brown and white veins",
      characteristics: "Warm, earthy, rich tones, adds depth and warmth to interiors.",
      commonUses: ["Flooring", "Countertops", "Fireplaces", "Decorative Accents"],
    },
    {
      name: "Crema Marfil Marble",
      imageQuery: "Crema Marfil marble slab with beige tones",
      origin: "Alicante, Spain",
      color: "Creamy beige with subtle veining",
      characteristics: "Versatile, neutral, warm, blends well with various design styles.",
      commonUses: ["Flooring", "Wall Tiles", "Vanities", "Staircases"],
    },
    {
      name: "Thassos White Marble",
      imageQuery: "Thassos White marble slab, pure white",
      origin: "Thassos Island, Greece",
      color: "Pure white, crystalline",
      characteristics: "Brightest white marble, minimal veining, creates a clean and expansive feel.",
      commonUses: ["Luxury Bathrooms", "Flooring", "Wall Cladding", "Countertops", "Sculptures"],
    },
    {
      name: "Verde Alpi Marble",
      imageQuery: "Verde Alpi marble slab with deep green and white veins",
      origin: "Aosta Valley, Italy",
      color: "Deep green with white and light green veins",
      characteristics: "Exotic, vibrant, rich green tones, adds a touch of nature and luxury.",
      commonUses: ["Feature Walls", "Bar Tops", "Decorative Panels", "Fireplace Surrounds"],
    },
    {
      name: "Travertine",
      imageQuery: "Travertine stone with porous texture",
      origin: "Tivoli, Italy",
      color: "Beige, cream, tan, and rustic red tones",
      characteristics: "Porous, earthy, warm, often filled and polished for smooth surfaces.",
      commonUses: ["Flooring", "Wall Tiles", "Outdoor Paving", "Bathroom Vanities"],
    },
    {
      name: "Arabescato Corchia Marble",
      imageQuery: "Arabescato Corchia marble slab with bold grey patterns",
      origin: "Carrara, Italy",
      color: "White with bold, dark grey veining",
      characteristics: "Dramatic, artistic, intricate patterns, ideal for statement pieces.",
      commonUses: ["Kitchen Countertops", "Bookmatched Walls", "Luxury Flooring", "Table Tops"],
    },
  ]

  const testimonials = [
    {
      quote:
        "Premier Marble USA transformed our kitchen beyond our wildest dreams. The Calacatta Gold countertops are simply breathtaking, and the installation was seamless. True professionals!",
      name: "Emily & John D.",
      title: "Homeowners, New York",
      rating: 5,
    },
    {
      quote:
        "We needed a sophisticated look for our new corporate headquarters, and Premier Marble USA delivered. The Nero Marquina flooring in our lobby makes an incredible first impression. Highly recommend their commercial services.",
      name: "Robert L.",
      title: "CEO, Tech Solutions Inc.",
      rating: 5,
    },
    {
      quote:
        "Our master bathroom is now a luxurious spa retreat thanks to Premier Marble USA. The Statuario marble work is flawless, and their team was incredibly efficient and tidy. An outstanding experience from start to finish.",
      name: "Sarah M.",
      title: "Homeowner, California",
      rating: 5,
    },
    {
      quote:
        "The precision and artistry of Premier Marble USA's installation team are unmatched. They handled our complex fireplace surround with such care, and the result is a true masterpiece. We couldn't be happier!",
      name: "David P.",
      title: "Interior Designer, Florida",
      rating: 5,
    },
    {
      quote:
        "From the initial design consultation to the final polish, Premier Marble USA demonstrated unparalleled professionalism. Our new marble floors are the envy of the neighborhood!",
      name: "Jessica R.",
      title: "Homeowner, Texas",
      rating: 5,
    },
    {
      quote:
        "The team at Premier Marble USA made our commercial project a breeze. Their global sourcing capabilities meant we got the exact unique marble we envisioned, delivered on time and within budget.",
      name: "Mark T.",
      title: "Hotel Developer, Nevada",
      rating: 5,
    },
    {
      quote:
        "I was amazed by the restoration work on our antique marble fireplace. It looks brand new! Premier Marble USA truly has master craftsmen.",
      name: "Olivia K.",
      title: "Collector, Massachusetts",
      rating: 5,
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
    setVisibleProjectsCount((prevCount) => prevCount + 6) // Load 6 more projects
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
        // Handle play interruption gracefully
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
                    src={`/placeholder.svg?height=400&width=600&query=${encodeURIComponent(selectedProject.beforeImage)}`}
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
                    src={`/placeholder.svg?height=400&width=600&query=${encodeURIComponent(selectedProject.afterImage)}`}
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
                Marble Types
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
                Testimonials
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
                  Marble Types
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
                  Testimonials
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

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gray-900 text-white">Premium Marble Solutions</Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Space with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
                  {" "}
                  Premium Marble
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From contract negotiations to global imports and expert installation, we deliver end-to-end marble
                solutions for residential and commercial projects across the United States.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800" onClick={() => scrollToSection("contact")}>
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 bg-transparent"
                  onClick={() => scrollToSection("portfolio")}
                >
                  View Portfolio
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Countries Sourced</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="cursor-pointer group"
                onClick={() => openImagePreview("/placeholder.svg?height=600&width=500")}
              >
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Premium marble installation"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-2xl flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">5.0 Rating</div>
                    <div className="text-sm text-gray-600">200+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-800">Why Premier Marble USA?</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Premier Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choosing us means partnering with a team dedicated to unparalleled quality, craftsmanship, and client
              satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Unrivaled Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  With over 15 years in the industry, our team comprises master craftsmen and seasoned professionals who
                  bring extensive knowledge and precision to every project, ensuring flawless execution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Sourcing Network</h3>
                <p className="text-gray-600 leading-relaxed">
                  We directly import the most exquisite and rare marble from quarries worldwide, offering you an
                  unparalleled selection of unique materials not found elsewhere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Client-Centric Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your vision is our priority. We provide personalized consultations, transparent communication, and
                  dedicated project management to ensure your complete satisfaction from start to finish.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
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
              to completion and beyond.
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
              the stunning finished product.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            {/* Vertical Line for Desktop */}
            <div className="absolute hidden md:block h-full w-1 bg-gray-200 left-1/2 transform -translate-x-1/2 top-0 bottom-0"></div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl">
              {/* Step 1 */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right relative md:pr-12">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 md:mb-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2 z-10">
                  1
                </div>
                <Card className="w-full md:w-[calc(100%-3rem)] border-0 shadow-lg p-6">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Initial Consultation & Design</h3>
                    <p className="text-gray-600">
                      We begin with a thorough discussion of your vision, project requirements, and budget. Our design
                      experts will help you select the perfect marble type and finish to complement your space.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left relative md:pl-12">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 md:mb-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10">
                  2
                </div>
                <Card className="w-full md:w-[calc(100%-3rem)] border-0 shadow-lg p-6">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Material Sourcing & Fabrication</h3>
                    <p className="text-gray-600">
                      Once selections are made, we meticulously source your chosen marble from our global network. Our
                      skilled fabricators then precisely cut and prepare each slab to your project's exact
                      specifications.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right relative md:pr-12">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 md:mb-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2 z-10">
                  3
                </div>
                <Card className="w-full md:w-[calc(100%-3rem)] border-0 shadow-lg p-6">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Expert Installation</h3>
                    <p className="text-gray-600">
                      Our certified installation team brings your design to life. With state-of-the-art tools and
                      techniques, they ensure a seamless, durable, and aesthetically perfect installation.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left relative md:pl-12">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 md:mb-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10">
                  4
                </div>
                <Card className="w-full md:w-[calc(100%-3rem)] border-0 shadow-lg p-6">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Final Inspection & Aftercare</h3>
                    <p className="text-gray-600">
                      Upon completion, we conduct a thorough final inspection to ensure every detail meets our high
                      standards. We also provide guidance on proper care and offer maintenance services to preserve your
                      marble's beauty.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button type="button" size="lg" onClick={() => scrollToSection("contact")}>
              Begin Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Marble Types Section */}
      <section id="marble-types" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-900 text-white">Our Materials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Exquisite Marble Collection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the unique beauty and characteristics of the world's most sought-after marble types, each with
              its own story and aesthetic appeal.
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
                      src={`/placeholder.svg?height=300&width=400&query=${encodeURIComponent(marble.imageQuery)}`}
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
                    <Badge variant="outline" className="bg-gray-50 text-gray-700">
                      {marble.color}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{marble.characteristics}</p>
                  <h4 className="font-semibold text-gray-900 mb-2">Common Uses:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {marble.commonUses.map((use, i) => (
                      <li key={i}>{use}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button type="button" size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              Request a Material Sample
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
                selves as a leading provider of comprehensive marble solutions across the United States.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our journey began with a passion for exquisite marble and a commitment to unparalleled craftsmanship.
                From sourcing the finest materials from renowned quarries worldwide to executing intricate
                installations, every project reflects our dedication to quality, precision, and client satisfaction. We
                believe that each slab of marble tells a unique story, and we are here to help you weave that story into
                your home or commercial space.
              </p>
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
              <div
                className="cursor-pointer group"
                onClick={() => openImagePreview("/placeholder.svg?height=600&width=500")}
              >
                <Image
                  src="/placeholder.svg?height=600&width=500"
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

      {/* Testimonials Section (now with Carousel) */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-800">Client Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from homeowners and businesses who have experienced the Premier Marble USA difference.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <Card className="border-0 shadow-lg p-8 min-h-[250px] flex flex-col justify-center">
              <CardContent className="p-0 text-center">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl italic text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonialIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonials[currentTestimonialIndex].name}</p>
                  <p className="text-sm text-gray-600">{testimonials[currentTestimonialIndex].title}</p>
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
                  className={`w-3 h-3 rounded-full ${
                    index === currentTestimonialIndex ? "bg-gray-900" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
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
              transformation and craftsmanship.
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
                          src={`/placeholder.svg?height=400&width=300&query=${encodeURIComponent(project.beforeImage)}`}
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
                          src={`/placeholder.svg?height=400&width=300&query=${encodeURIComponent(project.afterImage)}`}
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

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Project Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.details?.map((detail, detailIndex) => (
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
                    setVisibleProjectsCount(6) // Reset visible count on category change
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
                          src={`/placeholder.svg?height=300&width=400&query=${encodeURIComponent(project.beforeImage)}`}
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
                          src={`/placeholder.svg?height=300&width=400&query=${encodeURIComponent(project.afterImage)}`}
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
              through every step of the process.
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
              delivering excellence.
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
              },
              {
                name: "Sarah Chen",
                role: "Import Manager",
                experience: "15+ Years",
                specialty: "Global Sourcing",
                imageQuery: "professional female import manager portrait",
                bio: "Sarah's extensive network and keen eye for quality allow us to source the world's most exquisite and rare marble. She manages our global supply chain, ensuring sustainable practices and timely delivery of pristine materials.",
                quote: "Bringing the world's finest stone to your doorstep, with integrity and efficiency.",
              },
              {
                name: "David Thompson",
                role: "Project Manager",
                experience: "18+ Years",
                specialty: "Contract Management",
                imageQuery: "professional male project manager portrait",
                bio: "David oversees all project phases, from initial consultation to final completion. His exceptional organizational skills and client-focused approach ensure every project runs smoothly, on time, and within budget.",
                quote: "My goal is to make your marble journey seamless and stress-free.",
              },
              {
                name: "Maria Gonzalez",
                role: "Quality Inspector",
                experience: "12+ Years",
                specialty: "Quality Assurance",
                imageQuery: "professional female quality inspector portrait",
                bio: "Maria is our guardian of excellence. With a sharp eye for detail, she conducts rigorous quality checks at every stage, from material selection to post-installation inspection, guaranteeing the highest standards.",
                quote: "Perfection isn't just a goal; it's the standard we uphold for every client.",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center cursor-pointer"
                onClick={() =>
                  alert(
                    `Meet ${member.name}, our ${member.role}. With ${member.experience} experience in ${member.specialty}, ${member.bio} Quote: "${member.quote}"`,
                  )
                }
              >
                <CardContent className="p-6">
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      openImagePreview(
                        `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(member.imageQuery)}`,
                      )
                    }}
                  >
                    <Image
                      src={`/placeholder.svg?height=200&width=200&query=${encodeURIComponent(member.imageQuery)}`}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover hover:shadow-lg transition-shadow"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-3">
                    {member.experience}
                  </Badge>
                  <p className="text-sm text-gray-500 mb-4">{member.specialty}</p>
                  <p className="text-gray-700 text-sm italic mb-4">"{member.quote}"</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
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
              Find answers to common questions about our marble products, services, and processes.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  What types of marble do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  We offer a wide range of exquisite marble types, including classic Carrara, luxurious Calacatta Gold,
                  striking Nero Marquina, elegant Statuario, warm Emperador Dark, versatile Crema Marfil, pure Thassos
                  White, vibrant Verde Alpi, earthy Travertine, and dramatic Arabescato Corchia. We can also source
                  specific types upon request.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  Do you provide installation services?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, we provide comprehensive installation services performed by our team of highly skilled and
                  certified craftsmen. We ensure precise cutting, flawless fitting, and meticulous finishing for a
                  stunning and durable result.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  How do I maintain my marble surfaces?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Marble is a natural stone and requires proper care. We recommend regular cleaning with a pH-neutral
                  cleaner, avoiding acidic substances, and prompt wiping of spills. We also offer professional sealing
                  and restoration services to help maintain its pristine condition and protect against etching and
                  stains.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  What is the typical timeline for a marble project?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The timeline for a marble project varies depending on its complexity, size, and the specific marble
                  type chosen. After an initial consultation and design phase, we provide a detailed project plan with
                  estimated timelines for sourcing, fabrication, and installation. Small projects might take a few
                  weeks, while larger commercial projects could span several months.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  Can I get a custom design or specific cut?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  We specialize in custom marble solutions. Our design team works closely with you to create bespoke
                  designs, and our fabrication experts can handle intricate cuts, unique edge profiles, and
                  book-matching to bring your specific vision to life.
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
                Excellence in marble solutions since 2008. Your trusted partner for premium stone installations.
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
                    Installation
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
                    onClick={() => alert("Careers page coming soon! Email us your resume.")}
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => alert("News section coming soon! Follow us on social media for updates.")}
                    className="hover:text-white transition-colors"
                  >
                    News
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
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Premier Marble USA. All rights reserved. | Licensed & Insured</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
