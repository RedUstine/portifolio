import type React from "react"
import "./Services.css"

const Services: React.FC = () => {
  const services = [
    {
      icon: "🏗️",
      title: "Professional Installation",
      description: "Expert installation by certified craftsmen with 25+ years of experience.",
      features: ["Precision cutting", "Perfect alignment", "Quality guarantee"],
    },
    {
      icon: "🎨",
      title: "Design Consultation",
      description: "Free design consultation to help you choose the perfect materials.",
      features: ["3D visualization", "Color matching", "Style guidance"],
    },
    {
      icon: "📦",
      title: "Custom Fabrication",
      description: "Custom cutting and fabrication to fit your exact specifications.",
      features: ["Precise measurements", "Edge finishing", "Special shapes"],
    },
    {
      icon: "🚚",
      title: "Delivery & Logistics",
      description: "Safe and timely delivery with professional handling and care.",
      features: ["Secure packaging", "Scheduled delivery", "Installation ready"],
    },
  ]

  return (
    <section className="services">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">Complete Stone Solutions</h2>
          <p className="section-description">
            From selection to installation, we provide comprehensive services to ensure your project exceeds
            expectations.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
