import { MongoClient, ObjectId } from "mongodb"

export type User = {
  _id?: ObjectId
  username: string
  email: string
  password: string
  emailVerified: boolean
  prompts: string[]
  createdAt: Date
  sessions : string[]
}

export async function getMongoClient(uri: string): Promise<MongoClient> {
  const client = new MongoClient(uri)
  await client.connect()
  return client
}

// export async function indexSetupDatabase(url: string, dbName: string) {
//   try {
//     const client = new MongoClient(url)
//     await client.connect()
//     const db = client.db(dbName)
//     const collection = db.collection<User>("users")
//     await collection.createIndex({ email: 1 }, { unique: true })
//     await collection.createIndex({ createAt: -1 })
//     return "Successful"
//   } catch (e) {
//     return "Error"
//   }
// }
