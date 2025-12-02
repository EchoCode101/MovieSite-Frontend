export interface ApiError {
  message: string
  stack?: string
}

export interface ValidationError {
  field: string
  message: string
}


