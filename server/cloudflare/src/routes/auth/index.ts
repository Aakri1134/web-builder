import { Hono } from "hono"
import { Env } from "../.."
import { ObjectId } from "mongodb"
import { changePassword } from "./changePassword"
import { login } from "./login"
import { confirmation } from "./confirmation"
import { resend } from "./resend"
import { signup } from "./signup"
import { genOTP } from "./security/genOTP"
import { validateOTP } from "./security/validateOTP"
import { revoke } from "./security/revoke"
import { forgotPassword } from "./forgotPassword"

export const auth = new Hono<Env>()

export type jwtUser = {
  id?: ObjectId
  iat: number
  exp: number
  iss: string
  jti : string

  username: string
  email: string
}

export type jwtOTPSession = {
  iat: number
  exp: number
  iss: string
  jti : string
}

auth.route("/changePassword", changePassword)
auth.route("/confirmation", confirmation)
auth.route("/forgotPassword", forgotPassword)
auth.route("/login", login)
auth.route("/resend", resend)
auth.route("/signup", signup)

// security
auth.route("/genOTP", genOTP)
auth.route("/revoke", revoke)
auth.route("/validateOTP", validateOTP)
