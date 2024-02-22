import { AppProvider } from "./providers/app-provider"
import { AppRouter } from "./providers/app-router" 

function App() {
  return ( 
    <AppProvider>
      <AppRouter/> 
    </AppProvider>
  )
}

export default App
