import { action, observable } from 'mobx'

import { buildErrors } from '../../../utils'

// ===================================================
// Query
// ===================================================
export class Query<TItem, TPayload> {
  @observable response = observable<TItem>([])
  @observable errors = observable<string>([])

  constructor(readonly request: (payload?: TPayload) => Promise<TItem[]>) {}

  @action
  makeRequest = async (payload?: TPayload) => {
    try {
      const res = await this.request(payload)
      this.response.replace(res)
    } catch (err) {
      this.errors.replace(buildErrors(err))
      throw err
    }
  }
}

// ===================================================
// Mutation
// ===================================================
export class Mutation<TResponse extends object, TPayload> {
  @observable response?: TResponse
  @observable errors = observable<string>([])

  constructor(readonly request: (payload: TPayload) => Promise<TResponse>) {}

  @action
  makeRequest = async (payload: TPayload) => {
    this.errors.clear()
    try {
      const res = await this.request(payload)
      this.response = res
    } catch (err) {
      this.errors.replace(buildErrors(err))
      throw err
    }
  }

  @action
  clearResponse = () => {
    this.response = undefined
  }
}
