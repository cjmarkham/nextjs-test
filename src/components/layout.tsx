import Navbar from './navbar'
import Header from './header'
import CartList from '@/components/cart-list'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Header />

      <main>
        <div className="py-6 sm:px-6 lg:px-8">
          <div className="flex flex-row">
            {children}

            <CartList />
          </div>
        </div>
      </main>
    </div>
  )
}
