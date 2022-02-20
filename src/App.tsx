import './index.css'

import { ExplicitPage } from './pages/Explicit/Explicit.page'
// import { ReactivePage } from './pages/Reactive/Reactive.page'

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <ExplicitPage />
      {/* <ReactivePage /> */}
    </div>
  )
}

export default App
