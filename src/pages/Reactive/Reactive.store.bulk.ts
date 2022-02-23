import { observable, makeAutoObservable, autorun, Lambda, IReactionDisposer } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../modules'
import { Form, Mutation, Query } from './modules'
import { logger } from '../../utils'

export interface IEffect {
  /**
   * The predicate function to run every render.
   * When it becomes true, the effect is run.
   */
  when: (outerPredicate?: boolean) => any

  /**
   * The effect to run if predicate becomes true.
   */
  run: Lambda

  /**
   * The optional effect to run if predicate becomes false
   */
  cleanup?: Lambda

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

export const autorunBulk = (effects: IEffect[], outerPredicate = false): IReactionDisposer[] =>
  effects.map((e) => {
    let shouldCleanup = false

    return autorun(async () => {
      let disposers: IReactionDisposer[] = []

      // Run effect when predicate returns true
      if (Boolean(e.when(outerPredicate))) {
        e.run()

        // Effect was run, cleanup should happen when predicate returns false
        shouldCleanup = true

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

        if (shouldCleanup && e.cleanup) {
          logger.log(`[cleanup] ${e.name}`)
          e.cleanup()
        }
      }
    })
  })

class Store {
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
    this.disposers = autorunBulk([
      {
        name: 'make request',
        when: () => this.createForm.submitting,
        run: () => {
          this.errors.clear()
          this.createMutation.makeRequest(this.createForm.values)
        },
        cleanup: () => {
          // ...do something
        },
        subEffects: [
          {
            name: 'write data',
            when: (outerPredicateResult) => {
              // Here we could use `outerPredicateResult` to do stuff.
              // Unsure how useful it would be since in this implementation
              // the effect won't be run if it's false anyway.

              return this.createMutation.response
            },
            run: () => {
              this.list.push(this.createMutation.response!)
              this.createForm.reset()
              this.createMutation.reset()
            },
          },

          {
            name: 'write errors',
            when: () => this.createMutation.errors.length,
            run: () => {
              this.errors.replace(this.createMutation.errors)
              this.createForm.reset()
              this.createMutation.reset()
            },
          },
        ],
      },
    ])
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

export { Store as BulkStore }
