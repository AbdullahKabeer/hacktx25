import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface AgentDebtOverviewProps {
  totalActiveDebt: number
  totalPaidOff: number
}

export function AgentDebtOverview({ totalActiveDebt, totalPaidOff }: AgentDebtOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Debt</CardTitle>
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-destructive">{formatCurrency(totalActiveDebt)}</div>
          <p className="text-xs text-muted-foreground mt-2">Being repaid through garnishment</p>
        </CardContent>
      </Card>

      <Card className="border-success/20 bg-success/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Paid Off</CardTitle>
          <CheckCircle className="h-5 w-5 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success">{formatCurrency(totalPaidOff)}</div>
          <p className="text-xs text-muted-foreground mt-2">Successfully repaid</p>
        </CardContent>
      </Card>
    </div>
  )
}
