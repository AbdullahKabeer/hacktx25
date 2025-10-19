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

export const runtime = 'edge'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AgentDetailPage({ params }: PageProps) {
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
                <p className="text-sm text-muted-foreground">Agent Performance</p>
              </div>
            </div>
            <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-lg">{agent.name}</p>
                  <p className="text-sm text-muted-foreground">{agent.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">Joined: {new Date(agent.joined_date).toLocaleDateString()}</p>
                  <p className="text-sm">Risk Score: {agent.risk_score}</p>
                </div>
              </CardContent>
            </Card>
            <AgentVaultBreakdown
              safeBalance={agent.safe_balance}
              vaultedBalance={agent.vaulted_balance}
              debtBalance={agent.debt_balance}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Safe Balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${agent.safe_balance.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Vaulted Balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${agent.vaulted_balance.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalCommissions.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Active Debts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${agent.debt_balance.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>
            <AgentCommissionChart commissions={agentCommissions} />
          </div>
        </div>
      </div>
    </div>
  )
}
