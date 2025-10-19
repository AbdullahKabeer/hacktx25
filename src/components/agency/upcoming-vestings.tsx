import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface UpcomingVestingsProps {
  vestings: any[]
}

export function UpcomingVestings({ vestings }: UpcomingVestingsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getDaysUntil = (date: string) => {
    const today = new Date()
    const vestingDate = new Date(date)
    const diffTime = vestingDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (vestings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Vestings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No upcoming vestings in the next 30 days.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Vestings (Next 30 Days)</CardTitle>
        <p className="text-sm text-muted-foreground">Scheduled vesting events</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vesting Date</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Days Until</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vestings.map((vesting) => {
              const daysUntil = getDaysUntil(vesting.vesting_date)
              return (
                <TableRow key={vesting.id}>
                  <TableCell>{new Date(vesting.vesting_date).toLocaleDateString()}</TableCell>
                  <TableCell>{vesting.commission?.agent?.profile?.full_name || "Unknown"}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(Number(vesting.vesting_amount))}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={daysUntil <= 0 ? "default" : "secondary"}>
                      {daysUntil <= 0 ? "Due today" : `${daysUntil} days`}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
