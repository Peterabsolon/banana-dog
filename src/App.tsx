import { observer } from 'mobx-react-lite'
import './index.css'

// import { ExplicitPage } from './pages/Explicit/Explicit.page'
import { ReactivePage } from './pages/Reactive/Reactive.page'

const App = observer(() => {
  return (
    <div style={{ display: 'flex' }}>
      {/* <ExplicitPage /> */}
      <ReactivePage />
    </div>
  )
})

export default App
