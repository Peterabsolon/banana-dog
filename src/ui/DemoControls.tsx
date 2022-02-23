import { observer } from 'mobx-react-lite'

import { api } from '../modules'

interface IDemoControlsProps {
  store: { react: boolean; toggleReactions: () => void }
}

export const DemoControls = observer(({ store }: IDemoControlsProps) => {
  return (
    <div>
      <div>
        <label>Should API error:</label>
        <input type="checkbox" checked={api.shoulFail} onChange={api.toggleShouldFail} />
      </div>

      <div>
        <label>Toggle reactions:</label>
        <input type="checkbox" checked={store.react} onChange={store.toggleReactions} />
      </div>

      <div>
        <label>API call delay:</label>
        <input type="number" value={api.fakeDelay} onChange={api.setFakeDelay} />
      </div>
    </div>
  )
})
