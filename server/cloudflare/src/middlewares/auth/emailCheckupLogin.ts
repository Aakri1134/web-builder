import { captureException } from "@sentry/cloudflare"
import { getMongoClient, User } from "../../database/db"
import { createMiddleware } from "hono/factory"
import { MongoClient } from "mongodb"
import { Redis } from "@upstash/redis/cloudflare"
import { hashValue } from "../../utils/info"

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

    const redis = Redis.fromEnv(c.env)
    const hashedEmail = await hashValue(email)

    const exists = await redis.exists(`email:${hashedEmail}`)
    if (!exists) {
      client = await getMongoClient(c.env.MONGO_URL)
      const db = client.db(c.env.MONGO_DB_NAME)
      console.log("Mongo hit")
      const res = await db.collection("users").findOne({ email })
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
      await redis.set(`email:${hashedEmail}`, 1, { ex: 24 * 60 * 60 })
      client.close()
    }
    const endTime = Date.now()

    console.log("Time Elapsed in MongoDB")
    console.log(Number(endTime - startTime))

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
