export interface PaymentMethod {
  id?: string
  _id?: string
  name: string
  display_name?: string
  config?: Record<string, unknown>
  is_active: boolean
  is_default: boolean
  createdAt?: string
  updatedAt?: string
}

export type PaymentMethodListResponse = PaymentMethod[]

export interface CreatePaymentMethodPayload {
  name: string
  display_name?: string
  config: Record<string, unknown>
  is_active?: boolean
  is_default?: boolean
}

export interface UpdatePaymentMethodPayload extends Partial<CreatePaymentMethodPayload> {}


