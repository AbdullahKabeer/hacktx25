import { AgentHeader } from "@/components/agent/agent-header"
import { AgentDebtOverview } from "@/components/agent/agent-debt-overview"
import { AgentDebtList } from "@/components/agent/agent-debt-list"
import agentsData from "@/data/agents.json"
import debtsData from "@/data/debts.json"

export default function AgentDebtsPage() {
  const demoAgent = agentsData[0]
  const agentDebts = debtsData.filter((d) => d.agent_id === demoAgent.id)

  const totalActiveDebt = agentDebts
    .filter((d) => d.status === "active")
    .reduce((sum, d) => sum + d.remaining_balance, 0)

  const totalPaidOff = agentDebts.filter((d) => d.status === "paid_off").reduce((sum, d) => sum + d.original_amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <AgentHeader agentName={demoAgent.name} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Debt Management</h1>
          <p className="text-muted-foreground mt-1">Track your outstanding debts and repayment progress</p>
        </div>

        <AgentDebtOverview totalActiveDebt={totalActiveDebt} totalPaidOff={totalPaidOff} />

        <AgentDebtList debts={agentDebts} />
      </main>
    </div>
  )
}
