"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface AgentVaultBreakdownProps {
  safeBalance: number
  vaultedBalance: number
  debtBalance: number
}

export function AgentVaultBreakdown({ safeBalance, vaultedBalance, debtBalance }: AgentVaultBreakdownProps) {
  const total = safeBalance + vaultedBalance + debtBalance

  const COLORS = {
    safe: "#10b981", // emerald-500
    vaulted: "#f59e0b", // amber-500
    debt: "#ef4444", // red-500
  }

  const data = [
    { name: "Safe to Spend", value: safeBalance, color: COLORS.safe },
    { name: "Vaulted", value: vaultedBalance, color: COLORS.vaulted },
    { name: "Debt", value: debtBalance, color: COLORS.debt },
  ].filter((item) => item.value > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Breakdown</CardTitle>
        <CardDescription>Distribution of agent funds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="#1a1a1a"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-3 border-t pt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${item.value.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">({((item.value / total) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between text-sm font-semibold border-t pt-3">
            <span>Total Balance</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
