# SkillSync - Complete Setup Instructions

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your laptop:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Python** (v3.8 or higher)
   - Download from: https://www.python.org/downloads/
   - Verify installation: `python --version` or `python3 --version`

3. **Git**
   - Download from: https://git-scm.com/downloads
   - Verify installation: `git --version`

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
git clone https://github.com/Amogh1221/Skill-Nex.git
cd Skill-Nex
```

---

### Step 2: Frontend Setup (React + Vite)

#### Navigate to the SkillSync folder:
```bash
cd SkillSync
```

#### Install dependencies:
```bash
npm install
```

This will install all required packages:
- React 19
- TypeScript
- Vite
- Framer Motion
- Lottie React
- React Router DOM
- Recharts
- Tailwind CSS

#### Start the frontend development server:
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5174/
➜  Network: use --host to expose
```

**✅ Frontend is now running on http://localhost:5174/**

Keep this terminal window open!

---

### Step 3: Backend Setup (Python + Flask)

#### Open a NEW terminal window/tab

Navigate to the backend folder:
```bash
cd Skill-Nex/SkillSync/backend
```

#### Install Python dependencies:

**On Windows:**
```bash
pip install flask flask-cors chromadb sentence-transformers
```

**On macOS/Linux:**
```bash
pip3 install flask flask-cors chromadb sentence-transformers
```

#### Start the AI backend server:

**On Windows:**
```bash
python ai_server.py
```

**On macOS/Linux:**
```bash
python3 ai_server.py
```

**Expected Output:**
```
 * Serving Flask app 'ai_server'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

**✅ Backend is now running on http://localhost:5000/**

Keep this terminal window open too!

---

## 🎯 Accessing the Application

Once both servers are running:

1. **Open your web browser**
2. **Navigate to:** http://localhost:5174/
3. **You should see the SkillSync homepage!**

---

## 📂 Project Structure

```
Skill-Nex/
├── SkillSync/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/               # All page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProfileInputPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AssessmentPage.tsx
│   │   │   ├── AssessmentResultsPage.tsx
│   │   │   └── PortfolioBuilderPage.tsx
│   │   ├── assets/              # Images and animations
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # Entry point
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.ts           # Vite configuration
│   └── tailwind.config.js       # Tailwind CSS config
│
└── SkillSync/backend/           # Backend (Python + Flask)
    ├── ai_server.py             # Main Flask server
    ├── chroma_service.py        # ChromaDB service
    └── chroma_db/               # Vector database storage
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Port Already in Use

**Frontend (Port 5174):**
```bash
# Kill the process using port 5174
# Windows:
netstat -ano | findstr :5174
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5174 | xargs kill -9
```

**Backend (Port 5000):**
```bash
# Kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue 2: Module Not Found Errors

**Frontend:**
```bash
cd SkillSync
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
pip install --upgrade flask flask-cors chromadb sentence-transformers
```

### Issue 3: Python Command Not Found

Try using `python3` instead of `python`:
```bash
python3 ai_server.py
```

### Issue 4: CORS Errors

Make sure the backend server is running on port 5000. The frontend is configured to connect to `http://localhost:5000`.

---

## 🎨 Features Available

1. **Student Profiling** - Create your academic profile
2. **AI Assessment** - Take a 10-question personality assessment
3. **Career Recommendations** - Get AI-powered career matches
4. **Skill Pathways** - Personalized skill learning paths
5. **Course Recommendations** - Curated courses for your goals
6. **Calendar & Tasks** - Track deadlines and events
7. **Portfolio Builder** - Build and analyze your portfolio with AI

---

## 🛑 Stopping the Servers

To stop the servers:

1. **Frontend:** Press `Ctrl + C` in the terminal running `npm run dev`
2. **Backend:** Press `Ctrl + C` in the terminal running `python ai_server.py`

---

## 📦 Building for Production

To create a production build:

```bash
cd SkillSync
npm run build
```

This creates an optimized build in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

---

## 🔄 Updating the Code

To get the latest updates from GitHub:

```bash
git pull origin master
cd SkillSync
npm install  # Install any new dependencies
```

---

## 💡 Quick Start Checklist

- [ ] Node.js installed (v18+)
- [ ] Python installed (v3.8+)
- [ ] Repository cloned
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`pip install ...`)
- [ ] Frontend server running (http://localhost:5174)
- [ ] Backend server running (http://localhost:5000)
- [ ] Browser opened to http://localhost:5174

---

## 📞 Support

If you encounter any issues:

1. Check that both servers are running
2. Verify all dependencies are installed
3. Check the browser console for errors (F12)
4. Check the terminal output for error messages

---

## 🎉 You're All Set!

Your SkillSync application should now be running successfully. Enjoy exploring the AI-powered career path recommender!

