export interface Tax {
  id?: string
  _id?: string
  name: string
  country?: string
  rate_percent: number
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

export type TaxListResponse = Tax[]

export interface CreateTaxPayload {
  name: string
  country?: string
  rate_percent: number
  is_active?: boolean
}

export interface UpdateTaxPayload extends Partial<CreateTaxPayload> {}


