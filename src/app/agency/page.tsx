import { AgencyHeader } from "@/components/agency/agency-header"
import { AgencyMetrics } from "@/components/agency/agency-metrics"
import { AgentTable } from "@/components/agency/agent-table"
import { AgencyCommissionTrends } from "@/components/agency/agency-commission-trends"
import { AgencyPerformanceChart } from "@/components/agency/agency-performance-chart"
import { RealTimeSimulator } from "@/components/agency/real-time-simulator"
import { LiveRiskDashboard } from "@/components/agency/live-risk-dashboard"
import agentsData from "@/data/agents.json"
import commissionsData from "@/data/commissions.json"

export default function AgencyPage() {
  const agents = agentsData

  // Calculate total agency metrics
  const totalVaulted = agents.reduce((sum, agent) => sum + agent.vaulted_balance, 0)
  const totalSafeToSpend = agents.reduce((sum, agent) => sum + agent.safe_balance, 0)
  const totalDebt = agents.reduce((sum, agent) => sum + agent.debt_balance, 0)
  const agentCount = agents.length

  return (
    <div className="min-h-screen bg-background">
      <AgencyHeader />
      <main className="container max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agency Command Center</h1>
            <p className="text-muted-foreground mt-1">Manage your agents and commission payouts</p>
          </div>
        </div>

        <AgencyMetrics
          totalVaulted={totalVaulted}
          totalSafeToSpend={totalSafeToSpend}
          totalDebt={totalDebt}
          agentCount={agentCount}
        />

        {/* Interactive Features */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RealTimeSimulator />
          <LiveRiskDashboard />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AgencyCommissionTrends commissions={commissionsData} />
          <AgencyPerformanceChart agents={agents} />
        </div>

        <AgentTable agents={agents as any} />
      </main>
    </div>
  )
}
