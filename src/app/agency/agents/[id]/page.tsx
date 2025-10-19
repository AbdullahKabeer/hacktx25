import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Calendar, TrendingUp, DollarSign, Shield, AlertCircle } from "lucide-react"
import { EditAgentVaultDialog } from "@/components/agency/edit-agent-vault-dialog"
import { AgentCommissionChart } from "@/components/agency/agent-commission-chart"
import { AgentVaultBreakdown } from "@/components/agency/agent-vault-breakdown"
import agentsData from "@/data/agents.json"
import commissionsData from "@/data/commissions.json"
import debtsData from "@/data/debts.json"

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const agent = agentsData.find((a) => a.id === id)

  if (!agent) {
    notFound()
  }

  const agentCommissions = commissionsData.filter((c) => c.agent_id === agent.id)
  const agentDebts = debtsData.filter((d) => d.agent_id === agent.id && d.status !== "paid")

  const totalCommissions = agentCommissions.reduce((sum, c) => sum + c.gross_amount, 0)
  const totalVaulted = agentCommissions.reduce((sum, c) => sum + c.vaulted_amount, 0)
  const avgVaultPercentage = agentCommissions.length > 0 ? (totalVaulted / totalCommissions) * 100 : 50

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/agency">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{agent.name}</h1>
                <p className="text-sm text-muted-foreground">Agent Performance & Analytics</p>
              </div>
            </div>
            <Badge variant={agent.status === "active" ? "default" : "secondary"} className="capitalize">
              {agent.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Agent Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
                <CardDescription>Contact details and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-2 ring-primary/20">
                    <span className="text-2xl font-semibold">{agent.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.email}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium flex-1 text-right">{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="font-medium flex-1 text-right">
                      {new Date(agent.joined_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Risk Score:</span>
                    <Badge
                      variant={
                        agent.risk_score >= 70 ? "destructive" : agent.risk_score >= 40 ? "secondary" : "default"
                      }
                      className="ml-auto"
                    >
                      {agent.risk_score}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Vault Configuration</span>
                    <EditAgentVaultDialog agentName={agent.name} currentPercentage={50} />
                  </div>
                  <div className="space-y-2 bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Default Vault %</span>
                      <span className="font-semibold">50%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Actual %</span>
                      <span className="font-semibold">{avgVaultPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AgentVaultBreakdown
              safeBalance={agent.safe_balance}
              vaultedBalance={agent.vaulted_balance}
              debtBalance={agent.debt_balance}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-emerald-200 dark:border-emerald-900">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <DollarSign className="h-4 w-4" />
                    Safe Balance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${agent.safe_balance.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Available to withdraw</p>
                </CardContent>
              </Card>

              <Card className="border-amber-200 dark:border-amber-900">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <Shield className="h-4 w-4" />
                    Vaulted Balance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    ${agent.vaulted_balance.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Protected funds</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-900">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <TrendingUp className="h-4 w-4" />
                    Total Earned
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${totalCommissions.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Lifetime commissions</p>
                </CardContent>
              </Card>

              <Card className="border-rose-200 dark:border-rose-900">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                    <AlertCircle className="h-4 w-4" />
                    Active Debts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                    ${agent.debt_balance.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{agentDebts.length} active debt(s)</p>
                </CardContent>
              </Card>
            </div>

            <AgentCommissionChart commissions={agentCommissions} />

            {/* Recent Commissions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Commissions</CardTitle>
                <CardDescription>Latest commission payments for this agent</CardDescription>
              </CardHeader>
              <CardContent>
                {agentCommissions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No commissions yet</p>
                ) : (
                  <div className="space-y-3">
                    {agentCommissions.slice(0, 5).map((commission) => (
                      <div
                        key={commission.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 hover:bg-muted/50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{commission.product_type}</p>
                          <p className="text-sm text-muted-foreground">Policy: {commission.policy_number}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${commission.gross_amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(commission.commission_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Debts */}
            {agentDebts.length > 0 && (
              <Card className="border-rose-200 dark:border-rose-900">
                <CardHeader>
                  <CardTitle className="text-rose-700 dark:text-rose-400">Active Debts</CardTitle>
                  <CardDescription>Outstanding debts and chargebacks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agentDebts.map((debt) => (
                      <div
                        key={debt.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 hover:bg-muted/50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium capitalize">{debt.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {debt.policy_number || "No policy"} • {debt.garnishment_percentage}% garnishment
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-rose-600 dark:text-rose-400">
                            ${debt.remaining_balance.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">of ${debt.original_amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
