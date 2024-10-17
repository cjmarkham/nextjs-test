import { Bell, ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/context/cart'

export default function Navbar() {
  const { cartItems } = useCart()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/">
              <span className="text-xl font-semibold text-gray-800">MyShop</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600" />
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            <span className="px-2 text-center rounded-2xl bg-green-200">{cartItems.length}</span>
            <User className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  )
}
