const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const students = [];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Skill-Nex API is running' });
});

// Save student profile
app.post('/api/profile', (req, res) => {
  try {
    const profile = req.body;
    
    // Validate required fields
    if (!profile.name || !profile.email || !profile.major) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if profile already exists
    const existingIndex = students.findIndex(s => s.email === profile.email);
    
    if (existingIndex >= 0) {
      // Update existing profile
      students[existingIndex] = { ...profile, updatedAt: new Date() };
      res.json({ message: 'Profile updated successfully', profile: students[existingIndex] });
    } else {
      // Create new profile
      const newProfile = { ...profile, createdAt: new Date(), updatedAt: new Date() };
      students.push(newProfile);
      res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

// Get student profile by email
app.get('/api/profile/:email', (req, res) => {
  try {
    const { email } = req.params;
    const profile = students.find(s => s.email === email);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get industry insights (mock data - replace with real API calls)
app.get('/api/industries', async (req, res) => {
  try {
    // Mock industry data
    const industries = [
      {
        name: 'Software Development',
        jobDemand: 92,
        salaryGrowth: 15.5,
        emergingSkills: ['AI/ML', 'Cloud Computing', 'DevOps', 'Cybersecurity'],
        openPositions: 450000,
        averageSalary: '$95,000'
      },
      {
        name: 'Data Science',
        jobDemand: 88,
        salaryGrowth: 18.2,
        emergingSkills: ['Deep Learning', 'Big Data', 'NLP', 'Data Visualization'],
        openPositions: 320000,
        averageSalary: '$110,000'
      },
      {
        name: 'Cybersecurity',
        jobDemand: 85,
        salaryGrowth: 20.1,
        emergingSkills: ['Ethical Hacking', 'Cloud Security', 'Zero Trust', 'Threat Intelligence'],
        openPositions: 280000,
        averageSalary: '$105,000'
      },
      {
        name: 'Cloud Computing',
        jobDemand: 90,
        salaryGrowth: 17.8,
        emergingSkills: ['Kubernetes', 'Serverless', 'Multi-Cloud', 'Infrastructure as Code'],
        openPositions: 380000,
        averageSalary: '$100,000'
      },
      {
        name: 'Mobile Development',
        jobDemand: 78,
        salaryGrowth: 12.3,
        emergingSkills: ['Flutter', 'React Native', 'SwiftUI', 'Kotlin'],
        openPositions: 220000,
        averageSalary: '$90,000'
      }
    ];

    res.json({ industries, lastUpdated: new Date() });
  } catch (error) {
    console.error('Error fetching industry data:', error);
    res.status(500).json({ error: 'Failed to fetch industry data' });
  }
});

// Get career recommendations based on profile
app.post('/api/recommendations/careers', (req, res) => {
  try {
    const { major, skills, interests } = req.body;

    // Mock career recommendations (replace with AI/ML model)
    const careers = [
      {
        title: 'Full Stack Developer',
        matchPercentage: 92,
        description: 'Build end-to-end web applications using modern frameworks and technologies',
        requiredSkills: ['React', 'Node.js', 'Database Management', 'API Development'],
        averageSalary: '$85,000 - $120,000',
        jobGrowth: '22%',
        openPositions: 150000
      },
      {
        title: 'Frontend Developer',
        matchPercentage: 88,
        description: 'Create engaging user interfaces and experiences for web applications',
        requiredSkills: ['React', 'TypeScript', 'CSS', 'UI/UX Design'],
        averageSalary: '$75,000 - $110,000',
        jobGrowth: '18%',
        openPositions: 120000
      },
      {
        title: 'Data Scientist',
        matchPercentage: 75,
        description: 'Analyze complex data sets to drive business decisions and insights',
        requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
        averageSalary: '$90,000 - $140,000',
        jobGrowth: '31%',
        openPositions: 95000
      },
      {
        title: 'DevOps Engineer',
        matchPercentage: 70,
        description: 'Automate and optimize development and deployment processes',
        requiredSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
        averageSalary: '$95,000 - $135,000',
        jobGrowth: '25%',
        openPositions: 85000
      }
    ];

    res.json({ careers });
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Get course recommendations
app.post('/api/recommendations/courses', (req, res) => {
  try {
    const { skills, level } = req.body;

    // Mock course recommendations
    const courses = [
      {
        title: 'Complete React Developer Course',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/react-the-complete-guide/',
        duration: '40 hours',
        level: 'Intermediate',
        rating: 4.7,
        students: 250000
      },
      {
        title: 'Node.js - The Complete Guide',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
        duration: '35 hours',
        level: 'Intermediate',
        rating: 4.6,
        students: 180000
      },
      {
        title: 'TypeScript for Beginners',
        platform: 'freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=gp5H0Vw39yw',
        duration: '5 hours',
        level: 'Beginner',
        rating: 4.8,
        students: 500000
      },
      {
        title: 'Python for Data Science',
        platform: 'Coursera',
        url: 'https://www.coursera.org/learn/python-for-applied-data-science-ai',
        duration: '25 hours',
        level: 'Beginner',
        rating: 4.5,
        students: 320000
      },
      {
        title: 'AWS Certified Solutions Architect',
        platform: 'A Cloud Guru',
        url: 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c03',
        duration: '30 hours',
        level: 'Advanced',
        rating: 4.7,
        students: 150000
      }
    ];

    res.json({ courses });
  } catch (error) {
    console.error('Error generating course recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Get skill pathways
app.post('/api/recommendations/skills', (req, res) => {
  try {
    const { currentSkills, targetCareer } = req.body;

    // Mock skill pathways
    const pathways = [
      {
        category: 'Technical Skills',
        skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'SQL'],
        priority: 'High',
        estimatedTime: '6-8 months'
      },
      {
        category: 'Soft Skills',
        skills: ['Communication', 'Team Collaboration', 'Problem Solving', 'Time Management'],
        priority: 'High',
        estimatedTime: '3-4 months'
      },
      {
        category: 'Advanced Technical',
        skills: ['Machine Learning', 'Cloud Computing (AWS)', 'Docker', 'Kubernetes'],
        priority: 'Medium',
        estimatedTime: '8-12 months'
      }
    ];

    res.json({ pathways });
  } catch (error) {
    console.error('Error generating skill pathways:', error);
    res.status(500).json({ error: 'Failed to generate skill pathways' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Skill-Nex API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

