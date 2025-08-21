"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: "https://facebook.com/stonetileco",
      instagram: "https://instagram.com/stonetileco",
      twitter: "https://twitter.com/stonetileco",
      linkedin: "https://linkedin.com/company/stonetileco",
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@stonetileco.com"
  }

  const handlePhoneClick = () => {
    window.location.href = "tel:+15551234567"
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded"></div>
              <span className="text-xl font-bold">Stone & Tile Co.</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium stone and tile solutions for residential and commercial projects. Quality craftsmanship since
              2008.
            </p>
            <div className="flex space-x-4">
              <button onClick={() => handleSocialClick("facebook")} className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </button>
              <button onClick={() => handleSocialClick("instagram")} className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </button>
              <button onClick={() => handleSocialClick("twitter")} className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </button>
              <button onClick={() => handleSocialClick("linkedin")} className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services/installation" className="hover:text-white">
                  Stone Installation
                </Link>
              </li>
              <li>
                <Link href="/services/design" className="hover:text-white">
                  Design Consultation
                </Link>
              </li>
              <li>
                <Link href="/services/fabrication" className="hover:text-white">
                  Custom Fabrication
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="hover:text-white">
                  Maintenance & Repair
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/products?category=marble" className="hover:text-white">
                  Marble
                </Link>
              </li>
              <li>
                <Link href="/products?category=granite" className="hover:text-white">
                  Granite
                </Link>
              </li>
              <li>
                <Link href="/products?category=quartz" className="hover:text-white">
                  Quartz
                </Link>
              </li>
              <li>
                <Link href="/products?category=ceramic" className="hover:text-white">
                  Ceramic Tiles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <button onClick={handlePhoneClick} className="flex items-center hover:text-white">
                <Phone className="w-4 h-4 mr-2" />
                <span>(123) 456-7890</span>
              </button>
              <button onClick={handleEmailClick} className="flex items-center hover:text-white">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@stonetileco.com</span>
              </button>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Stone Avenue, NY 10001</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Stone & Tile Co. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
