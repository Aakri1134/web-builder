import { Hono } from "hono"
import { Env } from "../../.."
import userInputValidation from "../../../middlewares/auth/userInputValidation"
import { Redis } from "@upstash/redis/cloudflare"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { jwtOTPSession } from ".."
import { OTPRedis } from "./genOTP"
import { captureEvent } from "@sentry/cloudflare"
import emailCheckupLogin from "../../../middlewares/auth/emailCheckupLogin"
import { sensitiveIPRateLimiting } from "../../../middlewares/auth/ipratelimiting"

export const validateOTP = new Hono<Env>()

validateOTP.post("/",sensitiveIPRateLimiting, userInputValidation, emailCheckupLogin, async (c) => {
  const user = c.get("user")
  const { email } = user

  const body = await c.req.json()
  const { OTP } = body

  const redis = Redis.fromEnv(c.env)

  const key = `otp:${email}`

  const res : OTPRedis | null = await redis.get(key)

  if (!res) {
    return c.json(
      {
        error: "OTP invalid or expired",
      },
      404
    )
  }



  const revoked = await redis.get(`revoked:${res.sessionID}`)

  if(revoked){
    return c.json(
      {
        error: "OTP invalid or expired",
      },
      404
    )
  }

  if (!(await bcrypt.compare(OTP, res.OTP))) {
    return c.json(
      {
        error: "OTP invalid or expired",
      },
      404
    )
  }
  const jwtData : jwtOTPSession = {
    iat: Math.floor(Date.now()/ 1000),
    exp: Math.floor(Date.now()/ 1000) + 60 * 60,
    jti : res.sessionID,
    iss : c.env.JWT_ISSUER
  }
  const token = jwt.sign(jwtData, c.env.JWT_USER_KEY)

  const keySession = `OTPSession:${res.sessionID}`
  const resSession = await redis.set(keySession, 1, {
    ex : 30 * 60
  })

  if(!resSession){
    captureEvent({
      message : "Failed to set OTP session in Redis",
      user,
      exception : { values: [{ type: "OTPValidationError", value: "Failed to set OTP session in Redis" }] },
    })
    return c.json({
      error : "Internal error ocurred, try again later"
    })
  }

  await redis.del(key)

  return c.json(
    {
      success: true,
      message: "OTP validated",
      token ,
    },
    201
  )
})
