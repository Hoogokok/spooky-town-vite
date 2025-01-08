import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Login from './pages/Login'
import MainLayout from './components/layout/MainLayout'
import Signup from './pages/Signup'
import Magazine from './pages/Magazine'
import Game from './pages/Game'
import StreamingPage from './pages/Streaming'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/games" element={<Game />} />
            <Route path="/streaming" element={<StreamingPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
