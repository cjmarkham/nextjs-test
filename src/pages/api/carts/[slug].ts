import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

import client from '@/lib/mongodb'

interface CartItemRequest {
  slug: string
  quantity: number
}

interface RequestBody {
  data: {
    items: Array<CartItemRequest>
  }
}

export default async function Cart(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return AddToCart(req, res)
  }

  return GetCart(req, res)
}

const GetCart = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query?.slug

  const document = await client.cartsCollection.findOne({ slug })
  if (!document) {
    await client.cartsCollection.insertOne({ slug, items: [] })
    res.status(200).json({ slug, items: [] })
    return
  }

  res.status(200).json(document)
}

const AddToCart = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: RequestBody = req.body
  const requestedItems = body.data?.items

  if (!requestedItems) {
    res.status(400).json({ title: 'Bad Request' })
    return
  }

  const items: Array<CartItemRequest> = []
  const itemSlugs = body.data.items.map((i) => i.slug)

  const existingItems = await client.productsCollection.countDocuments({
    slug: { $in: itemSlugs },
  })
  if (existingItems !== body.data.items.length) {
    console.log("couldnt find items", body.data)
    res.status(404).json({ title: 'Not Found' })
    return
  }

  requestedItems.forEach((item) => {
    items.push({
      slug: item.slug,
      quantity: item.quantity || 1,
    })
  })

  const existingCart = await client.cartsCollection.findOne({
    slug: req.query?.slug,
  })
  if (existingCart) {
    const mergedItems = [...existingCart.items, ...items]
    await client.cartsCollection.updateOne(
      { slug: req.query.slug },
      { $set: { items: mergedItems } },
    )

    res.status(201).json({
      id: existingCart._id,
      slug: existingCart.slug,
      items: mergedItems,
    })

    return
  }

  const document = {
    _id: new ObjectId(),
    slug: req.query?.slug,
    items,
  }

  await client.cartsCollection.insertOne(document)

  res.status(201).json({
    id: document._id,
    slug: document.slug,
    items: document.items,
  })
}
