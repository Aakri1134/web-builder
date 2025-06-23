import { Hono } from "hono"
import { Env } from "../../.."
import {
  emailCheckupLogin,
  userInputValidation,
} from "../../../middlewares/auth"
import { Redis } from "@upstash/redis/cloudflare"
import bcrypt from "bcryptjs"

export const genOTP = new Hono<Env>()

function generateOTP(length = 6): string {
  let otp = ""
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10) // random digit 0–9
  }
  return otp
}

genOTP.post("/", userInputValidation, emailCheckupLogin, async (c) => {
  const user = c.get("user")
  const { email } = user

  const redis = Redis.fromEnv(c.env)

  const key = `otp:${email}`
  const OTP = generateOTP(6)

  const salt = await bcrypt.genSalt(5)
  const value = await bcrypt.hash(OTP, salt)

  const startTime = Date.now()
  const res = await redis.set(key, value, {
    ex: 5 * 60,
  })
  const endTime = Date.now()
  console.log("Time Elapsed due to database")
  console.log(Number(endTime - startTime) / 1000)

  return c.json({
    message: "OTP sent to mail",
  })
})
