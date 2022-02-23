import { CSSProperties } from 'react'
import { observer } from 'mobx-react-lite'
import { Field } from 'react-final-form'
import * as C from '@chakra-ui/react'

interface IFormInputProps {
  name: string
  style?: CSSProperties
  required?: boolean
}

export const FormInput = observer(({ name, ...rest }: IFormInputProps) => {
  return (
    <Field
      name={name}
      render={({ input }) => (
        <C.Input
          placeholder={name}
          {...input}
          {...rest}
          style={{ display: 'block', marginBottom: 6, ...rest.style }}
        />
      )}
    />
  )
})
