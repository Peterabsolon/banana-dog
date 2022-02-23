import { observable, makeAutoObservable } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'

export class ExplicitStore {
  list = observable<IIssue>([])
  errors = observable<string>([])

  listQuery = new Query<IIssue, IIssuesQuery>({
    onRequest: api.getIssues,
    onSuccess: (res) => this.list.replace(res),
  })

  createMutation = new Mutation<IIssue, ICreateIssueBody>({
    onRequest: api.createIssue,
    onSuccess: (res) => this.list.push(res),
    onFailure: (errors) => this.errors.replace(errors),
  })

  createForm = new Form<ICreateIssueBody>({ mutation: this.createMutation })

  constructor() {
    makeAutoObservable(this)
  }
}

export const store = new ExplicitStore()
