import { createMiddleware } from "hono/factory"
import { getMongoClient } from "../database/db"
import { User } from "../database/db"
import { MongoClient } from "mongodb"
import { captureException } from "@sentry/cloudflare"

export const emailCheckupLogin = createMiddleware(async (c, next) => {
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

export const emailCheckupSignUp = createMiddleware(async (c, next) => {
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

export const userInputValidation = createMiddleware(async (c, next) => {
  const {username, email, password} = await c.req.json()
      // input validation
    if(username && username.length <= 8){
      return c.json({
        error : "Invalid Username"
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      return c.json({
      error: "Invalid Email"
      }, 400)
    }

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,}$/;
    if(password && !passwordRegex.test(password)){
      return c.json({
        error : "Invalid Password"
      })
    }

    await next()
})