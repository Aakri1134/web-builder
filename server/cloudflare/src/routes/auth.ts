import type { User } from "../database/db"
import { Hono } from "hono"
import { MongoClient, ObjectId } from "mongodb"
import { getMongoClient } from "../database/db"
import { captureException } from "@sentry/cloudflare"
import { emailCheckupLogin, emailCheckupSignUp, userInputValidation } from "../middlewares/auth"
import { Env } from ".."
import jwt from "jsonwebtoken"

export type jwtUser = {
  id?: ObjectId
  iat: number
  exp: number
  iss: "web-builder"

  username: string
  email: string
  uses: number
}

export const auth = new Hono<Env>()

// Run once during deployment to Initialize indexes in the mongoDB database

// import { indexSetupDatabase } from "../database/db"
// auth.get("/", async (c) => {
//     const message = await indexSetupDatabase(c.env.MONGO_URL, c.env.MONGO_DB_NAME)
//     return c.json({
//         message
//     })
// })

auth.post("/login",userInputValidation ,emailCheckupLogin, async (c) => {
  const user = c.get("user")
  const id = c.get("_id")

  const { password } = await c.req.json()

  // email Verification is gone via mail
  if (!user.emailVerified) {
    return c.json({
      error: "Email not Verified!",
    })
  }

  // password encryption to be added
  if (user.password !== password) {
    return c.json({
      error: "Incorrect email or password",
    })
  }

  // Signing JWT for JWT based authentication, best and only one I like (know)
  const jwtData: jwtUser = {
    id: user._id,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    iss: "web-builder",

    username: user.username,
    email: user.email,
    uses: 0,
  }
  const token = jwt.sign(jwtData, c.env.JWT_USER_KEY, {
    expiresIn: "7d",
  })

  return c.json({
    token,
  })
})

auth.post("/signup",userInputValidation , emailCheckupSignUp, async (c) => {
  let client: MongoClient | null = null
  try {
    const body = await c.req.json()

    // input check
    const { username, email, password } : User= body
    if (!username || !email || !password) {
      return c.json(
        {
          error: "Incomplete Credentials",
        },
        400
      )
    }

    const user: User = {
      username,
      email,
      password,
      emailVerified: false,
      prompts: [], // initialize as empty array or appropriate default
      createdAt: new Date(),
    }
    client = await getMongoClient(c.env.MONGO_URL)
    const db = client.db(c.env.MONGO_DB_NAME)
    const res = await db.collection<User>("users").insertOne(user)
    return c.json(
      {
        message: "User created successfully!",
        userID: res.insertedId,
      },
      200
    )
  } catch (e) {
    captureException(e)
    return c.json(
      {
        error: "Internal Server Error!!",
      },
      500
    )
  } finally {
    if (client) client.close()
  }
})
