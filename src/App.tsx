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
import Profile from './pages/Profile'
import ProfileEdit from './pages/Profile/Edit'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import PasswordChange from './pages/Profile/Password'
import MovieDetail from './pages/MovieDetail'

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
            <Route path="/movie/:id/:type" element={<MovieDetail />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/password"
              element={
                <ProtectedRoute>
                  <PasswordChange />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
