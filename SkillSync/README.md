# 🎓 Skill-Nex - AI-Powered Career Path Recommender

**Skill-Nex** is an intelligent career guidance platform that helps students discover their ideal career paths, build relevant skills, and create professional portfolios. Using AI-powered analysis and real-time industry data, Skill-Nex provides personalized recommendations to help students succeed in their chosen fields.

---

## ✨ Features

### 1. **Student Profiling**
- Comprehensive profile creation with academic history, skills, and achievements
- Personalized dashboard with LeetCode-style profile header
- Track your progress and growth over time

### 2. **Interest Mapping & Career Recommendations**
- AI-powered career matching based on your profile
- Detailed career insights including:
  - Match percentage
  - Required skills
  - Average salary information
  - Skill gap analysis

### 3. **Industry Integration**
- Real-time job demand analytics
- Salary growth trends
- Emerging skills in different industries
- Market insights and predictions

### 4. **Skill Pathways**
- Personalized skill recommendations
- Priority-based learning paths (High/Medium/Low)
- Category-wise skill organization
- Progress tracking

### 5. **Course Recommendations**
- Curated course suggestions from top platforms
- Difficulty levels and duration information
- Direct links to course platforms
- Aligned with your career goals

### 6. **Portfolio Builder** ⭐
- Build professional portfolios with projects, skills, and achievements
- **AI-Powered Portfolio Analysis** with accurate scoring:
  - Portfolio strength assessment (0-100 score)
  - Project complexity analysis
  - Skill gap identification
  - Career alignment matching
  - Industry demand insights
  - Competitive analysis with honest feedback
  - Personalized recommendations for improvement
- Export and share your portfolio

### 7. **Calendar & Task Tracker**
- Visual calendar with task management
- Event types: Tasks, Deadlines, Reminders
- Daily task overview
- Event descriptions and details

### 8. **Institutional Analytics**
- Track student progress
- Identify skill gaps across cohorts
- Data-driven insights for educators

---

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **Lottie React** - Animation rendering
- **React Router** - Client-side routing
- **Redux Toolkit** - State management

### Backend
- **Node.js** with Express (Port 3001)
- **Python Flask** - AI Service (Port 5000)
- **CORS** enabled for cross-origin requests

### AI & Analysis
- Custom portfolio analysis algorithm
- Skill gap detection
- Career matching engine
- Industry trend analysis

---

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Amogh1221/Skill-Nex.git
cd Skill-Nex
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 4: Install Python Dependencies
```bash
pip install flask flask-cors numpy
```

---

## 🎯 Running the Application

### Option 1: Run All Servers Manually

#### Terminal 1: Frontend (React + Vite)
```bash
npm run dev
```
- Runs on: `http://localhost:5174`

#### Terminal 2: Python AI Service
```bash
python backend/ai_server.py
```
- Runs on: `http://localhost:5000`

### Option 2: Quick Start (PowerShell)
```powershell
# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Skill-Nex; npm run dev"

# Start Python AI Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Skill-Nex; python backend/ai_server.py"
```

---

## 🎨 Color Scheme

Skill-Nex uses a professional and calming color palette:

- **Mauve**: `#8E7692` - Primary accent
- **Plum Dark**: `#572E54` - Dark accent
- **Rose Light**: `#CEB2BD` - Light accent
- **Cream**: `#F5F0E8` - Background

---

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero section |
| `/profile` | Profile Input | Student profile creation form |
| `/dashboard` | Dashboard | Main dashboard with all features |
| `/industries` | Industries Around | Industry analytics and trends |
| `/portfolio-builder` | Portfolio Builder | Build and analyze your portfolio |

---

## 🧠 AI Portfolio Analysis

The Portfolio Builder includes an **accurate AI-powered analysis** system that provides:

### Scoring System (0-100 points)
- **Projects**: 0-40 points (5 points per project, max 8 projects)
- **Skills**: 0-30 points (2 points per skill, max 15 skills)
- **Achievements**: 0-30 points (6 points per achievement, max 5 achievements)

### Rating Thresholds
- **85-100**: Excellent (Green)
- **65-84**: Good (Blue)
- **40-64**: Fair (Orange)
- **0-39**: Needs Improvement (Red)

### Analysis Includes
1. **Portfolio Strength**: Overall score with detailed breakdown
2. **Project Analysis**: Complexity, diversity, and impact assessment
3. **Skill Gaps**: Identified missing skills by category
4. **Recommendations**: Personalized action items with priorities
5. **Career Alignment**: Match percentage with target careers
6. **Industry Demand**: Market value and trending skills
7. **Competitive Analysis**: Honest feedback and improvement areas

