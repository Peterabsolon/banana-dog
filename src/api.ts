import { v4 as uuid } from 'uuid'

import { API_DELAY, SHOULD_API_FAIL } from './constants'

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
  new Promise<T>((resolve) => {
    const delay = Number(window.localStorage.getItem(API_DELAY) || 500)

    return setTimeout(() => resolve(res), delay)
  })

const issues: IIssue[] = []

export const api = {
  getIssues: async () => mockRequest<IIssue[]>(issues),

  createIssue: async (body: ICreateIssueBody) => {
    if (window.localStorage.getItem(SHOULD_API_FAIL)) {
      throw new Error('Failed to create...')
    }

    issues.push({
      _id: uuid(),
      ...body,
    })

    return mockRequest<IIssue>(issues[issues.length - 1])
  },
}
