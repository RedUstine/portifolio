"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, X, MapPin, Calendar, Ruler, Clock, Eye, Heart, Share2 } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  category: "Kitchen" | "Bathroom" | "Commercial" | "Outdoor" | "Flooring" | "Fireplace" | "Backsplash" | "Countertops"
  location: string
  description: string
  beforeImage: string
  afterImage: string
  materials: string[]
  projectSize: string
  duration: string
  cost: string
  featured: boolean
  tags: string[]
  year: string
  client: string
  challenges: string[]
  solutions: string[]
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Luxury Kitchen Transformation",
    category: "Kitchen",
    location: "Beverly Hills, CA",
    description:
      "Complete kitchen renovation featuring Calacatta Gold marble countertops and backsplash. This project transformed an outdated kitchen into a stunning culinary masterpiece with premium Italian marble and custom cabinetry.",
    beforeImage: "/kitchen-before-renovation.png",
    afterImage: "/luxury-kitchen-calacatta.png",
    materials: ["Calacatta Gold Marble", "Subway Ceramic Backsplash", "Polished Finish", "Custom Edge Profile"],
    projectSize: "450 sq ft",
    duration: "3 weeks",
    cost: "$45,000 - $55,000",
    featured: true,
    tags: ["marble", "luxury", "modern", "white", "calacatta"],
    year: "2024",
    client: "Private Residence",
    challenges: ["Complex plumbing integration", "Matching existing cabinetry", "Tight timeline"],
    solutions: ["Custom templating", "Precision cutting", "Coordinated installation schedule"],
  },
  {
    id: 2,
    title: "Spa-Inspired Master Bathroom",
    category: "Bathroom",
    location: "Manhattan, NY",
    description:
      "Elegant master bathroom featuring Carrara marble walls, heated floors, and a stunning walk-in shower. Created a serene, spa-like atmosphere with natural stone and premium fixtures.",
    beforeImage: "/bathroom-before-remodel.png",
    afterImage: "/spa-bathroom-carrara.png",
    materials: ["Carrara Marble", "Heated Floor System", "Natural Stone", "Waterproof Membrane"],
    projectSize: "180 sq ft",
    duration: "2 weeks",
    cost: "$25,000 - $35,000",
    featured: true,
    tags: ["marble", "spa", "luxury", "heated", "carrara"],
    year: "2024",
    client: "Luxury Apartment",
    challenges: ["Waterproofing requirements", "Heating system integration", "Limited access"],
    solutions: ["Advanced waterproofing", "Custom heating layout", "Efficient material handling"],
  },
  {
    id: 3,
    title: "Corporate Lobby Redesign",
    category: "Commercial",
    location: "Chicago, IL",
    description:
      "Modern office lobby featuring large format porcelain tiles and accent walls. Professional and welcoming entrance that makes a lasting impression on clients and employees.",
    beforeImage: "/lobby-before-renovation.png",
    afterImage: "/modern-corporate-lobby.png",
    materials: ["Large Format Porcelain", "Accent Wall Tiles", "Anti-Slip Coating", "LED Strip Integration"],
    projectSize: "1,200 sq ft",
    duration: "4 weeks",
    cost: "$65,000 - $75,000",
    featured: false,
    tags: ["commercial", "modern", "porcelain", "large-format"],
    year: "2023",
    client: "Tech Company",
    challenges: ["24/7 building access", "Noise restrictions", "Coordinating with other trades"],
    solutions: ["Night shift work", "Sound dampening", "Detailed project coordination"],
  },
  {
    id: 4,
    title: "Outdoor Patio Paradise",
    category: "Outdoor",
    location: "Miami, FL",
    description:
      "Stunning outdoor patio with travertine tiles and natural stone accents. Perfect for entertaining with weather-resistant materials and beautiful design that complements the tropical setting.",
    beforeImage: "/patio-before-installation.png",
    afterImage: "/travertine-outdoor-patio.png",
    materials: ["Travertine Tiles", "Natural Stone Borders", "Weather-Resistant Sealant", "Drainage System"],
    projectSize: "800 sq ft",
    duration: "2 weeks",
    cost: "$18,000 - $25,000",
    featured: true,
    tags: ["outdoor", "travertine", "entertaining", "natural"],
    year: "2024",
    client: "Private Residence",
    challenges: ["Weather conditions", "Drainage requirements", "Pool integration"],
    solutions: ["Weather-resistant installation", "Custom drainage design", "Seamless pool transition"],
  },
  {
    id: 5,
    title: "Modern Fireplace Feature",
    category: "Fireplace",
    location: "Denver, CO",
    description:
      "Contemporary fireplace surround with sleek black marble panels. Became the focal point of the living room with dramatic Nero Marquina marble and integrated lighting.",
    beforeImage: "/fireplace-before-renovation.png",
    afterImage: "/modern-marble-fireplace.png",
    materials: ["Nero Marquina Marble", "Polished Finish", "Custom Cut Panels", "LED Accent Lighting"],
    projectSize: "120 sq ft",
    duration: "1 week",
    cost: "$8,000 - $12,000",
    featured: false,
    tags: ["fireplace", "modern", "black-marble", "feature-wall"],
    year: "2023",
    client: "Modern Home",
    challenges: ["Heat resistance", "Precise measurements", "Electrical integration"],
    solutions: ["Heat-resistant installation", "Laser measurement", "Coordinated electrical work"],
  },
  {
    id: 6,
    title: "Grand Foyer Entrance",
    category: "Flooring",
    location: "Atlanta, GA",
    description:
      "Impressive entrance foyer with intricate marble pattern flooring and medallion centerpiece. A stunning first impression for this luxury home with custom inlay work.",
    beforeImage: "/foyer-before-installation.png",
    afterImage: "/grand-marble-foyer.png",
    materials: ["Mixed Marble Pattern", "Custom Medallion", "Polished Finish", "Border Inlay"],
    projectSize: "300 sq ft",
    duration: "3 weeks",
    cost: "$35,000 - $45,000",
    featured: true,
    tags: ["entrance", "pattern", "medallion", "grand"],
    year: "2024",
    client: "Luxury Estate",
    challenges: ["Complex pattern layout", "Precision cutting", "Color matching"],
    solutions: ["Digital templating", "CNC precision cutting", "Color selection expertise"],
  },
  {
    id: 7,
    title: "Restaurant Kitchen Flooring",
    category: "Commercial",
    location: "San Francisco, CA",
    description:
      "Commercial kitchen flooring with slip-resistant ceramic tiles designed for high-traffic food service environment. Meets all health department requirements while maintaining aesthetic appeal.",
    beforeImage: "/restaurant-before-flooring.png",
    afterImage: "/restaurant-ceramic-flooring.png",
    materials: ["Anti-Slip Ceramic", "Commercial Grade Grout", "Cove Base", "Drainage Integration"],
    projectSize: "600 sq ft",
    duration: "1 week",
    cost: "$15,000 - $20,000",
    featured: false,
    tags: ["commercial", "restaurant", "anti-slip", "ceramic"],
    year: "2023",
    client: "Fine Dining Restaurant",
    challenges: ["Health code compliance", "Minimal downtime", "Drainage requirements"],
    solutions: ["Certified materials", "Rapid installation", "Custom drainage design"],
  },
  {
    id: 8,
    title: "Elegant Powder Room",
    category: "Bathroom",
    location: "Boston, MA",
    description:
      "Small but stunning powder room featuring marble accent wall and luxury fixtures. Maximized impact in a compact space with carefully selected materials and lighting.",
    beforeImage: "/powder-room-before.png",
    afterImage: "/elegant-powder-room.png",
    materials: ["Marble Accent Wall", "Porcelain Floor Tiles", "Custom Vanity Top", "LED Mirror Lighting"],
    projectSize: "35 sq ft",
    duration: "3 days",
    cost: "$5,000 - $8,000",
    featured: false,
    tags: ["powder-room", "marble", "compact", "elegant"],
    year: "2024",
    client: "Historic Home",
    challenges: ["Limited space", "Plumbing constraints", "Historic preservation"],
    solutions: ["Space optimization", "Creative plumbing solutions", "Period-appropriate design"],
  },
  {
    id: 9,
    title: "Modern Kitchen Backsplash",
    category: "Backsplash",
    location: "Seattle, WA",
    description:
      "Contemporary kitchen backsplash with large format subway tiles and LED accent lighting. Clean lines and modern aesthetic that complements the existing kitchen design.",
    beforeImage: "/kitchen-before-renovation.png",
    afterImage: "/luxury-kitchen-calacatta.png",
    materials: ["Large Format Subway Tiles", "LED Strip Lighting", "Minimal Grout Lines", "Stain-Resistant Finish"],
    projectSize: "85 sq ft",
    duration: "2 days",
    cost: "$3,500 - $5,000",
    featured: false,
    tags: ["backsplash", "subway", "modern", "led"],
    year: "2024",
    client: "Contemporary Home",
    challenges: ["Electrical integration", "Perfect alignment", "Minimal disruption"],
    solutions: ["Coordinated electrical work", "Laser leveling", "Dust containment"],
  },
  {
    id: 10,
    title: "Luxury Bathroom Countertops",
    category: "Countertops",
    location: "Phoenix, AZ",
    description:
      "Premium quartz countertops for master bathroom vanities with integrated sinks and custom edge profiles. Durable and beautiful solution for high-moisture environment.",
    beforeImage: "/bathroom-before-remodel.png",
    afterImage: "/spa-bathroom-carrara.png",
    materials: ["Premium Quartz", "Integrated Sinks", "Custom Edge Profile", "Undermount Installation"],
    projectSize: "45 sq ft",
    duration: "1 day",
    cost: "$4,000 - $6,000",
    featured: false,
    tags: ["countertops", "quartz", "bathroom", "integrated"],
    year: "2024",
    client: "Master Suite Renovation",
    challenges: ["Precise measurements", "Plumbing integration", "Seamless installation"],
    solutions: ["Digital templating", "Coordinated plumbing", "Professional installation"],
  },
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = [
    "All",
    "Kitchen",
    "Bathroom",
    "Commercial",
    "Outdoor",
    "Flooring",
    "Fireplace",
    "Backsplash",
    "Countertops",
  ]

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return galleryItems
    }
    return galleryItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item)
    setShowBeforeAfter(false)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setShowBeforeAfter(false)
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleContactForSimilar = (item: GalleryItem) => {
    const message = `I'm interested in a project similar to "${item.title}" in ${item.location}. Can you provide more information?`
    window.location.href = `/contact?project=${encodeURIComponent(item.title)}&message=${encodeURIComponent(message)}`
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
              <span>Gallery</span>
            </nav>
            <h1 className="text-5xl font-bold mb-6">Project Gallery</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Explore our portfolio of completed projects. From residential renovations to commercial installations, see
              how we transform spaces with premium stone and tile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                asChild
              >
                <Link href="/products">Browse Materials</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  {category}
                  {category !== "All" && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {galleryItems.filter((item) => item.category === category).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredItems.length} project{filteredItems.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Request Quote</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/products">View Materials</Link>
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${item.featured ? "ring-2 ring-amber-400" : ""}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.afterImage || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => openModal(item)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleContactForSimilar(item)
                      }}
                    >
                      Quote
                    </Button>
                  </div>
                </div>
                <div className="absolute top-4 left-4 space-y-2">
                  {item.featured && <Badge className="bg-amber-600 hover:bg-amber-700">Featured</Badge>}
                  <Badge variant="outline" className="bg-white/90">
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 hover:bg-white p-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(item.id)
                    }}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.location}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.year}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Ruler className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{item.projectSize}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{item.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.materials.slice(0, 2).map((material, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {material}
                    </Badge>
                  ))}
                  {item.materials.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.materials.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700" onClick={() => openModal(item)}>
                    View Project
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleContactForSimilar(item)}>
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div
              className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                  <p className="text-gray-600">
                    {selectedItem.location} • {selectedItem.year} • {selectedItem.client}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleShare(selectedItem)}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleFavorite(selectedItem.id)}>
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(selectedItem.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={closeModal}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {/* Image Controls */}
                <div className="flex justify-center mb-6">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={!showBeforeAfter ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setShowBeforeAfter(false)}
                      className={!showBeforeAfter ? "bg-amber-600 hover:bg-amber-700" : ""}
                    >
                      After
                    </Button>
                    <Button
                      variant={showBeforeAfter ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setShowBeforeAfter(true)}
                      className={showBeforeAfter ? "bg-amber-600 hover:bg-amber-700" : ""}
                    >
                      Before & After
                    </Button>
                  </div>
                </div>

                {/* Images */}
                {showBeforeAfter ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="relative">
                      <img
                        src={selectedItem.beforeImage || "/placeholder.svg"}
                        alt="Before"
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">BEFORE</Badge>
                    </div>
                    <div className="relative">
                      <img
                        src={selectedItem.afterImage || "/placeholder.svg"}
                        alt="After"
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700">AFTER</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8">
                    <img
                      src={selectedItem.afterImage || "/placeholder.svg"}
                      alt={selectedItem.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Project Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Category</div>
                        <div className="font-semibold">{selectedItem.category}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Size</div>
                        <div className="font-semibold">{selectedItem.projectSize}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Duration</div>
                        <div className="font-semibold">{selectedItem.duration}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Investment</div>
                        <div className="font-semibold">{selectedItem.cost}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Project Challenges</h4>
                      <div className="space-y-2">
                        {selectedItem.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Our Solutions</h4>
                      <div className="space-y-2">
                        {selectedItem.solutions.map((solution, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{solution}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Materials Used</h3>
                    <div className="space-y-3 mb-6">
                      {selectedItem.materials.map((material, index) => (
                        <div key={index} className="flex items-center p-3 bg-amber-50 rounded-lg">
                          <div className="w-3 h-3 bg-amber-600 rounded-full mr-3"></div>
                          <span className="font-medium text-gray-900">{material}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Tags</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedItem.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Interested in Similar Work?</h4>
                      <p className="text-gray-600 mb-4">
                        Get a personalized quote for a project similar to this one. Our team will work with you to
                        create the perfect solution for your space.
                      </p>
                      <Button
                        className="w-full bg-amber-600 hover:bg-amber-700"
                        onClick={() => handleContactForSimilar(selectedItem)}
                      >
                        Get Custom Quote
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
                  <Button
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={() => handleContactForSimilar(selectedItem)}
                  >
                    Start Similar Project
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/products">View Materials</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about">Meet Our Team</Link>
                  </Button>
                  <Button variant="outline" onClick={() => handleShare(selectedItem)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Dream Space?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Let our expert team help you design and install the perfect stone and tile solution for your project. Get
              inspired by our work and start your transformation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-amber-600"
                asChild
              >
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-600 bg-transparent"
                asChild
              >
                <Link href="/about">Meet Our Team</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
