import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('isLoggedIn') === 'true',
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [currentUser, setCurrentUser] = useState(() => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') return null

    try {
      return JSON.parse(localStorage.getItem('registeredUser'))
    } catch {
      return null
    }
  })

  function logIn(user) {
    sessionStorage.setItem('isLoggedIn', 'true')
    setCurrentUser(user)
    setIsLoggedIn(true)
    setStatusMessage('Login successful!')
  }

  function logOut() {
    sessionStorage.removeItem('isLoggedIn')
    setCurrentUser(null)
    setIsLoggedIn(false)
    setStatusMessage('You have been logged out.')
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login onLogin={logIn} statusMessage={statusMessage} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard user={currentUser} onLogout={logOut} statusMessage={statusMessage} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App