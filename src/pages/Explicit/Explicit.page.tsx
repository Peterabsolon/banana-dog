import { observer } from 'mobx-react-lite'

import { IIssue } from '../../api'
import { FormInput, Table } from '../../ui'

import { store } from './Explicit.store'

enum Fields {
  Title = 'title',
  Priority = 'priority',
}

const IssueCreateForm = observer(() => (
  <form onSubmit={store.createForm.submit}>
    <h2>Create issue</h2>
    <FormInput name={Fields.Title} form={store.createForm} />
    <FormInput name={Fields.Priority} form={store.createForm} />
    <button type="submit">{store.createForm.submitting ? 'Submitting' : 'Submit'}</button>
    {store.createMutation.response && JSON.stringify(store.createMutation.response)}
    {Boolean(store.createMutation.errors.length) && JSON.stringify(store.createMutation.errors)}
  </form>
))

const IssueTable = observer(() => {
  console.log('store.listQuery', store.listQuery)

  return (
    <>
      <h2>Issues</h2>
      <Table<IIssue>
        rows={store.listQuery.response}
        columns={[
          { dataKey: '_id', label: 'ID' },
          { dataKey: 'title', label: 'Title' },
        ]}
      />
    </>
  )
})

// const ReactionToggle = observer(() => (
//   <div>
//     <div>Reactions:</div>
//     <button onClick={store.toggleReaction}>{store.reactionDisposer ? 'Disable' : 'Enable'}</button>
//   </div>
// ))

export const ExplicitPage = observer(() => (
  <div style={{ flex: '1 0 0' }}>
    {/* <ReactionToggle /> */}
    <IssueCreateForm />
    <IssueTable />
  </div>
))
