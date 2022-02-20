import { makeAutoObservable } from 'mobx'
import { ChangeEvent, FormEvent } from 'react'
import { buildErrors } from '../../../utils'

import { Mutation } from './GraphQL'

type TFormValues = { [key: string]: any }

interface IFormProps<TValues extends TFormValues> {
  initialValues?: Partial<TValues>
  mutation: Mutation<any, any>
}

export class Form<TValues extends TFormValues> {
  _values: TFormValues = {}
  submitting = false
  errors: string[] = []

  constructor(readonly props: IFormProps<TValues>) {
    makeAutoObservable(this)
    this._values = (props.initialValues || {}) as TValues
  }

  get values(): TValues {
    return this._values as TValues
  }

  setValue = (evt: ChangeEvent<HTMLInputElement>) => {
    this._values[evt.target.name] = evt.target.value
  }

  reset = () => {
    this._values = {}
    this.submitting = false
  }

  submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.submitting = true

    try {
      await this.props.mutation.makeRequest(this.values)
      this.props.mutation.clearResponse()
      this.reset()
    } catch (err) {
      this.errors = buildErrors(err)
    } finally {
      this.submitting = false
    }
  }
}
