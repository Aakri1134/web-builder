import { Hono } from "hono"
import { Env } from "../.."
import { MongoClient } from "mongodb"
import { getMongoClient, User } from "../../database/db"
import bcrypt from "bcryptjs"
import { sendEmailVerificationMail } from "../../utils/mail"
import { captureException } from "@sentry/cloudflare"
import jwt from "jsonwebtoken"
import emailCheckupSignUp from "../../middlewares/auth/emailCheckupSignUp"
import userInputValidation from "../../middlewares/auth/userInputValidation"

export const signup = new Hono<Env>()

signup.post("/", userInputValidation, emailCheckupSignUp, async (c) => {
  /*
    /auth/signup input schema
    username : String
    email: String<email>
    password: String
  */

  let client: MongoClient | null = null
  try {
    const body = await c.req.json()

    // input check
    const { username, email, password }: User = body
    if (!username || !email || !password) {
      return c.json(
        {
          error: "Incomplete Credentials",
        },
        400
      )
    }

    // password encryption
    const salt = await bcrypt.genSalt(5)
    const password_crypt = await bcrypt.hash(password, salt)

    const user: User = {
      username,
      email,
      password: password_crypt,
      emailVerified: false,
      prompts: [], // initialize as empty array or appropriate default
      createdAt: new Date(),
      sessions: []
    }
    client = await getMongoClient(c.env.MONGO_URL)
    const db = client.db(c.env.MONGO_DB_NAME)
    const res = await db.collection<User>("users").insertOne(user)

    const token = jwt.sign(
      {
        email,
      },
      c.env.EMAIL_PASSWORD_JWT,
      {
        expiresIn: "24h",
      }
    )

    sendEmailVerificationMail(c, email, token)

    return c.json(
      {
        message: "User created successfully!\n Verification Link sent",
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
