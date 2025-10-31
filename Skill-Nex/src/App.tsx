import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProfileInputPage from './pages/ProfileInputPage'
import DashboardPage from './pages/DashboardPage'
import IndustriesPage from './pages/IndustriesPage'
import AssessmentPage from './pages/AssessmentPage'
import AssessmentResultsPage from './pages/AssessmentResultsPage'
import PortfolioBuilderPage from './pages/PortfolioBuilderPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user has completed profile
    const profile = localStorage.getItem('studentProfile')
    if (profile) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleSignIn = () => {
    // For now, just redirect to profile input
    // In production, this would show a sign-in modal
    window.location.href = '/profile-input'
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-rose-light">
        <Navbar isLoggedIn={isLoggedIn} onSignIn={handleSignIn} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile-input" element={<ProfileInputPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/assessment-results" element={<AssessmentResultsPage />} />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <DashboardPage /> : <Navigate to="/profile-input" />}
            />
            <Route
              path="/industries"
              element={isLoggedIn ? <IndustriesPage /> : <Navigate to="/profile-input" />}
            />
            <Route
              path="/portfolio-builder"
              element={isLoggedIn ? <PortfolioBuilderPage /> : <Navigate to="/profile-input" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
