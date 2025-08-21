"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Award, Shield, Star, CheckCircle, Phone, Mail, Target, Heart, Lightbulb } from "lucide-react"

const timelineEvents = [
  {
    year: "2008",
    title: "Company Founded",
    description: "Started as a small family business with a passion for premium stone and tile installation.",
    icon: "🏗️",
  },
  {
    year: "2012",
    title: "First Major Commercial Project",
    description: "Completed our first luxury hotel lobby installation, establishing our commercial reputation.",
    icon: "🏢",
  },
  {
    year: "2015",
    title: "Expanded Operations",
    description: "Opened our second location and expanded our team to 25+ certified craftsmen.",
    icon: "📈",
  },
  {
    year: "2018",
    title: "Award Recognition",
    description: "Received 'Best Stone Installation Company' award from the National Tile Association.",
    icon: "🏆",
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description: "Launched 3D visualization services and virtual consultations for enhanced customer experience.",
    icon: "💻",
  },
  {
    year: "2022",
    title: "Sustainability Initiative",
    description: "Implemented eco-friendly practices and partnered with sustainable stone suppliers.",
    icon: "🌱",
  },
  {
    year: "2024",
    title: "Industry Leadership",
    description: "Reached 5000+ completed projects and established as the region's premier stone specialist.",
    icon: "⭐",
  },
]

const teamMembers = [
  {
    name: "Michael Rodriguez",
    role: "Founder & CEO",
    image: "/team-michael-ceo.png",
    bio: "With over 25 years in the stone industry, Michael founded the company with a vision to bring premium craftsmanship to every project.",
    certifications: ["Master Stone Mason", "NTCA Certified", "Business Leadership"],
    specialties: ["Project Management", "Custom Design", "Quality Control"],
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    image: "/team-sarah-designer.png",
    bio: "Sarah brings artistic vision and technical expertise to create stunning stone installations that exceed client expectations.",
    certifications: ["Interior Design Certified", "3D Visualization Expert", "Color Theory Specialist"],
    specialties: ["Design Consultation", "3D Modeling", "Material Selection"],
  },
  {
    name: "David Thompson",
    role: "Master Installer",
    image: "/team-david-installer.png",
    bio: "David's precision and attention to detail ensure every installation meets our highest standards of quality and craftsmanship.",
    certifications: ["Master Craftsman", "Safety Certified", "Advanced Installation Techniques"],
    specialties: ["Complex Installations", "Custom Fabrication", "Quality Assurance"],
  },
  {
    name: "Maria Gonzalez",
    role: "Customer Success Manager",
    image: "/team-maria-success.png",
    bio: "Maria ensures every client receives exceptional service from initial consultation through project completion and beyond.",
    certifications: ["Customer Service Excellence", "Project Coordination", "Client Relations"],
    specialties: ["Client Communication", "Project Coordination", "After-Sales Support"],
  },
]

const companyValues = [
  {
    icon: <Target className="w-8 h-8 text-amber-600" />,
    title: "Precision & Quality",
    description:
      "Every cut, every installation, every detail is executed with meticulous precision and uncompromising quality standards.",
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Customer First",
    description:
      "Our clients' satisfaction is our top priority. We listen, understand, and deliver beyond expectations every time.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-500" />,
    title: "Innovation",
    description: "We embrace new technologies and techniques to provide cutting-edge solutions and superior results.",
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: "Integrity",
    description:
      "Honest communication, transparent pricing, and ethical business practices form the foundation of our company.",
  },
]

const achievements = [
  { metric: "5000+", label: "Projects Completed", icon: "🏗️" },
  { metric: "25+", label: "Years Experience", icon: "📅" },
  { metric: "850+", label: "Happy Clients", icon: "😊" },
  { metric: "99%", label: "Satisfaction Rate", icon: "⭐" },
  { metric: "50+", label: "Team Members", icon: "👥" },
  { metric: "15", label: "Industry Awards", icon: "🏆" },
]

export default function About() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  const handleContactClick = () => {
    window.location.href = "tel:+15551234567"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@stonetileco.com"
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm text-gray-300 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 inline mx-2" />
              <span>About Us</span>
            </nav>
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              For over 25 years, we've been transforming spaces with premium stone and tile installations. From humble
              beginnings to industry leadership, our commitment to quality and craftsmanship remains unwavering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                asChild
              >
                <Link href="/gallery">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.metric}</div>
                  <div className="text-sm text-gray-600">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800">Our Mission</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Crafting Excellence in Every Stone</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2008 by master craftsman Michael Rodriguez, Stone & Tile Co. began with a simple mission: to
                bring the beauty and elegance of premium natural stone to homes and businesses across the region.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                What started as a small family business has grown into the area's most trusted stone installation
                company, completing over 5,000 projects while maintaining our commitment to exceptional quality and
                personalized service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Licensed and fully insured</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Certified master craftsmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">10-year installation warranty</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">24/7 emergency service</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/about-hero-workshop.png"
                alt="Our workshop"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-amber-600">25+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Our Values</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our core values guide every decision we make and every project we complete, ensuring consistent excellence
              and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Our Journey</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Company Timeline</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From our founding to today, see how we've grown and evolved to become the region's premier stone and tile
              specialists.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-200"></div>
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-3xl mb-3">{event.icon}</div>
                        <Badge className="mb-3 bg-amber-600 hover:bg-amber-700">{event.year}</Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Our Team</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the Experts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our team of certified professionals brings decades of combined experience and passion for excellence to
              every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMember(selectedMember === index ? null : index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                  {selectedMember === index && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Certifications:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.certifications.map((cert, certIndex) => (
                            <Badge key={certIndex} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                        <div className="space-y-1">
                          {member.specialties.map((specialty, specIndex) => (
                            <div key={specIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {specialty}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    {selectedMember === index ? "Show Less" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">Recognition</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Awards & Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to excellence has been recognized by industry leaders and satisfied clients alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Award className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Excellence</h3>
                <p className="text-gray-600 mb-4">Best Stone Installation Company - National Tile Association 2018</p>
                <Badge className="bg-amber-100 text-amber-800">2018 Winner</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Star className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Choice</h3>
                <p className="text-gray-600 mb-4">Highest Customer Satisfaction Rating - Local Business Awards</p>
                <Badge className="bg-blue-100 text-blue-800">4 Years Running</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Safety Excellence</h3>
                <p className="text-gray-600 mb-4">Zero Accident Record - Occupational Safety & Health Administration</p>
                <Badge className="bg-green-100 text-green-800">5 Years</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work with the Best?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have trusted us with their stone and tile projects. Let our expert
            team bring your vision to life with unmatched quality and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Get Free Consultation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600 bg-transparent"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (123) 456-7890
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-amber-100">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free Estimates
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Licensed & Insured
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              10-Year Warranty
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
