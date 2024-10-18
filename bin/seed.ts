import { faker } from '@faker-js/faker'

import client from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

;(async () => {
  const products = []
  for (let i = 0; i < 10; i += 1) {
    const name = faker.commerce.productName()

    products.push({
      _id: new ObjectId(),
      name,
      description: faker.commerce.productDescription(),
      price: getRandomInt(10, 100),
      image: 'https://placehold.co/200x200',
      slug: name.replaceAll(' ', '-').toLowerCase()
    })
  }

  await client.productsCollection.deleteMany()
  await client.productsCollection.insertMany(products)

  process.exit(0)
})()
