"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Settings2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EditAgentVaultDialogProps {
  agentName: string
  currentPercentage: number
}

export function EditAgentVaultDialog({ agentName, currentPercentage }: EditAgentVaultDialogProps) {
  const [open, setOpen] = useState(false)
  const [percentage, setPercentage] = useState(currentPercentage)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Vault Percentage Updated",
      description: `${agentName}'s vault percentage has been set to ${percentage}%.`,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Vault Percentage</DialogTitle>
            <DialogDescription>
              Adjust the vault percentage for {agentName}. This will apply to all future commissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label>Vault Percentage</Label>
                <span className="text-2xl font-semibold tabular-nums">{percentage}%</span>
              </div>
              <Slider
                value={[percentage]}
                onValueChange={(value) => setPercentage(value[0])}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Safe to Spend</span>
                  <span className="font-medium text-success">{100 - percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vaulted</span>
                  <span className="font-medium text-warning">{percentage}%</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
