"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Agent } from "@/lib/types"

interface AgentTableProps {
  agents: Agent[]
}

export function AgentTable({ agents }: AgentTableProps) {
  const router = useRouter()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 70) return "destructive"
    if (score >= 40) return "secondary"
    return "default"
  }

  const getRiskLabel = (score: number) => {
    if (score >= 70) return "High Risk"
    if (score >= 40) return "Medium Risk"
    return "Low Risk"
  }

  if (agents.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No agents yet. Add your first agent to get started.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Safe to Spend</TableHead>
            <TableHead className="text-right">Total Vaulted</TableHead>
            <TableHead className="text-right">Debt Balance</TableHead>
            <TableHead className="text-right">Risk Score</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow
              key={agent.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => router.push(`/agency/agents/${agent.id}`)}
            >
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell className="text-muted-foreground">{agent.email}</TableCell>
              <TableCell className="text-right font-mono text-emerald-600">
                {formatCurrency(agent.safe_balance)}
              </TableCell>
              <TableCell className="text-right font-mono text-amber-600">
                {formatCurrency(agent.vaulted_balance)}
              </TableCell>
              <TableCell className="text-right font-mono text-rose-600">{formatCurrency(agent.debt_balance)}</TableCell>
              <TableCell className="text-right">
                <Badge variant={getRiskBadgeVariant(agent.risk_score)}>
                  {agent.risk_score} - {getRiskLabel(agent.risk_score)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/agency/agents/${agent.id}`)
                  }}
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
