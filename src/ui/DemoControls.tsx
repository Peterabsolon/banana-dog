import { observer } from 'mobx-react-lite'
import * as C from '@chakra-ui/react'

import { api } from '../modules'

interface IDemoControlsProps {
  store?: { react?: boolean; toggleReactions?: () => void }
}

export const DemoControls = observer(({ store }: IDemoControlsProps) => {
  return (
    <C.Box my={8}>
      <C.Heading as="h3" fontSize="xl" mb={3}>
        Demo controls
      </C.Heading>

      <C.Box mb={3} display={['block', 'block', 'flex']} alignItems="center" justifyContent="flex-start">
        <C.Box display="flex" alignItems="center" mb={[3, 3, 0]}>
          <C.FormLabel width={180}>API call delay</C.FormLabel>
          <C.Input type="number" value={api.fakeDelay} onChange={api.setFakeDelay} />
        </C.Box>

        <C.Checkbox ml={[0, 0, 4]} checked={api.shoulFail} onChange={api.toggleShouldFail}>
          API throw error
        </C.Checkbox>

        {store?.toggleReactions && (
          <C.Checkbox ml={4} checked={store.react} onChange={store.toggleReactions}>
            Reactions enabled
          </C.Checkbox>
        )}
      </C.Box>
    </C.Box>
  )
})
