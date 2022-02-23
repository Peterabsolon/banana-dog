import { observable, makeAutoObservable, autorun, Lambda, IReactionDisposer } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'
import { logger } from '../../utils'

type TPredicate = () => boolean
type TBetterAutorun = (predicate: TPredicate, effect: Lambda, cleanup?: Lambda) => IReactionDisposer

const autorunBetter: TBetterAutorun = (predicate, effect, cleanup) => {
  let shouldCleanup = false

  return autorun(async () => {
    if (predicate()) {
      effect()
      shouldCleanup = true
    } else if (cleanup && shouldCleanup) {
      cleanup()
    }
  })
}

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
      },
      () => {
        logger.log('[cleanup] make request')
      }
    )

    autorunBetter(
      () => Boolean(this.createMutation.response),
      () => {
        logger.log('[effect] write data')
        this.list.push(this.createMutation.response!)
        this.createForm.reset()
        this.createMutation.reset()
      }
    )

    autorunBetter(
      () => Boolean(this.createMutation.errors.length),
      () => {
        logger.log('[effect] write errors')
        this.errors.replace(this.createMutation.errors)
        this.createForm.reset()
        this.createMutation.reset()
      }
    )
  }

  toggleReactions = () => {
    this.react = !this.react
  }
}

export const store = new Store()

export { Store as BetterStore }
