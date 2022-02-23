import { observer } from 'mobx-react-lite'
import './index.css'

import { ExplicitPage } from './pages/Explicit/Explicit.page'
import { ReactivePage } from './pages/Reactive/Reactive.page'
import { BetterStore } from './pages/Reactive/Reactive.store.better'
import { FinalSolutionStore } from './pages/Reactive/Reactive.store.final'
import { SimpleStore } from './pages/Reactive/Reactive.store.simple'
import { SuperExplicitPage } from './pages/SuperExplicit/SuperExplicit.page'
import { NavTabs } from './ui'

const App = observer(() => {
  return (
    <NavTabs
      storageKey="nav"
      tabs={[
        { component: <ReactivePage name="Simple" store={new SimpleStore()} />, label: 'Simple' },
        { component: <ReactivePage name="Better" store={new BetterStore()} />, label: 'Better' },
        { component: <ReactivePage name="Final solution" store={new FinalSolutionStore()} />, label: 'Final solution' },
        { component: <ExplicitPage />, label: 'Explicit' },
        { component: <SuperExplicitPage />, label: 'Super explicit' },
      ]}
    />
  )
})

export default App
