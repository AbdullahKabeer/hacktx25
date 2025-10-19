"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Zap,
  RefreshCw,
  Calculator
} from "lucide-react"

interface VaultScenario {
  vaultPercentage: number
  monthlyCommission: number
  safeAmount: number
  vaultedAmount: number
  riskCoverage: number
  chargebackProtection: number
}

export function InteractiveVaultVisualizer({ 
  initialSafe, 
  initialVaulted 
}: { 
  initialSafe: number
  initialVaulted: number 
}) {
  const [scenario, setScenario] = useState<VaultScenario>({
    vaultPercentage: 30,
    monthlyCommission: 25000,
    safeAmount: initialSafe,
    vaultedAmount: initialVaulted,
    riskCoverage: 85,
    chargebackProtection: 12
  })
  
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)

  const calculateScenario = (vaultPercent: number, commission: number) => {
    const vaulted = Math.floor(commission * (vaultPercent / 100))
    const safe = commission - vaulted
    const coverage = Math.min(95, 65 + (vaultPercent * 0.8))
    const protection = Math.floor(vaultPercent * 0.4)
    
    return {
      vaultPercentage: vaultPercent,
      monthlyCommission: commission,
      safeAmount: safe,
      vaultedAmount: vaulted,
      riskCoverage: coverage,
      chargebackProtection: protection
    }
  }

  const runAnimation = () => {
    setIsAnimating(true)
    setAnimationProgress(0)
    
    const interval = setInterval(() => {
      setAnimationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnimating(false)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const handleVaultChange = (value: number[]) => {
    const newScenario = calculateScenario(value[0], scenario.monthlyCommission)
    setScenario(newScenario)
  }

  const handleCommissionChange = (value: number[]) => {
    const newScenario = calculateScenario(scenario.vaultPercentage, value[0])
    setScenario(newScenario)
  }

  const riskLevel = scenario.vaultPercentage < 20 ? 'high' : scenario.vaultPercentage < 40 ? 'medium' : 'low'
  const riskColor = {
    high: 'text-red-500 bg-red-500/10',
    medium: 'text-yellow-500 bg-yellow-500/10', 
    low: 'text-green-500 bg-green-500/10'
  }[riskLevel]

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              Vault Strategy Optimizer
            </CardTitle>
            <CardDescription>Interactive commission protection calculator</CardDescription>
          </div>
          <Button onClick={runAnimation} disabled={isAnimating} size="sm" variant="outline">
            <RefreshCw className={`h-4 w-4 mr-1 ${isAnimating ? 'animate-spin' : ''}`} />
            Simulate
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Interactive Controls */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Vault Percentage</label>
              <Badge variant="outline">{scenario.vaultPercentage}%</Badge>
            </div>
            <Slider
              value={[scenario.vaultPercentage]}
              onValueChange={handleVaultChange}
              max={60}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservative (10%)</span>
              <span>Aggressive (60%)</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Monthly Commission</label>
              <Badge variant="outline">${(scenario.monthlyCommission / 1000).toFixed(0)}K</Badge>
            </div>
            <Slider
              value={[scenario.monthlyCommission]}
              onValueChange={handleCommissionChange}
              max={50000}
              min={10000}
              step={2500}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$10K</span>
              <span>$50K</span>
            </div>
          </div>
        </div>

        {/* Animated Visualization */}
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Safe Amount */}
            <div className="relative">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                  <Shield className="h-4 w-4" />
                  Immediate Safe
                </div>
                <div className="text-2xl font-bold text-green-700">
                  ${scenario.safeAmount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Available instantly
                </div>
              </div>
              {isAnimating && (
                <div 
                  className="absolute inset-0 bg-green-500/20 rounded animate-pulse"
                  style={{ 
                    opacity: Math.sin((animationProgress * Math.PI) / 50) * 0.3 + 0.2 
                  }}
                />
              )}
            </div>

            {/* Vaulted Amount */}
            <div className="relative">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <Target className="h-4 w-4" />
                  Protected Vault
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  ${scenario.vaultedAmount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Vesting over time
                </div>
              </div>
              {isAnimating && (
                <div 
                  className="absolute inset-0 bg-blue-500/20 rounded animate-pulse"
                  style={{ 
                    opacity: Math.sin((animationProgress * Math.PI) / 50) * 0.3 + 0.2,
                    animationDelay: '0.2s'
                  }}
                />
              )}
            </div>

            {/* Risk Assessment */}
            <div className="relative">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Level
                </div>
                <Badge className={riskColor}>
                  {riskLevel.toUpperCase()}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {scenario.riskCoverage.toFixed(0)}% coverage
                </div>
              </div>
            </div>
          </div>

          {/* Protection Metrics */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Chargeback Buffer:</span>
                <span className="font-semibold">{scenario.chargebackProtection} months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Risk Coverage:</span>
                <span className="font-semibold">{scenario.riskCoverage.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Protection Score:</span>
                <span className="font-semibold flex items-center gap-1">
                  {Math.floor(scenario.vaultPercentage * 1.5 + scenario.riskCoverage / 2)}
                  <Zap className="h-3 w-3 text-yellow-500" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Smart Recommendations
          </h4>
          <div className="space-y-2 text-sm">
            {scenario.vaultPercentage < 25 && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-3 w-3" />
                Consider increasing vault percentage for better chargeback protection
              </div>
            )}
            {scenario.vaultPercentage > 50 && (
              <div className="flex items-center gap-2 text-blue-600">
                <Shield className="h-3 w-3" />
                High protection level - excellent for volatile markets
              </div>
            )}
            {scenario.vaultPercentage >= 25 && scenario.vaultPercentage <= 50 && (
              <div className="flex items-center gap-2 text-green-600">
                <Target className="h-3 w-3" />
                Optimal balance between protection and liquidity
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}