"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface Agent {
  id: string
  name: string
  book_of_business: number
  chargeback_percentage: number
  retention_rate: number
  risk_score: number
}

interface AgencyPerformanceChartProps {
  agents: Agent[]
}

export function AgencyPerformanceChart({ agents }: AgencyPerformanceChartProps) {
  const chartData = agents.map((agent) => ({
    name: agent.name.split(" ")[0],
    book: agent.book_of_business / 1000,
    retention: agent.retention_rate,
    chargeback: agent.chargeback_percentage,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Performance</CardTitle>
        <CardDescription>Book of business and retention rates by agent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="white" fontSize={12} />
              <YAxis stroke="white" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "Book of Business") return `$${value.toFixed(0)}k`
                  return `${value.toFixed(1)}%`
                }}
              />
              <Legend />
              <Bar dataKey="book" fill="hsl(221, 83%, 53%)" name="Book of Business ($k)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="retention" fill="hsl(142, 76%, 36%)" name="Retention Rate (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
