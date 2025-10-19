import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, TrendingUp, Lock, Zap, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Aegis</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link href="/agency" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Agency Demo
            </Link>
            <Link href="/agent" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Agent Demo
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 py-24 text-center md:py-32">
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Your Financial Shield</span>
          </div>
          <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Protect Your Commissions from Chargebacks
          </h1>
          <p className="text-balance text-lg text-muted-foreground md:text-xl">
            Aegis automatically vaults a portion of your commissions, releasing them over time as chargeback risk
            decreases. Sleep better knowing you're protected.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/agency">
                View Agency Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/agent">View Agent Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center gap-12">
          <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for Insurance Agencies</h2>
            <p className="text-balance text-lg text-muted-foreground">
              Comprehensive commission protection designed specifically for commission-based sales teams
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/50">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Automated Vaulting</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically split commissions into safe and vaulted portions based on configurable rules per product
                  type
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Progressive Vesting</h3>
                <p className="text-sm text-muted-foreground">
                  Vaulted funds release gradually over time as chargeback risk decreases, giving you predictable cash
                  flow
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Chargeback Protection</h3>
                <p className="text-sm text-muted-foreground">
                  When chargebacks occur, vaulted funds cover the loss automatically, protecting your bottom line
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Automated Garnishment</h3>
                <p className="text-sm text-muted-foreground">
                  Debt repayment happens automatically from future commissions with configurable garnishment rates
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Both agents and agency owners get clear visibility into safe funds, vaulted amounts, and vesting
                  progress
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Rules Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Configure vault percentages and vesting schedules per product type to match your risk profile
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center gap-12">
          <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How Aegis Works</h2>
            <p className="text-balance text-lg text-muted-foreground">
              Simple, automated commission protection in three steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold">Commission Logged</h3>
              <p className="text-sm text-muted-foreground">
                When a commission is earned, it's automatically split based on your vault rules. Safe funds are
                immediately available.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold">Funds Vest Over Time</h3>
              <p className="text-sm text-muted-foreground">
                Vaulted funds release gradually according to your vesting schedule, moving from vaulted to safe as risk
                decreases.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold">Protected from Chargebacks</h3>
              <p className="text-sm text-muted-foreground">
                If a chargeback occurs, vaulted funds cover it automatically. Any remaining debt is garnished from
                future commissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-7xl mx-auto px-6 py-24">
        <Card className="border-border/50 bg-muted/50">
          <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Protect Your Commissions?</h2>
            <p className="max-w-2xl text-balance text-lg text-muted-foreground">
              Explore our demo dashboards to see how Aegis can help your agency manage commission risk and protect your
              agents' earnings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/agency">
                  Agency Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/agent">Agent Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">Aegis</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Aegis Financial Shield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
