import { faker } from '@faker-js/faker'

import client from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

;(async () => {
  const products = []
  for (let i = 0; i < 10; i += 1) {
    const name = faker.commerce.productName()

    products.push({
      _id: new ObjectId(),
      name,
      description: faker.commerce.productDescription(),
      price: 100,
      image: 'https://placehold.co/200x200',
      slug: name.replaceAll(' ', '-').toLowerCase()
    })
  }

  await client.productsCollection.deleteMany()
  await client.productsCollection.insertMany(products)

  process.exit(0)
})()
