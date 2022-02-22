import { observable, makeAutoObservable, autorun } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../api'
import { Form, Mutation, Query } from './modules'

class Store {
  list = observable<IIssue>([])
  listQuery = new Query<IIssue, IIssuesQuery>(api.getIssues)
  createMutation = new Mutation(api.createIssue)
  createForm = new Form<ICreateIssueBody>()
  errors = observable<string>([])

  constructor() {
    makeAutoObservable(this)

    autorun(async () => {
      if (this.createForm.submitting) {
        this.createMutation.makeRequest(this.createForm.values)
      }
    })

    autorun(() => {
      if (this.createMutation.response) {
        this.createForm.reset()
        this.list.push(this.createMutation.response)
      }
    })

    autorun(() => {
      if (this.createMutation.errors) {
        this.createForm.reset()
        this.errors.replace(this.createMutation.errors)
      }
    })
  }
}

export const store = new Store()
