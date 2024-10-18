import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem, Product } from '@/lib/models'

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  updateQuantity: (slug: string, quantity: number) => void
}

const CartContext = createContext<CartContextType>({} as never)

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
            price: product.price,
            name: product.name,
          }],
        },
      })
    })

    if (response.status !== 201) {
      return
    }

    const json = await response.json()
    setCartItems(json.items)
  }

  const updateQuantity = async (slug: string, quantity: number) => {
    const getResponse = await fetch(`/api/carts/cart-id`)
    const cart = await getResponse.json()

    const itemIndex = cart.items.findIndex((i: CartItem) => i.slug === slug)
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = quantity
    }

    const response = await fetch(`/api/carts/cart-id`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          slug,
          items: cart.items,
        }
      })
    })

    if (response.status !== 200) {
      return
    }

    setCartItems(cart.items)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}
