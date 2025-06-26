import { Context } from "hono"
import { createMiddleware } from "hono/factory"
import jwt from "jsonwebtoken"
import { Env, jwtUser } from "../.."
import { captureException } from "@sentry/cloudflare"
import { Redis } from "@upstash/redis/cloudflare"
import { MongoClient } from "mongodb"
import { hashValue } from "../../utils/info"
import { getMongoClient, User } from "../../database/db"

/*
    this function checks 
    if there is a session token, 
    if it is valid for the user, 
    if it is revoked,
    if all tests are passed, 
    continue
*/

export const jwtVerification = createMiddleware(
  async (c: Context<Env>, next) => {
    const token = c.req.header("Authorization")

    if (!token) {
      return c.json(
        {
          error: "Unauthorized",
        },
        400
      )
    }

    let payload: jwtUser
    let client: MongoClient | undefined
    try {
      payload = jwt.verify(token, c.env.JWT_USER_KEY) as jwtUser

      const { email, jti } = payload
      const redis = Redis.fromEnv(c.env)

      const [hashed_mail, hashed_session] = await Promise.all([
        hashValue(email),
        hashValue(jti),
      ])

      const sessionKey = `userSession:${hashed_session}`
      const revokeKey = `revoked:${hashed_session}`

      const [valid, revoked] = await Promise.all([
        redis.get(sessionKey),
        redis.get(revokeKey),
      ])

      if (revoked) {
        return c.json(
          {
            error: "Unauthorized",
          },
          401
        )
      }

      if (!valid) {
        const client = await getMongoClient(c.env.MONGO_URL)
        const db = client.db(c.env.MONGO_DB_NAME)
        const user = await db.collection<User>("users").findOne({ email })
        if (!user) {
          return c.json(
            {
              error: "User not found",
            },
            404
          )
        }
        const found = jti in user.sessions
        if (found) {
          await redis.set(sessionKey, 1, { ex: 60 * 60 })
        }
        c.set("user", user)
      }

      await next()
    } catch (err) {
      captureException(err)
      return c.json(
        {
          error: "Internal Server Error",
        },
        500
      )
    } finally {
      if (client) client.close()
    }
  }
)
