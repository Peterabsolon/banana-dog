import { makeAutoObservable, observable } from 'mobx'
import { ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'

import { sleep } from '../utils'

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

class Api {
  // Poor man database
  issues = observable<IIssue>([])
  shoulFail = false
  fakeDelay = 100

  constructor() {
    makeAutoObservable(this)
  }

  mockRequest = <T extends unknown>(res: T) => {
    return new Promise<T>((resolve) => setTimeout(() => resolve(res), this.fakeDelay))
  }

  toggleShouldFail = () => {
    this.shoulFail = !this.shoulFail
  }

  setFakeDelay = (evt: ChangeEvent<HTMLInputElement>) => {
    this.fakeDelay = Number(evt.target.value)
  }

  getIssues = async () => {
    await sleep(this.fakeDelay)
    return this.mockRequest<IIssue[]>(this.issues)
  }

  createIssue = async (body: ICreateIssueBody) => {
    if (this.shoulFail) {
      throw new Error('Failed to create...')
    }

    await sleep(this.fakeDelay)

    const issue = {
      _id: uuid(),
      ...body,
    }

    this.issues.push(issue)

    return this.mockRequest<IIssue>(issue)
  }
}

// Server is unchanged between demos
export const api = new Api()
