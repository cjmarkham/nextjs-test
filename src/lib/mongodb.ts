import { Collection, MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGO_DSN) {
  throw new Error('Missing MONGO_DSN env variable.')
}

const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 1000,
  connectTimeoutMS: 1000,
}

const mongoClient = new MongoClient(process.env.MONGO_DSN, options)
const db = mongoClient.db(process.env.MONGO_DB || 'nextjs')

interface Client {
  productsCollection: Collection
}

export default {
  productsCollection: db.collection('products'),
} as Client
