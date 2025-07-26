// import "./sentry/instrument.ts"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import * as Sentry from "@sentry/react"
import { RecoilRoot } from "recoil"
import { createBrowserRouter, RouterProvider } from "react-router"

const root = createRoot(document.getElementById("root")!, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo.componentStack)
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
})

const router = createBrowserRouter([
  {
    path : "/",
    Component : App
  }
])

root.render(
  <StrictMode>
    
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  </StrictMode>
)
