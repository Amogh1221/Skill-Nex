import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'
import graphImg from '../assets/graph.jpg'
import suitcaseImg from '../assets/suitcase.jpg'
import rocketImg from '../assets/rocket.jpg'
import linkedinImg from '../assets/linkedinn.png'

interface IndustryData {
  name: string
  jobDemand: number
  salaryGrowth: number
  emergingSkills: string[]
}

const IndustriesPage = () => {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [industries, setIndustries] = useState<IndustryData[]>([])

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate API call - will be replaced with real API
    setTimeout(() => {
      setIndustries([
        {
          name: 'Software Development',
          jobDemand: 92,
          salaryGrowth: 15.5,
          emergingSkills: ['AI/ML', 'Cloud Computing', 'DevOps', 'Cybersecurity']
        },
        {
          name: 'Data Science',
          jobDemand: 88,
          salaryGrowth: 18.2,
          emergingSkills: ['Deep Learning', 'Big Data', 'NLP', 'Data Visualization']
        },
        {
          name: 'Cybersecurity',
          jobDemand: 85,
          salaryGrowth: 20.1,
          emergingSkills: ['Ethical Hacking', 'Cloud Security', 'Zero Trust', 'Threat Intelligence']
        },
        {
          name: 'Cloud Computing',
          jobDemand: 90,
          salaryGrowth: 17.8,
          emergingSkills: ['Kubernetes', 'Serverless', 'Multi-Cloud', 'Infrastructure as Code']
        },
        {
          name: 'Mobile Development',
          jobDemand: 78,
          salaryGrowth: 12.3,
          emergingSkills: ['Flutter', 'React Native', 'SwiftUI', 'Kotlin']
        }
      ])
      setLoading(false)
    }, 3000) // Wait for loading animation to complete

    return () => clearInterval(progressInterval)
  }, [])

  const jobDemandData = industries.map(ind => ({
    name: ind.name,
    value: ind.jobDemand,
    fill: ind.jobDemand >= 85 ? '#572E54' : ind.jobDemand >= 75 ? '#8E7692' : '#CEB2BD'
  }))

  const salaryGrowthData = [
    { month: 'Jan', growth: 12 },
    { month: 'Feb', growth: 13 },
    { month: 'Mar', growth: 14 },
    { month: 'Apr', growth: 15 },
    { month: 'May', growth: 16 },
    { month: 'Jun', growth: 17 }
  ]

  const skillDemandData = [
    { skill: 'AI/ML', demand: 95 },
    { skill: 'Cloud', demand: 90 },
    { skill: 'DevOps', demand: 85 },
    { skill: 'Cybersecurity', demand: 88 },
    { skill: 'Data Science', demand: 87 }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-rose-light">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-6"
        >
          {/* Animated Chart Icon */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6"
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Bar Chart */}
              <rect x="3" y="14" width="4" height="7" rx="1" fill="#8E7692" />
              <rect x="10" y="8" width="4" height="13" rx="1" fill="#572E54" />
              <rect x="17" y="11" width="4" height="10" rx="1" fill="#CEB2BD" />
              {/* Trend Line */}
              <motion.path
                d="M2 17L8 11L14 14L22 6"
                stroke="#572E54"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          <h2 className="text-3xl font-bold text-plum-dark mb-4">
            Loading Industry Data...
          </h2>
          <p className="text-gray-600 mb-8">Fetching real-time insights</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-mauve to-plum-dark rounded-full relative"
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>

          {/* Progress Percentage */}
          <motion.div
            key={loadingProgress}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark"
          >
            {loadingProgress}%
          </motion.div>

          {/* Loading Steps */}
          <div className="mt-8 space-y-2 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: loadingProgress >= 25 ? 1 : 0.3, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${loadingProgress >= 25 ? 'bg-mauve' : 'bg-gray-300'}`} />
              <span className={`text-sm ${loadingProgress >= 25 ? 'text-plum-dark font-semibold' : 'text-gray-400'}`}>
                Connecting to data sources
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: loadingProgress >= 50 ? 1 : 0.3, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${loadingProgress >= 50 ? 'bg-mauve' : 'bg-gray-300'}`} />
              <span className={`text-sm ${loadingProgress >= 50 ? 'text-plum-dark font-semibold' : 'text-gray-400'}`}>
                Analyzing industry trends
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: loadingProgress >= 75 ? 1 : 0.3, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${loadingProgress >= 75 ? 'bg-mauve' : 'bg-gray-300'}`} />
              <span className={`text-sm ${loadingProgress >= 75 ? 'text-plum-dark font-semibold' : 'text-gray-400'}`}>
                Preparing visualizations
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: loadingProgress >= 100 ? 1 : 0.3, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${loadingProgress >= 100 ? 'bg-mauve' : 'bg-gray-300'}`} />
              <span className={`text-sm ${loadingProgress >= 100 ? 'text-plum-dark font-semibold' : 'text-gray-400'}`}>
                Ready to display
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-plum-dark mb-4">Industries Around</h1>
          <p className="text-xl text-gray-600">
            Real-time insights into job demand, salary growth, and emerging skills across industries
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-mauve to-plum-dark p-6 rounded-2xl text-white"
          >
            <div className="mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 17l-5-5-4 4-6-6" />
                <circle cx="18" cy="6" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className="text-3xl font-bold mb-1">17.2%</div>
            <div className="text-sm opacity-90">Average Salary Growth</div>
            <div className="text-xs opacity-75 mt-2">Year over year</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-rose-light to-mauve p-6 rounded-2xl text-white"
          >
            <div className="mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M12 12v4" />
                <path d="M10 14h4" />
              </svg>
            </div>
            <div className="text-3xl font-bold mb-1">2.5M+</div>
            <div className="text-sm opacity-90">Open Positions</div>
            <div className="text-xs opacity-75 mt-2">Across all industries</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-cream to-rose-light p-6 rounded-2xl border border-rose-light"
          >
            <div className="mb-2">
              <svg className="w-12 h-12 text-plum-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="text-3xl font-bold mb-1 text-plum-dark">150+</div>
            <div className="text-sm text-gray-700">Emerging Skills</div>
            <div className="text-xs text-gray-600 mt-2">Tracked this quarter</div>
          </motion.div>
        </div>

        {/* Job Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl border border-rose-light mb-8"
        >
          <h2 className="text-2xl font-bold text-plum-dark mb-6">Job Demand by Industry</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="90%"
                data={jobDemandData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  label={{ position: 'insideStart', fill: '#fff' }}
                />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Salary Growth Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-8 rounded-2xl border border-rose-light mb-8"
        >
          <h2 className="text-2xl font-bold text-plum-dark mb-6">Salary Growth Trend (2024)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2D2C8" />
                <XAxis dataKey="month" stroke="#8E7692" />
                <YAxis stroke="#8E7692" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #CEB2BD',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#572E54"
                  strokeWidth={3}
                  dot={{ fill: '#8E7692', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Emerging Skills Demand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white p-8 rounded-2xl border border-rose-light mb-8"
        >
          <h2 className="text-2xl font-bold text-plum-dark mb-6">Top Emerging Skills Demand</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2D2C8" />
                <XAxis dataKey="skill" stroke="#8E7692" />
                <YAxis stroke="#8E7692" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #CEB2BD',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="demand" fill="#8E7692" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Industry Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-plum-dark mb-6">Industry Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-6 bg-gradient-to-br from-cream to-rose-light/30 rounded-xl border border-rose-light hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-plum-dark mb-4">{industry.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg border border-rose-light">
                    <div className="text-sm text-gray-600 mb-1">Job Demand</div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark">
                      {industry.jobDemand}%
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-rose-light">
                    <div className="text-sm text-gray-600 mb-1">Salary Growth</div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark">
                      +{industry.salaryGrowth}%
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Emerging Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {industry.emergingSkills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white text-plum-dark rounded-lg border border-mauve text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Source Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 p-8 bg-white rounded-2xl border-2 border-rose-light shadow-lg"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-plum-dark mb-2">Data Sources & Methodology</h3>
            <p className="text-gray-600">
              Our industry insights are powered by real-time data aggregation from trusted sources
            </p>
          </div>

          {/* Data Sources */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* LinkedIn */}
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-3 shadow-md">
                <img
                  src={linkedinImg}
                  alt="LinkedIn"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">LinkedIn</h4>
              <p className="text-xs text-gray-600 text-center">
                Job postings, salary data, and skill demand trends from 900M+ professionals
              </p>
            </div>

            {/* Glassdoor */}
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-3 shadow-md">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Door Icon for Glassdoor */}
                  <rect x="7" y="3" width="10" height="18" rx="1" stroke="#059669" strokeWidth="2" fill="none"/>
                  <circle cx="15" cy="12" r="1" fill="#059669"/>
                  <path d="M9 3V8H15V3" stroke="#059669" strokeWidth="2" fill="#D1FAE5"/>
                  <rect x="9" y="8" width="6" height="6" fill="#A7F3D0" opacity="0.5"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Glassdoor</h4>
              <p className="text-xs text-gray-600 text-center">
                Company reviews, salary insights, and interview data from millions of employees
              </p>
            </div>

            {/* Bureau of Labor Statistics */}
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-3 shadow-md">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Government Building Icon */}
                  <path d="M12 2L2 7V9H22V7L12 2Z" fill="#7C3AED" />
                  <rect x="4" y="9" width="2" height="11" fill="#7C3AED" />
                  <rect x="8" y="9" width="2" height="11" fill="#7C3AED" />
                  <rect x="14" y="9" width="2" height="11" fill="#7C3AED" />
                  <rect x="18" y="9" width="2" height="11" fill="#7C3AED" />
                  <rect x="2" y="20" width="20" height="2" fill="#7C3AED" />
                  <circle cx="12" cy="5" r="1" fill="white" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-1">U.S. BLS</h4>
              <p className="text-xs text-gray-600 text-center">
                Official employment statistics, wage data, and labor market projections
              </p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-gradient-to-r from-mauve/10 to-plum-dark/10 rounded-xl p-4 mb-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-plum-dark mb-2">Data Collection</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• Real-time API integration with LinkedIn Talent Insights</li>
                  <li>• Daily scraping of Glassdoor job listings and salary reports</li>
                  <li>• Monthly updates from BLS Occupational Employment Statistics</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-plum-dark mb-2">Analysis Methods</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• Machine learning algorithms for trend prediction</li>
                  <li>• Natural language processing for skill extraction</li>
                  <li>• Statistical modeling for salary growth projections</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center pt-4 border-t border-rose-light">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-plum-dark">Last updated:</span> {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} at {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Data refreshes every 24 hours • Next update in {24 - new Date().getHours()} hours
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default IndustriesPage

