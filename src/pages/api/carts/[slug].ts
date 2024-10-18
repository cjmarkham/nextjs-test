import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

import client from '@/lib/mongodb'
import { CartItem } from '@/lib/models'

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

  if (req.method === 'PUT') {
    return UpdateCart(req, res)
  }

  return GetCart(req, res)
}

const UpdateCart = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query?.slug
  const body: RequestBody = req.body
  const requestedItems = body.data?.items

  if (!requestedItems) {
    res.status(400).json({ title: 'Bad Request' })
    return
  }

  const errors = []

  requestedItems.forEach((item) => {
    if (item.quantity <= 0) {
      errors.push('Bad quantity')
    }
  })

  if (errors.length) {
    res.status(400).json({ title: 'Bad Request' })
    return
  }

  await client.cartsCollection.updateOne(
    { slug },
    { $set: { items: requestedItems } },
  )

  res.status(200).json({})
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

  // Checking that the item exists isn't within the scope of this project

  const existingCart = await client.cartsCollection.findOne({
    slug: req.query?.slug,
  })

  if (existingCart) {
    requestedItems.forEach((item: CartItemRequest, index: number) => {
      const foundIndex = existingCart.items.findIndex(
        (ci: CartItem) => ci.slug === item.slug,
      )
      if (foundIndex > -1) {
        // Update the quantity in the cart
        existingCart.items[foundIndex].quantity += item.quantity
        // Delete since we'll be merging later
        requestedItems.splice(index, 1)
      }
    })

    const mergedItems = [...existingCart.items, ...requestedItems]
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
    items: requestedItems,
  }

  await client.cartsCollection.insertOne(document)

  res.status(201).json({
    id: document._id,
    slug: document.slug,
    items: document.items,
  })
}
