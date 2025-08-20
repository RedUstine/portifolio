import type React from "react"
import { Link } from "react-router-dom"
import "./Hero.css"

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <img src="/luxury-marble-showroom.png" alt="Luxury marble showroom" className="hero-image" />
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">Premium Quality Since 1995</span>
            <h1 className="hero-title">
              Transform Your Space with
              <span className="gradient-text"> Exquisite Stone</span>
            </h1>
            <p className="hero-description">
              Discover our extensive collection of premium marble and ceramic tiles. From classic elegance to modern
              sophistication, we bring your vision to life with unmatched quality and craftsmanship.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Explore Products
                <span className="btn-icon">→</span>
              </Link>
              <Link to="/gallery" className="btn btn-secondary">
                View Gallery
              </Link>
            </div>

            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Premium Quality Materials</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Expert Installation</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>25+ Years Experience</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="showcase-grid">
              <div className="showcase-item">
                <img src="/carrara-marble-tile.png" alt="Carrara Marble" />
                <span>Carrara Marble</span>
              </div>
              <div className="showcase-item">
                <img src="/placeholder-s584p.png" alt="Ceramic Tiles" />
                <span>Ceramic Tiles</span>
              </div>
              <div className="showcase-item">
                <img src="/travertine-stone-sample.png" alt="Travertine" />
                <span>Travertine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
