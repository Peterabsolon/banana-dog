import { observable, makeAutoObservable } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'

export class ExplicitStore {
  /**
   * The list of issues to render
   */
  list = observable<IIssue>([])

  /**
   * The list of server errors
   */
  errors = observable<string>([])

  /**
   * A GQL query to fetch issues
   */
  listQuery = new Query<IIssue, IIssuesQuery>({
    onRequest: api.getIssues,
    onSuccess: (res) => this.list.replace(res),
  })

  /**
   * A GQL mutation to create an issue
   */
  createMutation = new Mutation<IIssue, ICreateIssueBody>({
    onRequest: api.createIssue,
    onSuccess: (res) => this.list.push(res),
    onFailure: (errors) => this.errors.replace(errors),
  })

  /**
   * Create issue form state
   */
  createForm = new Form<ICreateIssueBody>({
    mutation: this.createMutation,
  })

  constructor() {
    makeAutoObservable(this)
  }
}

export const store = new ExplicitStore()
