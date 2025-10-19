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
import { DollarSign } from "lucide-react"

interface Agent {
  id: string
  name: string
  email: string
}

interface CreateAdvanceDialogProps {
  agents: Agent[]
}

export function CreateAdvanceDialog({ agents }: CreateAdvanceDialogProps) {
  const [open, setOpen] = useState(false)
  const [agentId, setAgentId] = useState("")
  const [amount, setAmount] = useState("")
  const [garnishmentPercentage, setGarnishmentPercentage] = useState("25")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const selectedAgent = agents.find((a) => a.id === agentId)
    alert(`Advance of $${amount} created for ${selectedAgent?.name}! (Demo mode - not saved)`)
    setOpen(false)
    setAgentId("")
    setAmount("")
    setGarnishmentPercentage("25")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <DollarSign className="w-4 h-4 mr-2" />
          Create Advance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Agent Advance</DialogTitle>
          <DialogDescription>Issue a cash advance with automated repayment</DialogDescription>
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
                    {agent.name} ({agent.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Advance Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="1000.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="garnishment">Garnishment Percentage</Label>
            <Input
              id="garnishment"
              type="number"
              step="0.01"
              min="0"
              max="100"
              placeholder="25"
              value={garnishmentPercentage}
              onChange={(e) => setGarnishmentPercentage(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Percentage of future commissions to deduct</p>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Advance</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
