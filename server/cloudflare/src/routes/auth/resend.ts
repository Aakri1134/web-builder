import { Hono } from "hono"
import { Env } from "../.."
import { emailCheckupLogin, userInputValidation } from "../../middlewares/auth"
import jwt from "jsonwebtoken"
import { sendEmailVerificationMail } from "../../utils/mail"
import { captureException } from "@sentry/cloudflare"

export const resend = new Hono<Env>()

resend.post("/", userInputValidation, emailCheckupLogin, async (c) => {
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
    await sendEmailVerificationMail(c, email, token)
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
