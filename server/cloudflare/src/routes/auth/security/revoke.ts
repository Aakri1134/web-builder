import { Hono } from "hono"
import { Env } from "../../.."
import userInputValidation from "../../../middlewares/auth/userInputValidation"
import { captureEvent, captureException } from "@sentry/cloudflare"
import { getUserIP } from "../../../utils/info"
import { Redis } from "@upstash/redis/cloudflare"
import { getMongoClient, User } from "../../../database/db"

export const revoke = new Hono<Env>()

export type revokeInput = {
  tokens: string[]
  reason: string
  type: "otp" | "user"
  email?: string
}

revoke.post("/", userInputValidation, async (c) => {

  // TODO add things like admin check or something
  const body = await c.req.json()

  const { tokens, reason, type, email }: revokeInput = body

  if (!tokens || tokens.length == 0) {
    c.env.NODE_ENVIRONMENT == "DEV" && console.log("tokens : string[] Not found in revoke request")

    return c.json(
      {
        error: "Unauthorized",
      },
      402
    )
  }

  if (!reason) {
    c.env.NODE_ENVIRONMENT == "DEV" && console.log("Reason Not found in revoke request")

    captureEvent({
      level: "warning",
      message: "Revoke attempt without reason",
      timestamp: Date.now() / 1000,
      user: {
        ip_address: getUserIP(c) || "No IP detected",
      },
      extra: {
        device: c.req.header("User-Agent") || "No device detected",
        postman: c.req.header("Postman-Token") || "No Postman Token",
      },
    })

    return c.json(
      {
        error: "Unauthorized",
      },
      402
    )
  }
  const redis = Redis.fromEnv(c.env)

  let failed: string[] = []
  for (const token of tokens) {
    if (type == "user") {
      if (!email) {
        c.env.NODE_ENVIRONMENT == "DEV" && console.log("Email Not found in revoke request")
        

        return c.json(
          {
            error: "Unauthorized",
          },
          402
        )
      }

      try {
        const client = await getMongoClient(c.env.MONGO_URL)
        const db = client.db(c.env.MONGO_DB_NAME)
        const new_user = await db
          .collection<User>("users")
          .updateOne({ email }, { $pull: { sessions: token } })
      } catch (err) {
        captureException(err)
        c.env.NODE_ENVIRONMENT == "DEV" && console.log(err)
      }
    }

    const revokedKey = `revoked:${token}`
    
    try {
      await redis.set(revokedKey, 1, {ex : 24*60*60})
    } catch (err) {
      captureException(err)
    }
  }
  
  captureEvent({
    level : "log",
    message : `Revokation successful`,
    user:{
      email,
      ip_address : getUserIP(c) 
    },
    extra :{
      reason,
      tokens
    },
    timestamp: Date.now()/1000,
  })

  return c.json(
    {
      success: true,
      message: "Revoked",
    },
    201
  )
})
