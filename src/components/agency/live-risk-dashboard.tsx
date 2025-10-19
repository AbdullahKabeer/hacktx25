"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Brain,
  Radar,
  Zap
} from "lucide-react"

interface RiskMetric {
  id: string
  name: string
  value: number
  trend: "up" | "down" | "stable"
  severity: "low" | "medium" | "high"
  description: string
}

export function LiveRiskDashboard() {
  const [metrics, setMetrics] = useState<RiskMetric[]>([
    {
      id: "chargeback",
      name: "Chargeback Risk",
      value: 15,
      trend: "down",
      severity: "low",
      description: "Overall chargeback probability across portfolio"
    },
    {
      id: "concentration",
      name: "Portfolio Concentration",
      value: 35,
      trend: "stable",
      severity: "medium",
      description: "Risk concentration in specific product lines"
    },
    {
      id: "liquidity",
      name: "Liquidity Risk",
      value: 8,
      trend: "down",
      severity: "low",
      description: "Cash flow and available funds risk"
    },
    {
      id: "agent",
      name: "Agent Risk Score",
      value: 22,
      trend: "up",
      severity: "medium",
      description: "Individual agent performance risk factors"
    }
  ])

  const [overallScore, setOverallScore] = useState(78)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [pulseActive, setPulseActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        // Simulate realistic risk fluctuations
        const change = (Math.random() - 0.5) * 4
        const newValue = Math.max(0, Math.min(100, metric.value + change))
        
        let newTrend: "up" | "down" | "stable" = "stable"
        if (change > 1) newTrend = "up"
        else if (change < -1) newTrend = "down"
        
        let newSeverity: "low" | "medium" | "high" = "low"
        if (newValue > 60) newSeverity = "high"
        else if (newValue > 30) newSeverity = "medium"

        return {
          ...metric,
          value: newValue,
          trend: newTrend,
          severity: newSeverity
        }
      }))

      // Update overall score
      setOverallScore(prev => {
        const change = (Math.random() - 0.5) * 3
        return Math.max(50, Math.min(95, prev + change))
      })

      // Trigger pulse animation occasionally
      if (Math.random() > 0.7) {
        setPulseActive(true)
        setTimeout(() => setPulseActive(false), 2000)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      // Slightly improve scores after "analysis"
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value - Math.random() * 5),
        severity: metric.value < 20 ? "low" : metric.value < 40 ? "medium" : "high"
      })))
      setOverallScore(prev => Math.min(95, prev + Math.random() * 8))
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-green-500 bg-green-500/10 border-green-500/20"
      case "medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "high": return "text-red-500 bg-red-500/10 border-red-500/20"
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-red-500" />
      case "down": return <TrendingDown className="h-3 w-3 text-green-500" />
      default: return <Activity className="h-3 w-3 text-blue-500" />
    }
  }

  const overallSeverity = overallScore > 80 ? "low" : overallScore > 60 ? "medium" : "high"

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              AI Risk Assessment Engine
            </CardTitle>
            <CardDescription>Real-time portfolio risk monitoring with ML predictions</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${getSeverityColor(overallSeverity)} ${pulseActive ? 'animate-pulse' : ''}`}>
              <Radar className="h-3 w-3 mr-1" />
              {overallSeverity.toUpperCase()} RISK
            </Badge>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{overallScore.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">Risk Score</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Risk Gauge */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Portfolio Health Score</span>
            <span className="text-sm font-mono">{overallScore.toFixed(1)}/100</span>
          </div>
          <Progress 
            value={overallScore} 
            className="h-3"
            indicatorClassName={`transition-all duration-1000 ${
              overallScore > 80 ? 'bg-green-500' : 
              overallScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>High Risk</span>
            <span>Optimal</span>
          </div>
        </div>

        {/* Risk Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {metrics.map((metric) => (
            <div key={metric.id} className="relative group">
              <div className="p-4 border rounded-lg bg-card/50 hover:bg-card transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-sm">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getSeverityColor(metric.severity)}`}
                    >
                      {metric.value.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                
                <Progress 
                  value={metric.value} 
                  className="h-2 mb-2"
                  indicatorClassName={
                    metric.severity === "high" ? "bg-red-500" :
                    metric.severity === "medium" ? "bg-yellow-500" : "bg-green-500"
                  }
                />
                
                <p className="text-xs text-muted-foreground">{metric.description}</p>

                {/* Hover overlay with trend analysis */}
                <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* AI Analysis Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full bg-purple-500/20 ${isAnalyzing ? 'animate-spin' : ''}`}>
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <span className="font-semibold text-sm">AI Insights</span>
            </div>
            <button 
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full hover:bg-purple-500/30 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            {isAnalyzing ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-300">
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-ping" />
                  Processing risk patterns across 10,000+ data points...
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-ping animation-delay-200" />
                  Analyzing market correlations and agent behavior...
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-ping animation-delay-400" />
                  Generating predictive risk recommendations...
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Portfolio shows strong risk distribution. Consider increasing vault rates for agents with &gt;15% chargeback risk.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Positive trend detected: Overall risk decreased by 12% in the last 30 days.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}