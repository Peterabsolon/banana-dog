import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../../api'

import { Query, Mutation } from './GraphQL'

export class IssuesQuery extends Query<IIssue, IIssuesQuery> {
  constructor(onSuccess: (res: IIssue[]) => void) {
    super(api.getIssues, onSuccess)
  }
}

export class IssueCreateMutation extends Mutation<IIssue, ICreateIssueBody> {
  constructor(onSuccess: (res: IIssue) => void) {
    super(api.createIssue, onSuccess)
  }
}
