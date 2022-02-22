import React, { useState } from 'react'

import { SHOULD_API_FAIL } from '../constants'

export const ApiErrorToggle = () => {
  const [shouldFail, setShouldFail] = useState(Boolean(localStorage.getItem(SHOULD_API_FAIL)))

  const onChange = () => {
    setShouldFail(!shouldFail)

    if (shouldFail) {
      localStorage.removeItem(SHOULD_API_FAIL)
    } else {
      localStorage.setItem(SHOULD_API_FAIL, 'true')
    }
  }

  return (
    <div>
      <label>Should API error:</label>
      <input type="checkbox" checked={shouldFail} onChange={onChange} />
    </div>
  )
}
