import { Hono } from "hono"
import { Env } from "../.."

export const confirmation = new Hono<Env>()

confirmation.get("/:token", async (c) => {
  // TODO Complete the email verification functionality

  return c.json({
    message: "done",
  })
})
