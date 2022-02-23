import { observer } from 'mobx-react-lite'
import * as C from '@chakra-ui/react'

import { Form } from '../modules'

interface IFormInputProps {
  form: Form<any>
  name: string
  required?: boolean
}

export const FormInput = observer(({ name, form, ...rest }: IFormInputProps) => (
  <C.Input
    name={name}
    placeholder={name}
    value={form.values[name] || ''}
    onChange={form.setValue}
    style={{ display: 'block', marginBottom: 6 }}
    {...rest}
  />
))
