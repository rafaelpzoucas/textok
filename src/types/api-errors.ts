// types/api-errors.ts
export interface TabNewsAPIError {
  name: string
  message: string
  action: string
  status_code: number
  error_id: string
  request_id: string
  error_location_code: string
}

export class TabNewsError extends Error {
  public apiError: TabNewsAPIError

  constructor(errorData: TabNewsAPIError) {
    super(errorData.message)
    this.name = 'TabNewsError'
    this.apiError = errorData
  }

  get userMessage(): string {
    return this.apiError.message
  }

  get userAction(): string {
    return this.apiError.action
  }

  get statusCode(): number {
    return this.apiError.status_code
  }
}
