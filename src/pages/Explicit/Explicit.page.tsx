import { observer } from 'mobx-react-lite'

import { IIssue } from '../../api'

import { store } from './Explicit.store'
import { FormInput, Table } from './ui'

enum Fields {
  Title = 'title',
  Priority = 'priority',
}

const IssueCreateForm = observer(() => {
  const { createForm } = store
  const { submitting, errors } = createForm

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

export const ExplicitPage = observer(() => (
  <div>
    <IssueCreateForm />
    <IssueTable />
  </div>
))
