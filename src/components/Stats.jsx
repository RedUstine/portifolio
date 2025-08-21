"use client"

import { useState, useEffect, useRef } from "react"
import "./Stats.css"

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0,
  })
  const sectionRef = useRef(null)

  const finalCounts = {
    projects: 1500,
    clients: 850,
    experience: 15,
    satisfaction: 99,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounts({
          projects: Math.floor(finalCounts.projects * progress),
          clients: Math.floor(finalCounts.clients * progress),
          experience: Math.floor(finalCounts.experience * progress),
          satisfaction: Math.floor(finalCounts.satisfaction * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounts(finalCounts)
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="stat-number">{counts.projects.toLocaleString()}+</div>
            <div className="stat-label">Projects Completed</div>
            <div className="stat-description">Successful installations across residential and commercial spaces</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="stat-number">{counts.clients.toLocaleString()}+</div>
            <div className="stat-label">Happy Clients</div>
            <div className="stat-description">Satisfied customers who trust us with their stone needs</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="stat-number">{counts.experience}+</div>
            <div className="stat-label">Years Experience</div>
            <div className="stat-description">Decades of expertise in premium stone installation</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div className="stat-number">{counts.satisfaction}%</div>
            <div className="stat-label">Satisfaction Rate</div>
            <div className="stat-description">Client satisfaction with our quality and service</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
