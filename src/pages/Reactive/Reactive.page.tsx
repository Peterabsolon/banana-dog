import { observer } from 'mobx-react-lite'
import * as C from '@chakra-ui/react'

import { IIssue } from '../../modules'
import { DemoControls, Table } from '../../ui'

import { FormInput } from './ui'
import { Store } from './Reactive.store.simple'

enum Fields {
  Title = 'title',
  Priority = 'priority',
}

// Use dependency injection to pass store for easier testing
interface IPropsWithStore {
  store: Store
}

const IssueCreateForm = observer(({ store }: IPropsWithStore) => {
  const { createForm, errors } = store
  const { submitting } = createForm

  return (
    <C.Box width={480} mb={3}>
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

const IssueTable = observer(({ store }: IPropsWithStore) => (
  <>
    <C.Heading as="h2" fontSize="2xl" mb={3}>
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

interface IPropsWithStore {
  name?: string
  store: Store
}

export const ReactivePage = observer(({ store, name }: IPropsWithStore) => (
  <C.Box p={4}>
    <C.Heading as="h1">{name}</C.Heading>
    <DemoControls store={store} />
    <IssueCreateForm store={store} />
    <IssueTable store={store} />
  </C.Box>
))
