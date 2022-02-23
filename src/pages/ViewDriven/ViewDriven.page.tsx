import { observer } from 'mobx-react-lite'
import { Form } from 'react-final-form'
import * as C from '@chakra-ui/react'

import { IIssue } from '../../modules'
import { DemoControls, Table } from '../../ui'

import { store } from './ViewDriven.store'
import { FormInput } from './ui'

enum Fields {
  Title = 'title',
  Priority = 'priority',
}

const IssueCreateForm = observer(() => {
  const { errors } = store

  return (
    <C.Box width={480} mb={3}>
      <Form onSubmit={store.onSubmit}>
        {({ handleSubmit, submitting, form }) => (
          <form
            onSubmit={(values) => {
              handleSubmit(values)
              form.reset()
            }}
          >
            <C.Heading as="h2" fontSize="2xl" mb={3}>
              Create issue
            </C.Heading>

            <FormInput required name={Fields.Title} />
            <FormInput required name={Fields.Priority} />

            <C.Button type="submit">{submitting ? 'Submitting' : 'Submit'}</C.Button>

            {Boolean(errors.length) && JSON.stringify(errors)}
          </form>
        )}
      </Form>
    </C.Box>
  )
})

const IssueTable = observer(() => (
  <>
    <C.Heading as="h2" fontSize="2xl">
      Issues
    </C.Heading>
    <Table<IIssue>
      rows={store.list}
      columns={[
        { dataKey: 'title', label: 'Title' },
        { dataKey: 'priority', label: 'Priority' },
      ]}
    />
  </>
))

export const ViewDrivenPage = observer(() => (
  <C.Box p={4}>
    <C.Heading as="h1">ViewDriven</C.Heading>
    <DemoControls />
    <IssueCreateForm />
    <IssueTable />
  </C.Box>
))
