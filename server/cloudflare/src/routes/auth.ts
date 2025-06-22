import type { User } from "../database/db"
import { Hono } from "hono"
import { MongoClient, ObjectId } from "mongodb"
import { getMongoClient } from "../database/db"
import { captureException } from "@sentry/cloudflare"
import {
  emailCheckupLogin,
  emailCheckupSignUp,
  userInputValidation,
} from "../middlewares/auth"
import { Env } from ".."
import jwt from "jsonwebtoken"
import { sendMail } from "../utils/mail"
import bcrypt from "bcryptjs"
import { Redis } from "@upstash/redis/cloudflare"

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

// auth.get("/CHECK" , (c) => {
//   console.log("Checking.....")
//   console.log("Checking.....")
//   console.log("Checking.....")
//   return c.json({
//     message: "Log Check complete"
//   })
// })

// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

auth.get("/confirmation/:token", async (c) => {
  // TODO Complete the email verification functionality

  return c.json({
    message: "done",
  })
})

auth.post("/resend", userInputValidation, emailCheckupLogin, async (c) => {
  try {
    const { email } = await c.req.json()
    const token = jwt.sign(
      {
        email,
      },
      c.env.EMAIL_PASSWORD_JWT,
      {
        expiresIn: "24h",
      }
    )
    await sendMail(c, email, token)
    return c.json(
      {
        message: "Mail sent successfully, also check spam",
      },
      200
    )
  } catch (e) {
    captureException(e)
    return c.json(
      {
        error: "Internal Server Error",
      },
      500
    )
  }
})

// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

auth.post("/login", userInputValidation, emailCheckupLogin, async (c) => {
  const user = c.get("user")

  const { password }: User = await c.req.json()

  // email Verification is gone via mail
  if (!user.emailVerified) {
    return c.json({
      error: "Email not Verified!",
    })
  }

  // password encryption to be added
  if (!(await bcrypt.compare(user.password, password))) {
    return c.json({
      error: "Incorrect email or password",
    })
  }

  // Signing JWT for JWT based authentication, best and only one I like (know)
  const jwtData: jwtUser = {
    id: user._id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    iss: "web-builder",

    username: user.username,
    email: user.email,
    uses: 0,
  }
  const token = jwt.sign(jwtData, c.env.JWT_USER_KEY)

  return c.json({
    token,
  })
})

// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

auth.post("/signup", userInputValidation, emailCheckupSignUp, async (c) => {
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

    sendMail(c, email, token)

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

// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------
// TODO complete forgot password without password

auth.post("/genOTP", userInputValidation, emailCheckupLogin, async (c) => {
  //TODO log IP + device of reset attempt and alert the user.
  //TODO Add sentry logging of the OTP validation with IP + device

  const user = c.get("user")
  const { email } = user

  const redis = Redis.fromEnv(c.env)

  const key = `otp:${email}`
  const OTP = generateOTP(6)

  const salt = await bcrypt.genSalt(5)
  const value = await bcrypt.hash(OTP, salt)

  const res = await redis.set(key, value, {
    ex: 10 * 60,
  })

  return c.json({
    message: "OTP sent to mail",
    TEMP_OTP_RESPONSE: OTP,
  })
})

auth.post("/validateOTP", userInputValidation, emailCheckupLogin, async (c) => {
  //TODO log IP + device of reset attempt and alert the user.
  //TODO Add sentry logging of the OTP validation with IP + device
  const user = c.get("user")
  const { email } = user

  const body = await c.req.json()
  const { OTP } = body

  const redis = Redis.fromEnv(c.env)

  const key = `otp:${email}`

  const res: string | null = await redis.getdel(key)

  if (!res) {
    return c.json(
      {
        error: "OTP invalid or expired",
      },
      403
    )
  }

  if (!(await bcrypt.compare(OTP, res))) {
    return c.json(
      {
        error: "OTP invalid or expired",
      },
      404
    )
  }

  return c.json(
    {
      success: true,
      message: "OTP validated",
    },
    201
  )
})

// TODO complete forgot password with password feature
auth.post(
  "/forgotWithPassword",
  userInputValidation,
  emailCheckupLogin,
  async (c) => {
    const user = c.get("user")
    const { email } = user
    const password_correct_old = user.password

    const body = await c.req.json()
    const password_submitted = body.password

    if (!(await bcrypt.compare(password_correct_old, password_submitted))) {
      return c.json({
        error: "Incorrect password",
      })
    }

    const salt = await bcrypt.genSalt(5)
    const password = await bcrypt.hash(password_submitted, salt)

    const client = await getMongoClient(c.env.MONGO_URL)
    const db = client.db(c.env.MONGO_DB_NAME)

    const new_user = await db
      .collection<User>("users")
      .updateOne({ email }, { $set: { password } })
    client.close()

    return c.json({
      message: "Password reset",
    })

    // TODO send mail to inform about password update
    // TODO store old password in stash, to undo change within the duration of a date
  }
)

function generateOTP(length = 6): string {
  let otp = ""
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10) // random digit 0–9
  }
  return otp
}
