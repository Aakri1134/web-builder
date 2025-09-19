// import "./sentry/instrument.ts"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import * as Sentry from "@sentry/react"
import { RecoilRoot } from "recoil"
import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home.tsx"
import Project from "./pages/Project.tsx"

const root = createRoot(document.getElementById("root")!)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/project/:id",
    element: <Project />,
  },
])

root.render(
  <StrictMode>
    <RecoilRoot>
      <Sentry.ErrorBoundary fallback={<p>Error Ocurred</p>}>
        <RouterProvider router={router} />
      </Sentry.ErrorBoundary>
    </RecoilRoot>
  </StrictMode>
)
