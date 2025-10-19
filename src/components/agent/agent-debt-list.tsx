import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AgentDebtListProps {
  debts: any[]
}

export function AgentDebtList({ debts }: AgentDebtListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const calculateProgress = (original: number, remaining: number) => {
    return original > 0 ? ((original - remaining) / original) * 100 : 0
  }

  if (debts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Debts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No debts on record. Great job!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Debts</CardTitle>
        <p className="text-sm text-muted-foreground">Repayment progress and history</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {debts.map((debt) => {
          const progress = calculateProgress(Number(debt.original_amount), Number(debt.remaining_amount))
          const totalPaid = Number(debt.original_amount) - Number(debt.remaining_amount)

          return (
            <div key={debt.id} className="space-y-3 p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">
                    {debt.debt_type === "chargeback" ? "Chargeback" : "Advance"} -{" "}
                    {new Date(debt.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {debt.garnishment_percentage}% garnishment on future commissions
                  </p>
                </div>
                <Badge variant={debt.status === "active" ? "destructive" : "secondary"}>
                  {debt.status === "active" ? "Active" : "Paid Off"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Amount</span>
                  <span className="font-mono font-medium">{formatCurrency(Number(debt.original_amount))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid So Far</span>
                  <span className="font-mono font-medium text-success">{formatCurrency(totalPaid)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-mono font-medium text-destructive">
                    {formatCurrency(Number(debt.remaining_amount))}
                  </span>
                </div>
              </div>

              <Progress value={progress} className="h-2" />

              <p className="text-xs text-muted-foreground">{progress.toFixed(1)}% repaid</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
