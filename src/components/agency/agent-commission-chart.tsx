"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface Commission {
  id: string
  commission_date: string
  gross_amount: number
  safe_amount: number
  vaulted_amount: number
}

interface AgentCommissionChartProps {
  commissions: Commission[]
}

export function AgentCommissionChart({ commissions }: AgentCommissionChartProps) {
  // Sort commissions by date and prepare chart data
  const chartData = commissions
    .sort((a, b) => new Date(a.commission_date).getTime() - new Date(b.commission_date).getTime())
    .map((commission) => ({
      date: new Date(commission.commission_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      total: commission.gross_amount,
      safe: commission.safe_amount,
      vaulted: commission.vaulted_amount,
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Trends</CardTitle>
        <CardDescription>Commission earnings over time with vault breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="white" fontSize={12} tickLine={false} />
              <YAxis
                stroke="white"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} iconType="line" />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(221, 83%, 53%)"
                strokeWidth={2.5}
                name="Total"
                dot={{ fill: "hsl(221, 83%, 53%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="safe"
                stroke="hsl(142, 76%, 36%)"
                strokeWidth={2.5}
                name="Safe"
                dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="vaulted"
                stroke="hsl(43, 96%, 56%)"
                strokeWidth={2.5}
                name="Vaulted"
                dot={{ fill: "hsl(43, 96%, 56%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
