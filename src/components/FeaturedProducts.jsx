"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import "./FeaturedProducts.css"

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const products = [
    {
      id: 1,
      name: "Carrara White Marble",
      category: "Marble",
      price: "$85/sq ft",
      image: "/carrara-white-marble.png",
      description: "Classic Italian marble with subtle gray veining",
      features: ["Natural stone", "Polished finish", "Heat resistant"],
      inStock: true,
    },
    {
      id: 2,
      name: "Calacatta Gold Marble",
      category: "Marble",
      price: "$120/sq ft",
      image: "/calacatta-gold-marble.png",
      description: "Luxurious marble with dramatic gold veining",
      features: ["Premium quality", "Unique patterns", "Durable"],
      inStock: false,
    },
    {
      id: 3,
      name: "Travertine Stone",
      category: "Natural Stone",
      price: "$65/sq ft",
      image: "/travertine-stone-sample.png",
      description: "Warm, textured natural stone perfect for outdoor spaces",
      features: ["Weather resistant", "Non-slip surface", "Natural beauty"],
      inStock: true,
    },
    {
      id: 4,
      name: "Large Format Ceramic",
      category: "Ceramic",
      price: "$45/sq ft",
      image: "/large-format-ceramic-tile.png",
      description: "Modern ceramic tiles with minimal grout lines",
      features: ["Easy maintenance", "Water resistant", "Contemporary look"],
      inStock: true,
    },
  ]

  const categories = ["All", "Marble", "Natural Stone", "Ceramic"]

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`)
  }

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our most popular stone and tile selections</p>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="category-button"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                <div className="product-overlay">
                  <Button className="quick-view-btn" onClick={() => alert(`Viewing ${product.name} details`)}>
                    Quick View
                  </Button>
                </div>
              </div>
              <CardContent className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <Badge variant={product.inStock ? "secondary" : "outline"}>
                    {product.inStock ? "In Stock" : "Limited"}
                  </Badge>
                </div>
                <p className="product-description">{product.description}</p>
                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-dot">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <Button onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                    {product.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
