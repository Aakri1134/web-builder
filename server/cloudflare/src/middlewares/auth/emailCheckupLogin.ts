import { captureException } from "@sentry/cloudflare"
import { getMongoClient, User } from "../../database/db"
import { createMiddleware } from "hono/factory"
import { MongoClient } from "mongodb"

const emailCheckupLogin = createMiddleware(async (c, next) => {
  let client: MongoClient | null = null
  try {
    const { email } = await c.req.json()
    if (!email) {
      return c.json({
        error: "Incomplete Credentials",
      })
    }
    const startTime = Date.now()

    client = await getMongoClient(c.env.MONGO_URL)
    const db = client.db(c.env.MONGO_DB_NAME)
    const res = await db.collection<User>("users").findOne({
      email,
    })
    const endTime = Date.now()
    console.log("Time Elapsed in MongoDB")
    console.log(Number(endTime - startTime) / 1000)


    if (!res) {
      return c.json(
        {
          error: "User not found",
        },
        400
      )
    }
    
    const { _id, ...user } = res
    c.set("user", user)
    c.set("_id", _id)
    client.close()
    await next()
  } catch (err) {
    captureException(err)
    console.log(err)
    return c.json(
      {
        error: err,
      },
      500
    )
  }
})

export default emailCheckupLogin