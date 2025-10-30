import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface StudentProfile {
  name: string
  email: string
  academicHistory: string
  currentYear: string
  major: string
  grades: string
  projects: string
  achievements: string
}

const ProfileInputPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<StudentProfile>({
    name: '',
    email: '',
    academicHistory: '',
    currentYear: '',
    major: '',
    grades: '',
    projects: '',
    achievements: ''
  })

  const [errors, setErrors] = useState<Partial<StudentProfile>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof StudentProfile]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<StudentProfile> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.academicHistory.trim()) newErrors.academicHistory = 'Academic history is required'
    if (!formData.currentYear) newErrors.currentYear = 'Current year is required'
    if (!formData.major.trim()) newErrors.major = 'Major/Field of study is required'
    if (!formData.grades.trim()) newErrors.grades = 'Grades/GPA is required'
    if (!formData.projects.trim()) newErrors.projects = 'At least one project is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Store in localStorage for now (will be replaced with API call)
      localStorage.setItem('studentProfile', JSON.stringify(formData))
      
      // Navigate to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile. Please try again.')
    }
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-plum-dark mb-4">Tell Us About Yourself</h1>
            <p className="text-xl text-gray-600">
              Help us understand your academic journey to provide personalized recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-rose-light p-8">
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-plum-dark mb-6 flex items-center gap-2">
                <svg className="w-7 h-7 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-rose-light'
                    } focus:outline-none focus:ring-2 focus:ring-mauve`}
                    
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-rose-light'
                    } focus:outline-none focus:ring-2 focus:ring-mauve`}
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-plum-dark mb-6 flex items-center gap-2">
                <svg className="w-7 h-7 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Academic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="currentYear"
                    value={formData.currentYear}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.currentYear ? 'border-red-500' : 'border-rose-light'
                    } focus:outline-none focus:ring-2 focus:ring-mauve`}
                  >
                    <option value="">Select Year</option>
                    <option value="High School">High School</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                  {errors.currentYear && <p className="text-red-500 text-sm mt-1">{errors.currentYear}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Major/Field of Study <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.major ? 'border-red-500' : 'border-rose-light'
                    } focus:outline-none focus:ring-2 focus:ring-mauve`}
                    placeholder="For Example: Computer Science"
                  />
                  {errors.major && <p className="text-red-500 text-sm mt-1">{errors.major}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Academic History <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="academicHistory"
                  value={formData.academicHistory}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.academicHistory ? 'border-red-500' : 'border-rose-light'
                  } focus:outline-none focus:ring-2 focus:ring-mauve`}
                  placeholder="Describe your educational background, institutions attended, relevant coursework..."
                />
                {errors.academicHistory && <p className="text-red-500 text-sm mt-1">{errors.academicHistory}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grades/GPA <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="grades"
                  value={formData.grades}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.grades ? 'border-red-500' : 'border-rose-light'
                  } focus:outline-none focus:ring-2 focus:ring-mauve`}
                  placeholder="Enter your grades or GPA"
                />
                {errors.grades && <p className="text-red-500 text-sm mt-1">{errors.grades}</p>}
              </div>
            </div>

            {/* Projects & Achievements */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-plum-dark mb-6 flex items-center gap-2">
                <svg className="w-7 h-7 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Projects & Achievements
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Projects <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.projects ? 'border-red-500' : 'border-rose-light'
                  } focus:outline-none focus:ring-2 focus:ring-mauve`}
                  placeholder="List your projects with brief descriptions. Include technologies used and outcomes..."
                />
                {errors.projects && <p className="text-red-500 text-sm mt-1">{errors.projects}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Achievements <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-rose-light focus:outline-none focus:ring-2 focus:ring-mauve"
                  placeholder="Awards, certifications, competitions, publications, leadership roles..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-4 border-2 border-mauve text-mauve rounded-xl font-semibold text-lg hover:bg-rose-light/30 transition-all"
              >
                ← Back
              </motion.button>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Continue to Dashboard →
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfileInputPage

