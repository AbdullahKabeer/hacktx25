import { AgencyHeader } from "@/components/agency/agency-header"
import { DebtOverview } from "@/components/agency/debt-overview"
import { DebtTable } from "@/components/agency/debt-table"
import { CreateAdvanceDialog } from "@/components/agency/create-advance-dialog"
import debtsData from "@/data/debts.json"
import agentsData from "@/data/agents.json"

export default function DebtsPage() {
  // Calculate totals
  const totalActiveDebt = debtsData
    .filter((d) => d.status === "active")
    .reduce((sum, d) => sum + d.remaining_balance, 0)

  const totalChargebacks = debtsData
    .filter((d) => d.type === "chargeback")
    .reduce((sum, d) => sum + d.original_amount, 0)

  const totalAdvances = debtsData.filter((d) => d.type === "advance").reduce((sum, d) => sum + d.original_amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <AgencyHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Debt Management</h1>
            <p className="text-muted-foreground mt-1">Track chargebacks, advances, and garnishments</p>
          </div>
          <CreateAdvanceDialog agents={agentsData} />
        </div>

        <DebtOverview
          totalActiveDebt={totalActiveDebt}
          totalChargebacks={totalChargebacks}
          totalAdvances={totalAdvances}
        />

        <DebtTable debts={debtsData} />
      </main>
    </div>
  )
}
