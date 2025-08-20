import type React from "react"
import { Link } from "react-router-dom"
import "./About.css"

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Michael Rodriguez",
      role: "Founder & CEO",
      experience: "25+ Years",
      image: "/team-michael-ceo.png",
      bio: "Michael founded Stone & Tile Co. with a vision to bring premium quality stone and tile solutions to every project. His expertise in natural stone and commitment to excellence has made the company a trusted name in the industry.",
      specialties: ["Business Strategy", "Quality Control", "Client Relations"],
    },
    {
      name: "Sarah Chen",
      role: "Head of Design",
      experience: "15+ Years",
      image: "/team-sarah-designer.png",
      bio: "Sarah leads our design team with her exceptional eye for detail and innovative approach to space transformation. She helps clients visualize their dream spaces and brings them to life.",
      specialties: ["Interior Design", "3D Visualization", "Color Consultation"],
    },
    {
      name: "David Thompson",
      role: "Installation Manager",
      experience: "20+ Years",
      image: "/team-david-installer.png",
      bio: "David oversees all installation projects, ensuring every tile is placed with precision and care. His technical expertise and attention to detail guarantee flawless results.",
      specialties: ["Project Management", "Technical Installation", "Quality Assurance"],
    },
    {
      name: "Maria Gonzalez",
      role: "Customer Success",
      experience: "12+ Years",
      image: "/team-maria-success.png",
      bio: "Maria ensures every customer has an exceptional experience from consultation to completion. Her dedication to customer satisfaction has earned us countless referrals and reviews.",
      specialties: ["Customer Service", "Project Coordination", "After-Sales Support"],
    },
  ]

  const milestones = [
    {
      year: "1995",
      event: "Company Founded",
      description: "Started as a small family business with a passion for stone",
    },
    {
      year: "2000",
      event: "First Showroom",
      description: "Opened our first showroom to better serve residential customers",
    },
    {
      year: "2005",
      event: "Commercial Division",
      description: "Expanded into commercial projects and large-scale installations",
    },
    {
      year: "2010",
      event: "Award Recognition",
      description: "Received 'Best Tile Contractor' award from Home & Design Magazine",
    },
    {
      year: "2015",
      event: "Digital Innovation",
      description: "Launched 3D visualization services and online design tools",
    },
    {
      year: "2020",
      event: "Sustainable Practices",
      description: "Implemented eco-friendly practices and sustainable sourcing",
    },
    {
      year: "2024",
      event: "5000+ Projects",
      description: "Celebrated completing over 5000 successful projects",
    },
  ]

  const values = [
    {
      icon: "🎯",
      title: "Quality First",
      description:
        "We never compromise on quality. Every material is carefully selected and every installation is executed with precision.",
    },
    {
      icon: "🤝",
      title: "Customer Focus",
      description:
        "Our customers are at the heart of everything we do. We listen, understand, and deliver beyond expectations.",
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description:
        "We're committed to sustainable practices, from responsible sourcing to eco-friendly installation methods.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We embrace new technologies and techniques to provide better solutions and superior results.",
    },
    {
      icon: "🏆",
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our business, from design to installation to customer service.",
    },
    {
      icon: "🔧",
      title: "Craftsmanship",
      description:
        "Our skilled craftsmen bring decades of experience and take pride in their meticulous attention to detail.",
    },
  ]

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Our Story</h1>
              <p className="hero-subtitle">Transforming spaces with premium stone and tile for over 25 years</p>
              <p className="hero-description">
                What started as a small family business in 1995 has grown into one of the region's most trusted names in
                stone and tile installation. Our commitment to quality, craftsmanship, and customer satisfaction remains
                unchanged.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Customer Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src="/about-hero-workshop.png" alt="Our workshop and team" />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision">
          <div className="mission-vision-grid">
            <div className="mission">
              <div className="section-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                To transform spaces and exceed expectations by providing premium stone and tile solutions with unmatched
                quality, craftsmanship, and customer service. We believe every project deserves the finest materials and
                expert installation.
              </p>
            </div>
            <div className="vision">
              <div className="section-icon">🌟</div>
              <h2>Our Vision</h2>
              <p>
                To be the leading stone and tile company recognized for innovation, sustainability, and excellence. We
                envision a future where beautiful, durable surfaces enhance every space while respecting our
                environment.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="values-section">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-description">
              These core values guide every decision we make and every project we undertake.
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-section">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-description">
              From humble beginnings to industry leadership - here are the key milestones in our story.
            </p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-event">{milestone.event}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="team-section">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description">
              Our experienced professionals are passionate about delivering exceptional results for every project.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-experience">{member.experience}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-specialties">
                    <h4>Specialties:</h4>
                    <ul>
                      {member.specialties.map((specialty, i) => (
                        <li key={i}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="certifications-section">
          <div className="section-header">
            <h2 className="section-title">Certifications & Awards</h2>
            <p className="section-description">
              Our commitment to excellence has been recognized by industry organizations and satisfied customers.
            </p>
          </div>
          <div className="certifications-grid">
            <div className="cert-card">
              <div className="cert-icon">🏆</div>
              <h3>Best Tile Contractor 2023</h3>
              <p>Home & Design Magazine</p>
            </div>
            <div className="cert-card">
              <div className="cert-icon">⭐</div>
              <h3>5-Star Rating</h3>
              <p>Google Reviews & Yelp</p>
            </div>
            <div className="cert-card">
              <div className="cert-icon">✅</div>
              <h3>Licensed & Insured</h3>
              <p>Fully bonded and insured</p>
            </div>
            <div className="cert-card">
              <div className="cert-icon">🌿</div>
              <h3>Green Business Certified</h3>
              <p>Sustainable practices certified</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <h2>Ready to Work With Us?</h2>
          <p>Experience the difference that 25+ years of expertise and dedication can make for your next project.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Start Your Project
            </Link>
            <Link to="/gallery" className="btn btn-outline">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
