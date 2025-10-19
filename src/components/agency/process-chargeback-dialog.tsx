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
import { AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProcessChargebackDialogProps {
  commissions: any[]
}

export function ProcessChargebackDialog({ commissions }: ProcessChargebackDialogProps) {
  const [open, setOpen] = useState(false)
  const [commissionId, setCommissionId] = useState("")
  const [chargebackAmount, setChargebackAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chargebacks/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commission_id: commissionId,
          chargeback_amount: Number.parseFloat(chargebackAmount),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process chargeback")
      }

      setOpen(false)
      setCommissionId("")
      setChargebackAmount("")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process chargeback")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Process Chargeback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Process Chargeback</DialogTitle>
          <DialogDescription>Record a commission chargeback and create debt if necessary</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="commission">Commission</Label>
            <Select value={commissionId} onValueChange={setCommissionId} required>
              <SelectTrigger id="commission">
                <SelectValue placeholder="Select a commission" />
              </SelectTrigger>
              <SelectContent>
                {commissions.map((commission) => (
                  <SelectItem key={commission.id} value={commission.id}>
                    {commission.agent?.profile?.full_name || "Unknown"} - ${Number(commission.total_amount).toFixed(2)}{" "}
                    ({new Date(commission.commission_date).toLocaleDateString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chargeback-amount">Chargeback Amount</Label>
            <Input
              id="chargeback-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="1000.00"
              value={chargebackAmount}
              onChange={(e) => setChargebackAmount(e.target.value)}
              required
            />
          </div>

          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-sm text-muted-foreground">
              This will deduct the chargeback amount from the agent's vaulted balance. If insufficient funds are
              vaulted, a debt will be created with automatic garnishment.
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading ? "Processing..." : "Process Chargeback"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
