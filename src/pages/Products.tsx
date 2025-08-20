"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../components/ShoppingCart"
import "./Products.css"

interface Product {
  id: number
  name: string
  category: "Marble" | "Ceramic" | "Porcelain" | "Natural Stone"
  subcategory: string
  price: string
  image: string
  description: string
  features: string[]
  specifications: {
    size: string
    thickness: string
    finish: string
    origin?: string
  }
  inStock: boolean
  featured: boolean
}

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const { addItem } = useCart()

  const products: Product[] = [
    {
      id: 1,
      name: "Carrara White Marble",
      category: "Marble",
      subcategory: "Classic White",
      price: "From $45/sq ft",
      image: "/carrara-white-marble.png",
      description:
        "Premium Italian Carrara marble with subtle grey veining. Perfect for countertops, backsplashes, and flooring.",
      features: ["Natural Veining", "Polished Finish", "Premium Grade", "Heat Resistant"],
      specifications: {
        size: "12x12, 18x18, 24x24 inches",
        thickness: '3/8", 1/2", 3/4"',
        finish: "Polished, Honed, Brushed",
        origin: "Carrara, Italy",
      },
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "Calacatta Gold Marble",
      category: "Marble",
      subcategory: "Luxury Collection",
      price: "From $85/sq ft",
      image: "/calacatta-gold-marble.png",
      description:
        "Exquisite Italian marble with dramatic gold and grey veining. The epitome of luxury for high-end projects.",
      features: ["Bold Veining", "Bookmatched Available", "Luxury Grade", "Limited Availability"],
      specifications: {
        size: "24x24, 36x36 inches",
        thickness: '3/4", 1 1/4"',
        finish: "Polished, Honed",
        origin: "Carrara, Italy",
      },
      inStock: true,
      featured: true,
    },
    {
      id: 3,
      name: "Nero Marquina Marble",
      category: "Marble",
      subcategory: "Black Collection",
      price: "From $55/sq ft",
      image: "/nero-marquina-marble.png",
      description:
        "Striking Spanish black marble with distinctive white veining. Creates dramatic contrast in any space.",
      features: ["High Contrast", "Distinctive Veining", "Premium Quality", "Versatile Application"],
      specifications: {
        size: "12x12, 18x18, 24x24 inches",
        thickness: '3/8", 1/2"',
        finish: "Polished, Honed",
        origin: "Spain",
      },
      inStock: true,
      featured: false,
    },
    {
      id: 4,
      name: "Porcelain Wood Look - Oak",
      category: "Porcelain",
      subcategory: "Wood Look",
      price: "From $8/sq ft",
      image: "/porcelain-wood-oak.png",
      description: "Realistic wood-look porcelain tile with the beauty of oak and durability of ceramic.",
      features: ["Water Resistant", "Easy Maintenance", "Realistic Texture", "Slip Resistant"],
      specifications: {
        size: "6x36, 8x48 inches",
        thickness: "10mm",
        finish: "Matte, Semi-Gloss",
      },
      inStock: true,
      featured: true,
    },
    {
      id: 5,
      name: "Large Format Ceramic",
      category: "Ceramic",
      subcategory: "Contemporary",
      price: "From $12/sq ft",
      image: "/large-format-ceramic-tile.png",
      description:
        "Modern large format ceramic tiles for contemporary spaces. Minimal grout lines for seamless appearance.",
      features: ["Minimal Grout Lines", "Modern Look", "Durable Surface", "Easy Installation"],
      specifications: {
        size: "24x48, 32x32 inches",
        thickness: "12mm",
        finish: "Matte, Polished",
      },
      inStock: true,
      featured: true,
    },
    {
      id: 6,
      name: "Travertine Classic",
      category: "Natural Stone",
      subcategory: "Travertine",
      price: "From $25/sq ft",
      image: "/travertine-stone-sample.png",
      description: "Classic travertine with natural porous texture. Perfect for both indoor and outdoor applications.",
      features: ["Natural Texture", "Indoor/Outdoor Use", "Non-Slip Surface", "Timeless Appeal"],
      specifications: {
        size: "12x12, 16x16, 18x18 inches",
        thickness: '1/2", 3/4"',
        finish: "Tumbled, Honed, Filled",
      },
      inStock: true,
      featured: false,
    },
    {
      id: 7,
      name: "Subway Ceramic Tile",
      category: "Ceramic",
      subcategory: "Classic",
      price: "From $3/sq ft",
      image: "/subway-ceramic-tile.png",
      description: "Timeless subway tile design perfect for backsplashes and bathroom walls.",
      features: ["Classic Design", "Versatile", "Easy to Clean", "Multiple Colors"],
      specifications: {
        size: "3x6, 4x8 inches",
        thickness: "8mm",
        finish: "Glossy, Matte",
      },
      inStock: true,
      featured: false,
    },
    {
      id: 8,
      name: "Mosaic Glass Blend",
      category: "Ceramic",
      subcategory: "Mosaic",
      price: "From $15/sq ft",
      image: "/mosaic-glass-tile.png",
      description: "Beautiful glass and ceramic mosaic blend for accent walls and decorative applications.",
      features: ["Glass Blend", "Decorative", "Light Reflective", "Custom Patterns"],
      specifications: {
        size: "12x12 inch sheets",
        thickness: "6mm",
        finish: "Glossy",
      },
      inStock: false,
      featured: false,
    },
  ]

  const categories = ["All", "Marble", "Ceramic", "Porcelain", "Natural Stone"]

  const filteredProducts = useMemo(() => {
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
          product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by stock status
    if (showOnlyInStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price":
          return Number.parseFloat(a.price.replace(/[^0-9.]/g, "")) - Number.parseFloat(b.price.replace(/[^0-9.]/g, ""))
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    return filtered
  }, [selectedCategory, searchTerm, sortBy, showOnlyInStock])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number.parseFloat(product.price.replace(/[^0-9.]/g, "")),
      image: product.image,
      category: product.category,
      specifications: {
        size: product.specifications.size,
        finish: product.specifications.finish,
      },
    })
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>Products</span>
          </div>
          <h1 className="page-title">Our Product Collection</h1>
          <p className="page-description">
            Discover our extensive range of premium marble, ceramic, and natural stone tiles. Each product is carefully
            selected for quality, beauty, and durability.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-controls">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="sort-controls">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="category">Sort by Category</option>
              </select>

              <label className="stock-filter">
                <input
                  type="checkbox"
                  checked={showOnlyInStock}
                  onChange={(e) => setShowOnlyInStock(e.target.checked)}
                />
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className={`product-card ${!product.inStock ? "out-of-stock" : ""}`}>
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                <div className="product-badges">
                  {product.featured && <span className="badge featured">Featured</span>}
                  {!product.inStock && <span className="badge out-of-stock">Out of Stock</span>}
                  <span className="badge category">{product.category}</span>
                </div>
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>

              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-subcategory">{product.subcategory}</p>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-features">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-label">Size:</span>
                    <span className="spec-value">{product.specifications.size}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Finish:</span>
                    <span className="spec-value">{product.specifications.finish}</span>
                  </div>
                </div>

                <div className="product-footer">
                  <div className="product-price">{product.price}</div>
                  <div className="product-actions">
                    <button className="btn btn-outline btn-sm">View Details</button>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or browse all products.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setShowOnlyInStock(false)
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="cta-section">
          <h2>Need Help Choosing?</h2>
          <p>Our experts are here to help you find the perfect tiles for your project.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Schedule Consultation
            </Link>
            <a href="tel:+1234567890" className="btn btn-outline">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
