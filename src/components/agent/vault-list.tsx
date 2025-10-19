"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import type { Commission as CommissionType } from "@/lib/types"

interface Vesting {
  id: string
  commission_id: string
  agent_id: string
  agent_name: string
  amount: number
  vesting_date: string
  status: string
  policy_number: string
}

interface VaultListProps {
  commissions: CommissionType[]
  vestings: Vesting[]
}

export function VaultList({ commissions, vestings }: VaultListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const calculateProgress = (commission: CommissionType) => {
    const commissionVestings = vestings.filter((v) => v.commission_id === commission.id)
    const completedVestings = commissionVestings.filter((v) => v.status === "completed")
    const totalVested = completedVestings.reduce((sum, v) => sum + v.amount, 0)
    return commission.vaulted_amount > 0 ? (totalVested / commission.vaulted_amount) * 100 : 0
  }

  const getNextVestingDate = (commissionId: string) => {
    const upcoming = vestings
      .filter((v) => v.commission_id === commissionId && v.status === "pending")
      .sort((a, b) => new Date(a.vesting_date).getTime() - new Date(b.vesting_date).getTime())
    return upcoming[0]?.vesting_date
  }

  const getRemainingVaulted = (commission: CommissionType) => {
    const commissionVestings = vestings.filter((v) => v.commission_id === commission.id)
    const completedVestings = commissionVestings.filter((v) => v.status === "completed")
    const totalVested = completedVestings.reduce((sum, v) => sum + v.amount, 0)
    return commission.vaulted_amount - totalVested
  }

  const [isExpanded, setIsExpanded] = useState(false)
  const displayCommissions = isExpanded ? commissions : commissions.slice(0, 3)

  if (commissions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Commission Vaults</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No active commission vaults yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your vaulted commissions will appear here as they vest over time.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vesting Schedule</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Track your commission releases</p>
          </div>
          {commissions.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Show all ({commissions.length})</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {displayCommissions.map((commission) => {
          const progress = calculateProgress(commission)
          const nextVesting = getNextVestingDate(commission.id)
          const remainingVaulted = getRemainingVaulted(commission)
          const vestedAmount = commission.vaulted_amount - remainingVaulted

          return (
            <div
              key={commission.id}
              className="space-y-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">
                    {commission.product_type} - {commission.policy_number}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Commission from {new Date(commission.commission_date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="secondary">{progress.toFixed(0)}% Vested</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining Vaulted</span>
                  <span className="font-mono font-medium text-yellow-600">{formatCurrency(remainingVaulted)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Already Vested</span>
                  <span className="font-mono font-medium text-green-600">{formatCurrency(vestedAmount)}</span>
                </div>
              </div>

              <Progress value={progress} className="h-2" />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Started: {new Date(commission.commission_date).toLocaleDateString()}</span>
                {nextVesting && <span>Next vesting: {new Date(nextVesting).toLocaleDateString()}</span>}
                <span>Completes: {new Date(commission.vesting_complete_date).toLocaleDateString()}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
