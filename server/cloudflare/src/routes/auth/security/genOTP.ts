import { Hono } from "hono"
import { Env } from "../../.."
import userInputValidation from "../../../middlewares/auth/userInputValidation"
import { Redis } from "@upstash/redis/cloudflare"
import bcrypt from "bcryptjs"
import { sendOTPMail } from "../../../utils/mail"
import { captureException } from "@sentry/cloudflare"
import emailCheckupLogin from "../../../middlewares/auth/emailCheckupLogin"
import { getUserIP, hashValue } from "../../../utils/info"
import { sensitiveIPRateLimiting } from "../../../middlewares/auth/ipratelimiting"

export const genOTP = new Hono<Env>()

export type OTPRedis = {
  OTP: string
  sessionID: string
}

function generateOTP(length = 6): string {
  let otp = ""
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10) // random digit 0–9
  }
  return otp
}

/*
Endpoint to generate OTP

Body
  email : <email for which otp is to be sent>
*/

genOTP.post(
  "/",
  sensitiveIPRateLimiting,
  userInputValidation,
  emailCheckupLogin,
  async (c) => {
    const maxOTPAttemptsWithin24h = 5
    const OTPCooldown = 15

    const body = await c.req.json()
    const { email } = body

    const redis = Redis.fromEnv(c.env)

    const hashed_email = await hashValue(email)

    const cooldownKey = `otp:${hashed_email}:cooldown`
    const attemptsKey = `otp:${hashed_email}:attempts`
    
    const current = Date.now()
    const [checkCooldown, checkAttempts] = await Promise.all([
      redis.exists(cooldownKey),
      redis.incr(attemptsKey),
    ])
    const end = Date.now()

    console.log("Time Elapse 1")
    console.log(end - current)
    // Email based rate limiting
    if (checkCooldown && c.env.NODE_ENVIRONMENT !== "DEV") {
      return c.json(
        {
          error: "OTP not sent due to cooldown",
        },
        400
      )
    }

    if (checkAttempts === 1) {
      await redis.expire(attemptsKey, 24 * 60 * 60)
    }
    // Maximum attempts in a day is 5, after that attempts will be blocked
    if (checkAttempts > maxOTPAttemptsWithin24h && c.env.NODE_ENVIRONMENT !== "DEV") {
      // TODO Log this as suspicious activity
      // TODO inform the user about these activities
      return c.json(
        {
          error: "Maximum attempts reached, try again after 24h",
        },
        400
      )
    }

    const key = `otp:${hashed_email}`
    const OTP = generateOTP(6)

    const salt = await bcrypt.genSalt(5)
    const value = await bcrypt.hash(OTP, salt)
    const OTPsessionID = crypto.randomUUID()

    // const startTime = Date.now()
    const currentTime = Date.now()
    const [res, cooldown, _] = await Promise.all([
      redis.set(
        key,
        JSON.stringify({
          OTP: value,
          sessionID: OTPsessionID,
        }),
        {
          ex: 5 * 60,
        }
      ),
      redis.set(cooldownKey, 1, {
        ex: OTPCooldown,
      }),
      redis.exists("123")
    ])

    const endTime = Date.now()

    console.log("Time Elapse 2")
    console.log(endTime - currentTime)

    // const endTime = Date.now()
    // console.log("Time Elapsed due to database")
    // console.log(Number(endTime - startTime) / 1000)

    if (!res) {
      captureException(
        new Error("Redis Server Not Working as intended, action : genOTP")
      )
      return c.json(
        {
          error: "Error ocurred in generating OTP, try again later",
        },
        400
      )
    }

    if(c.env.NODE_ENVIRONMENT !== "DEV") await sendOTPMail(c, email, OTP, OTPsessionID)
    return c.json(
      {
        message: "OTP sent to mail",
      },
      201
    )
  }
)