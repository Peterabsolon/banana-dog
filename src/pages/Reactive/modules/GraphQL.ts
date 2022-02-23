import { makeAutoObservable, observable } from 'mobx'

import { buildErrors, logger } from '../../../utils'

// ===================================================
// Query
// ===================================================
export class Query<TItem, TPayload> {
  response = observable<TItem>([])
  errors = observable<string>([])

  constructor(readonly request: (payload?: TPayload) => Promise<TItem[]>) {}

  makeRequest = async (payload?: TPayload) => {
    try {
      const res = await this.request(payload)
      this.response.replace(res)
    } catch (err) {
      this.errors.replace(buildErrors(err))
    }
  }
}

// ===================================================
// Mutation
// ===================================================
export class Mutation<TResponse, TPayload> {
  response?: TResponse
  errors = observable<string>([])
  submitted = false

  constructor(private readonly request: (payload: TPayload) => Promise<TResponse>) {
    makeAutoObservable(this)
  }

  makeRequest = async (payload: TPayload) => {
    this.errors.clear()
    try {
      logger.log('call API...')
      const res = await this.request(payload)
      if (res) {
        this.response = res
        this.submitted = true
      }
    } catch (err) {
      this.errors.replace(buildErrors(err))
    }
  }

  clearResponse = () => {
    this.response = undefined
  }
}
