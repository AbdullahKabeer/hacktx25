"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import type { Commission } from "@/lib/types"

interface RecentCommissionsProps {
  commissions: Commission[]
}

export function RecentCommissions({ commissions }: RecentCommissionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayCommissions = isExpanded ? commissions : commissions.slice(0, 3)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "vested":
        return <Badge variant="secondary">Fully Vested</Badge>
      case "charged_back":
        return <Badge variant="destructive">Charged Back</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (commissions.length === 0) {
    return (
      <Card className="flex flex-col h-[500px]">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Commissions</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No commission history yet.</p>
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
            <CardTitle>Recent Commissions</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Latest payment history</p>
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
                  <span>Show all</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-3">
          {displayCommissions.map((commission) => (
            <div
              key={commission.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{commission.product_type}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(commission.commission_date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-semibold">{formatCurrency(commission.gross_amount)}</p>
                {getStatusBadge(commission.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
