import { observable, makeAutoObservable } from 'mobx'

import { ICreateIssueBody, IIssue } from '../../api'
import { Form, IssueCreateMutation, IssuesQuery } from './modules'

class Store {
  /**
   * The list of issues to render
   */
  list = observable<IIssue>([])

  /**
   * A GQL query to fetch issues
   */
  listQuery = new IssuesQuery({
    onSuccess: (res) => this.list.replace(res),
  })

  /**
   * A GQL mutation to create an issue
   */
  createMutation = new IssueCreateMutation({
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
}

export const store = new Store()
