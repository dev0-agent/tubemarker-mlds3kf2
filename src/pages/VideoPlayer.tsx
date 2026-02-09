import { useParams } from "react-router-dom"

export default function VideoPlayer() {
  const { videoId } = useParams()

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Video Player</h1>
      <p className="text-muted-foreground">Playing video: {videoId}</p>
    </div>
  )
}
