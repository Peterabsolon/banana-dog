import { observer } from 'mobx-react-lite'
import * as C from '@chakra-ui/react'

import { IIssue } from '../../modules'
import { DemoControls, Table } from '../../ui'

import { store } from './Explicit.store'
import { FormInput } from './ui'

enum Fields {
  Title = 'title',
  Priority = 'priority',
}

const IssueCreateForm = observer(() => {
  const { createForm } = store
  const { submitting, errors } = createForm

  return (
    <C.Box mb={3} maxWidth={460}>
      <form onSubmit={store.createForm.submit}>
        <C.Heading as="h2" fontSize="2xl" mb={3}>
          Create issue
        </C.Heading>

        <FormInput required name={Fields.Title} form={createForm} />
        <FormInput required name={Fields.Priority} form={createForm} />

        <C.Button type="submit">{submitting ? 'Submitting' : 'Submit'}</C.Button>

        {Boolean(errors.length) && JSON.stringify(errors)}
      </form>
    </C.Box>
  )
})

const IssueTable = observer(() => (
  <>
    <C.Heading as="h2" fontSize="2xl" mt={8} mb={3}>
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

export const ExplicitPage = observer(() => (
  <C.Box p={4}>
    <C.Heading as="h1">Explicit</C.Heading>
    <DemoControls />
    <IssueCreateForm />
    <IssueTable />
  </C.Box>
))
