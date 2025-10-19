import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Shield, AlertTriangle } from "lucide-react"

interface BalanceCardsProps {
  safeToSpend: number
  totalVaulted: number
  totalDebt: number
}

export function BalanceCards({ safeToSpend, totalVaulted, totalDebt }: BalanceCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-success/20 bg-success/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Safe to Spend</CardTitle>
          <DollarSign className="h-5 w-5 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success">{formatCurrency(safeToSpend)}</div>
          <p className="text-xs text-muted-foreground mt-2">Available for immediate use</p>
        </CardContent>
      </Card>

      <Card className="border-warning/20 bg-warning/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Vaulted</CardTitle>
          <Shield className="h-5 w-5 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-warning">{formatCurrency(totalVaulted)}</div>
          <p className="text-xs text-muted-foreground mt-2">Protected and vesting</p>
        </CardContent>
      </Card>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Outstanding Debt</CardTitle>
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-destructive">{formatCurrency(totalDebt)}</div>
          <p className="text-xs text-muted-foreground mt-2">Chargebacks & advances</p>
        </CardContent>
      </Card>
    </div>
  )
}
