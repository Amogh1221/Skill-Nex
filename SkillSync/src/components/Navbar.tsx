import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import userProfileImg from '../assets/userprofile.jpg'

interface NavbarProps {
  isLoggedIn: boolean
  onSignIn: () => void
}

const Navbar = ({ isLoggedIn, onSignIn }: NavbarProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isHomeHovered, setIsHomeHovered] = useState(false)

  const scrollToAbout = () => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const aboutSection = document.getElementById('about-us')
        aboutSection?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const aboutSection = document.getElementById('about-us')
      aboutSection?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-light shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Home Button + Logo */}
          <div className="flex items-center gap-4">
            {/* Animated Home Button */}
            <motion.button
              onClick={() => navigate('/')}
              onHoverStart={() => setIsHomeHovered(true)}
              onHoverEnd={() => setIsHomeHovered(false)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* House Icon */}
              <motion.div
                className="absolute"
                animate={{
                  y: isHomeHovered ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Roof */}
                  <motion.path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="#572E54"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={isHomeHovered ? '#8E7692' : 'none'}
                    animate={{
                      fill: isHomeHovered ? '#8E7692' : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Door */}
                  <motion.path
                    d="M9 22V12H15V22"
                    stroke="#572E54"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={isHomeHovered ? '#572E54' : 'none'}
                    animate={{
                      fill: isHomeHovered ? '#572E54' : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </motion.div>

              {/* Animated Sparkles on Hover */}
              {isHomeHovered && (
                <>
                  <motion.div
                    className="absolute w-1 h-1 bg-mauve rounded-full"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [-10, -15],
                      y: [-10, -15],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 bg-plum-dark rounded-full"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [10, 15],
                      y: [-10, -15],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 bg-rose-light rounded-full"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [0, 0],
                      y: [-12, -18],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </>
              )}
            </motion.button>

            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-0 cursor-pointer"
            >
              <span className="text-2xl font-bold text-plum-dark">Skill</span>
              <span className="text-2xl font-bold text-mauve">-Nex</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    isActive('/dashboard')
                      ? 'bg-gradient-to-r from-mauve to-plum-dark text-white shadow-lg'
                      : 'text-plum-dark hover:bg-rose-light/30'
                  }`}
                >
                  <img src={userProfileImg} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                  Profile
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/industries')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    isActive('/industries')
                      ? 'bg-gradient-to-r from-mauve to-plum-dark text-white shadow-lg'
                      : 'text-plum-dark hover:bg-rose-light/30'
                  }`}
                >
                  Industries Around
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToAbout}
                  className="px-4 py-2 rounded-lg font-semibold text-plum-dark hover:bg-rose-light/30 transition-all"
                >
                  About Us
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToAbout}
                  className="px-4 py-2 rounded-lg font-semibold text-plum-dark hover:bg-rose-light/30 transition-all"
                >
                  About Us
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSignIn}
                  className="px-6 py-2 border-2 border-mauve text-mauve rounded-lg font-semibold hover:bg-rose-light/30 transition-all"
                >
                  Sign In
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile-input')}
                  className="px-6 py-2 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

