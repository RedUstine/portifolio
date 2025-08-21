"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Search, Heart, ShoppingCart, Eye, Star, Truck, Shield, Award, Phone, Mail } from "lucide-react"

interface Product {
  id: number
  name: string
  category: "Marble" | "Granite" | "Quartz" | "Ceramic" | "Porcelain" | "Natural Stone" | "Travertine"
  price: string
  priceRange: { min: number; max: number }
  image: string
  description: string
  features: string[]
  specifications: {
    thickness: string
    finish: string[]
    origin: string
    durability: string
    maintenance: string
  }
  availability: "In Stock" | "Limited" | "Pre-Order" | "Out of Stock"
  rating: number
  reviews: number
  featured: boolean
  tags: string[]
  applications: string[]
  colors: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: "Carrara White Marble",
    category: "Marble",
    price: "From $89/sq ft",
    priceRange: { min: 89, max: 120 },
    image: "/carrara-white-marble.png",
    description:
      "Classic Italian marble with subtle gray veining, perfect for elegant countertops and backsplashes. This timeless stone brings sophistication to any space.",
    features: ["Natural stone", "Polished finish", "Heat resistant", "Unique veining patterns"],
    specifications: {
      thickness: "2cm, 3cm",
      finish: ["Polished", "Honed", "Brushed"],
      origin: "Carrara, Italy",
      durability: "High",
      maintenance: "Moderate - requires sealing",
    },
    availability: "In Stock",
    rating: 4.8,
    reviews: 127,
    featured: true,
    tags: ["luxury", "classic", "white", "veined"],
    applications: ["Countertops", "Backsplashes", "Flooring", "Wall Cladding"],
    colors: ["White", "Gray veining"],
  },
  {
    id: 2,
    name: "Calacatta Gold Marble",
    category: "Marble",
    price: "From $125/sq ft",
    priceRange: { min: 125, max: 180 },
    image: "/calacatta-gold-marble.png",
    description:
      "Luxurious marble with dramatic gold and gray veining. The most prestigious marble choice for high-end residential and commercial projects.",
    features: ["Premium quality", "Unique patterns", "Bookmatched available", "Statement piece"],
    specifications: {
      thickness: "2cm, 3cm",
      finish: ["Polished", "Honed"],
      origin: "Calacatta, Italy",
      durability: "High",
      maintenance: "Moderate - requires sealing",
    },
    availability: "Limited",
    rating: 4.9,
    reviews: 89,
    featured: true,
    tags: ["luxury", "premium", "gold-veining", "statement"],
    applications: ["Countertops", "Feature Walls", "Fireplace Surrounds"],
    colors: ["White", "Gold veining", "Gray accents"],
  },
  {
    id: 3,
    name: "Travertine Stone",
    category: "Travertine",
    price: "From $65/sq ft",
    priceRange: { min: 65, max: 95 },
    image: "/travertine-stone-sample.png",
    description:
      "Warm, textured natural stone perfect for outdoor spaces and Mediterranean-style interiors. Naturally non-slip surface ideal for pool areas.",
    features: ["Weather resistant", "Non-slip surface", "Natural beauty", "Thermal properties"],
    specifications: {
      thickness: "1.2cm, 2cm, 3cm",
      finish: ["Tumbled", "Brushed", "Filled & Honed"],
      origin: "Turkey, Italy",
      durability: "Very High",
      maintenance: "Low - naturally weather resistant",
    },
    availability: "In Stock",
    rating: 4.7,
    reviews: 156,
    featured: true,
    tags: ["outdoor", "natural", "textured", "warm"],
    applications: ["Pool Decks", "Patios", "Outdoor Kitchens", "Walkways"],
    colors: ["Beige", "Ivory", "Walnut", "Silver"],
  },
  {
    id: 4,
    name: "Large Format Ceramic",
    category: "Ceramic",
    price: "From $45/sq ft",
    priceRange: { min: 45, max: 75 },
    image: "/large-format-ceramic-tile.png",
    description:
      "Contemporary ceramic tiles with minimal grout lines for a sleek, modern look. Perfect for creating seamless surfaces in contemporary spaces.",
    features: ["Easy maintenance", "Water resistant", "Contemporary look", "Minimal grout lines"],
    specifications: {
      thickness: "6mm, 9mm, 12mm",
      finish: ["Matte", "Polished", "Textured"],
      origin: "Italy, Spain",
      durability: "Very High",
      maintenance: "Very Low - stain resistant",
    },
    availability: "In Stock",
    rating: 4.6,
    reviews: 203,
    featured: false,
    tags: ["modern", "large-format", "minimal", "contemporary"],
    applications: ["Walls", "Floors", "Shower Surrounds", "Commercial Spaces"],
    colors: ["White", "Gray", "Black", "Beige"],
  },
  {
    id: 5,
    name: "Black Galaxy Granite",
    category: "Granite",
    price: "From $95/sq ft",
    priceRange: { min: 95, max: 130 },
    image: "/carrara-white-marble.png",
    description:
      "Stunning black granite with golden speckles that resemble a starry night sky. Extremely durable and perfect for high-traffic areas.",
    features: ["Extremely durable", "Heat resistant", "Scratch resistant", "Unique sparkle effect"],
    specifications: {
      thickness: "2cm, 3cm",
      finish: ["Polished", "Flamed", "Brushed"],
      origin: "India",
      durability: "Excellent",
      maintenance: "Very Low - naturally stain resistant",
    },
    availability: "In Stock",
    rating: 4.8,
    reviews: 142,
    featured: false,
    tags: ["black", "granite", "sparkle", "durable"],
    applications: ["Countertops", "Flooring", "Exterior Cladding"],
    colors: ["Black", "Gold speckles"],
  },
  {
    id: 6,
    name: "Calacatta Quartz",
    category: "Quartz",
    price: "From $85/sq ft",
    priceRange: { min: 85, max: 115 },
    image: "/calacatta-gold-marble.png",
    description:
      "Engineered quartz with the look of Calacatta marble but with superior durability and consistency. Non-porous surface requires no sealing.",
    features: ["Non-porous", "Consistent patterns", "No sealing required", "Stain resistant"],
    specifications: {
      thickness: "2cm, 3cm",
      finish: ["Polished", "Honed"],
      origin: "Engineered - USA",
      durability: "Excellent",
      maintenance: "Very Low - no sealing needed",
    },
    availability: "In Stock",
    rating: 4.7,
    reviews: 98,
    featured: false,
    tags: ["quartz", "engineered", "calacatta-look", "low-maintenance"],
    applications: ["Countertops", "Backsplashes", "Vanity Tops"],
    colors: ["White", "Gray veining"],
  },
  {
    id: 7,
    name: "Subway Ceramic Tile",
    category: "Ceramic",
    price: "From $25/sq ft",
    priceRange: { min: 25, max: 45 },
    image: "/subway-ceramic-tile.png",
    description:
      "Classic subway tiles that never go out of style. Perfect for traditional and modern kitchens and bathrooms with timeless appeal.",
    features: ["Timeless design", "Easy to clean", "Versatile installation", "Budget-friendly"],
    specifications: {
      thickness: "8mm",
      finish: ["Glossy", "Matte", "Crackle"],
      origin: "USA, Mexico",
      durability: "High",
      maintenance: "Very Low",
    },
    availability: "In Stock",
    rating: 4.5,
    reviews: 312,
    featured: false,
    tags: ["subway", "classic", "versatile", "affordable"],
    applications: ["Backsplashes", "Shower Walls", "Accent Walls"],
    colors: ["White", "Black", "Gray", "Colored options"],
  },
  {
    id: 8,
    name: "Mosaic Glass Tile",
    category: "Ceramic",
    price: "From $55/sq ft",
    priceRange: { min: 55, max: 85 },
    image: "/mosaic-glass-tile.png",
    description:
      "Stunning glass mosaic tiles that reflect light beautifully. Perfect for creating accent walls and adding sparkle to any space.",
    features: ["Light reflection", "Water resistant", "Easy maintenance", "Decorative accent"],
    specifications: {
      thickness: "4mm",
      finish: ["Glossy", "Frosted", "Iridescent"],
      origin: "Italy, Turkey",
      durability: "High",
      maintenance: "Low",
    },
    availability: "In Stock",
    rating: 4.6,
    reviews: 87,
    featured: false,
    tags: ["mosaic", "glass", "accent", "reflective"],
    applications: ["Backsplashes", "Accent Walls", "Pool Areas"],
    colors: ["Blue", "Green", "White", "Mixed colors"],
  },
  {
    id: 9,
    name: "Porcelain Wood Look",
    category: "Porcelain",
    price: "From $65/sq ft",
    priceRange: { min: 65, max: 95 },
    image: "/porcelain-wood-oak.png",
    description:
      "Porcelain tiles that perfectly mimic the look of hardwood with the durability of ceramic. Ideal for areas where wood isn't practical.",
    features: ["Wood appearance", "Water resistant", "Durable", "Low maintenance"],
    specifications: {
      thickness: "9mm, 12mm",
      finish: ["Matte", "Textured"],
      origin: "Italy, Spain",
      durability: "Excellent",
      maintenance: "Very Low",
    },
    availability: "In Stock",
    rating: 4.7,
    reviews: 134,
    featured: false,
    tags: ["wood-look", "porcelain", "waterproof", "realistic"],
    applications: ["Bathrooms", "Kitchens", "Basements", "Commercial"],
    colors: ["Oak", "Walnut", "Pine", "Ebony"],
  },
  {
    id: 10,
    name: "Nero Marquina Marble",
    category: "Marble",
    price: "From $110/sq ft",
    priceRange: { min: 110, max: 150 },
    image: "/carrara-white-marble.png",
    description:
      "Dramatic black marble with distinctive white veining from Spain. Creates bold, sophisticated statements in modern and traditional designs.",
    features: ["Dramatic appearance", "Distinctive veining", "Premium quality", "Statement piece"],
    specifications: {
      thickness: "2cm, 3cm",
      finish: ["Polished", "Honed"],
      origin: "Spain",
      durability: "High",
      maintenance: "Moderate - requires sealing",
    },
    availability: "Limited",
    rating: 4.8,
    reviews: 76,
    featured: true,
    tags: ["black", "marble", "dramatic", "veined"],
    applications: ["Feature Walls", "Countertops", "Fireplace Surrounds"],
    colors: ["Black", "White veining"],
  },
]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high" | "rating">("name")
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])

  const categories = ["All", "Marble", "Granite", "Quartz", "Ceramic", "Porcelain", "Natural Stone", "Travertine"]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceRange.min - b.priceRange.min
        case "price-high":
          return b.priceRange.min - a.priceRange.min
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [selectedCategory, searchTerm, sortBy])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const addToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const handleContactForQuote = (product: Product) => {
    const message = `I'm interested in getting a quote for ${product.name}. Can you provide pricing and availability information?`
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}&message=${encodeURIComponent(message)}`
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
              <span>Products</span>
            </nav>
            <h1 className="text-5xl font-bold mb-6">Premium Stone & Tile Collection</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Discover our extensive collection of premium natural stone, marble, granite, and ceramic tiles. Each
              product is carefully selected for quality, beauty, and durability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
                <Link href="/contact">Request Samples</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                asChild
              >
                <Link href="/gallery">View Installations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-amber-600 hover:bg-amber-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Cart: {cart.length} items</span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Request Quote</Link>
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredAndSortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900"
                      onClick={() => handleContactForQuote(product)}
                    >
                      Quote
                    </Button>
                  </div>
                </div>
                <div className="absolute top-4 left-4 space-y-2">
                  {product.featured && <Badge className="bg-amber-600 hover:bg-amber-700">Featured</Badge>}
                  <Badge
                    className={`${
                      product.availability === "In Stock"
                        ? "bg-green-500"
                        : product.availability === "Limited"
                          ? "bg-yellow-500"
                          : product.availability === "Pre-Order"
                            ? "bg-blue-500"
                            : "bg-red-500"
                    }`}
                  >
                    {product.availability}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 hover:bg-white p-2"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>

                <div className="space-y-2 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-amber-600">{product.price}</p>
                    <p className="text-xs text-gray-500">Professional installation available</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-amber-600 hover:bg-amber-700"
                    onClick={() => handleContactForQuote(product)}
                  >
                    Get Quote
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addToCart(product.id)}>
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <Card className="mb-12 bg-gradient-to-r from-gray-50 to-gray-100">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Free Delivery</h3>
                <p className="text-gray-600">Free delivery on orders over $5,000 within 50 miles</p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">10-year warranty on all installations and materials</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Installation</h3>
                <p className="text-gray-600">Certified craftsmen with 25+ years experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Our stone experts are here to help you select the perfect materials for your project. Get personalized
              recommendations and professional advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-amber-600"
                asChild
              >
                <Link href="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get Expert Advice
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call (123) 456-7890
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-600 bg-transparent"
                asChild
              >
                <Link href="/gallery">View Installations</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
