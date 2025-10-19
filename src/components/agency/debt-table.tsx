"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DebtTableProps {
  debts: any[]
}

export function DebtTable({ debts }: DebtTableProps) {
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
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No debts recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Original Amount</TableHead>
            <TableHead className="text-right">Remaining</TableHead>
            <TableHead className="text-right">Garnishment %</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debts.map((debt) => {
            const progress = calculateProgress(Number(debt.original_amount), Number(debt.remaining_amount))
            return (
              <TableRow key={debt.id}>
                <TableCell className="font-medium">{debt.agent?.profile?.full_name || "Unknown"}</TableCell>
                <TableCell>
                  <Badge variant={debt.debt_type === "chargeback" ? "destructive" : "secondary"}>
                    {debt.debt_type === "chargeback" ? "Chargeback" : "Advance"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(Number(debt.original_amount))}</TableCell>
                <TableCell className="text-right font-mono text-destructive">
                  {formatCurrency(Number(debt.remaining_amount))}
                </TableCell>
                <TableCell className="text-right">{debt.garnishment_percentage}%</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-12 text-right">{progress.toFixed(0)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={debt.status === "active" ? "default" : "secondary"}>
                    {debt.status === "active" ? "Active" : "Paid Off"}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
