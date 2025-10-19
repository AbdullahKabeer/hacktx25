"use client"

import { Button } from "@/components/ui/button"
import { Shield, Home } from "lucide-react"
import Link from "next/link"

export function AgencyHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Aegis</h2>
            <p className="text-xs text-muted-foreground">Financial Shield</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">Demo Agency</p>
            <p className="text-xs text-muted-foreground">Agency Owner</p>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
