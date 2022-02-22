import { observer } from 'mobx-react-lite'

// import { IIssue } from '../../api'

// import { FormInput, Table } from './ui'
import { store } from './Reactive.store'

// enum Fields {
//   Title = 'title',
//   Priority = 'priority',
// }

// const IssueCreateForm = observer(() => {
//   const { createForm } = store
//   const { submitting, errors } = createForm

//   return (
//     <form onSubmit={store.createForm.submit}>
//       <h2>Create issue</h2>

//       <FormInput required name={Fields.Title} form={createForm} />
//       <FormInput required name={Fields.Priority} form={createForm} />

//       <button type="submit">{submitting ? 'Submitting' : 'Submit'}</button>

//       {Boolean(errors.length) && JSON.stringify(errors)}
//     </form>
//   )
// })

// const IssueTable = observer(() => (
//   <>
//     <h2>Issues</h2>
//     <Table<IIssue>
//       rows={store.list}
//       columns={[
//         { dataKey: '_id', label: 'ID' },
//         { dataKey: 'title', label: 'Title' },
//         { dataKey: 'priority', label: 'Priority' },
//       ]}
//     />
//   </>
// ))

export const ReactivePage = observer(() => {
  console.log('submitted', store.createMutation.submitted)

  return (
    <div>
      <button
        onClick={() => {
          store.createMutation.makeRequest(store.createForm.values)
        }}
      >
        lol
      </button>

      <div>Response: {JSON.stringify(store.createMutation.response)}</div>

      <div>Submitted: {store.createMutation.submitted ? 'Submitted' : 'Not submitted'}</div>

      {/* <IssueCreateForm /> */}
      {/* <IssueTable /> */}
    </div>
  )
})
