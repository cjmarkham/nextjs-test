export interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  slug: string
}

export interface CartItem {
  name: string
  quantity: number
  slug: string
  price: number
}

export interface Cart {
  slug: string
  items: Array<CartItem>
}