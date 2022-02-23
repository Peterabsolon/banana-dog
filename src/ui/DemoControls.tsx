import { observer } from 'mobx-react-lite'
import * as C from '@chakra-ui/react'

import { api } from '../modules'

interface IDemoControlsProps {
  store?: { react?: boolean; toggleReactions?: () => void }
}

export const DemoControls = observer(({ store }: IDemoControlsProps) => {
  return (
    <C.Box mt={3}>
      <C.Box mb={3} width={480}>
        <C.FormLabel>API call delay</C.FormLabel>
        <C.Input type="number" value={api.fakeDelay} onChange={api.setFakeDelay} />
      </C.Box>

      <C.Box mb={3}>
        <C.Checkbox checked={api.shoulFail} onChange={api.toggleShouldFail}>
          API throw error
        </C.Checkbox>
      </C.Box>

      {store?.toggleReactions && (
        <C.Box mt={-2} mb={3}>
          <C.Checkbox checked={store.react} onChange={store.toggleReactions}>
            Reactions enabled
          </C.Checkbox>
        </C.Box>
      )}
    </C.Box>
  )
})
