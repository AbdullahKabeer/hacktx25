"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, DollarSign, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Agent {
  id: string
  name: string
  book_of_business: number
  chargeback_percentage: number
  retention_rate: number
  vault_percentage: number
  safe_balance: number
  vaulted_balance: number
  debt_balance: number
}

interface AgentBookOfBusinessProps {
  agent: Agent
}

export function AgentBookOfBusiness({ agent }: AgentBookOfBusinessProps) {
  const totalBalance = agent.safe_balance + agent.vaulted_balance
  const drawdownPercentage = agent.debt_balance > 0 ? (agent.debt_balance / agent.book_of_business) * 100 : 0
  const isHighRisk = drawdownPercentage > 100 - agent.retention_rate

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book of Business Metrics</CardTitle>
        <CardDescription>Your portfolio health and risk indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Book Value</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(agent.book_of_business)}</p>
            <p className="text-xs text-muted-foreground">Total portfolio value</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Retention Rate</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{agent.retention_rate}%</p>
            <p className="text-xs text-muted-foreground">Policy retention</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4" />
              <span>Chargeback Rate</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{agent.chargeback_percentage}%</p>
            <p className="text-xs text-muted-foreground">Historical chargebacks</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Vault Rate</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{agent.vault_percentage}%</p>
            <p className="text-xs text-muted-foreground">Commission protection</p>
          </div>
        </div>

        {/* Risk Indicator */}
        <div className="space-y-3 rounded-lg border p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className={`h-5 w-5 ${isHighRisk ? "text-destructive" : "text-green-600"}`} />
              <span className="font-semibold">Risk Assessment</span>
            </div>
            <span className={`text-sm font-medium ${isHighRisk ? "text-destructive" : "text-green-600"}`}>
              {isHighRisk ? "High Risk" : "Low Risk"}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Drawdown vs Book Value</span>
              <span className="font-mono font-medium">{drawdownPercentage.toFixed(1)}%</span>
            </div>
            <Progress
              value={drawdownPercentage}
              className="h-2"
              indicatorClassName={isHighRisk ? "bg-destructive" : "bg-green-600"}
            />
            <p className="text-xs text-muted-foreground">
              {isHighRisk
                ? `⚠️ Drawdown exceeds safe threshold (${(100 - agent.retention_rate).toFixed(0)}%). Increased vault protection recommended.`
                : `✓ Drawdown is within safe limits. Your book of business is healthy.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
