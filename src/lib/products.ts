import client from '@/lib/mongodb'
import { FindOptions, ObjectId } from 'mongodb'
import { Product } from './models'

export const list = async (limit?: number): Promise<Array<Product>> => {
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

  return products
}

export const get = async (id: string): Promise<Product | null> => {
  const document = await client.productsCollection.findOne({
    _id: new ObjectId(id),
  })

  if (!document) {
    return null
  }

  return {
    id: document._id.toString(),
    name: document.name,
    price: document.price,
    description: document.description,
    image: document.image,
  } as Product
}
