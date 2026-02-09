import { Routes, Route } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import Dashboard from "@/pages/Dashboard"
import VideoPlayer from "@/pages/VideoPlayer"
import { Toaster } from "@/components/ui/sonner"

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="player" element={<VideoPlayer />} />
          <Route path="player/:videoId" element={<VideoPlayer />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
