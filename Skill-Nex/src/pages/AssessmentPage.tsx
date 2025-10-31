import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const AssessmentPage = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isComplete, setIsComplete] = useState(false)

  // Sample psychometric and personality assessment questions
  const questions = [
    {
      id: 0,
      question: "When working on a project, I prefer to:",
      options: [
        "Work independently and at my own pace",
        "Collaborate with a team and share ideas",
        "Lead the team and delegate tasks",
        "Support others and help where needed"
      ],
      category: "Work Style"
    },
    {
      id: 1,
      question: "I feel most energized when:",
      options: [
        "Solving complex problems",
        "Creating something new",
        "Helping others succeed",
        "Organizing and planning"
      ],
      category: "Motivation"
    },
    {
      id: 2,
      question: "When faced with a challenge, I typically:",
      options: [
        "Analyze the situation logically",
        "Trust my intuition and instincts",
        "Seek advice from others",
        "Break it down into smaller steps"
      ],
      category: "Problem Solving"
    },
    {
      id: 3,
      question: "In my ideal career, I would:",
      options: [
        "Work with data and technology",
        "Express creativity and innovation",
        "Interact with people regularly",
        "Manage processes and systems"
      ],
      category: "Career Preference"
    },
    {
      id: 4,
      question: "I learn best by:",
      options: [
        "Reading and researching",
        "Hands-on practice",
        "Discussion and collaboration",
        "Visual aids and demonstrations"
      ],
      category: "Learning Style"
    },
    {
      id: 5,
      question: "My greatest strength is:",
      options: [
        "Analytical thinking",
        "Creative problem-solving",
        "Communication skills",
        "Attention to detail"
      ],
      category: "Strengths"
    },
    {
      id: 6,
      question: "I prefer work environments that are:",
      options: [
        "Structured and predictable",
        "Dynamic and fast-paced",
        "Collaborative and social",
        "Flexible and autonomous"
      ],
      category: "Environment"
    },
    {
      id: 7,
      question: "When making decisions, I prioritize:",
      options: [
        "Facts and data",
        "Innovation and possibilities",
        "Impact on people",
        "Efficiency and practicality"
      ],
      category: "Decision Making"
    }
  ]

  const handleAnswer = (answer: string) => {
    const updatedAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(updatedAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsComplete(true)
      // Save assessment results to localStorage with the updated answers
      localStorage.setItem('assessmentResults', JSON.stringify(updatedAnswers))
      // Redirect to results page after 2 seconds
      setTimeout(() => {
        navigate('/assessment-results')
      }, 2000)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <svg className="w-16 h-16 mx-auto mb-6 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-4xl font-bold text-plum-dark mb-4">Assessment Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Analyzing your responses to generate personalized recommendations...
          </p>
          <div className="w-16 h-16 border-4 border-mauve border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-plum-dark mb-4">
            Career Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Answer these questions to help us understand your aptitudes and personality
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-mauve">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-mauve">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-mauve to-plum-dark h-3 rounded-full"
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-rose-light mb-8"
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-rose-light/30 text-plum-dark rounded-full text-sm font-semibold mb-4">
              {questions[currentQuestion].category}
            </span>
            <h2 className="text-2xl font-bold text-plum-dark">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  answers[currentQuestion] === option
                    ? 'border-mauve bg-rose-light/20'
                    : 'border-gray-200 hover:border-mauve/50 hover:bg-rose-light/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === option
                      ? 'border-mauve bg-mauve'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === option && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-mauve text-mauve hover:bg-rose-light/30'
            }`}
          >
            ← Previous
          </motion.button>

          {answers[currentQuestion] && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(answers[currentQuestion])}
              className="px-6 py-3 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next →'}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssessmentPage

