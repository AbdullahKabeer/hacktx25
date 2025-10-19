"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Agent, VaultRule } from "@/lib/types"

interface LogCommissionDialogProps {
  agents: Agent[]
  vaultRules: VaultRule[]
}

export function LogCommissionDialog({ agents, vaultRules }: LogCommissionDialogProps) {
  const [open, setOpen] = useState(false)
  const [agentId, setAgentId] = useState("")
  const [amount, setAmount] = useState("")
  const [vaultRuleId, setVaultRuleId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/commissions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
          vault_rule_id: vaultRuleId,
          total_amount: Number.parseFloat(amount),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create commission")
      }

      setOpen(false)
      setAgentId("")
      setAmount("")
      setVaultRuleId("")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log commission")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Log Commission
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log New Commission</DialogTitle>
          <DialogDescription>Record a commission payment and apply vault rules</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agent">Agent</Label>
            <Select value={agentId} onValueChange={setAgentId} required>
              <SelectTrigger id="agent">
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.profile?.full_name || "Unknown"} ({agent.profile?.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Commission Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="5000.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vault-rule">Vault Rule</Label>
            <Select value={vaultRuleId} onValueChange={setVaultRuleId} required>
              <SelectTrigger id="vault-rule">
                <SelectValue placeholder="Select a vault rule" />
              </SelectTrigger>
              <SelectContent>
                {vaultRules.map((rule) => (
                  <SelectItem key={rule.id} value={rule.id}>
                    {rule.rule_name} ({rule.vault_percentage}% / {rule.vesting_months}mo)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {vaultRuleId && amount && (
            <div className="rounded-lg border border-border bg-muted p-4 space-y-2">
              <p className="text-sm font-medium">Commission Split Preview</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Safe to Spend:</span>
                <span className="font-mono text-success">
                  $
                  {(
                    (Number.parseFloat(amount) *
                      (100 - Number(vaultRules.find((r) => r.id === vaultRuleId)?.vault_percentage || 0))) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vaulted:</span>
                <span className="font-mono text-warning">
                  $
                  {(
                    (Number.parseFloat(amount) *
                      Number(vaultRules.find((r) => r.id === vaultRuleId)?.vault_percentage || 0)) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging..." : "Log Commission"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
