import { Hono } from "hono"
import { auth } from "./routes/auth"
import * as Sentry from "@sentry/cloudflare"
import { User } from "./database/db"

export type Env = {
  Bindings: {
    SENTRY_URL: string
    MONGO_URL: string
    MONGO_DB_NAME: string
    JWT_USER_KEY: string
    EMAIL_PASSWORD_JWT: string
    REDIS_URL: string
    REDIS_API: string
    BREVO_API: string
  }
  Variables: {
    user: User
  }
}

const app = new Hono<Env>()

app.route("/auth", auth)

app.onError((err, c) => {
  Sentry.captureException(err)
  return c.text("Something went wrong", 500)
})

const sentryApp = Sentry.withSentry(
  (env: Env["Bindings"]) => ({
    dsn: env.SENTRY_URL,
    tracesSampleRate: 1.0,
    sendDefaultPii: true,
  }),
  app satisfies ExportedHandler<Env>
)

export default sentryApp
