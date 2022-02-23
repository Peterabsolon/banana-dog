import { observable, makeAutoObservable } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'

class Store {
  /**
   * The list of issues to render
   */
  list = observable<IIssue>([])

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

  react = true
  toggleReactions = () => {} // used in later demos
}

export const store = new Store()
