import { AgencyHeader } from "@/components/agency/agency-header"
import { VaultRulesTable } from "@/components/agency/vault-rules-table"
import vaultRulesData from "@/data/vault-rules.json"

export default function VaultRulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AgencyHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vault Rules</h1>
            <p className="text-muted-foreground mt-1">Configure commission splitting and vesting schedules</p>
          </div>
        </div>

        <VaultRulesTable vaultRules={vaultRulesData} />
      </main>
    </div>
  )
}