### Example Scoring
```
Beginner (Score: 15/100)
├─ 1 project × 5 = 5 points
├─ 5 skills × 2 = 10 points
└─ 0 achievements × 6 = 0 points

Advanced (Score: 68/100)
├─ 5 projects × 5 = 25 points
├─ 15 skills × 2 = 30 points
└─ 3 achievements × 6 = 18 points

Expert (Score: 100/100)
├─ 8 projects × 5 = 40 points
├─ 15 skills × 2 = 30 points
└─ 5 achievements × 6 = 30 points
```

---

## 💾 Data Storage

Skill-Nex uses **localStorage** for client-side data persistence:

- **Student Profile**: `studentProfile`
- **Calendar Events**: `calendarEvents`
- **Portfolio Data**: `portfolioData`

---

## 🎯 Key Features Explained

### Dashboard
- **Profile Header**: LeetCode-style profile with user image and details
- **Calendar & Task Tracker**: Visual calendar with task names displayed in squares
- **Quick Stats Cards**: Clickable cards that scroll to respective sections
  - Skills to Learn
  - Recommended Courses
  - Career Matches
  - Portfolio Builder
- **Skill Pathways**: Categorized skills with priority levels
- **Course Recommendations**: Curated courses with platform links
- **Career Matches**: AI-matched careers with alignment percentages

### Portfolio Builder
- **Two Tabs**: Build Portfolio | AI Analysis
- **Build Tab**:
  - Add projects with name, description, technologies, and URL
  - Add skills with tag-based interface
  - Add achievements and certifications
- **AI Analysis Tab**:
  - 7 comprehensive analysis sections
  - Visual charts and graphs
  - Actionable recommendations
  - Honest, accurate scoring

### Industries Around
- **Loading Animation**: Professional data-fetching simulation
- **Job Demand Chart**: Radial bar chart showing demand by industry
- **Salary Growth Trends**: Line chart with historical data
- **Emerging Skills**: Bar chart of trending technologies
- **Industry Cards**: Detailed information for each sector

---

## 🔧 Configuration

### API Endpoints

#### Python AI Service (Port 5000)
```
POST /api/ai/portfolio/analyze
```
**Request Body:**
```json
{
  "projects": [
    {
      "name": "Project Name",
      "description": "Description",
      "technologies": ["React", "Node.js"]
    }
  ],
  "skills": ["JavaScript", "Python"],
  "achievements": "Achievement text"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "portfolioStrength": { ... },
    "projectAnalysis": { ... },
    "skillGaps": [ ... ],
    "recommendations": [ ... ],
    "careerAlignment": [ ... ],
    "industryDemand": { ... },
    "competitiveAnalysis": { ... }
  }
}
```

---

## 🎨 UI/UX Highlights

- **Professional Icons**: SVG icons instead of emojis for consistency
- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Hover effects, click animations, and smooth scrolling
- **Visual Feedback**: Loading states, success messages, and error handling
- **Accessibility**: Semantic HTML and ARIA labels

---

## 📊 Sample Data

The application includes sample data for demonstration:
- 6 Industry sectors with job demand and salary data
- 5 Skill pathways with 15+ skills
- 5 Recommended courses from top platforms
- 4 Career matches with alignment percentages

---

## 🐛 Troubleshooting

### Frontend not loading?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Python server not starting?
```bash
# Check Python version
python --version

# Reinstall dependencies
pip install --upgrade flask flask-cors numpy
```

### Port already in use?
```bash
# Kill process on port 5174 (Frontend)
npx kill-port 5174

# Kill process on port 5000 (Python)
npx kill-port 5000
```

### CORS errors?
- Ensure Python server is running on port 5000
- Check that CORS is enabled in `backend/ai_server.py`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- **Recharts** for beautiful data visualizations
- **Framer Motion** for smooth animations
- **Lottie** for engaging loading animations
- **Tailwind CSS** for rapid UI development
- **React** ecosystem for robust frontend framework

---

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

## 🎉 Project Status

**Status**: ✅ Complete and Production-Ready

### Recent Updates
- ✅ Accurate AI portfolio scoring system
- ✅ Professional icon system (no emojis)
- ✅ Interactive dashboard cards with smooth scrolling
- ✅ Calendar with task names in squares
- ✅ Fixed radial chart text positioning
- ✅ Comprehensive README documentation

---

**Built with ❤️ to help students achieve their career goals**
