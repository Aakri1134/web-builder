import { Context, Hono } from "hono"
import { Env } from "../.."
import { emailCheckupLogin, userInputValidation } from "../../middlewares/auth"
import { Redis } from "@upstash/redis/cloudflare"
import jwt from "jsonwebtoken"
import { captureEvent } from "@sentry/cloudflare"
import { getUserIP } from "../../utils/info"
import { jwtOTPSession } from "."
import { getMongoClient, User } from "../../database/db"
import bcrypt from "bcryptjs"

export const forgotPassword = new Hono<Env>()

forgotPassword.post("/", userInputValidation, emailCheckupLogin, async (c) => {
  const user = c.get("user")
  const body = await c.req.json()

  const { email } = user
  const { token, password }: { token: string; password: string } = body

  if (!token || !password) {
    return c.json(
      {
        error: "Unauthorized",
      },
      401
    )
  }
  let data: jwtOTPSession

  try {
    const decoded = jwt.verify(token, c.env.JWT_USER_KEY)
    if (typeof decoded === "object" && decoded !== null) {
      data = decoded as jwtOTPSession
    } else {
      fatalError(
        c,
        "JWT Password possibly leaked, Invalid JWT was verified",
        user
      )
      return c.json(
        {
          error: "Unauthorized",
        },
        403
      )
    }
  } catch (err) {
    fatalError(c, "Unverified JWT appeared possible intrusion alert", user)
    return c.json(
      {
        error: "Unauthorized",
      },
      403
    )
  }

  const redis = Redis.fromEnv(c.env)

  const revoked = await redis.exists(`revoked:${data.jti}`)
  if (revoked) {
    return c.json(
      {
        error: "Unauthorized",
      },
      403
    )
  }

  const sessionIDKey = `OTPSession:${data.jti}`
  const sessionID = await redis.getdel(sessionIDKey)

  if(!sessionID){
    return c.json(
      {
        error: "Unauthorized",
      },
      403
    )
  }
  
  const client = await getMongoClient(c.env.MONGO_URL)
  const db = client.db(c.env.MONGO_DB_NAME)

  if(user.password && await bcrypt.compare(password, user.password)){
    return c.json({
      error : "New password cannot be same as previous"
    }, 401)
  }

  const salt = await bcrypt.genSalt(5)
  const hashed_password = await bcrypt.hash(password, salt)

  const updated_user = await db.collection<User>("users").updateOne({email}, { $set:{ password : hashed_password, previousPassword : user.password} })
  await redis.del(`otp:${email}:attempts`)
  await redis.del(`otp:${email}:cooldown`)

  return c.json({
    message: "Password updated successfully",
  })
})

function fatalError(c: Context<Env>, message: string, user: User) {
  captureEvent({
    level: "warning",
    message,
    timestamp: Date.now() / 1000,
    user: {
      ...user,
      ip_address: getUserIP(c) || "Not Detected",
    },
    extra: {
      device: c.req.header("user-agent"),
    },
  })
  return c.json(
    {
      error: "Unauthorized",
    },
    401
  )
}
