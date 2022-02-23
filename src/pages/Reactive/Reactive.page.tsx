import { observer } from 'mobx-react-lite'

import { IIssue } from '../../api'
import { ApiErrorToggle, Table } from '../../ui'

import { FormInput } from './ui'
import { store } from './Reactive.store'

enum Fields {
  Title = 'title',
  Priority = 'priority',
}

const IssueCreateForm = observer(() => {
  const { createForm, errors } = store
  const { submitting } = createForm

  console.log('createForm.submitting', createForm.submitting)

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

const IssueTable = observer(() => (
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

export const ReactivePage = observer(() => {
  const { submitting } = store.createForm

  return (
    <div>
      Submitting: {submitting ? 'yes' : 'no'}
      <ApiErrorToggle />
      <IssueCreateForm />
      <IssueTable />
    </div>
  )
})
