import type React from "react"
import { Link } from "react-router-dom"
import "./Footer.css"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <span>ST</span>
              </div>
              <div className="logo-text">
                <h3>Stone & Tile Co.</h3>
                <p>Premium Marble & Ceramics</p>
              </div>
            </div>
            <p className="footer-description">
              Transforming spaces with premium marble and ceramic tiles since 1995. Quality, craftsmanship, and customer
              satisfaction are our priorities.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                📘
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="LinkedIn">
                💼
              </a>
              <a href="#" aria-label="Pinterest">
                📌
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Products</h4>
            <ul>
              <li>
                <a href="#">Marble Tiles</a>
              </li>
              <li>
                <a href="#">Ceramic Tiles</a>
              </li>
              <li>
                <a href="#">Porcelain Tiles</a>
              </li>
              <li>
                <a href="#">Natural Stone</a>
              </li>
              <li>
                <a href="#">Mosaic Tiles</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p>123 Stone Avenue</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p>(123) 456-7890</p>
                  <p>Mon-Fri: 8AM-6PM</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <p>info@stonetileco.com</p>
                  <p>quotes@stonetileco.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Stone & Tile Co. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Warranty</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
