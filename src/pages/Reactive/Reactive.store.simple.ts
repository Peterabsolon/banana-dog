import { observable, makeAutoObservable, autorun, configure, IReactionDisposer } from 'mobx'

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

  react = true
  disposers: IReactionDisposer[] = []

  constructor() {
    makeAutoObservable(this)

    this.setup()
  }

  setup = () => {
    this.disposers.push(
      autorun(async () => {
        if (this.createForm.submitting) {
          logger.log('[effect] make request')
          await this.createMutation.makeRequest(this.createForm.values)
          logger.log('[cleanup] make request')
        }
      }),

      autorun(() => {
        if (this.createMutation.response) {
          logger.log('[effect] write data')
          this.list.push(this.createMutation.response)
          this.createForm.reset()
          this.createMutation.reset()
        }
      }),

      autorun(() => {
        if (this.createMutation.errors.length) {
          logger.log('[effect] write errors')
          this.errors.replace(this.createMutation.errors)
          this.createForm.reset()
          this.createMutation.reset()
        }
      })
    )
  }

  toggleReactions = () => {
    this.react = !this.react

    if (this.react) {
      this.setup()
    } else {
      this.disposers.forEach((disposer) => disposer())
    }
  }
}

export const store = new Store()

export { Store as SimpleStore }
