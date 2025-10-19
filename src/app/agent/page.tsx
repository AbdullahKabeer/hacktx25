import { AgentHeader } from "@/components/agent/agent-header"
import { BalanceCards } from "@/components/agent/balance-cards"
import { VaultList } from "@/components/agent/vault-list"
import { RecentCommissions } from "@/components/agent/recent-commissions"
import { AgentCommissionChart } from "@/components/agency/agent-commission-chart"
import { AgentVaultBreakdown } from "@/components/agency/agent-vault-breakdown"
import { AgentBookOfBusiness } from "@/components/agent/agent-book-of-business"
import { AgentDebtAlert } from "@/components/agent/agent-debt-alert"
import { InteractiveVaultVisualizer } from "@/components/agent/interactive-vault-visualizer"
import agentsData from "@/data/agents.json"
import commissionsData from "@/data/commissions.json"
import vestingData from "@/data/vesting-schedule.json"
import debtsData from "@/data/debts.json"

export default async function AgentPage() {
  const demoAgent = agentsData[0]
  const demoAgentCommissions = commissionsData.filter((c) => c.agent_id === demoAgent.id)
  const demoAgentVestings = vestingData.filter((v) => v.agent_id === demoAgent.id)
  const demoAgentDebts = debtsData.filter((d) => d.agent_id === demoAgent.id && d.status === "active")

  return (
    <div className="min-h-screen bg-background">
      <AgentHeader agentName={demoAgent.name} />
      <main className="container max-w-[1600px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Agent Shield</h1>
          <p className="text-muted-foreground mt-1">Your protected commission dashboard</p>
        </div>

        {demoAgentDebts.length > 0 && <AgentDebtAlert debts={demoAgentDebts as any} commissions={demoAgentCommissions as any} />}

        <BalanceCards
          safeToSpend={demoAgent.safe_balance}
          totalVaulted={demoAgent.vaulted_balance}
          totalDebt={demoAgent.debt_balance}
        />

        {/* Interactive Vault Visualizer */}
        <div className="mt-12">
          <InteractiveVaultVisualizer 
            initialSafe={demoAgent.safe_balance} 
            initialVaulted={demoAgent.vaulted_balance} 
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_420px] mt-8">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <AgentCommissionChart commissions={demoAgentCommissions as any} />
              <AgentVaultBreakdown
                safeBalance={demoAgent.safe_balance}
                vaultedBalance={demoAgent.vaulted_balance}
                debtBalance={demoAgent.debt_balance}
              />
            </div>

            <AgentBookOfBusiness agent={demoAgent as any} />
          </div>

          <div className="lg:sticky lg:top-6 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <VaultList commissions={demoAgentCommissions as any} vestings={demoAgentVestings as any} />
            <RecentCommissions commissions={demoAgentCommissions.slice(0, 5) as any} />
          </div>
        </div>
      </main>
    </div>
  )
}
