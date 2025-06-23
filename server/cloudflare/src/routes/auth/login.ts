import { Hono } from "hono"
import { Env } from "../.."
import { emailCheckupLogin, userInputValidation } from "../../middlewares/auth"
import { getMongoClient, User } from "../../database/db"
import bcrypt from "bcryptjs"
import { jwtUser } from "./index"
import jwt from "jsonwebtoken"

export const login = new Hono<Env>()

login.post("/", userInputValidation, emailCheckupLogin, async (c) => {
  const user = c.get("user")

  const { password }: User = await c.req.json()
  const {email, emailVerified} = user

  // email Verification is gone via mail
  if (!emailVerified) {
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

  const sessionID = crypto.randomUUID()
  // Signing JWT for JWT based authentication, best and only one I like (know)
  const jwtData: jwtUser = {
    id: user._id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    iss: "web-builder",
    jti : sessionID,

    username: user.username,
    email: user.email
  }
  
  const client = await getMongoClient(c.env.MONGO_URL)
  const db = client.db(c.env.MONGO_DB_NAME)
  
  const token = jwt.sign(jwtData, c.env.JWT_USER_KEY)
  await db.collection<User>("users").updateOne({email}, { $addToSet : {sessions : sessionID}})


  return c.json({
    token,
  })
})
