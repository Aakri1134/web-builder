import { Hono } from "hono"
import { Env } from "../.."
import jwt from "jsonwebtoken"
import { sendEmailVerificationMail } from "../../utils/mail"
import { captureException } from "@sentry/cloudflare"
import emailCheckupLogin from "../../middlewares/auth/emailCheckupLogin"
import userInputValidation from "../../middlewares/auth/userInputValidation"
import { getUser } from "../../middlewares/auth/getUser"

export const resend = new Hono<Env>()

resend.post("/", userInputValidation, emailCheckupLogin, getUser, async (c) => {
  try {
    const user = c.get("user")
    if(user.emailVerified){
      return c.json({
        error : "Email already verified"
      }, 400)
    }
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
    if(c.env.NODE_ENVIRONMENT !== "DEV")sendEmailVerificationMail(c, email, token)
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
