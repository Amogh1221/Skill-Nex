import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface PersonalityTrait {
  name: string
  score: number
  description: string
}

interface PersonalityType {
  type: string
  description: string
  icon: string
}

interface CareerMatch {
  title: string
  matchPercentage: number
  description: string
  keySkills: string[]
  salaryRange: string
  growthRate: string
}

interface SkillRecommendation {
  name: string
  category: string
  priority: string
  reason: string
}

interface LearningStyle {
  style: string
  description: string
  recommendations: string[]
}

interface AssessmentAnalysis {
  personalityTraits: PersonalityTrait[]
  personalityType: PersonalityType
  careerMatches: CareerMatch[]
  skillRecommendations: SkillRecommendation[]
  learningStyle: LearningStyle
  strengths: string[]
  developmentAreas: string[]
}

const AssessmentResultsPage = () => {
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState<AssessmentAnalysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    analyzeAssessment()
  }, [])

  const analyzeAssessment = async () => {
    try {
      // Get assessment results from localStorage
      const assessmentResults = localStorage.getItem('assessmentResults')
      
      if (!assessmentResults) {
        navigate('/assessment')
        return
      }

      const answers = JSON.parse(assessmentResults)

      // Call AI backend for analysis
      const response = await fetch('http://localhost:5000/api/ai/assessment/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers })
      })

      const data = await response.json()

      if (data.success && data.analysis) {
        setAnalysis(data.analysis)
        // Save analysis to localStorage for dashboard
        localStorage.setItem('assessmentAnalysis', JSON.stringify(data.analysis))
      } else {
        console.error('Analysis failed:', data.error)
      }
    } catch (error) {
      console.error('Error analyzing assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContinueToDashboard = () => {
    navigate('/dashboard')
  }

  const getIconSvg = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      'chart-bar': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      'lightbulb': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      'user-group': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      'star': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      'rocket': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'check-circle': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'sparkles': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      'users': (
        <svg className="w-16 h-16 mx-auto text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
    return icons[iconName] || icons['chart-bar']
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <svg className="w-16 h-16 mx-auto mb-6 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h2 className="text-4xl font-bold text-plum-dark mb-4">Analyzing Your Responses</h2>
          <p className="text-xl text-gray-600 mb-6">
            Our AI is processing your assessment to generate personalized insights...
          </p>
          <div className="w-16 h-16 border-4 border-mauve border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-plum-dark mb-4">Unable to Load Results</h2>
          <p className="text-gray-600 mb-6">Please check that the AI backend server is running on port 5000.</p>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mb-4">{getIconSvg(analysis.personalityType.icon)}</div>
          <h1 className="text-5xl font-bold text-plum-dark mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-gray-600">
            Personalized insights based on your responses
          </p>
        </motion.div>

        {/* Personality Type Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-mauve to-plum-dark text-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">{analysis.personalityType.type}</h2>
          <p className="text-lg opacity-90">{analysis.personalityType.description}</p>
        </motion.div>

        {/* Personality Traits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-rose-light"
        >
          <h2 className="text-2xl font-bold text-plum-dark mb-6">Your Top Personality Traits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {analysis.personalityTraits.map((trait, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-plum-dark">{trait.name}</span>
                  <span className="text-mauve font-bold">{trait.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.score}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className="bg-gradient-to-r from-mauve to-plum-dark h-3 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600">{trait.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Strengths and Development Areas */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-plum-dark">Your Strengths</h2>
            </div>
            <ul className="space-y-3">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-mauve mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h2 className="text-2xl font-bold text-plum-dark">Growth Opportunities</h2>
            </div>
            {analysis.developmentAreas.length > 0 ? (
              <ul className="space-y-3">
                {analysis.developmentAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-mauve mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have a well-rounded skill set! Keep building on your strengths.</p>
            )}
          </motion.div>
        </div>

        {/* Learning Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-rose-light"
        >
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-2xl font-bold text-plum-dark">Your Learning Style</h2>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-mauve mb-2">{analysis.learningStyle.style}</h3>
            <p className="text-gray-700 mb-4">{analysis.learningStyle.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-plum-dark mb-2">Recommended Learning Approaches:</h4>
            <ul className="grid md:grid-cols-3 gap-3">
              {analysis.learningStyle.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2 bg-rose-light/20 px-4 py-2 rounded-lg">
                  <svg className="w-4 h-4 text-mauve flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="3" />
                  </svg>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Career Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-rose-light"
        >
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-plum-dark">Top Career Matches</h2>
          </div>
          <div className="space-y-6">
            {analysis.careerMatches.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl border border-rose-light"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-plum-dark">{career.title}</h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark">
                      {career.matchPercentage}%
                    </div>
                    <div className="text-xs text-gray-600">Match</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{career.description}</p>
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm font-semibold text-plum-dark">Salary Range:</span>
                    <p className="text-mauve font-semibold">{career.salaryRange}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-plum-dark">Growth Rate:</span>
                    <p className="text-mauve font-semibold">{career.growthRate}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-plum-dark">Key Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {career.keySkills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-mauve/20 text-plum-dark px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinueToDashboard}
            className="px-12 py-4 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Continue to Dashboard →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default AssessmentResultsPage

