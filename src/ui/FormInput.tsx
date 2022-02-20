import { observer } from 'mobx-react-lite'

import { Form } from '../pages/Explicit/modules'

interface IFormInputProps {
  form: Form<any>
  name: string
}

export const FormInput = observer(({ name, form }: IFormInputProps) => (
  <input
    name={name}
    placeholder={name}
    value={form.values[name] || ''}
    onChange={form.setValue}
    style={{ display: 'block', marginBottom: 6 }}
  />
))
