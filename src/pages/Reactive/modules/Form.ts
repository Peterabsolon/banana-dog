import { makeAutoObservable, observable } from 'mobx'
import { ChangeEvent } from 'react'

export type TFormValues = { [key: string]: any }

interface IFormProps<TValues extends TFormValues> {
  initialValues?: Partial<TValues>
}

export class Form<TValues extends TFormValues> {
  values: TFormValues = {}
  errors = observable<string>([])
  submitting = false

  constructor(readonly props?: IFormProps<TValues>) {
    makeAutoObservable(this)
    this.values = (props?.initialValues || {}) as TValues
  }

  setValue = (evt: ChangeEvent<HTMLInputElement>) => {
    this.values[evt.target.name] = evt.target.value
  }

  reset = () => {
    this.values = {}
    this.submitting = false
  }

  submit = async () => {
    this.errors.clear()
    this.submitting = true
  }
}
