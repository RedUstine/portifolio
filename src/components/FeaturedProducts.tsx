import type React from "react"
import { Link } from "react-router-dom"
import "./FeaturedProducts.css"

const FeaturedProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Carrara White Marble",
      category: "Marble",
      price: "From $45/sq ft",
      image: "/carrara-white-marble.png",
      features: ["Natural Veining", "Polished Finish", "Premium Grade"],
    },
    {
      id: 2,
      name: "Porcelain Wood Look",
      category: "Ceramic",
      price: "From $8/sq ft",
      image: "/placeholder-xmjsd.png",
      features: ["Water Resistant", "Easy Maintenance", "Realistic Texture"],
    },
    {
      id: 3,
      name: "Calacatta Gold Marble",
      category: "Marble",
      price: "From $85/sq ft",
      image: "/calacatta-gold-marble.png",
      features: ["Luxury Grade", "Bold Veining", "Bookmatched"],
    },
    {
      id: 4,
      name: "Large Format Ceramic",
      category: "Ceramic",
      price: "From $12/sq ft",
      image: "/large-format-ceramic-tile.png",
      features: ["Minimal Grout Lines", "Modern Look", "Durable Surface"],
    },
  ]

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Our Products</span>
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-description">
            Discover our most popular marble and ceramic tile selections, carefully curated for their exceptional
            quality and timeless appeal.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                <div className="product-overlay">
                  <Link to="/products" className="view-details-btn">
                    View Details
                  </Link>
                </div>
                <span className="product-category">{product.category}</span>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>

                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/products" className="btn btn-outline">
            View All Products
            <span className="btn-icon">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
