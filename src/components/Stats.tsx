import type React from "react"
import "./Stats.css"

const Stats: React.FC = () => {
  const stats = [
    { number: "5000+", label: "Projects Completed" },
    { number: "25+", label: "Years Experience" },
    { number: "500+", label: "Product Varieties" },
    { number: "98%", label: "Customer Satisfaction" },
  ]

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
