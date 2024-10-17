import Image from 'next/image'
import { Product } from '@/lib/models'

interface ProductProps {
  product: Product
}

export default function ProductPartial(props: ProductProps) {
  const { product } = props

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-48 object-cover"
        priority={true}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
            <a href={`/products/${product.id}`}>
              {product.name}
            </a>
          </h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
