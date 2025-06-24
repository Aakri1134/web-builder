import { Hono } from "hono"
import { Env } from "../../.."
import userInputValidation from "../../../middlewares/auth/userInputValidation"
import { Redis } from "@upstash/redis/cloudflare"
import bcrypt from "bcryptjs"
import { sendOTPMail } from "../../../utils/mail"
import { captureException } from "@sentry/cloudflare"
import emailCheckupLogin from "../../../middlewares/auth/emailCheckupLogin"

export const genOTP = new Hono<Env>()

export type OTPRedis = {
  OTP : string
  sessionID : string
}

function generateOTP(length = 6): string {
  let otp = ""
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10) // random digit 0–9
  }
  return otp
}

genOTP.post("/", userInputValidation, emailCheckupLogin, async (c) => {
  
  const maxOTPAttemptsWithin24h = 5
  const OTPCooldown = 15

  const user = c.get("user")
  const { email } = user

  const redis = Redis.fromEnv(c.env)
  
  const cooldownKey = `otp:${email}:cooldown`
  const attemptsKey = `otp:${email}:attempts`
  
  const checkCooldown = await redis.exists(cooldownKey)
  const checkAttempts : number | null = await redis.get(attemptsKey)


  if(checkCooldown){
    return c.json({
      error : "OTP not sent due to cooldown"
    }, 400)
  }

  // Maximum attempts in a day is 5, after that attempts will be blocked
  if(checkAttempts && checkAttempts > maxOTPAttemptsWithin24h){
    // TODO Log this as suspicious activity
    // TODO inform the user about these activities
    return c.json({
      error : "Maximum attempts reached, try again later"
    }, 400)
  }else if(checkAttempts){
    await redis.incr(attemptsKey)
  }else{
    await redis.set(attemptsKey, 1, {
      ex : 24 * 60 * 60
    })
  }

  const key = `otp:${email}`
  const OTP = generateOTP(6)

  const salt = await bcrypt.genSalt(5)
  const value = await bcrypt.hash(OTP, salt)
  const OTPsessionID = crypto.randomUUID()

  // const startTime = Date.now()
  const res = await redis.set(key, JSON.stringify({
    OTP : value,
    sessionID : OTPsessionID
  }), {
    ex: 5 * 60,
  })

  const cooldown = await redis.set(cooldownKey, 1, {
    ex : OTPCooldown
  })
  
  // const endTime = Date.now()
  // console.log("Time Elapsed due to database")
  // console.log(Number(endTime - startTime) / 1000)

  if(!res){
    captureException(new Error("Redis Server Not Working as intended, action : genOTP"))
    return c.json({
      error : "Error ocurred in generating OTP, try again later"
    }, 400)
  }

  await sendOTPMail(c, email, OTP, OTPsessionID)
  return c.json({
    message: "OTP sent to mail",
  }, 201)
})
