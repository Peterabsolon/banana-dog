import { observable, makeAutoObservable, autorun } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../api'
import { Form, Mutation, Query } from './modules'

class Store {
  list = observable<IIssue>([])
  listQuery = new Query<IIssue, IIssuesQuery>(api.getIssues)
  createMutation = new Mutation(api.createIssue)
  createForm = new Form<ICreateIssueBody>()

  constructor() {
    makeAutoObservable(this)

    autorun(() => {
      console.log('this.createMutation', this.createMutation)
    })

    autorun(async () => {
      if (this.createForm.submitting) {
        this.createMutation.makeRequest(this.createForm.values)
      }
    })
  }
}

export const store = new Store()
