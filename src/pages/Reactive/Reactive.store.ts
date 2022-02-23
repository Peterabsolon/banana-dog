import { observable, makeAutoObservable, autorun, Lambda, IReactionDisposer } from 'mobx'

import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../api'
import { Form, Mutation, Query } from './modules'

type TPredicate = () => boolean
type TBetterAutorun = (predicate: TPredicate, effect: Lambda, name?: string) => IReactionDisposer

const autorunBetter: TBetterAutorun = (predicate, effect, name) =>
  autorun(async () => {
    console.log(`autorun ${name}`)
    if (predicate()) {
      console.log(`effect ${name}`)
      effect()
    }
  })

const autorunBulk = (effects: { when: TPredicate; run: Lambda; name?: string }[]) => {
  return effects.map((e) => autorunBetter(e.when, e.run, e.name))
}

const autorunNestedWhen = (...args: any) => {}

const autorunBulkNestedWhen = (...args: any) => {}

class Store {
  list = observable<IIssue>([])
  listQuery = new Query<IIssue, IIssuesQuery>(api.getIssues)
  createMutation = new Mutation(api.createIssue)
  createForm = new Form<ICreateIssueBody>()
  errors = observable<string>([])

  constructor() {
    makeAutoObservable(this)

    // ===================================================
    // Nested when
    // ===================================================
    // autorunNestedWhen(
    //   () => this.createForm.submitting,
    //   () => {
    //     this.errors.clear()
    //     this.createMutation.makeRequest(this.createForm.values)
    //   },
    //   [
    //     () => Boolean(this.createMutation.response),
    //     () => {
    //       this.list.push(this.createMutation.response!)
    //       this.createForm.reset()
    //     },
    //   ]
    // )

    // ===================================================
    // Bulk
    // ===================================================
    autorunBulk([
      {
        name: 'trigger request',
        when: () => this.createForm.submitting,
        run: () => {
          console.log('inside', this.createForm.submitting)

          this.errors.clear()
          this.createMutation.makeRequest(this.createForm.values)

          autorunBulk([
            {
              name: 'write data',
              when: () => Boolean(this.createMutation.response),
              run: () => {
                console.log('resetting', this.createForm.submitting)
                this.list.push(this.createMutation.response!)
                this.createForm.reset()
              },
            },

            {
              name: 'write errors',
              when: () => Boolean(this.createMutation.errors),
              run: () => {
                this.errors.replace(this.createMutation.errors)
                this.createForm.reset()
              },
            },
          ])
        },
      },
    ])

    // ===================================================
    // Better
    // ===================================================
    // autorunBetter(
    //   () => this.createForm.submitting,
    //   () => {
    //     console.log('Make request')
    //     this.errors.clear()
    //     this.createMutation.makeRequest(this.createForm.values)
    //   }
    // )

    // autorunBetter(
    //   () => Boolean(this.createMutation.response),
    //   () => {
    //     console.log('Write data')
    //     this.list.push(this.createMutation.response!)
    //     this.createForm.reset()
    //   }
    // )

    // autorunBetter(
    //   () => Boolean(this.createMutation.errors.length),
    //   () => {
    //     console.log('Error')
    //     this.errors.replace(this.createMutation.errors)
    //     this.createForm.reset()
    //   }
    // )

    // ===================================================
    // Simple
    // ===================================================
    // const submitDisposer = autorun(async () => {
    //   console.log('#1')
    //   if (this.createForm.submitting) {
    //     this.createMutation.makeRequest(this.createForm.values)
    //   }
    // })

    // autorun(() => {
    //   console.log('#2')
    //   if (this.createMutation.response) {
    //     this.createForm.reset()
    //     this.list.push(this.createMutation.response)
    //   }
    // })

    // autorun(() => {
    //   console.log('#3')
    //   if (this.createMutation.errors) {
    //     this.createForm.reset()
    //     this.errors.replace(this.createMutation.errors)
    //   }
    // })
  }
}

export const store = new Store()
