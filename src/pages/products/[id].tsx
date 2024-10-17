import { Star, ShoppingCart } from 'lucide-react'

import Image from 'next/image'
import { useProduct } from '@/hooks/products'
import { useRouter } from 'next/router'

export default function PDP() {
  const router = useRouter()
  const { product } = useProduct(router.query.id as string)

  return (
    <div className="flex flex-col md:flex-row -mx-4">
      <div className="md:flex-1 px-4">
        <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
          <Image
            src="https://placehold.co/460x460"
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
            priority={true}
          />
        </div>
        <div className="flex -mx-2 mb-4">
          <div className="w-1/2 px-2">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-full font-bold hover:bg-primary/80 transition-colors">
              <ShoppingCart className="w-4 h-4 inline-block mr-2" />
              Add to Cart
            </button>
          </div>
          <div className="w-1/2 px-2">
            <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="md:flex-1 px-4">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <div className="flex mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
              />
            ))}
            <span className="ml-2 text-gray-600">4.0 (24 reviews)</span>
          </div>
        </div>
        <div className="text-xl font-bold mb-4">$19.99</div>
        <div className="mb-4">
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
