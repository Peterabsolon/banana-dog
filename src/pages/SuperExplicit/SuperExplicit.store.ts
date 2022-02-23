import { observable, makeAutoObservable } from 'mobx'

import { api, ICreateIssueBody, IIssue } from '../../modules'
import { buildErrors } from '../../utils'

export class SuperExplicitStore {
  // ===================================================
  // State
  // ===================================================
  list = observable<IIssue>([])
  errors = observable<string>([])

  constructor() {
    makeAutoObservable(this)
  }

  onFetch = async () => {
    this.list.replace(await api.getIssues())
  }

  onSubmit = async (values: ICreateIssueBody) => {
    try {
      await api.createIssue(values)
      await this.onFetch()
      console.log('issue created')
    } catch (err) {
      this.errors.replace(buildErrors(err))
    }
  }
}

export const store = new SuperExplicitStore()
