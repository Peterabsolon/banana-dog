import { observer } from 'mobx-react-lite'
import './index.css'

import { ExplicitPage } from './pages/Explicit/Explicit.page'
import { ReactivePage } from './pages/Reactive/Reactive.page'
import { BetterStore } from './pages/Reactive/Reactive.store.better'
import { BulkStore } from './pages/Reactive/Reactive.store.bulk'
import { SimpleStore } from './pages/Reactive/Reactive.store.simple'
import { ViewDrivenPage } from './pages/ViewDriven/ViewDriven.page'
import { NavTabs } from './ui'

const App = observer(() => {
  return (
    <NavTabs
      storageKey="nav"
      tabs={[
        { component: <ExplicitPage />, label: 'Explicit' },
        { component: <ReactivePage name="Simple" store={new SimpleStore()} />, label: 'Simple' },
        { component: <ReactivePage name="Better" store={new BetterStore()} />, label: 'Better' },
        { component: <ReactivePage name="Bulk" store={new BulkStore()} />, label: 'Bulk' },
        { component: <ViewDrivenPage />, label: 'View driven' },
      ]}
    />
  )
})

export default App
