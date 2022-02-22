import { observer } from 'mobx-react-lite'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { Form } from '../modules'

type TNativeInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'form'
>

interface IFormInputProps extends TNativeInputProps {
  form: Form<any>
  name: string
}

export const FormInput = observer(({ name, form, ...rest }: IFormInputProps) => (
  <input
    name={name}
    placeholder={name}
    value={form.values[name] || ''}
    onChange={form.setValue}
    style={{ display: 'block', marginBottom: 6, ...rest.style }}
    {...rest}
  />
))
