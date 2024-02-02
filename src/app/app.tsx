import { AppLoader } from "./providers/app-loader"
import { AppRouter } from "./providers/app-router"

function App() {
  return ( 
    <AppLoader>
      <AppRouter/>
    </AppLoader>
  )
}

export default App
