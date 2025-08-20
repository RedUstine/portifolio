"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import "./Gallery.css"

interface GalleryItem {
  id: number
  title: string
  category: "Kitchen" | "Bathroom" | "Commercial" | "Outdoor" | "Flooring" | "Fireplace"
  location: string
  description: string
  beforeImage: string
  afterImage: string
  materials: string[]
  projectSize: string
  duration: string
  featured: boolean
  tags: string[]
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Luxury Kitchen Transformation",
      category: "Kitchen",
      location: "Beverly Hills, CA",
      description:
        "Complete kitchen renovation featuring Calacatta Gold marble countertops and backsplash. This project transformed an outdated kitchen into a stunning culinary masterpiece.",
      beforeImage: "/kitchen-before-renovation.png",
      afterImage: "/luxury-kitchen-calacatta.png",
      materials: ["Calacatta Gold Marble", "Subway Ceramic Backsplash", "Polished Finish"],
      projectSize: "450 sq ft",
      duration: "3 weeks",
      featured: true,
      tags: ["marble", "luxury", "modern", "white"],
    },
    {
      id: 2,
      title: "Spa-Inspired Master Bathroom",
      category: "Bathroom",
      location: "Manhattan, NY",
      description:
        "Elegant master bathroom featuring Carrara marble walls and heated floors. Created a serene, spa-like atmosphere.",
      beforeImage: "/bathroom-before-remodel.png",
      afterImage: "/spa-bathroom-carrara.png",
      materials: ["Carrara Marble", "Heated Floor System", "Natural Stone"],
      projectSize: "180 sq ft",
      duration: "2 weeks",
      featured: true,
      tags: ["marble", "spa", "luxury", "heated"],
    },
    {
      id: 3,
      title: "Corporate Lobby Redesign",
      category: "Commercial",
      location: "Chicago, IL",
      description:
        "Modern office lobby featuring large format porcelain tiles and accent walls. Professional and welcoming entrance.",
      beforeImage: "/lobby-before-renovation.png",
      afterImage: "/modern-corporate-lobby.png",
      materials: ["Large Format Porcelain", "Accent Wall Tiles", "Anti-Slip Coating"],
      projectSize: "1,200 sq ft",
      duration: "4 weeks",
      featured: false,
      tags: ["commercial", "modern", "porcelain", "large-format"],
    },
    {
      id: 4,
      title: "Outdoor Patio Paradise",
      category: "Outdoor",
      location: "Miami, FL",
      description: "Stunning outdoor patio with travertine tiles and natural stone accents. Perfect for entertaining.",
      beforeImage: "/patio-before-installation.png",
      afterImage: "/travertine-outdoor-patio.png",
      materials: ["Travertine Tiles", "Natural Stone Borders", "Weather-Resistant Sealant"],
      projectSize: "800 sq ft",
      duration: "2 weeks",
      featured: true,
      tags: ["outdoor", "travertine", "entertaining", "natural"],
    },
    {
      id: 5,
      title: "Modern Fireplace Feature",
      category: "Fireplace",
      location: "Denver, CO",
      description:
        "Contemporary fireplace surround with sleek marble panels. Became the focal point of the living room.",
      beforeImage: "/fireplace-before-renovation.png",
      afterImage: "/modern-marble-fireplace.png",
      materials: ["Nero Marquina Marble", "Polished Finish", "Custom Cut Panels"],
      projectSize: "120 sq ft",
      duration: "1 week",
      featured: false,
      tags: ["fireplace", "modern", "black-marble", "feature-wall"],
    },
    {
      id: 6,
      title: "Restaurant Floor Installation",
      category: "Commercial",
      location: "San Francisco, CA",
      description: "Durable ceramic tile flooring for high-traffic restaurant. Combines style with functionality.",
      beforeImage: "/restaurant-before-flooring.png",
      afterImage: "/restaurant-ceramic-flooring.png",
      materials: ["Commercial Grade Ceramic", "Anti-Slip Surface", "Stain Resistant"],
      projectSize: "2,500 sq ft",
      duration: "5 weeks",
      featured: false,
      tags: ["commercial", "restaurant", "durable", "ceramic"],
    },
    {
      id: 7,
      title: "Elegant Powder Room",
      category: "Bathroom",
      location: "Boston, MA",
      description: "Small but impactful powder room with dramatic marble accent wall and luxury finishes.",
      beforeImage: "/powder-room-before.png",
      afterImage: "/elegant-powder-room.png",
      materials: ["Calacatta Marble", "Mosaic Accent", "Premium Fixtures"],
      projectSize: "45 sq ft",
      duration: "1 week",
      featured: false,
      tags: ["small-space", "dramatic", "marble", "accent-wall"],
    },
    {
      id: 8,
      title: "Grand Foyer Entrance",
      category: "Flooring",
      location: "Atlanta, GA",
      description: "Impressive entrance foyer with intricate marble pattern flooring and medallion centerpiece.",
      beforeImage: "/foyer-before-installation.png",
      afterImage: "/grand-marble-foyer.png",
      materials: ["Mixed Marble Pattern", "Custom Medallion", "Polished Finish"],
      projectSize: "300 sq ft",
      duration: "3 weeks",
      featured: true,
      tags: ["entrance", "pattern", "medallion", "grand"],
    },
  ]

  const categories = ["All", "Kitchen", "Bathroom", "Commercial", "Outdoor", "Flooring", "Fireplace"]

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return galleryItems
    }
    return galleryItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setShowBeforeAfter(false)
  }

  return (
    <div className="gallery-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>Gallery</span>
          </div>
          <h1 className="page-title">Project Gallery</h1>
          <p className="page-description">
            Explore our portfolio of completed projects. From residential renovations to commercial installations, see
            how we transform spaces with premium stone and tile.
          </p>
        </div>

        {/* Controls */}
        <div className="gallery-controls">
          <div className="filter-section">
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
          </div>

          <div className="view-controls">
            <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
              ⊞ Grid
            </button>
            <button
              className={`view-btn ${viewMode === "masonry" ? "active" : ""}`}
              onClick={() => setViewMode("masonry")}
            >
              ⊟ Masonry
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredItems.length} project{filteredItems.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className={`gallery-grid ${viewMode}`}>
          {filteredItems.map((item) => (
            <div key={item.id} className={`gallery-item ${item.featured ? "featured" : ""}`}>
              <div className="item-image" onClick={() => openModal(item)}>
                <img src={item.afterImage || "/placeholder.svg"} alt={item.title} />
                <div className="item-overlay">
                  <div className="overlay-content">
                    <h3>{item.title}</h3>
                    <p>{item.location}</p>
                    <button className="view-btn">View Project</button>
                  </div>
                </div>
                <div className="item-badges">
                  {item.featured && <span className="badge featured">Featured</span>}
                  <span className="badge category">{item.category}</span>
                </div>
              </div>

              <div className="item-info">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-location">{item.location}</p>
                <p className="item-description">{item.description}</p>

                <div className="item-details">
                  <div className="detail-item">
                    <span className="detail-label">Size:</span>
                    <span className="detail-value">{item.projectSize}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{item.duration}</span>
                  </div>
                </div>

                <div className="item-materials">
                  {item.materials.slice(0, 2).map((material, index) => (
                    <span key={index} className="material-tag">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="gallery-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>

              <div className="modal-header">
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.location}</p>
              </div>

              <div className="modal-body">
                <div className="modal-images">
                  <div className="image-controls">
                    <button
                      className={`control-btn ${!showBeforeAfter ? "active" : ""}`}
                      onClick={() => setShowBeforeAfter(false)}
                    >
                      After
                    </button>
                    <button
                      className={`control-btn ${showBeforeAfter ? "active" : ""}`}
                      onClick={() => setShowBeforeAfter(true)}
                    >
                      Before & After
                    </button>
                  </div>

                  {showBeforeAfter ? (
                    <div className="before-after-container">
                      <div className="before-after-images">
                        <div className="before-image">
                          <img src={selectedItem.beforeImage || "/placeholder.svg"} alt="Before" />
                          <span className="image-label before">BEFORE</span>
                        </div>
                        <div className="after-image">
                          <img src={selectedItem.afterImage || "/placeholder.svg"} alt="After" />
                          <span className="image-label after">AFTER</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="single-image">
                      <img src={selectedItem.afterImage || "/placeholder.svg"} alt={selectedItem.title} />
                    </div>
                  )}
                </div>

                <div className="modal-details">
                  <div className="project-info">
                    <h3>Project Details</h3>
                    <p>{selectedItem.description}</p>

                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Category:</span>
                        <span className="info-value">{selectedItem.category}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Size:</span>
                        <span className="info-value">{selectedItem.projectSize}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Duration:</span>
                        <span className="info-value">{selectedItem.duration}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{selectedItem.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="materials-used">
                    <h3>Materials Used</h3>
                    <div className="materials-list">
                      {selectedItem.materials.map((material, index) => (
                        <span key={index} className="material-chip">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-tags">
                    <h3>Tags</h3>
                    <div className="tags-list">
                      {selectedItem.tags.map((tag, index) => (
                        <span key={index} className="tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <Link to="/contact" className="btn btn-primary">
                  Start Similar Project
                </Link>
                <Link to="/products" className="btn btn-outline">
                  View Materials
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="gallery-cta">
          <h2>Ready to Create Your Dream Space?</h2>
          <p>Let our expert team help you design and install the perfect stone and tile solution for your project.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Get Free Consultation
            </Link>
            <Link to="/products" className="btn btn-outline">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
