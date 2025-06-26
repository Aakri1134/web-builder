import { createMiddleware } from "hono/factory"
import { getMongoClient, User } from "../../database/db"

export const getUserMiddleware = createMiddleware(async (c, next) => {
  const body = await c.req.json()
  const { email } = body

  const client = await getMongoClient(c.env.MONGO_URL)
  const db = client.db(c.env.MONGO_DB_NAME)
  let user = c.get("user")
  if (!user) {
    const res = await db.collection<User>("users").findOne({ email })
    if (!res) {
      return c.json(
        {
          error: "User not found",
        },
        429
      )
    }

    const { _id, ...temp } = res
    user = temp
    c.set("user", user)
  }
  client.close()
  await next()
})
