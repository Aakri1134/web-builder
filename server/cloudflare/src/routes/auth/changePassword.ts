import { Hono } from "hono"
import { Env } from "../.."
import { emailCheckupLogin, userInputValidation } from "../../middlewares/auth"
import bcrypt from "bcryptjs"
import { getMongoClient, User } from "../../database/db"

export const changePassword = new Hono<Env>()

changePassword.post("/", userInputValidation, emailCheckupLogin, async (c) => {
  const user = c.get("user")
  const { email } = user
  const password_correct_old = user.password

  const body = await c.req.json()
  const password_submitted = body.password

  if (!(await bcrypt.compare(password_correct_old, password_submitted))) {
    return c.json({
      error: "Incorrect password",
    })
  }

  if(await bcrypt.compare(password_submitted, password_correct_old)){
    return c.json({
      error : "New Password cannot be same as previous"
    })
  }

  const salt = await bcrypt.genSalt(5)
  const password = await bcrypt.hash(password_submitted, salt)

  const client = await getMongoClient(c.env.MONGO_URL)
  const db = client.db(c.env.MONGO_DB_NAME)

  const new_user = await db
    .collection<User>("users")
    .updateOne({ email }, { $set: { password, previousPassword : password_correct_old } })
  client.close()

  return c.json({
    message: "Password reset",
  })

  // TODO send mail to inform about password update
  // TODO store old password in stash, to undo change within the duration of a date
})
