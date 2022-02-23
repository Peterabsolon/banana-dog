import { observer } from 'mobx-react-lite'

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
    <form onSubmit={store.createForm.submit}>
      <h2>Create issue</h2>

      <FormInput required name={Fields.Title} form={createForm} />
      <FormInput required name={Fields.Priority} form={createForm} />

      <button type="submit">{submitting ? 'Submitting' : 'Submit'}</button>

      {Boolean(errors.length) && JSON.stringify(errors)}
    </form>
  )
})

const IssueTable = observer(({ store }: IPropsWithStore) => (
  <>
    <h2>Issues</h2>
    <Table<IIssue>
      rows={store.list}
      columns={[
        { dataKey: '_id', label: 'ID' },
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
  <div>
    <h1>{name}</h1>
    <DemoControls store={store} />
    <IssueCreateForm store={store} />
    <IssueTable store={store} />
  </div>
))
