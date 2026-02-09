import { AddVideoDialog } from "@/components/AddVideoDialog"

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <AddVideoDialog />
      </div>
      <p className="text-muted-foreground">Welcome to TubeMarker. Your saved videos will appear here.</p>
    </div>
  )
}
