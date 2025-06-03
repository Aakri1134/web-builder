import { Hono } from "hono"
import { auth } from "../routes/auth"
import * as Sentry from "@sentry/cloudflare"

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
