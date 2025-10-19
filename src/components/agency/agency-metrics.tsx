import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Shield, Users, AlertTriangle } from "lucide-react"

interface AgencyMetricsProps {
  totalVaulted: number
  totalSafeToSpend: number
  totalDebt: number
  agentCount: number
}

export function AgencyMetrics({ totalVaulted, totalSafeToSpend, totalDebt, agentCount }: AgencyMetricsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Vaulted</CardTitle>
          <Shield className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalVaulted)}</div>
          <p className="text-xs text-muted-foreground mt-1">Protected liability</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Safe to Spend</CardTitle>
          <DollarSign className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalSafeToSpend)}</div>
          <p className="text-xs text-muted-foreground mt-1">Available funds</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalDebt)}</div>
          <p className="text-xs text-muted-foreground mt-1">Outstanding balances</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agentCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Total agents</p>
        </CardContent>
      </Card>
    </div>
  )
}
