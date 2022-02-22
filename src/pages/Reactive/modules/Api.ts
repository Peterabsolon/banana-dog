import { api, ICreateIssueBody, IIssue, IIssuesQuery } from '../../../api'

import { Query, Mutation } from './GraphQL'

export class IssuesQuery extends Query<IIssue, IIssuesQuery> {
  constructor() {
    super(api.getIssues)
  }
}

export class IssueCreateMutation extends Mutation<IIssue, ICreateIssueBody> {
  constructor() {
    super(api.createIssue)
  }
}
