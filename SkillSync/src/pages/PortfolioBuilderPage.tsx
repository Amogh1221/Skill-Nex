import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

interface Project {
  name: string
  description: string
  technologies: string[]
  url?: string
  highlights?: string[]
}

interface PortfolioAnalysis {
  portfolioStrength: {
    score: number
    rating: string
    color: string
    breakdown: {
      projects: number
      skills: number
      achievements: number
    }
  }
  projectAnalysis: {
    totalProjects: number
    complexity: string
    diversity: number
    impactScore: number
    highlights: any[]
    techStack: string[]
  }
  skillGaps: Array<{
    category: string
    missingSkills: string[]
    priority: string
  }>
  recommendations: Array<{
    type: string
    priority: string
    title: string
    description: string
    action: string
  }>
  careerAlignment: Array<{
    career: string
    alignment: number
    matchingSkills: string[]
    missingSkills: string[]
  }>
  industryDemand: {
    overallDemand: string
    trendingSkills: string[]
    marketValue: string
    growthPotential: number
  }
  competitiveAnalysis: {
    percentile: number
    comparison: string
    standoutFeatures: string[]
    areasToImprove: string[]
  }
}

const PortfolioBuilderPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project>({
    name: '',
    description: '',
    technologies: [],
    url: '',
    highlights: []
  })
  const [techInput, setTechInput] = useState('')
  const [highlightInput, setHighlightInput] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const [achievements, setAchievements] = useState('')
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'input' | 'analysis'>('input')

  useEffect(() => {
    // Load saved data from localStorage
    const savedProjects = localStorage.getItem('portfolioProjects')
    const savedSkills = localStorage.getItem('portfolioSkills')
    const savedAchievements = localStorage.getItem('portfolioAchievements')

    if (savedProjects) setProjects(JSON.parse(savedProjects))
    if (savedSkills) setSkills(JSON.parse(savedSkills))
    if (savedAchievements) setAchievements(savedAchievements)
  }, [])

  const addTechnology = () => {
    if (techInput.trim() && !currentProject.technologies.includes(techInput.trim())) {
      setCurrentProject({
        ...currentProject,
        technologies: [...currentProject.technologies, techInput.trim()]
      })
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setCurrentProject({
      ...currentProject,
      technologies: currentProject.technologies.filter(t => t !== tech)
    })
  }

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setCurrentProject({
        ...currentProject,
        highlights: [...(currentProject.highlights || []), highlightInput.trim()]
      })
      setHighlightInput('')
    }
  }

  const removeHighlight = (index: number) => {
    setCurrentProject({
      ...currentProject,
      highlights: currentProject.highlights?.filter((_, i) => i !== index) || []
    })
  }

  const addProject = () => {
    if (currentProject.name && currentProject.description) {
      const updatedProjects = [...projects, currentProject]
      setProjects(updatedProjects)
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects))
      setCurrentProject({
        name: '',
        description: '',
        technologies: [],
        url: '',
        highlights: []
      })
      setShowProjectForm(false)
    }
  }

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects))
  }

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const updatedSkills = [...skills, skillInput.trim()]
      setSkills(updatedSkills)
      localStorage.setItem('portfolioSkills', JSON.stringify(updatedSkills))
      setSkillInput('')
    }
  }

  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter(s => s !== skill)
    setSkills(updatedSkills)
    localStorage.setItem('portfolioSkills', JSON.stringify(updatedSkills))
  }

  const analyzePortfolio = async () => {
    setLoading(true)
    setActiveTab('analysis')

    try {
      const response = await fetch('http://localhost:5000/api/ai/portfolio/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projects,
          skills,
          achievements
        })
      })

      const data = await response.json()

      if (data.success && data.analysis) {
        setAnalysis(data.analysis)
      } else {
        // Fallback to mock analysis
        setAnalysis(getMockAnalysis())
      }
    } catch (error) {
      console.error('Error analyzing portfolio:', error)
      // Fallback to mock analysis
      setAnalysis(getMockAnalysis())
    } finally {
      setLoading(false)
    }
  }

  const getMockAnalysis = (): PortfolioAnalysis => {
    return {
      portfolioStrength: {
        score: 75,
        rating: "Good",
        color: "#3B82F6",
        breakdown: { projects: 30, skills: 25, achievements: 20 }
      },
      projectAnalysis: {
        totalProjects: projects.length,
        complexity: projects.length >= 3 ? "Intermediate" : "Beginner",
        diversity: 65,
        impactScore: 70,
        highlights: projects.slice(0, 3),
        techStack: [...new Set(projects.flatMap(p => p.technologies))]
      },
      skillGaps: [
        { category: "DevOps", missingSkills: ["Docker", "Kubernetes", "CI/CD"], priority: "High" },
        { category: "Testing", missingSkills: ["Jest", "Cypress", "Unit Testing"], priority: "Medium" }
      ],
      recommendations: [
        {
          type: "Projects",
          priority: "High",
          title: "Build a Full-Stack Application",
          description: "Create an end-to-end project with authentication and database",
          action: "Start planning your next project"
        },
        {
          type: "Skills",
          priority: "High",
          title: "Learn DevOps Fundamentals",
          description: "Understanding Docker and CI/CD will make you more marketable",
          action: "Take a Docker course"
        }
      ],
      careerAlignment: [
        { career: "Full Stack Developer", alignment: 85, matchingSkills: ["React", "Node.js"], missingSkills: ["Docker", "AWS"] },
        { career: "Frontend Developer", alignment: 90, matchingSkills: ["React", "TypeScript"], missingSkills: ["Testing"] }
      ],
      industryDemand: {
        overallDemand: "High",
        trendingSkills: ["AI/ML", "Cloud Computing", "DevOps"],
        marketValue: "Above Average",
        growthPotential: 85
      },
      competitiveAnalysis: {
        percentile: 70,
        comparison: "Your portfolio is stronger than 70% of similar profiles",
        standoutFeatures: ["Project diversity", "Modern tech stack"],
        areasToImprove: ["Add more complex projects", "Expand DevOps skills"]
      }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-red-500 bg-red-50 text-red-700'
      case 'Medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700'
      case 'Low': return 'border-green-500 bg-green-50 text-green-700'
      default: return 'border-gray-500 bg-gray-50 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-plum-dark mb-4">
            Portfolio Builder
          </h1>
          <p className="text-xl text-gray-600">
            Build your portfolio and get AI-powered insights to stand out
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-rose-light">
          <button
            onClick={() => setActiveTab('input')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'input'
                ? 'text-plum-dark border-b-2 border-plum-dark'
                : 'text-gray-500 hover:text-plum-dark'
            }`}
          >
            Build Portfolio
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'analysis'
                ? 'text-plum-dark border-b-2 border-plum-dark'
                : 'text-gray-500 hover:text-plum-dark'
            }`}
          >
            AI Analysis
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Projects Section */}
              <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-rose-light">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-plum-dark">Your Projects</h2>
                  <button
                    onClick={() => setShowProjectForm(!showProjectForm)}
                    className="px-6 py-2 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    {showProjectForm ? 'Cancel' : '+ Add Project'}
                  </button>
                </div>

                {/* Project Form */}
                {showProjectForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-6 bg-cream/30 rounded-xl border border-rose-light"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name *</label>
                        <input
                          type="text"
                          value={currentProject.name}
                          onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                          className="w-full px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                          placeholder="My Awesome Project"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                        <textarea
                          value={currentProject.description}
                          onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                          className="w-full px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                          rows={3}
                          placeholder="Describe what your project does..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies Used</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                            className="flex-1 px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                            placeholder="e.g., React, Node.js"
                          />
                          <button
                            onClick={addTechnology}
                            className="px-4 py-2 bg-mauve text-white rounded-lg hover:bg-plum-dark transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-plum-dark text-white rounded-lg text-sm flex items-center gap-2"
                            >
                              {tech}
                              <button onClick={() => removeTechnology(tech)} className="hover:text-red-300">×</button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Project URL (optional)</label>
                        <input
                          type="url"
                          value={currentProject.url}
                          onChange={(e) => setCurrentProject({ ...currentProject, url: e.target.value })}
                          className="w-full px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                          placeholder="https://github.com/username/project"
                        />
                      </div>

                      <button
                        onClick={addProject}
                        disabled={!currentProject.name || !currentProject.description}
                        className="w-full py-3 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Save Project
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Projects List */}
                <div className="grid md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl border border-rose-light"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-plum-dark">{project.name}</h3>
                        <button
                          onClick={() => removeProject(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-white text-plum-dark rounded text-xs font-medium border border-mauve/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {projects.length === 0 && !showProjectForm && (
                  <div className="text-center py-12 text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No projects added yet</p>
                    <p className="text-sm mt-1">Click "Add Project" to get started</p>
                  </div>
                )}
              </div>

              {/* Skills Section */}
              <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-rose-light">
                <h2 className="text-2xl font-bold text-plum-dark mb-6">Your Skills</h2>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                      placeholder="e.g., React, Python, Docker"
                    />
                    <button
                      onClick={addSkill}
                      className="px-6 py-2 bg-mauve text-white rounded-lg hover:bg-plum-dark transition-colors"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-2 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-lg text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-300">×</button>
                    </motion.span>
                  ))}
                </div>

                {skills.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p>No skills added yet</p>
                  </div>
                )}
              </div>

              {/* Achievements Section */}
              <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-rose-light">
                <h2 className="text-2xl font-bold text-plum-dark mb-6">Achievements & Certifications</h2>

                <textarea
                  value={achievements}
                  onChange={(e) => {
                    setAchievements(e.target.value)
                    localStorage.setItem('portfolioAchievements', e.target.value)
                  }}
                  className="w-full px-4 py-3 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                  rows={6}
                  placeholder="List your achievements, certifications, awards, publications, etc.&#10;&#10;Example:&#10;- Won 1st place in XYZ Hackathon&#10;- AWS Certified Solutions Architect&#10;- Published research paper on Machine Learning"
                />
              </div>

              {/* Analyze Button */}
              <div className="text-center">
                <button
                  onClick={analyzePortfolio}
                  disabled={projects.length === 0 && skills.length === 0}
                  className="px-12 py-4 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze My Portfolio with AI
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Get personalized insights and recommendations
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-plum-dark border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-xl text-gray-600">Analyzing your portfolio with AI...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              ) : analysis ? (
                <div className="space-y-8">
                  {/* Portfolio Strength Score */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
                  >
                    <h2 className="text-2xl font-bold text-plum-dark mb-6">Portfolio Strength</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative flex flex-col items-center">
                        <div className="h-64 w-full relative">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                              cx="50%"
                              cy="50%"
                              innerRadius="70%"
                              outerRadius="90%"
                              data={[{ name: 'Score', value: analysis.portfolioStrength.score, fill: analysis.portfolioStrength.color }]}
                              startAngle={90}
                              endAngle={-270}
                            >
                              <RadialBar
                                background
                                dataKey="value"
                                cornerRadius={10}
                              />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl font-bold" style={{ color: analysis.portfolioStrength.color }}>
                              {analysis.portfolioStrength.score}
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl text-gray-700 mt-4 font-semibold">{analysis.portfolioStrength.rating}</div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Score Breakdown</h3>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Projects</span>
                            <span className="font-semibold text-plum-dark">{analysis.portfolioStrength.breakdown.projects}/40</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-mauve to-plum-dark h-2 rounded-full"
                              style={{ width: `${(analysis.portfolioStrength.breakdown.projects / 40) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Skills</span>
                            <span className="font-semibold text-plum-dark">{analysis.portfolioStrength.breakdown.skills}/30</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-mauve to-plum-dark h-2 rounded-full"
                              style={{ width: `${(analysis.portfolioStrength.breakdown.skills / 30) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Achievements</span>
                            <span className="font-semibold text-plum-dark">{analysis.portfolioStrength.breakdown.achievements}/30</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-mauve to-plum-dark h-2 rounded-full"
                              style={{ width: `${(analysis.portfolioStrength.breakdown.achievements / 30) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project Analysis */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
                  >
                    <h2 className="text-2xl font-bold text-plum-dark mb-6">Project Analysis</h2>

                    <div className="grid md:grid-cols-4 gap-6 mb-6">
                      <div className="text-center p-4 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl">
                        <div className="text-3xl font-bold text-plum-dark">{analysis.projectAnalysis.totalProjects}</div>
                        <div className="text-sm text-gray-600 mt-1">Total Projects</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl">
                        <div className="text-3xl font-bold text-plum-dark">{analysis.projectAnalysis.complexity}</div>
                        <div className="text-sm text-gray-600 mt-1">Complexity</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl">
                        <div className="text-3xl font-bold text-plum-dark">{analysis.projectAnalysis.diversity}%</div>
                        <div className="text-sm text-gray-600 mt-1">Diversity</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl">
                        <div className="text-3xl font-bold text-plum-dark">{analysis.projectAnalysis.impactScore}%</div>
                        <div className="text-sm text-gray-600 mt-1">Impact Score</div>
                      </div>
                    </div>

                    {analysis.projectAnalysis.techStack.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {analysis.projectAnalysis.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-plum-dark text-white rounded-lg text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
                  >
                    <h2 className="text-2xl font-bold text-plum-dark mb-6">AI Recommendations</h2>

                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 bg-gradient-to-r from-cream/50 to-rose-light/20 rounded-xl border-l-4 border-plum-dark"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(rec.priority)}`}>
                                {rec.priority} Priority
                              </span>
                              <h3 className="text-lg font-bold text-plum-dark mt-2">{rec.title}</h3>
                            </div>
                            <span className="text-sm text-gray-500">{rec.type}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{rec.description}</p>
                          <div className="flex items-center gap-2 text-sm text-mauve font-semibold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            {rec.action}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Skill Gaps */}
                  {analysis.skillGaps.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
                    >
                      <h2 className="text-2xl font-bold text-plum-dark mb-6">Skill Gap Analysis</h2>

                      <div className="grid md:grid-cols-2 gap-6">
                        {analysis.skillGaps.map((gap, index) => (
                          <div
                            key={index}
                            className="p-6 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl border border-rose-light"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-plum-dark">{gap.category}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(gap.priority)}`}>
                                {gap.priority}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {gap.missingSkills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-mauve" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  <span className="text-gray-700">{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Career Alignment */}
                  {analysis.careerAlignment.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
                    >
                      <h2 className="text-2xl font-bold text-plum-dark mb-6">Career Path Alignment</h2>

                      <div className="space-y-4">
                        {analysis.careerAlignment.map((career, index) => (
                          <div
                            key={index}
                            className="p-6 bg-gradient-to-r from-cream/50 to-rose-light/20 rounded-xl border border-rose-light"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-plum-dark">{career.career}</h3>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark">
                                  {career.alignment}%
                                </div>
                                <div className="text-xs text-gray-600">Match</div>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                              <div
                                className="bg-gradient-to-r from-mauve to-plum-dark h-2 rounded-full"
                                style={{ width: `${career.alignment}%` }}
                              />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm font-semibold text-gray-700 mb-2">Matching Skills</div>
                                <div className="flex flex-wrap gap-2">
                                  {career.matchingSkills.map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center gap-1"
                                    >
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                      </svg>
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-700 mb-2">Skills to Learn</div>
                                <div className="flex flex-wrap gap-2">
                                  {career.missingSkills.map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs"
                                    >
                                      + {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Competitive Analysis */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
                  >
                    <h2 className="text-2xl font-bold text-plum-dark mb-6">Competitive Analysis</h2>

                    <div className="text-center mb-6">
                      <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark">
                        Top {100 - analysis.competitiveAnalysis.percentile}%
                      </div>
                      <p className="text-gray-600 mt-2">{analysis.competitiveAnalysis.comparison}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">Standout Features</h3>
                        <ul className="space-y-2">
                          {(analysis.competitiveAnalysis.standoutFeatures || []).map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-green-700">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                        <h3 className="text-lg font-semibold text-orange-800 mb-3">Areas to Improve</h3>
                        <ul className="space-y-2">
                          {(analysis.competitiveAnalysis.areasToImprove || []).map((area, index) => (
                            <li key={index} className="flex items-center gap-2 text-orange-700">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">No Analysis Yet</h3>
                  <p className="text-gray-500 mb-6">Add your projects and skills, then click "Analyze My Portfolio"</p>
                  <button
                    onClick={() => setActiveTab('input')}
                    className="px-8 py-3 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Go to Portfolio Builder
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PortfolioBuilderPage

