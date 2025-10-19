"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { VaultRule } from "@/lib/types"

interface VaultRulesTableProps {
  vaultRules: VaultRule[]
}

export function VaultRulesTable({ vaultRules }: VaultRulesTableProps) {
  if (vaultRules.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No vault rules yet. Create your first rule to get started.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rule Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Vault %</TableHead>
            <TableHead className="text-right">Vesting Period</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaultRules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">{rule.rule_name}</TableCell>
              <TableCell className="text-muted-foreground">{rule.description || "No description"}</TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary">{rule.vault_percentage}%</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="outline">{rule.vesting_months} months</Badge>
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {new Date(rule.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
