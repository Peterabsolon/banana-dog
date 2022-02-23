import { render, fireEvent, screen, within } from '@testing-library/react'

import { logger } from '../../../utils/logger'

import { ReactivePage } from '../Reactive.page'
import { BetterStore } from '../Reactive.store.better'
import { FinalSolutionStore } from '../Reactive.store.final'
import { SimpleStore } from '../Reactive.store.simple'

jest.mock('../../../utils/logger', () => ({
  logger: {
    log: jest.fn(),
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})

const submitForm = (title: string, priority: string) => {
  const inputTitle = screen.getByPlaceholderText(/title/)
  const inputPriority = screen.getByPlaceholderText(/priority/)

  fireEvent.change(inputTitle, { target: { value: title } })
  fireEvent.change(inputPriority, { target: { value: priority } })

  fireEvent.click(screen.getByText('Submit'))
}

const runTest = async (store: SimpleStore | BetterStore | FinalSolutionStore) => {
  render(<ReactivePage store={store} />)

  const tableBody = screen.getByTestId('table-body')

  // Create first issue, verify only two effects ran
  submitForm('first issue', 'high')
  expect(logger.log).toBeCalledWith('call API...')
  expect(logger.log).toBeCalledWith('[effect] make request')
  expect(logger.log).toBeCalledTimes(2)

  // Verify only 1 row rendered and 1 write done
  await within(tableBody).findByText('first issue')
  await within(tableBody).findByText('high')
  expect(tableBody.childElementCount).toBe(1)
  expect(logger.log).toBeCalledWith('[effect] write data')
  expect(logger.log).toBeCalledWith('[cleanup] make request')
  expect(logger.log).toBeCalledTimes(4)

  // Create second issue, again verify two effects run only
  submitForm('second issue', 'medium')
  expect(logger.log).toBeCalledWith('call API...')
  expect(logger.log).toBeCalledWith('[effect] make request')
  expect(logger.log).toBeCalledTimes(6)

  // Verify only 2 row rendered and 1 write done
  await within(tableBody).findByText('second issue')
  await within(tableBody).findByText('medium')
  expect(tableBody.childElementCount).toBe(2)
  expect(logger.log).toBeCalledWith('[effect] write data')
  expect(logger.log).toBeCalledWith('[cleanup] make request')
  expect(logger.log).toBeCalledTimes(8)
}

it('SimpleStore works', () => runTest(new SimpleStore()))
it('BetterStoer works', () => runTest(new BetterStore()))
it('BulkStore works', () => runTest(new FinalSolutionStore()))
