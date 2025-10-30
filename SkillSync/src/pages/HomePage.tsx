import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import assessmentAnimation from '../assets/Exams.json'
import educationAnimation from '../assets/education-animation.json'
import contactAnimation from '../assets/Contact.json'
import skillnexLogo from '../assets/Skillnex.png'

const HomePage = () => {
  const navigate = useNavigate()

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-us')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <img
                  src={skillnexLogo}
                  alt="Skill-Nex Logo"
                  className="h-32 w-auto"
                />
              </motion.div>

              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-plum-dark">Your Future</span>
                <br />
                <span className="text-plum-dark">Career</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark">
                  Starts Here
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-xl">
                Discover personalized career paths, build essential skills, and achieve your professional goals with AI-powered recommendations.
              </p>
              
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile-input')}
                  className="px-8 py-4 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free →
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToAbout}
                  className="px-8 py-4 border-2 border-mauve text-mauve rounded-xl font-semibold text-lg hover:bg-rose-light/30 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="w-full max-w-[600px]">
                <Lottie
                  animationData={educationAnimation}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: 'auto' }}
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: true
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="py-24 bg-gradient-to-br from-rose-light/20 via-cream/30 to-mauve/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold text-plum-dark mb-6">
                Discover Your True Potential
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Take our comprehensive psychometric and personality assessment to understand your individual aptitudes,
                strengths, and career preferences. Our AI-powered analysis will provide personalized insights to guide
                your career journey.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mauve rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Personality Analysis:</span> Understand your work style and preferences
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mauve rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Aptitude Testing:</span> Identify your natural strengths and abilities
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mauve rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Career Matching:</span> Get personalized career recommendations based on your profile
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/assessment')}
                className="px-8 py-4 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Take Assessment →
              </motion.button>
            </motion.div>

            {/* Right Content - Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-full max-w-lg">
                <Lottie
                  animationData={assessmentAnimation}
                  loop={true}
                  className="w-full h-full"
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: true
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-24 bg-white border-y border-rose-light">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-plum-dark mb-6">About Skill-Nex</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering students to make informed career decisions through AI-driven insights
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Mission, What We Do, Vision cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-cream to-rose-light/30 p-6 rounded-2xl border border-rose-light"
              >
                <h3 className="text-2xl font-bold text-plum-dark mb-3">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To bridge the gap between academic learning and industry demands by providing personalized,
                  data-driven career guidance that helps students discover their true potential.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-cream to-rose-light/30 p-6 rounded-2xl border border-rose-light"
              >
                <h3 className="text-2xl font-bold text-plum-dark mb-3">What We Do</h3>
                <p className="text-gray-700 leading-relaxed">
                  Skill-Nex analyzes your academic history, interests, and achievements to recommend
                  personalized career paths, skill development roadmaps, and curated learning resources
                  aligned with real-time industry trends.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-cream to-rose-light/30 p-6 rounded-2xl border border-rose-light"
              >
                <h3 className="text-2xl font-bold text-plum-dark mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the leading AI-powered career guidance platform that transforms how students
                  navigate their professional journey, making career planning accessible, personalized,
                  and data-driven for everyone.
                </p>
              </motion.div>
            </div>

            {/* Right side - Contact Animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-md">
                <Lottie
                  animationData={contactAnimation}
                  loop={true}
                  className="w-full h-full"
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: true
                  }}
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h3 className="text-3xl font-bold text-plum-dark mb-6">Why Choose Skill-Nex?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="p-6 bg-white rounded-xl border border-rose-light">
                <h4 className="font-bold text-plum-dark mb-2">AI-Powered</h4>
                <p className="text-sm text-gray-600">Advanced algorithms for personalized recommendations</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-rose-light">
                <h4 className="font-bold text-plum-dark mb-2">Real-Time Data</h4>
                <p className="text-sm text-gray-600">Industry insights updated continuously</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-rose-light">
                <h4 className="font-bold text-plum-dark mb-2">Curated Resources</h4>
                <p className="text-sm text-gray-600">Hand-picked courses and learning materials</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-rose-light">
                <h4 className="font-bold text-plum-dark mb-2">Career Focused</h4>
                <p className="text-sm text-gray-600">Aligned with industry requirements</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mauve to-plum-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-cream mb-8">
              Join thousands of students discovering their perfect career path
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile-input')}
              className="px-8 py-4 bg-white text-plum-dark rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Now →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

