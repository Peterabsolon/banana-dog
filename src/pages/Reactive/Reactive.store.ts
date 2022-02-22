import { observable, makeAutoObservable } from 'mobx'

import { ICreateIssueBody, IIssue } from '../../api'
import { Form, IssueCreateMutation, IssuesQuery } from './modules'

class Store {
  list = observable<IIssue>([])
  listQuery = new IssuesQuery()
  createMutation = new IssueCreateMutation()
  createForm = new Form<ICreateIssueBody>()

  constructor() {
    makeAutoObservable(this)
  }
}

export const store = new Store()
