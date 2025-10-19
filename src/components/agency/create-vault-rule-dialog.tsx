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
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function CreateVaultRuleDialog() {
  const [open, setOpen] = useState(false)
  const [ruleName, setRuleName] = useState("")
  const [description, setDescription] = useState("")
  const [vaultPercentage, setVaultPercentage] = useState("")
  const [vestingMonths, setVestingMonths] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Vault rule "${ruleName}" created successfully! (Demo mode - not saved)`)
    setOpen(false)
    setRuleName("")
    setDescription("")
    setVaultPercentage("")
    setVestingMonths("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Vault Rule</DialogTitle>
          <DialogDescription>Define commission splitting and vesting parameters</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder="e.g., Standard Life Policy"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe when to use this rule..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vault-percentage">Vault Percentage</Label>
              <Input
                id="vault-percentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="25"
                value={vaultPercentage}
                onChange={(e) => setVaultPercentage(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">0-100%</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vesting-months">Vesting Period</Label>
              <Input
                id="vesting-months"
                type="number"
                min="1"
                placeholder="12"
                value={vestingMonths}
                onChange={(e) => setVestingMonths(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Months</p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Rule</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
