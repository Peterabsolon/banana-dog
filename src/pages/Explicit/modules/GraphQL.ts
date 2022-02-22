import { makeAutoObservable, observable } from 'mobx'

import { buildErrors } from '../../../utils'

// ===================================================
// Query
// ===================================================
interface IQueryProps<TItem, TPayload> {
  readonly onRequest: (payload?: TPayload) => Promise<TItem[]>
  readonly onSuccess: (res: TItem[]) => void
}

export class Query<TItem, TPayload> {
  response = observable<TItem>([])
  errors = observable<string>([])

  constructor(readonly props: IQueryProps<TItem, TPayload>) {
    makeAutoObservable(this)
  }

  makeRequest = async (payload?: TPayload) => {
    try {
      const res = await this.props.onRequest(payload)
      this.response.replace(res)
      this.props.onSuccess(res)
    } catch (err) {
      this.errors.replace(buildErrors(err))
      throw err
    }
  }
}

// ===================================================
// Mutation
// ===================================================
interface IMutationProps<TResponse, TPayload> {
  readonly onRequest: (payload: TPayload) => Promise<TResponse>
  readonly onSuccess: (res: TResponse) => void
}
export class Mutation<TResponse extends object, TPayload> {
  response?: TResponse
  errors = observable<string>([])

  constructor(readonly props: IMutationProps<TResponse, TPayload>) {
    makeAutoObservable(this)
  }

  makeRequest = async (payload: TPayload) => {
    this.errors.clear()
    try {
      const res = await this.props.onRequest(payload)
      this.response = res
      this.props.onSuccess(res)
    } catch (err) {
      this.errors.replace(buildErrors(err))
      throw err
    }
  }

  clearResponse = () => {
    this.response = undefined
  }
}
