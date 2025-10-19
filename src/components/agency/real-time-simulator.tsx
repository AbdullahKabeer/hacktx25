"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Users, 
  PlayCircle, 
  PauseCircle,
  RotateCcw,
  Sparkles 
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SimulationMetrics {
  totalCommissions: number
  totalVaulted: number
  totalSafe: number
  agentsProcessed: number
  chargebacks: number
  vestingReleases: number
}

export function RealTimeSimulator() {
  const [isRunning, setIsRunning] = useState(false)
  const [metrics, setMetrics] = useState<SimulationMetrics>({
    totalCommissions: 2450000,
    totalVaulted: 735000,
    totalSafe: 1715000,
    agentsProcessed: 24,
    chargebacks: 3,
    vestingReleases: 12
  })
  const [animationStep, setAnimationStep] = useState(0)
  const { toast } = useToast()

  const agentNames = ["Sarah Chen", "Marcus Johnson", "Lisa Rodriguez", "David Kim", "Emma Wilson", "James Parker"]
  const [currentAgent, setCurrentAgent] = useState(0)
  const [processingEvents, setProcessingEvents] = useState<string[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning) {
      interval = setInterval(() => {
        const eventType = Math.random()
        const agent = agentNames[Math.floor(Math.random() * agentNames.length)]
        
        if (eventType < 0.6) {
          // Commission event
          const commission = Math.floor(Math.random() * 15000) + 5000
          const vaulted = Math.floor(commission * 0.3)
          const safe = commission - vaulted
          
          setMetrics(prev => ({
            ...prev,
            totalCommissions: prev.totalCommissions + commission,
            totalVaulted: prev.totalVaulted + vaulted,
            totalSafe: prev.totalSafe + safe,
            agentsProcessed: prev.agentsProcessed + 1
          }))
          
          setProcessingEvents(prev => [
            `💰 ${agent} earned $${commission.toLocaleString()} commission`,
            ...prev.slice(0, 4)
          ])
          
          toast({
            title: "Commission Processed",
            description: `${agent} - $${commission.toLocaleString()} (${((vaulted/commission)*100).toFixed(0)}% vaulted)`,
            variant: "default"
          })
        } else if (eventType < 0.8) {
          // Vesting release
          const release = Math.floor(Math.random() * 8000) + 2000
          
          setMetrics(prev => ({
            ...prev,
            totalVaulted: Math.max(0, prev.totalVaulted - release),
            totalSafe: prev.totalSafe + release,
            vestingReleases: prev.vestingReleases + 1
          }))
          
          setProcessingEvents(prev => [
            `🔓 ${agent} - $${release.toLocaleString()} vested funds released`,
            ...prev.slice(0, 4)
          ])
        } else {
          // Chargeback event
          const chargeback = Math.floor(Math.random() * 5000) + 1000
          
          setMetrics(prev => ({
            ...prev,
            totalVaulted: Math.max(0, prev.totalVaulted - chargeback),
            chargebacks: prev.chargebacks + 1
          }))
          
          setProcessingEvents(prev => [
            `⚠️ Chargeback covered: $${chargeback.toLocaleString()} (vault protected)`,
            ...prev.slice(0, 4)
          ])
          
          toast({
            title: "Chargeback Protected",
            description: `$${chargeback.toLocaleString()} covered by vault system`,
            variant: "destructive"
          })
        }
        
        setAnimationStep(prev => (prev + 1) % 100)
        setCurrentAgent(prev => (prev + 1) % agentNames.length)
      }, 2000)
    }
    
    return () => clearInterval(interval)
  }, [isRunning, toast])

  const resetSimulation = () => {
    setMetrics({
      totalCommissions: 2450000,
      totalVaulted: 735000,
      totalSafe: 1715000,
      agentsProcessed: 24,
      chargebacks: 3,
      vestingReleases: 12
    })
    setProcessingEvents([])
    setAnimationStep(0)
  }

  const vaultPercentage = (metrics.totalVaulted / metrics.totalCommissions) * 100

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Live Commission Engine
            </CardTitle>
            <CardDescription>Real-time commission processing simulation</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "destructive" : "default"}
              size="sm"
            >
              {isRunning ? (
                <>
                  <PauseCircle className="h-4 w-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Start
                </>
              )}
            </Button>
            <Button onClick={resetSimulation} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Animated Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Processing Agent: {agentNames[currentAgent]}</span>
            <Badge variant={isRunning ? "default" : "secondary"}>
              {isRunning ? "ACTIVE" : "PAUSED"}
            </Badge>
          </div>
          <Progress 
            value={isRunning ? (animationStep % 20) * 5 : 0} 
            className="h-2"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
          />
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              Total Commissions
            </div>
            <div className="text-lg font-bold text-green-600">
              ${metrics.totalCommissions.toLocaleString()}
            </div>
          </div>
          
          <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Vaulted ({vaultPercentage.toFixed(1)}%)
            </div>
            <div className="text-lg font-bold text-blue-600">
              ${metrics.totalVaulted.toLocaleString()}
            </div>
          </div>
          
          <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              Agents Processed
            </div>
            <div className="text-lg font-bold text-purple-600">
              {metrics.agentsProcessed}
            </div>
          </div>
          
          <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              Protected Events
            </div>
            <div className="text-lg font-bold text-orange-600">
              {metrics.chargebacks}
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            Live Activity Feed
          </h4>
          <div className="bg-black/5 border rounded-lg p-3 h-32 overflow-y-auto">
            {processingEvents.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6">
                Click "Start" to begin real-time processing...
              </div>
            ) : (
              <div className="space-y-1">
                {processingEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className={`text-xs font-mono transition-all duration-300 ${
                      index === 0 ? 'text-primary font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}