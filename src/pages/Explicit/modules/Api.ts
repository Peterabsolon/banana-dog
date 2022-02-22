import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../../api'

import { Query, Mutation } from './GraphQL'

export class IssuesQuery extends Query<IIssue, IIssuesQuery> {
  constructor(opts: { onSuccess: (res: IIssue[]) => void }) {
    super(api.getIssues, opts.onSuccess)
  }
}

export class IssueCreateMutation extends Mutation<IIssue, ICreateIssueBody> {
  constructor(opts: { onSuccess: (res: IIssue) => void }) {
    super(api.createIssue, opts.onSuccess)
  }
}
