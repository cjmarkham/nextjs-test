import { faker } from '@faker-js/faker'

import client from '@/lib/mongodb'
import { Product } from '@/api/models'
import { ObjectId } from 'mongodb'

;(async () => {
  const products: Array<Product> = []
  for (let i = 0; i < 100; i += 1) {
    products.push({
      id: new ObjectId().toString(),
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: 100,
      image: 'https://placehold.co/200x200',
    })
  }

  await client.productsCollection.deleteMany()
  await client.productsCollection.insertMany(products)

  process.exit(0)
})()
