import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts'
import userProfileImg from '../assets/userprofile.jpg'

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

interface SkillPathway {
  category: string
  skills: string[]
  priority: 'High' | 'Medium' | 'Low'
}

interface Course {
  title: string
  platform: string
  url: string
  duration: string
  level: string
}

interface Career {
  title: string
  matchPercentage: number
  description: string
  requiredSkills: string[]
  averageSalary: string
}

interface CalendarEvent {
  date: string
  title: string
  description: string
  type: 'task' | 'deadline' | 'reminder'
}

const DashboardPage = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [skillPathways, setSkillPathways] = useState<SkillPathway[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [careers, setCareers] = useState<Career[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [showEventModal, setShowEventModal] = useState(false)
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    date: '',
    title: '',
    description: '',
    type: 'task'
  })

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('studentProfile')
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile)
        setProfile(parsedProfile)

        // Generate personalized recommendations based on profile
        const major = parsedProfile.major.toLowerCase()
        setSkillPathways(generateSkillPathways(major))
        setCourses(generateCourses(major))
        setCareers(generateCareers(major))
      } catch (error) {
        console.error('Error parsing profile:', error)
      }
    }

    // Load calendar events from localStorage
    const savedEvents = localStorage.getItem('calendarEvents')
    if (savedEvents) {
      try {
        setCalendarEvents(JSON.parse(savedEvents))
      } catch (error) {
        console.error('Error parsing events:', error)
      }
    }
  }, [])

  // Save events to localStorage whenever they change (debounced for performance)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (calendarEvents.length > 0) {
        localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents))
      }
    }, 300) // Debounce by 300ms to avoid excessive localStorage writes

    return () => clearTimeout(timeoutId)
  }, [calendarEvents])

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const formatDate = useCallback((date: Date) => {
    return date.toISOString().split('T')[0]
  }, [])

  const addEvent = useCallback(() => {
    if (newEvent.title && newEvent.date) {
      setCalendarEvents([...calendarEvents, newEvent])
      setNewEvent({ date: '', title: '', description: '', type: 'task' })
      setShowEventModal(false)
    }
  }, [newEvent, calendarEvents])

  const deleteEvent = useCallback((index: number) => {
    const updatedEvents = calendarEvents.filter((_, i) => i !== index)
    setCalendarEvents(updatedEvents)
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents))
  }, [calendarEvents])

  const generateSkillPathways = (major: string): SkillPathway[] => {
    // Base soft skills for all majors
    const baseSoftSkills: SkillPathway = {
      category: 'Soft Skills',
      skills: ['Communication', 'Team Collaboration', 'Problem Solving', 'Time Management', 'Critical Thinking'],
      priority: 'High'
    }

    // Major-specific technical skills
    if (major.includes('computer') || major.includes('software') || major.includes('cs') || major.includes('it')) {
      return [
        {
          category: 'Core Technical Skills',
          skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management', 'Git & Version Control', 'API Development'],
          priority: 'High'
        },
        {
          category: 'Web Development',
          skills: ['React.js', 'Node.js', 'TypeScript', 'HTML/CSS', 'RESTful APIs'],
          priority: 'High'
        },
        baseSoftSkills,
        {
          category: 'Advanced Technical',
          skills: ['Cloud Computing (AWS/Azure)', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Microservices Architecture'],
          priority: 'Medium'
        }
      ]
    } else if (major.includes('data') || major.includes('analytics') || major.includes('statistics')) {
      return [
        {
          category: 'Data Analysis',
          skills: ['Python', 'SQL', 'Pandas & NumPy', 'Data Visualization (Tableau/PowerBI)', 'Excel Advanced'],
          priority: 'High'
        },
        {
          category: 'Machine Learning',
          skills: ['Scikit-learn', 'TensorFlow/PyTorch', 'Statistical Modeling', 'Feature Engineering', 'Model Evaluation'],
          priority: 'High'
        },
        baseSoftSkills,
        {
          category: 'Big Data & Cloud',
          skills: ['Apache Spark', 'Hadoop', 'AWS/GCP', 'Data Warehousing', 'ETL Processes'],
          priority: 'Medium'
        }
      ]
    } else if (major.includes('business') || major.includes('management') || major.includes('mba')) {
      return [
        {
          category: 'Business Analytics',
          skills: ['Excel & Spreadsheets', 'Data Analysis', 'Financial Modeling', 'Market Research', 'SQL Basics'],
          priority: 'High'
        },
        {
          category: 'Leadership & Strategy',
          skills: ['Project Management', 'Strategic Planning', 'Stakeholder Management', 'Business Intelligence', 'Agile Methodologies'],
          priority: 'High'
        },
        baseSoftSkills,
        {
          category: 'Digital Skills',
          skills: ['CRM Systems', 'Digital Marketing', 'E-commerce Platforms', 'Business Process Automation'],
          priority: 'Medium'
        }
      ]
    } else {
      // Default for other majors
      return [
        {
          category: 'Technical Skills',
          skills: ['Microsoft Office Suite', 'Data Analysis Basics', 'Programming Fundamentals', 'Digital Literacy', 'Research Methods'],
          priority: 'High'
        },
        baseSoftSkills,
        {
          category: 'Professional Development',
          skills: ['Project Management', 'Presentation Skills', 'Technical Writing', 'Industry-Specific Tools'],
          priority: 'Medium'
        }
      ]
    }
  }

  const generateCourses = (major: string): Course[] => {
    if (major.includes('computer') || major.includes('software') || major.includes('cs') || major.includes('it')) {
      return [
        {
          title: 'Complete Web Development Bootcamp',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
          duration: '65 hours',
          level: 'Beginner to Advanced'
        },
        {
          title: 'React - The Complete Guide',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/react-the-complete-guide/',
          duration: '40 hours',
          level: 'Intermediate'
        },
        {
          title: 'Node.js Developer Course',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
          duration: '35 hours',
          level: 'Intermediate'
        },
        {
          title: 'Data Structures and Algorithms',
          platform: 'freeCodeCamp',
          url: 'https://www.youtube.com/watch?v=8hly31xKli0',
          duration: '5 hours',
          level: 'Intermediate'
        },
        {
          title: 'AWS Certified Solutions Architect',
          platform: 'A Cloud Guru',
          url: 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c03',
          duration: '30 hours',
          level: 'Advanced'
        }
      ]
    } else if (major.includes('data') || major.includes('analytics') || major.includes('statistics')) {
      return [
        {
          title: 'Python for Data Science and Machine Learning',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
          duration: '25 hours',
          level: 'Beginner to Intermediate'
        },
        {
          title: 'Machine Learning Specialization',
          platform: 'Coursera',
          url: 'https://www.coursera.org/specializations/machine-learning-introduction',
          duration: '3 months',
          level: 'Intermediate'
        },
        {
          title: 'SQL for Data Analysis',
          platform: 'Udacity',
          url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198',
          duration: '4 weeks',
          level: 'Beginner'
        },
        {
          title: 'Data Visualization with Tableau',
          platform: 'Coursera',
          url: 'https://www.coursera.org/learn/data-visualization',
          duration: '20 hours',
          level: 'Beginner'
        },
        {
          title: 'Deep Learning Specialization',
          platform: 'Coursera',
          url: 'https://www.coursera.org/specializations/deep-learning',
          duration: '5 months',
          level: 'Advanced'
        }
      ]
    } else if (major.includes('business') || major.includes('management') || major.includes('mba')) {
      return [
        {
          title: 'Business Analytics Specialization',
          platform: 'Coursera',
          url: 'https://www.coursera.org/specializations/business-analytics',
          duration: '6 months',
          level: 'Intermediate'
        },
        {
          title: 'Project Management Professional (PMP)',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/',
          duration: '35 hours',
          level: 'Intermediate'
        },
        {
          title: 'Digital Marketing Specialization',
          platform: 'Coursera',
          url: 'https://www.coursera.org/specializations/digital-marketing',
          duration: '6 months',
          level: 'Beginner'
        },
        {
          title: 'Financial Modeling & Valuation',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/financial-modeling-for-business-analysts-and-consultants/',
          duration: '15 hours',
          level: 'Intermediate'
        },
        {
          title: 'Strategic Leadership and Management',
          platform: 'Coursera',
          url: 'https://www.coursera.org/specializations/strategic-leadership',
          duration: '4 months',
          level: 'Advanced'
        }
      ]
    } else {
      return [
        {
          title: 'Learning How to Learn',
          platform: 'Coursera',
          url: 'https://www.coursera.org/learn/learning-how-to-learn',
          duration: '15 hours',
          level: 'Beginner'
        },
        {
          title: 'Critical Thinking Skills',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/critical-thinking-skills/',
          duration: '3 hours',
          level: 'Beginner'
        },
        {
          title: 'Professional Communication',
          platform: 'Coursera',
          url: 'https://www.coursera.org/learn/professional-communication',
          duration: '20 hours',
          level: 'Beginner'
        },
        {
          title: 'Introduction to Programming',
          platform: 'freeCodeCamp',
          url: 'https://www.freecodecamp.org/',
          duration: 'Self-paced',
          level: 'Beginner'
        },
        {
          title: 'Data Analysis with Excel',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/microsoft-excel-2013-from-beginner-to-advanced-and-beyond/',
          duration: '18 hours',
          level: 'Beginner to Intermediate'
        }
      ]
    }
  }

  const generateCareers = (major: string): Career[] => {
    if (major.includes('computer') || major.includes('software') || major.includes('cs') || major.includes('it')) {
      return [
        {
          title: 'Full Stack Developer',
          matchPercentage: 95,
          description: 'Build end-to-end web applications using modern frameworks and technologies',
          requiredSkills: ['React', 'Node.js', 'Database Management', 'API Development'],
          averageSalary: '₹7,00,000 - ₹10,00,000'
        },
        {
          title: 'Software Engineer',
          matchPercentage: 92,
          description: 'Design, develop, and maintain software systems and applications',
          requiredSkills: ['Programming', 'Data Structures', 'System Design', 'Testing'],
          averageSalary: '₹7,50,000 - ₹11,00,000'
        },
        {
          title: 'DevOps Engineer',
          matchPercentage: 85,
          description: 'Automate and optimize development and deployment processes',
          requiredSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
          averageSalary: '₹8,00,000 - ₹11,50,000'
        },
        {
          title: 'Cloud Solutions Architect',
          matchPercentage: 80,
          description: 'Design and implement cloud infrastructure and solutions',
          requiredSkills: ['AWS/Azure', 'System Architecture', 'Security', 'Networking'],
          averageSalary: '₹9,00,000 - ₹13,50,000'
        }
      ]
    } else if (major.includes('data') || major.includes('analytics') || major.includes('statistics')) {
      return [
        {
          title: 'Data Scientist',
          matchPercentage: 95,
          description: 'Analyze complex data sets to drive business decisions and insights',
          requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
          averageSalary: '₹7,50,000 - ₹12,00,000'
        },
        {
          title: 'Machine Learning Engineer',
          matchPercentage: 90,
          description: 'Build and deploy ML models for production systems',
          requiredSkills: ['Python', 'TensorFlow/PyTorch', 'MLOps', 'Cloud Platforms'],
          averageSalary: '₹8,50,000 - ₹12,50,000'
        },
        {
          title: 'Data Analyst',
          matchPercentage: 88,
          description: 'Transform data into actionable insights for business stakeholders',
          requiredSkills: ['SQL', 'Excel', 'Tableau/PowerBI', 'Statistical Analysis'],
          averageSalary: '₹5,50,000 - ₹8,00,000'
        },
        {
          title: 'Business Intelligence Analyst',
          matchPercentage: 82,
          description: 'Create dashboards and reports to support business decisions',
          requiredSkills: ['SQL', 'BI Tools', 'Data Modeling', 'Business Acumen'],
          averageSalary: '₹6,00,000 - ₹9,00,000'
        }
      ]
    } else if (major.includes('business') || major.includes('management') || major.includes('mba')) {
      return [
        {
          title: 'Product Manager',
          matchPercentage: 92,
          description: 'Lead product strategy and development from conception to launch',
          requiredSkills: ['Product Strategy', 'Market Research', 'Agile', 'Stakeholder Management'],
          averageSalary: '₹8,00,000 - ₹12,00,000'
        },
        {
          title: 'Business Analyst',
          matchPercentage: 90,
          description: 'Bridge the gap between business needs and technical solutions',
          requiredSkills: ['Requirements Analysis', 'SQL', 'Process Modeling', 'Communication'],
          averageSalary: '₹6,00,000 - ₹8,50,000'
        },
        {
          title: 'Management Consultant',
          matchPercentage: 85,
          description: 'Advise organizations on strategy and operational improvements',
          requiredSkills: ['Strategic Thinking', 'Problem Solving', 'Presentation', 'Industry Knowledge'],
          averageSalary: '₹7,00,000 - ₹11,00,000'
        },
        {
          title: 'Digital Marketing Manager',
          matchPercentage: 80,
          description: 'Plan and execute digital marketing campaigns across channels',
          requiredSkills: ['SEO/SEM', 'Analytics', 'Content Strategy', 'Social Media'],
          averageSalary: '₹5,50,000 - ₹8,00,000'
        }
      ]
    } else {
      return [
        {
          title: 'Project Coordinator',
          matchPercentage: 85,
          description: 'Support project planning and execution across teams',
          requiredSkills: ['Organization', 'Communication', 'Time Management', 'MS Office'],
          averageSalary: '₹4,20,000 - ₹6,00,000'
        },
        {
          title: 'Research Analyst',
          matchPercentage: 82,
          description: 'Conduct research and analysis to support organizational goals',
          requiredSkills: ['Research Methods', 'Data Analysis', 'Report Writing', 'Critical Thinking'],
          averageSalary: '₹4,60,000 - ₹6,70,000'
        },
        {
          title: 'Operations Specialist',
          matchPercentage: 78,
          description: 'Optimize business processes and operational efficiency',
          requiredSkills: ['Process Improvement', 'Problem Solving', 'Data Analysis', 'Communication'],
          averageSalary: '₹5,00,000 - ₹7,10,000'
        },
        {
          title: 'Administrative Manager',
          matchPercentage: 75,
          description: 'Oversee administrative functions and support business operations',
          requiredSkills: ['Leadership', 'Organization', 'Communication', 'Office Management'],
          averageSalary: '₹4,60,000 - ₹6,30,000'
        }
      ]
    }
  }

  const careerChartData = useMemo(() => careers.map(career => ({
    name: career.title,
    value: career.matchPercentage,
    fill: career.matchPercentage >= 85 ? '#572E54' : career.matchPercentage >= 75 ? '#8E7692' : '#CEB2BD'
  })), [careers])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-300'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'Low': return 'bg-green-100 text-green-700 border-green-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = useMemo(() => getDaysInMonth(selectedDate), [selectedDate])
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Memoize events map for better performance
  const eventsMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    calendarEvents.forEach(event => {
      const existing = map.get(event.date) || []
      map.set(event.date, [...existing, event])
    })
    return map
  }, [calendarEvents])

  // Optimized getEventsForDate using memoized map
  const getEventsForDateOptimized = useCallback((date: string) => {
    return eventsMap.get(date) || []
  }, [eventsMap])

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header Section - LeetCode Style */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-rose-light"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left - Profile Picture and Name */}
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-plum-dark shadow-lg">
                  <img
                    src={userProfileImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-plum-dark">{profile.name}</h1>
                  <p className="text-gray-600">{profile.email}</p>
                </div>
              </div>

              {/* Right - Student Details */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-mauve uppercase mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700"><span className="font-semibold">Current Year:</span> {profile.currentYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-gray-700"><span className="font-semibold">Major:</span> {profile.major}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-gray-700"><span className="font-semibold">GPA/Grades:</span> {profile.grades}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-mauve uppercase mb-3">Academic History</h3>
                  <p className="text-gray-600 text-sm bg-cream/30 p-3 rounded-lg leading-relaxed">{profile.academicHistory}</p>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-sm font-semibold text-mauve uppercase">Projects & Experience</h3>
                  <p className="text-gray-600 text-sm bg-cream/30 p-3 rounded-lg leading-relaxed">{profile.projects}</p>
                  {profile.achievements && (
                    <>
                      <h3 className="text-sm font-semibold text-mauve uppercase mt-4">Achievements</h3>
                      <p className="text-gray-600 text-sm bg-cream/30 p-3 rounded-lg leading-relaxed">{profile.achievements}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Calendar and Day Details Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Calendar - Left Side (2/3 width) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-rose-light"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-plum-dark">Calendar & Task Tracker</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedDate(new Date(year, month - 1, 1))}
                  className="p-2 hover:bg-rose-light/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-plum-dark min-w-[180px] text-center">
                  {monthNames[month]} {year}
                </span>
                <button
                  onClick={() => setSelectedDate(new Date(year, month + 1, 1))}
                  className="p-2 hover:bg-rose-light/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                const dayEvents = getEventsForDateOptimized(dateStr)
                const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    className={`p-2 rounded-lg border transition-all flex flex-col items-start min-h-[80px] hover:scale-105 active:scale-95 ${
                      isToday
                        ? 'bg-plum-dark text-white border-plum-dark font-bold'
                        : dayEvents.length > 0
                        ? 'bg-mauve/20 border-mauve text-plum-dark font-semibold'
                        : 'border-gray-200 hover:border-mauve hover:bg-rose-light/10'
                    }`}
                  >
                    <div className="text-sm font-semibold mb-1">{day}</div>
                    {dayEvents.length > 0 && (
                      <div className="w-full space-y-1">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`text-xs px-1 py-0.5 rounded truncate ${
                              isToday ? 'bg-white/20' : 'bg-plum-dark/10'
                            }`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs opacity-70">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Add Event Button */}
            <button
              onClick={() => setShowEventModal(true)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              + Add Event / Task
            </button>
          </motion.div>

          {/* Day Details - Right Side (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-rose-light"
          >
            <h3 className="text-xl font-bold text-plum-dark mb-4">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>

            <div className="space-y-3">
              {getEventsForDateOptimized(formatDate(selectedDate)).length > 0 ? (
                getEventsForDateOptimized(formatDate(selectedDate)).map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      event.type === 'deadline'
                        ? 'bg-red-50 border-red-500'
                        : event.type === 'reminder'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{event.title}</h4>
                        {event.description && (
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        )}
                        <span className="text-xs text-gray-500 mt-2 inline-block capitalize">{event.type}</span>
                      </div>
                      <button
                        onClick={() => deleteEvent(calendarEvents.findIndex(e => e === event))}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No events for this day</p>
                  <p className="text-sm mt-1">Click "Add Event" to create one</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-br from-mauve to-plum-dark p-6 rounded-2xl text-white cursor-pointer hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-3xl font-bold">{skillPathways.reduce((acc, sp) => acc + sp.skills.length, 0)}</div>
            </div>
            <div className="text-sm opacity-90">Skills to Learn</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-br from-rose-light to-mauve p-6 rounded-2xl text-white cursor-pointer hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div className="text-3xl font-bold">{courses.length}</div>
            </div>
            <div className="text-sm opacity-90">Recommended Courses</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => document.getElementById('careers-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-br from-cream to-rose-light p-6 rounded-2xl border border-rose-light cursor-pointer hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-10 h-10 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="text-3xl font-bold text-plum-dark">{careers.length}</div>
            </div>
            <div className="text-sm text-gray-700">Career Matches</div>
          </motion.div>

          {/* Portfolio Builder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            onClick={() => navigate('/portfolio-builder')}
            className="bg-gradient-to-br from-plum-dark to-mauve p-6 rounded-2xl text-white cursor-pointer hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-3xl font-bold">Build</div>
            </div>
            <div className="text-sm opacity-90">Portfolio Builder</div>
          </motion.div>
        </div>

        {/* Skills to Learn Section */}
        <motion.div
          id="skills-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-white p-6 rounded-2xl border border-rose-light">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-plum-dark">Skills to Learn</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Based on your profile and target careers, here are the skills you should focus on:
            </p>

            <div className="space-y-4">
              {skillPathways.map((pathway, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="p-6 bg-gradient-to-r from-cream/50 to-rose-light/30 rounded-xl border border-rose-light"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-plum-dark">{pathway.category}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(pathway.priority)}`}>
                      {pathway.priority} Priority
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pathway.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-white text-plum-dark rounded-lg border border-mauve font-medium text-sm hover:bg-mauve hover:text-white transition-all cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recommended Courses Section */}
        <motion.div
          id="courses-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="bg-white p-6 rounded-2xl border border-rose-light">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="text-2xl font-bold text-plum-dark">Recommended Courses</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Hand-picked courses to help you build the skills you need:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <a
                  key={index}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-gradient-to-br from-cream to-rose-light/30 rounded-xl border border-rose-light hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-plum-dark flex-1">{course.title}</h3>
                    <svg className="w-6 h-6 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-semibold">Platform:</span>
                      <span>{course.platform}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-semibold">Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Career Matches Section */}
        <motion.div
          id="careers-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-12"
        >
          <div className="bg-white p-6 rounded-2xl border border-rose-light">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-plum-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-plum-dark">Career Matches</h2>
            </div>

            {/* Career Match Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Career Match Analysis</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="90%"
                    data={careerChartData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      background
                      dataKey="value"
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
            </div>

            {/* Career Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {careers.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="p-6 bg-gradient-to-br from-cream/50 to-rose-light/20 rounded-xl border border-rose-light hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-plum-dark">{career.title}</h3>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mauve to-plum-dark">
                        {career.matchPercentage}%
                      </div>
                      <div className="text-xs text-gray-600">Match</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">{career.description}</p>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white text-plum-dark rounded-lg text-xs font-medium border border-mauve/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-rose-light">
                    <div className="text-sm text-gray-600">Average Salary</div>
                    <div className="text-lg font-bold text-plum-dark">{career.averageSalary}</div>
                  </div>

                  {/* Forage Job Simulation Button */}
                  <div className="mt-4">
                    <a
                      href={`https://www.theforage.com/simulations?search=${encodeURIComponent(career.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-4 bg-gradient-to-r from-mauve to-plum-dark text-white text-center rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Explore Job Simulations</span>
                      </div>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-plum-dark mb-6">Add Event / Task</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                    placeholder="Event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                    rows={3}
                    placeholder="Event description (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'task' | 'deadline' | 'reminder' })}
                    className="w-full px-4 py-2 border border-rose-light rounded-lg focus:outline-none focus:ring-2 focus:ring-mauve"
                  >
                    <option value="task">Task</option>
                    <option value="deadline">Deadline</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={addEvent}
                  className="flex-1 py-3 bg-gradient-to-r from-mauve to-plum-dark text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Add Event
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage

