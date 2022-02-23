import { ChangeEvent, useState } from 'react'

import { SHOULD_API_FAIL, API_DELAY } from '../constants'

export const ApiErrorToggle = () => {
  const [shouldFail, setShouldFail] = useState(Boolean(localStorage.getItem(SHOULD_API_FAIL)))
  const [apiDelay, setApiDelay] = useState(localStorage.getItem(API_DELAY) || 500)

  const handleToggleApiError = () => {
    setShouldFail(!shouldFail)
    if (shouldFail) {
      localStorage.removeItem(SHOULD_API_FAIL)
    } else {
      localStorage.setItem(SHOULD_API_FAIL, 'true')
    }
  }

  const handleSetApiDelay = (evt: ChangeEvent<HTMLInputElement>) => {
    setApiDelay(evt.target.value)
    localStorage.setItem(API_DELAY, evt.target.value)
  }

  return (
    <div>
      <label>Should API error:</label>
      <input type="checkbox" checked={shouldFail} onChange={handleToggleApiError} />

      <label>API call delay:</label>
      <input type="number" value={apiDelay} onChange={handleSetApiDelay} />
    </div>
  )
}
