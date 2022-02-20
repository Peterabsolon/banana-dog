import { observable, makeAutoObservable } from 'mobx'

import { ICreateIssueBody, IIssue } from '../../api'
import { Form, IssueCreateMutation, IssuesQuery } from './modules'

class Store {
  list = observable<IIssue>([])
  listQuery = new IssuesQuery((res) => {
    this.list.replace(res)
  })

  createMutation = new IssueCreateMutation((res) => {
    this.list.push(res) // could be just optimistic update w/o querying server
    this.listQuery.makeRequest() // or with server refetch
  })
  createForm = new Form<ICreateIssueBody>({ mutation: this.createMutation })

  constructor() {
    makeAutoObservable(this)
  }
}

export const store = new Store()
