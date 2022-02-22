import { makeAutoObservable, observable, runInAction } from 'mobx'
import { ChangeEvent, FormEvent } from 'react'
import { buildErrors } from '../../../utils'

import { Mutation } from './GraphQL'

type TFormValues = { [key: string]: any }

interface IFormProps<TValues extends TFormValues> {
  initialValues?: Partial<TValues>
  mutation: Mutation<any, any>
}

export class Form<TValues extends TFormValues> {
  values: TFormValues = {}
  errors = observable<string>([])
  submitting = false

  constructor(readonly props: IFormProps<TValues>) {
    makeAutoObservable(this)
    this.values = (props.initialValues || {}) as TValues
  }

  setValue = (evt: ChangeEvent<HTMLInputElement>) => {
    this.values[evt.target.name] = evt.target.value
  }

  reset = () => {
    this.values = {}
    this.submitting = false
  }

  submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.errors.clear()
    this.submitting = true

    try {
      await this.props.mutation.makeRequest(this.values)

      runInAction(() => {
        this.props.mutation.clearResponse()
        this.reset()
      })
    } catch (err) {
      this.errors.replace(buildErrors(err))
    } finally {
      this.submitting = false
    }
  }
}
