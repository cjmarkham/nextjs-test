import { FindOptions } from 'mongodb'
import client from '@/lib/mongodb'
import { Product } from '@/lib/models'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function ListProducts (req: NextApiRequest, res: NextApiResponse) {
  const { limit } = req.query
  const options: FindOptions = {
    limit: Number(limit) || 12,
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

  res.status(200).json({ data: products })
}