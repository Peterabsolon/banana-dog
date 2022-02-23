import { observable, makeAutoObservable, autorun, configure } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'
import { logger } from '../../utils'

configure({ enforceActions: 'never' })

export class Store {
  list = observable<IIssue>([])
  listQuery = new Query<IIssue, IIssuesQuery>(api.getIssues)
  createMutation = new Mutation(api.createIssue)
  createForm = new Form<ICreateIssueBody>()
  errors = observable<string>([])

  react = false

  constructor() {
    makeAutoObservable(this)

    autorun(() => {
      if (this.createForm.submitting) {
        logger.log('[effect] make request')
        this.createMutation.makeRequest(this.createForm.values)
      }
    })

    autorun(() => {
      if (this.createMutation.response) {
        logger.log('[effect] write data')
        this.createForm.reset()
        this.list.push(this.createMutation.response)
      }
    })

    autorun(() => {
      if (this.createMutation.errors.length) {
        logger.log('[effect] write errors')
        this.createForm.reset()
        this.errors.replace(this.createMutation.errors)
      }
    })
  }

  toggleReactions = () => {
    this.react = !this.react
  }
}

export const store = new Store()

export { Store as SimpleStore }
