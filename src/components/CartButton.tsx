"use client"

import type React from "react"
import { useCart } from "./ShoppingCart"
import "./CartButton.css"

interface CartButtonProps {
  onClick: () => void
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <button className="cart-button" onClick={onClick}>
      <span className="cart-icon">🛒</span>
      {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
    </button>
  )
}

export default CartButton
