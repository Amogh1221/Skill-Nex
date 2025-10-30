# SkillSync - Quick Start Guide

## ⚡ TL;DR - Get Running in 5 Minutes

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Amogh1221/Skill-Nex.git
cd Skill-Nex
```

### 2️⃣ Install Frontend Dependencies
```bash
cd SkillSync
npm install
```

### 3️⃣ Install Backend Dependencies
```bash
cd backend
pip install flask flask-cors chromadb sentence-transformers
```

### 4️⃣ Start Backend Server (Terminal 1)
```bash
# From Skill-Nex/SkillSync/backend/
python ai_server.py
```
✅ Backend running on http://localhost:5000

### 5️⃣ Start Frontend Server (Terminal 2)
```bash
# From Skill-Nex/SkillSync/
npm run dev
```
✅ Frontend running on http://localhost:5174

### 6️⃣ Open Browser
Navigate to: **http://localhost:5174**

---

## 🎯 Two Terminals Required

**Terminal 1 - Backend:**
```bash
cd Skill-Nex/SkillSync/backend
python ai_server.py
```

**Terminal 2 - Frontend:**
```bash
cd Skill-Nex/SkillSync
npm run dev
```

---

## 📋 Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] Python 3.8+ installed
- [ ] Git installed

---

## 🔧 Troubleshooting

**Port already in use?**
- Frontend uses port 5174
- Backend uses port 5000
- Kill existing processes or change ports

**Module not found?**
- Run `npm install` in SkillSync folder
- Run `pip install flask flask-cors chromadb sentence-transformers`

**Python command not working?**
- Try `python3` instead of `python`

---

## 🛑 Stop Servers

Press `Ctrl + C` in both terminal windows

---

## 📖 Full Documentation

See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed setup guide.

---

## 🎉 That's It!

You should now have SkillSync running locally. Enjoy! 🚀

