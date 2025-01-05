import './App.css'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
