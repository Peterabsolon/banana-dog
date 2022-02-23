import { observable, makeAutoObservable, autorun, Lambda, IReactionDisposer } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'
import { logger } from '../../utils'

type TPredicate = () => boolean
type TBetterAutorun = (predicate: TPredicate, effect: Lambda) => IReactionDisposer

const autorunBetter: TBetterAutorun = (predicate, effect) =>
  autorun(async () => {
    if (predicate()) {
      effect()
    }
  })

class Store {
  list = observable<IIssue>([])
  listQuery = new Query<IIssue, IIssuesQuery>(api.getIssues)
  createMutation = new Mutation(api.createIssue)
  createForm = new Form<ICreateIssueBody>()
  errors = observable<string>([])
  react = true

  constructor() {
    makeAutoObservable(this)

    autorunBetter(
      () => this.createForm.submitting,
      () => {
        logger.log('[effect] make request')
        this.errors.clear()
        this.createMutation.makeRequest(this.createForm.values)
      }
    )

    autorunBetter(
      () => Boolean(this.createMutation.response),
      () => {
        logger.log('[effect] write data')
        this.list.push(this.createMutation.response!)
        this.createForm.reset()
      }
    )

    autorunBetter(
      () => Boolean(this.createMutation.errors.length),
      () => {
        logger.log('[effect] write errors')
        this.errors.replace(this.createMutation.errors)
        this.createForm.reset()
      }
    )
  }

  toggleReactions = () => {
    this.react = !this.react
  }
}

export const store = new Store()

export { Store as BetterStore }
