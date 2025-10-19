"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface Commission {
  id: string
  agent_id: string
  commission_date: string
  gross_amount: number
  safe_amount: number
  vaulted_amount: number
}

interface AgencyCommissionTrendsProps {
  commissions: Commission[]
}

export function AgencyCommissionTrends({ commissions }: AgencyCommissionTrendsProps) {
  // Group commissions by month
  const monthlyData = commissions.reduce((acc: any, commission) => {
    const date = new Date(commission.commission_date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        total: 0,
        safe: 0,
        vaulted: 0,
      }
    }

    acc[monthKey].total += commission.gross_amount
    acc[monthKey].safe += commission.safe_amount
    acc[monthKey].vaulted += commission.vaulted_amount

    return acc
  }, {})

  const chartData = Object.values(monthlyData).sort((a: any, b: any) => a.month.localeCompare(b.month))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Trends</CardTitle>
        <CardDescription>Monthly commission breakdown across all agents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="white"
                fontSize={12}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-")
                  return `${month}/${year.slice(2)}`
                }}
              />
              <YAxis
                stroke="white"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(221, 83%, 53%)"
                strokeWidth={2}
                name="Total"
                dot={{ fill: "hsl(221, 83%, 53%)", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="safe"
                stroke="hsl(142, 76%, 36%)"
                strokeWidth={2}
                name="Safe"
                dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="vaulted"
                stroke="hsl(43, 96%, 56%)"
                strokeWidth={2}
                name="Vaulted"
                dot={{ fill: "hsl(43, 96%, 56%)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
