import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loading from './components/common/Loading'
import MainLayout from './components/layout/MainLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))
const Magazine = lazy(() => import('./pages/Magazine'))
const Game = lazy(() => import('./pages/Game'))
const StreamingPage = lazy(() => import('./pages/Streaming'))
const Profile = lazy(() => import('./pages/Profile'))
const ProfileEdit = lazy(() => import('./pages/Profile/Edit'))
const PasswordChange = lazy(() => import('./pages/Profile/Password'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
