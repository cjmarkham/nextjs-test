import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem, Product } from '@/lib/models'

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType>({ cartItems: [], addToCart: () => {}})

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      const response = await fetch(`/api/carts/cart-id`, { signal: controller.signal }).catch((err) => {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      })

      if (!response) {
        return
      }

      const cart = await response.json()

      setCartItems(cart.items)
    })()

    return () => {
      controller.abort()
    }
  }, [])

  const addToCart = async (product: Product) => {
    const response = await fetch(`/api/carts/cart-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          slug: 'cart-id',
          items: [{
            slug: product.slug,
            quantity: 1,
          }],
        },
      })
    })

    if (response.status !== 201) {
      return
    }

    setCartItems((prev) => [...prev, { slug: product.slug, quantity: 1}])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
