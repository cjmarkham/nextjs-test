import client from '@/lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

export default async function GetProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const filter = {
    _id: new ObjectId(req.query.id as string),
  }
  const document = await client.productsCollection.findOne(filter)

  if (!document) {
    res.status(404).send({ title: 'Not Found' })
    return
  }

  const product = {
    id: document._id.toString(),
    name: document.name,
    price: document.price,
    description: document.description,
    image: document.image,
  }

  res.status(200).json({ data: product })
}
