"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function VestingProcessor() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ processed: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleProcess = async () => {
    setIsProcessing(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/vesting/process", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process vesting")
      }

      setResult({ processed: data.processed })
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process vesting")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Vesting</CardTitle>
        <CardDescription>Run the automated vesting processor to release funds to agents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button onClick={handleProcess} disabled={isProcessing}>
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Process Today's Vestings
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Successfully processed {result.processed} vesting(s)</span>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="rounded-lg border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            This will process all vesting schedules due today or earlier, transferring funds from vaulted to
            safe-to-spend balances for each agent.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
