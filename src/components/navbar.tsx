import { Bell, ShoppingCart, User } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">MyShop</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600" />
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            <User className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  )
}
