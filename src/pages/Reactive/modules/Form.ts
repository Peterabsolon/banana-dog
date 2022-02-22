import { makeAutoObservable, observable } from 'mobx'
import { ChangeEvent, FormEvent } from 'react'

export type TFormValues = { [key: string]: any }

interface IFormProps<TValues extends TFormValues> {
  initialValues?: Partial<TValues>
}

export class Form<TValues extends { [key: string]: any }> {
  values: TValues
  errors = observable<string>([])
  submitting = false

  constructor(readonly props?: IFormProps<TValues>) {
    makeAutoObservable(this)
    this.values = (props?.initialValues || {}) as TValues
  }

  setValue = (evt: ChangeEvent<HTMLInputElement>) => {
    const key = evt.target.name as keyof TValues
    this.values[key] = evt.target.value as TValues[keyof TValues]
  }

  reset = () => {
    this.values = {} as TValues
    this.submitting = false
  }

  submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.errors.clear()
    this.submitting = true
  }
}
