export interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  slug: string
}

export interface CartItem {
  quantity: number
  slug: string
}

export interface Cart {
  slug: string
  items: Array<CartItem>
}