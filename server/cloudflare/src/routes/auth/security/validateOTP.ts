import { Hono } from "hono"
import { Env } from "../../.."
import {
  emailCheckupLogin,
  userInputValidation,
} from "../../../middlewares/auth"
import { Redis } from "@upstash/redis/cloudflare"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { jwtOTPSession } from ".."

export const validateOTP = new Hono<Env>()

validateOTP.post("/", userInputValidation, emailCheckupLogin, async (c) => {
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
  const sessionID = crypto.randomUUID()
  const jwtData : jwtOTPSession = {
    iat: Math.floor(Date.now()/ 1000),
    exp: Math.floor(Date.now()/ 1000) + 60 * 60,
    jti : sessionID,
    iss : "web-builder"

  }
  const token = jwt.sign(jwtData, c.env.JWT_USER_KEY)

  return c.json(
    {
      success: true,
      message: "OTP validated",
      token ,
    },
    201
  )
})
