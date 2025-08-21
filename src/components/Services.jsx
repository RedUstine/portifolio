"use client"

import { Card, CardContent } from "./ui/card"
import "./Services.css"

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Premium Services</h2>
          <p>Comprehensive stone solutions from design to installation</p>
        </div>
        <div className="services-grid">
          <Card className="service-card">
            <CardContent className="service-content">
              <div className="service-icon">🔨</div>
              <h3 className="service-title">Professional Installation</h3>
              <p className="service-description">
                Expert craftsmen ensure flawless installation with precision and attention to detail.
              </p>
              <ul className="service-features">
                <li>
                  <span className="feature-check">✓</span>
                  Certified installers
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Quality guarantee
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Timely completion
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Clean workspace
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="service-card">
            <CardContent className="service-content">
              <div className="service-icon">🎨</div>
              <h3 className="service-title">Design Consultation</h3>
              <p className="service-description">
                Work with our design experts to create the perfect stone solution for your space.
              </p>
              <ul className="service-features">
                <li>
                  <span className="feature-check">✓</span>
                  Free consultation
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  3D visualization
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Material selection
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Custom designs
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="service-card">
            <CardContent className="service-content">
              <div className="service-icon">⚒️</div>
              <h3 className="service-title">Custom Fabrication</h3>
              <p className="service-description">
                Precision cutting and shaping to match your exact specifications and requirements.
              </p>
              <ul className="service-features">
                <li>
                  <span className="feature-check">✓</span>
                  CNC precision cutting
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Edge profiling
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Custom shapes
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Quality control
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="service-card">
            <CardContent className="service-content">
              <div className="service-icon">🚚</div>
              <h3 className="service-title">Delivery & Logistics</h3>
              <p className="service-description">
                Safe and secure delivery of your stone materials with professional handling.
              </p>
              <ul className="service-features">
                <li>
                  <span className="feature-check">✓</span>
                  Insured transport
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Scheduled delivery
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Professional handling
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  Installation ready
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Services
