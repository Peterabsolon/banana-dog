import { observable, makeAutoObservable, autorun, Lambda, IReactionDisposer } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'
import { logger } from '../../utils'

export interface IEffect {
  /**
   * The predicate function to run every render.
   * When it becomes true, the effect is run.
   */
  when: () => boolean

  /**
   * The effect to run if predicate becomes true.
   */
  run: Lambda

  /**
   * A list of subEffects to run when the predicate is true.
   * When predicate becomes false, these effects are disposed.
   */
  subEffects?: IEffect[]

  /**
   * Optional effect name, for debugging
   */
  name?: string
}

export const autorunBulk = (effects: IEffect[]): IReactionDisposer[] =>
  effects.map((e) =>
    autorun(async () => {
      let disposers: IReactionDisposer[] = []

      // Run effect when predicate true
      if (e.when()) {
        e.run()

        // Log effect name for debugging
        logger.log(`[effect] ${e.name}`)

        // Register subeffects only once
        if (e.subEffects?.length) {
          if (!disposers.length) {
            disposers = autorunBulk(e.subEffects)
          }
        }
      } else {
        // Dispose otherwise
        disposers.forEach((disposer) => disposer())
      }
    })
  )

class Store {
  list = observable<IIssue>([])
  listQuery = new Query<IIssue, IIssuesQuery>(api.getIssues)
  createMutation = new Mutation(api.createIssue)
  createForm = new Form<ICreateIssueBody>()
  errors = observable<string>([])

  react = false
  disposers: IReactionDisposer[] = []

  constructor() {
    makeAutoObservable(this)

    this.disposers = autorunBulk([
      {
        name: 'make request',
        when: () => this.createForm.submitting,
        run: () => {
          this.errors.clear()
          this.createMutation.makeRequest(this.createForm.values)
        },
        subEffects: [
          {
            name: 'write data',
            when: () => Boolean(this.createMutation.response),
            run: () => {
              this.list.push(this.createMutation.response!)
              this.createForm.reset()
              this.createMutation.clearResponse()
            },
          },

          {
            name: 'write errors',
            when: () => Boolean(this.createMutation.errors.length),
            run: () => {
              this.errors.replace(this.createMutation.errors)
              this.createForm.reset()
              this.createMutation.clearResponse()
            },
          },
        ],
      },
    ])
  }

  toggleReactions = () => {
    this.react = !this.react
  }
}

export const store = new Store()

export { Store as BulkStore }
