import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { StorageProvider } from "./hooks/use-storage"

import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StorageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StorageProvider>
  </StrictMode>
)
