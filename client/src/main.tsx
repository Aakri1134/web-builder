import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { ThemeContextProvider } from "./context/ThemeProvider.tsx"
import { GlobalContextProvider } from "./context/GlobalContextProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </ThemeContextProvider>
  </StrictMode>
)
