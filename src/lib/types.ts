export type UserRole = "agency_owner" | "agent"

export type CommissionStatus = "active" | "vested" | "charged_back"

export type DebtStatus = "active" | "paid_off"

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  user_id: string
  agency_owner_id: string
  safe_to_spend_balance: number
  total_vaulted_balance: number
  total_debt_balance: number
  risk_score: number
  created_at: string
  updated_at: string
  profile?: Profile
}

export interface VaultRule {
  id: string
  agency_owner_id: string
  rule_name: string
  vault_percentage: number
  vesting_months: number
  description: string | null
  created_at: string
  updated_at: string
}

export interface Commission {
  id: string
  agent_id: string
  agency_owner_id: string
  vault_rule_id: string
  total_amount: number
  safe_amount: number
  vaulted_amount: number
  vested_amount: number
  remaining_vaulted: number
  status: CommissionStatus
  commission_date: string
  vesting_start_date: string
  vesting_end_date: string
  created_at: string
  updated_at: string
  vault_rule?: VaultRule
}

export interface VestingSchedule {
  id: string
  commission_id: string
  agent_id: string
  vesting_date: string
  vesting_amount: number
  is_vested: boolean
  vested_at: string | null
  created_at: string
}

export interface Debt {
  id: string
  agent_id: string
  agency_owner_id: string
  commission_id: string | null
  debt_type: "chargeback" | "advance"
  original_amount: number
  remaining_amount: number
  garnishment_percentage: number
  status: DebtStatus
  created_at: string
  updated_at: string
}

export interface DebtPayment {
  id: string
  debt_id: string
  commission_id: string
  payment_amount: number
  payment_date: string
  created_at: string
}
