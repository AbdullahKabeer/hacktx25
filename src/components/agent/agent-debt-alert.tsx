"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Calendar, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Debt {
  id: string
  agent_id: string
  type: string
  remaining_balance: number
  garnishment_percentage: number
  created_date: string
  policy_number?: string
}

interface Commission {
  id: string
  commission_date: string
  gross_amount: number
}

interface AgentDebtAlertProps {
  debts: Debt[]
  commissions: Commission[]
}

export function AgentDebtAlert({ debts, commissions }: AgentDebtAlertProps) {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.remaining_balance, 0)
  const avgGarnishment = debts.reduce((sum, debt) => sum + debt.garnishment_percentage, 0) / debts.length

  // Calculate next expected commission and payment
  const sortedCommissions = [...commissions].sort(
    (a, b) => new Date(b.commission_date).getTime() - new Date(a.commission_date).getTime(),
  )
  const avgCommission =
    sortedCommissions.slice(0, 3).reduce((sum, c) => sum + c.gross_amount, 0) / Math.min(3, sortedCommissions.length)

  const estimatedNextPayment = avgCommission * (avgGarnishment / 100)

  // Estimate next commission date (assume monthly)
  const lastCommissionDate = sortedCommissions[0] ? new Date(sortedCommissions[0].commission_date) : new Date()
  const nextCommissionDate = new Date(lastCommissionDate)
  nextCommissionDate.setMonth(nextCommissionDate.getMonth() + 1)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="border-destructive/50 bg-destructive/5 mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Active Debt Repayment
                <Badge variant="destructive">
                  {debts.length} debt{debts.length > 1 ? "s" : ""}
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your commissions are being garnished to repay outstanding debts
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Total Outstanding</span>
                </div>
                <p className="text-2xl font-bold text-destructive">{formatCurrency(totalDebt)}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Next Payment</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(estimatedNextPayment)}</p>
                <p className="text-xs text-muted-foreground">{avgGarnishment.toFixed(0)}% garnishment</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Expected Date</span>
                </div>
                <p className="text-2xl font-bold">
                  {nextCommissionDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
                <p className="text-xs text-muted-foreground">Est. next commission</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
