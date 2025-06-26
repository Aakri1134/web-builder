import { createMiddleware } from "hono/factory"
import { MongoClient } from "mongodb"
import { getMongoClient, User } from "../../database/db"
import { captureException } from "@sentry/cloudflare"

const emailCheckupSignUp = createMiddleware(async (c, next) => {
  let client: MongoClient | null = null
  try {
    const { email } = await c.req.json()
    if (!email) {
      return c.json({
        error: "Incomplete Credentials",
      })
    }

    client = await getMongoClient(c.env.MONGO_URL)
    const db = client.db(c.env.MONGO_DB_NAME)
    const res = await db.collection<User>("users").findOne({
      email,
    })
    if (res) {
      return c.json(
        {
          error: "Email already exists",
        },
        400
      )
    }
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

export default emailCheckupSignUp
