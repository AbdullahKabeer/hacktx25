import { AgencyHeader } from "@/components/agency/agency-header"
import { UpcomingVestings } from "@/components/agency/upcoming-vestings"
import vestingData from "@/data/vesting-schedule.json"

export default function VestingPage() {
  // Filter for upcoming vestings (next 30 days)
  const today = new Date()
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

  const upcomingVestings = vestingData.filter((v) => {
    const vestingDate = new Date(v.vesting_date)
    return v.status === "pending" && vestingDate <= thirtyDaysFromNow
  })

  return (
    <div className="min-h-screen bg-background">
      <AgencyHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vesting Management</h1>
          <p className="text-muted-foreground mt-1">Monitor upcoming commission vesting schedules</p>
        </div>

        <UpcomingVestings vestings={upcomingVestings} />
      </main>
    </div>
  )
}
