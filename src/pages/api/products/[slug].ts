import client from '@/lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function GetProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const filter = {
    slug: req.query?.slug as string,
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
    slug: document.slug,
  }

  res.status(200).json({ data: product })
}
