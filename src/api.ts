import { v4 as uuid } from 'uuid'

export interface IListQuery {
  skip: number
  take: number
}

export interface IIssuesQuery extends IListQuery {}

export interface IIssue {
  _id: string
  title: string
  priority: number
}

export interface ICreateIssueBody extends Omit<IIssue, '_id'> {}

const mockRequest = <T extends unknown>(res: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(res), 500))

const issues: IIssue[] = []

export const api = {
  getIssues: async () => mockRequest<IIssue[]>(issues),

  createIssue: async (body: ICreateIssueBody) => {
    if (Math.random() > 0.5) {
      throw new Error('Failed to create...')
    }

    const issue = { ...body, _id: uuid() }
    issues.push(issue)
    return mockRequest<IIssue>(issue)
  },
}
