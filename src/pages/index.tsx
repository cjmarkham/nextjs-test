import { Product } from '@/lib/models'
import Image from 'next/image'
import { FindOptions } from 'mongodb'
import client from '@/lib/mongodb'

export async function getServerSideProps(context) {
  const limit = context.query?.limit

  const options: FindOptions = {
    limit: limit || 12,
  }

  const documents = await client.productsCollection.find({}, options).toArray()

  const products: Array<Product> = []
  for (const document of documents) {
    products.push({
      id: document._id.toString(),
      name: document.name,
      price: document.price,
      description: document.description,
      image: document.image,
    })
  }

  return { props: { products } }
}

export default function Index({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <div
          key={product.id}
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
              {product.name}
            </h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
