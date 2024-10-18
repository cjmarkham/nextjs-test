import { useCart } from '@/context/cart'
import { CartItem } from '@/lib/models'
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartList() {
  const { cartItems, updateQuantity } = useCart()

  const deleteItem = (slug: string) => {
    updateQuantity(slug, 0)
  }

  const totalPrice = cartItems.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0)

  return (
    <section className="pl-10">
      <div className="w-screen max-w-md">
        <div className="h-full flex flex-col bg-white shadow-xl">
          <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.length === 0 && <p className="text-gray-500">Nothing here</p>}
                  {cartItems.map((item) => (
                    <li key={item.slug} className="py-6 flex">
                      <div className="flex-1 ml-4 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.slug}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                              className="text-gray-500 hover:text-gray-600"
                            >
                              <Minus className="h-4 w-4" />
                              <span className="sr-only">Decrease quantity</span>
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.slug, parseInt(e.target.value, 10))}
                              className="text-black mx-2 w-12 text-center border-gray-200 rounded-md"
                            />
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-600"
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Increase quantity</span>
                            </button>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => deleteItem(item.slug)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <a
                href="#"
                className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}