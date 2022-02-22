import { action, makeAutoObservable, observable } from 'mobx'

import { buildErrors } from '../../../utils'

// ===================================================
// Response
// ===================================================
export class Response<TResponse> {
  data?: TResponse

  constructor(res: Awaited<TResponse>) {
    makeAutoObservable(this)
    this.setData(res)
  }

  setData = (res?: Awaited<TResponse>) => {
    this.data = res
  }
}

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
