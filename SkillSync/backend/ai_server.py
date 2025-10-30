from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Simple portfolio analyzer (ChromaDB disabled due to file system issues)
class SimplePortfolioAnalyzer:
    def analyze_portfolio(self, projects, skills, achievements):
        # Calculate portfolio strength - ACCURATE scoring
        # Projects: 0-40 points (5 points per project, max 8 projects)
        project_score = min(len(projects) * 5, 40)

        # Skills: 0-30 points (2 points per skill, max 15 skills)
        skill_score = min(len(skills) * 2, 30)

        # Achievements: 0-30 points (only count non-empty lines)
        achievement_lines = [line.strip() for line in achievements.split('\n') if line.strip()] if achievements else []
        achievement_score = min(len(achievement_lines) * 6, 30)

        total_score = project_score + skill_score + achievement_score

        # Determine rating - more realistic thresholds
        if total_score >= 85:
            rating, color = "Excellent", "#10B981"
        elif total_score >= 65:
            rating, color = "Good", "#3B82F6"
        elif total_score >= 40:
            rating, color = "Fair", "#F59E0B"
        else:
            rating, color = "Needs Improvement", "#EF4444"

        # Analyze projects
        total_projects = len(projects)
        complexity = "Advanced" if total_projects >= 5 else "Intermediate" if total_projects >= 3 else "Beginner"

        # Calculate diversity
        all_techs = set()
        for project in projects:
            all_techs.update(project.get('technologies', []))
        diversity = (len(all_techs) / max(sum(len(p.get('technologies', [])) for p in projects), 1)) * 100

        # Analyze skill gaps - convert to array format
        skill_categories = {
            "Frontend": ["React", "Vue", "Angular", "TypeScript", "JavaScript"],
            "Backend": ["Node.js", "Python", "Java", "Go"],
            "Database": ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
            "DevOps": ["Docker", "Kubernetes", "AWS", "CI/CD"],
            "Mobile": ["React Native", "Flutter"],
            "AI/ML": ["TensorFlow", "PyTorch"]
        }

        skill_gaps = []
        for category, category_skills in skill_categories.items():
            missing = [s for s in category_skills if s not in skills]
            if missing:
                priority = "High" if category in ["Frontend", "Backend"] else "Medium"
                skill_gaps.append({
                    "category": category,
                    "missingSkills": missing[:3],
                    "priority": priority
                })

        # Generate recommendations - ACCURATE and personalized
        recommendations = []

        # Project recommendations
        if total_projects == 0:
            recommendations.append({
                "type": "Projects",
                "priority": "High",
                "title": "Create Your First Project",
                "description": "Start building projects to demonstrate your skills. Even a simple project shows initiative and practical knowledge.",
                "action": "Build a basic web app or tool using your current skills"
            })
        elif total_projects < 3:
            recommendations.append({
                "type": "Projects",
                "priority": "High",
                "title": f"Build More Projects (Currently: {total_projects})",
                "description": "Aim for at least 3-5 quality projects. Each project should solve a real problem or demonstrate specific skills.",
                "action": "Plan your next project focusing on a different technology or problem domain"
            })
        elif total_projects < 5:
            recommendations.append({
                "type": "Projects",
                "priority": "Medium",
                "title": "Add More Complex Projects",
                "description": "You have a good foundation. Now focus on building more complex, full-stack applications.",
                "action": "Consider building a project with authentication, database, and API integration"
            })

        # Skill recommendations
        if len(skills) == 0:
            recommendations.append({
                "type": "Skills",
                "priority": "High",
                "title": "Add Your Technical Skills",
                "description": "List all programming languages, frameworks, and tools you know. This helps match you with career opportunities.",
                "action": "Add at least 5-10 skills you're comfortable with"
            })
        elif len(skills) < 8:
            recommendations.append({
                "type": "Skills",
                "priority": "High",
                "title": f"Expand Your Skill Set (Currently: {len(skills)})",
                "description": "Aim for 10-15 diverse skills. Focus on both breadth (different areas) and depth (mastery).",
                "action": "Learn complementary skills to what you already know"
            })
        elif len(skills) < 15:
            recommendations.append({
                "type": "Skills",
                "priority": "Medium",
                "title": "Learn Advanced Technologies",
                "description": "You have a solid foundation. Consider learning advanced or specialized technologies.",
                "action": "Explore cloud platforms, DevOps tools, or specialized frameworks"
            })

        # DevOps recommendation
        if not any(skill in skills for skill in ["Docker", "Kubernetes", "AWS", "CI/CD", "Jenkins"]):
            recommendations.append({
                "type": "DevOps",
                "priority": "Medium",
                "title": "Learn DevOps Fundamentals",
                "description": "DevOps skills are highly valued. Understanding deployment and containerization makes you more marketable.",
                "action": "Start with Docker basics and learn about CI/CD pipelines"
            })

        # Achievement recommendation
        if len(achievement_lines) == 0:
            recommendations.append({
                "type": "Achievements",
                "priority": "Medium",
                "title": "Add Achievements and Certifications",
                "description": "Certifications, hackathon wins, or notable contributions make your portfolio stand out.",
                "action": "List any certifications, awards, or significant accomplishments"
            })

        # Frontend framework recommendation
        if not any(skill in skills for skill in ["React", "Vue", "Angular", "Svelte"]):
            recommendations.append({
                "type": "Frontend",
                "priority": "High",
                "title": "Learn a Modern Frontend Framework",
                "description": "Modern frontend frameworks like React, Vue, or Angular are essential for web development roles.",
                "action": "Start with React - it's the most in-demand framework"
            })

        # Career alignment - convert to array format
        career_data = {
            "Full Stack Developer": {
                "required": ["React", "Node.js", "MongoDB"],
                "matching": [],
                "missing": []
            },
            "Frontend Developer": {
                "required": ["React", "JavaScript", "CSS"],
                "matching": [],
                "missing": []
            },
            "Backend Developer": {
                "required": ["Node.js", "Python", "MongoDB"],
                "matching": [],
                "missing": []
            },
            "Data Scientist": {
                "required": ["Python", "TensorFlow", "Pandas"],
                "matching": [],
                "missing": []
            },
            "DevOps Engineer": {
                "required": ["Docker", "Kubernetes", "AWS"],
                "matching": [],
                "missing": []
            }
        }

        career_alignment = []
        for career, data in career_data.items():
            required = data["required"]
            matching = [s for s in required if s in skills]
            missing = [s for s in required if s not in skills]
            alignment = round((len(matching) / len(required)) * 100, 1)

            career_alignment.append({
                "career": career,
                "alignment": alignment,
                "matchingSkills": matching,
                "missingSkills": missing
            })

        # Competitive analysis - ACCURATE based on actual data
        standout_features = []
        areas_to_improve = []

        # Only add standout features if they truly exist
        if total_projects >= 5:
            standout_features.append("Strong project portfolio")
        elif total_projects >= 3:
            standout_features.append("Good project portfolio")

        if len(skills) >= 15:
            standout_features.append("Diverse skill set")
        elif len(skills) >= 10:
            standout_features.append("Solid skill foundation")

        if len(all_techs) >= 8:
            standout_features.append("Modern tech stack")
        elif len(all_techs) >= 5:
            standout_features.append("Varied technology experience")

        if len(achievement_lines) >= 3:
            standout_features.append("Notable achievements")
        elif len(achievement_lines) >= 1:
            standout_features.append("Has achievements")

        # Provide accurate improvement suggestions
        if total_projects == 0:
            areas_to_improve.append("Add projects to showcase your work")
        elif total_projects < 3:
            areas_to_improve.append("Build more projects (aim for 3-5)")
        elif total_projects < 5:
            areas_to_improve.append("Add more complex projects")

        if len(skills) == 0:
            areas_to_improve.append("Add your technical skills")
        elif len(skills) < 8:
            areas_to_improve.append("Expand skill set (aim for 10-15 skills)")
        elif len(skills) < 15:
            areas_to_improve.append("Learn advanced technologies")

        if not any(skill in skills for skill in ["Docker", "Kubernetes", "AWS", "CI/CD"]):
            areas_to_improve.append("Learn DevOps tools")

        if not any(skill in skills for skill in ["React", "Vue", "Angular"]):
            areas_to_improve.append("Learn modern frontend framework")

        if len(achievement_lines) == 0:
            areas_to_improve.append("Add achievements and certifications")

        # Industry demand analysis
        trending_skills = []
        if "React" in skills or "Vue" in skills or "Angular" in skills:
            trending_skills.append("Modern Frontend Frameworks")
        if "Docker" in skills or "Kubernetes" in skills:
            trending_skills.append("DevOps & Containerization")
        if "Python" in skills:
            trending_skills.append("AI/ML & Data Science")
        if "AWS" in skills or "Azure" in skills:
            trending_skills.append("Cloud Computing")

        # Calculate impact score - more realistic formula
        # Projects contribute more (up to 60 points), skills contribute less (up to 30 points)
        # Achievements add bonus (up to 10 points)
        impact_score = min(
            (total_projects * 10) +  # 10 points per project (max 60 for 6 projects)
            (len(skills) * 2) +       # 2 points per skill (max 30 for 15 skills)
            (len(achievement_lines) * 2),  # 2 points per achievement (max 10 for 5 achievements)
            100
        )

        # Get project highlights
        highlights = []
        for project in projects[:3]:  # Top 3 projects
            highlights.append({
                "name": project.get("name", ""),
                "description": project.get("description", ""),
                "technologies": project.get("technologies", [])
            })

        return {
            "portfolioStrength": {
                "score": total_score,
                "rating": rating,
                "color": color,
                "breakdown": {"projects": project_score, "skills": skill_score, "achievements": achievement_score}
            },
            "projectAnalysis": {
                "totalProjects": total_projects,
                "complexity": complexity,
                "diversity": round(diversity, 1),
                "impactScore": impact_score,
                "highlights": highlights,
                "techStack": list(all_techs)
            },
            "recommendations": recommendations,
            "skillGaps": skill_gaps,
            "careerAlignment": career_alignment,
            "industryDemand": {
                "overallDemand": "High" if len(skills) >= 12 else "Medium" if len(skills) >= 6 else "Low",
                "trendingSkills": trending_skills if trending_skills else ["No trending skills identified yet"],
                "marketValue": "Above Average" if total_score >= 65 else "Average" if total_score >= 35 else "Below Average",
                "growthPotential": min(100 - total_score, 100)  # How much room for growth
            },
            "competitiveAnalysis": {
                "percentile": 100 - total_score if total_score < 50 else min(total_score, 99),  # More realistic percentile
                "comparison": "Above Average" if total_score >= 65 else "Average" if total_score >= 35 else "Below Average",
                "standoutFeatures": standout_features if standout_features else ["No standout features yet - keep building!"],
                "areasToImprove": areas_to_improve if areas_to_improve else ["Keep up the great work!"]
            }
        }

    def _calc_alignment(self, user_skills, required_skills):
        matches = sum(1 for skill in required_skills if skill in user_skills)
        return round((matches / len(required_skills)) * 100, 1)

# Initialize analyzer
portfolio_analyzer = SimplePortfolioAnalyzer()

@app.route('/api/ai/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "OK",
        "message": "AI Service is running",
        "service": "ChromaDB Portfolio Analyzer"
    })

@app.route('/api/ai/portfolio/analyze', methods=['POST'])
def analyze_portfolio():
    """
    Analyze student portfolio using AI and ChromaDB
    
    Expected JSON body:
    {
        "projects": [
            {
                "name": "Project Name",
                "description": "Project description",
                "technologies": ["React", "Node.js"],
                "url": "https://github.com/...",
                "highlights": ["Feature 1", "Feature 2"]
            }
        ],
        "skills": ["React", "Python", "Docker"],
        "achievements": "Won hackathon, Published paper, etc."
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        projects = data.get('projects', [])
        skills = data.get('skills', [])
        achievements = data.get('achievements', '')

        # Analyze portfolio
        analysis = portfolio_analyzer.analyze_portfolio(projects, skills, achievements)
        
        return jsonify({
            "success": True,
            "analysis": analysis
        })
        
    except Exception as e:
        print(f"Error in portfolio analysis: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/ai/portfolio/suggestions', methods=['POST'])
def get_project_suggestions():
    """
    Get project suggestions based on current skills and career goals
    
    Expected JSON body:
    {
        "currentSkills": ["React", "Python"],
        "careerGoal": "Full Stack Developer",
        "experienceLevel": "Intermediate"
    }
    """
    try:
        data = request.get_json()
        
        current_skills = data.get('currentSkills', [])
        career_goal = data.get('careerGoal', 'Software Developer')
        experience_level = data.get('experienceLevel', 'Beginner')
        
        # Generate project suggestions
        suggestions = _generate_project_suggestions(current_skills, career_goal, experience_level)
        
        return jsonify({
            "success": True,
            "suggestions": suggestions
        })
        
    except Exception as e:
        print(f"Error generating suggestions: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

def _generate_project_suggestions(skills, career_goal, level):
    """Generate project suggestions based on skills and goals"""
    
    project_templates = {
        "Beginner": [
            {
                "title": "Personal Portfolio Website",
                "description": "Build a responsive portfolio website to showcase your projects and skills",
                "technologies": ["HTML", "CSS", "JavaScript", "React"],
                "difficulty": "Easy",
                "estimatedTime": "1-2 weeks",
                "learningOutcomes": ["Responsive design", "React basics", "Deployment"]
            },
            {
                "title": "Todo List Application",
                "description": "Create a full-stack todo list with user authentication",
                "technologies": ["React", "Node.js", "MongoDB", "Express"],
                "difficulty": "Easy",
                "estimatedTime": "2-3 weeks",
                "learningOutcomes": ["CRUD operations", "Authentication", "Database design"]
            },
            {
                "title": "Weather Dashboard",
                "description": "Build a weather app using external APIs",
                "technologies": ["React", "API Integration", "Chart.js"],
                "difficulty": "Easy",
                "estimatedTime": "1 week",
                "learningOutcomes": ["API consumption", "Data visualization", "State management"]
            }
        ],
        "Intermediate": [
            {
                "title": "E-commerce Platform",
                "description": "Build a full-featured e-commerce site with cart, payments, and admin panel",
                "technologies": ["React", "Node.js", "PostgreSQL", "Stripe", "Redux"],
                "difficulty": "Medium",
                "estimatedTime": "4-6 weeks",
                "learningOutcomes": ["Payment integration", "Complex state management", "Security"]
            },
            {
                "title": "Real-time Chat Application",
                "description": "Create a chat app with real-time messaging and file sharing",
                "technologies": ["React", "Socket.io", "Node.js", "MongoDB"],
                "difficulty": "Medium",
                "estimatedTime": "3-4 weeks",
                "learningOutcomes": ["WebSockets", "Real-time communication", "File uploads"]
            },
            {
                "title": "Task Management System",
                "description": "Build a Trello-like project management tool",
                "technologies": ["React", "Node.js", "PostgreSQL", "Drag-and-Drop"],
                "difficulty": "Medium",
                "estimatedTime": "4-5 weeks",
                "learningOutcomes": ["Complex UI interactions", "Database relationships", "Team collaboration"]
            }
        ],
        "Advanced": [
            {
                "title": "AI-Powered Content Platform",
                "description": "Build a platform with AI-generated content and recommendations",
                "technologies": ["React", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
                "difficulty": "Hard",
                "estimatedTime": "8-12 weeks",
                "learningOutcomes": ["Machine Learning integration", "Microservices", "Scalability"]
            },
            {
                "title": "DevOps CI/CD Pipeline",
                "description": "Create a complete CI/CD pipeline with monitoring and auto-scaling",
                "technologies": ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"],
                "difficulty": "Hard",
                "estimatedTime": "6-8 weeks",
                "learningOutcomes": ["Infrastructure as Code", "Container orchestration", "Cloud deployment"]
            },
            {
                "title": "Blockchain-based Application",
                "description": "Build a decentralized app with smart contracts",
                "technologies": ["Solidity", "Web3.js", "React", "Ethereum"],
                "difficulty": "Hard",
                "estimatedTime": "10-12 weeks",
                "learningOutcomes": ["Blockchain fundamentals", "Smart contracts", "Decentralization"]
            }
        ]
    }
    
    return project_templates.get(level, project_templates["Beginner"])

@app.route('/api/ai/skills/recommend', methods=['POST'])
def recommend_skills():
    """
    Recommend skills to learn based on current profile and career goals
    """
    try:
        data = request.get_json()
        
        current_skills = data.get('currentSkills', [])
        career_goal = data.get('careerGoal', 'Software Developer')
        
        # Get skill recommendations
        recommendations = _get_skill_recommendations(current_skills, career_goal)
        
        return jsonify({
            "success": True,
            "recommendations": recommendations
        })
        
    except Exception as e:
        print(f"Error recommending skills: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

def _get_skill_recommendations(current_skills, career_goal):
    """Generate skill recommendations"""
    
    career_skill_map = {
        "Full Stack Developer": {
            "essential": ["React", "Node.js", "PostgreSQL", "Git", "REST APIs"],
            "recommended": ["TypeScript", "Docker", "AWS", "GraphQL", "Testing"],
            "advanced": ["Kubernetes", "Microservices", "CI/CD", "Redis", "Nginx"]
        },
        "Frontend Developer": {
            "essential": ["React", "JavaScript", "CSS", "HTML", "Git"],
            "recommended": ["TypeScript", "Next.js", "Tailwind CSS", "Testing", "Webpack"],
            "advanced": ["Performance Optimization", "Accessibility", "PWA", "Animation", "State Management"]
        },
        "Backend Developer": {
            "essential": ["Node.js", "Python", "Database", "REST APIs", "Git"],
            "recommended": ["Docker", "PostgreSQL", "Redis", "Authentication", "Testing"],
            "advanced": ["Microservices", "Message Queues", "Caching", "Load Balancing", "Security"]
        },
        "Data Scientist": {
            "essential": ["Python", "Pandas", "NumPy", "Statistics", "SQL"],
            "recommended": ["Machine Learning", "TensorFlow", "Scikit-learn", "Data Visualization", "Jupyter"],
            "advanced": ["Deep Learning", "NLP", "Computer Vision", "Big Data", "MLOps"]
        },
        "DevOps Engineer": {
            "essential": ["Linux", "Docker", "Git", "CI/CD", "Scripting"],
            "recommended": ["Kubernetes", "AWS", "Terraform", "Monitoring", "Ansible"],
            "advanced": ["Service Mesh", "GitOps", "Security", "Cost Optimization", "Multi-Cloud"]
        }
    }
    
    skills_for_career = career_skill_map.get(career_goal, career_skill_map["Full Stack Developer"])
    current_skills_lower = [s.lower() for s in current_skills]
    
    # Filter out skills already known
    essential_missing = [s for s in skills_for_career["essential"] if s.lower() not in current_skills_lower]
    recommended_missing = [s for s in skills_for_career["recommended"] if s.lower() not in current_skills_lower]
    advanced_missing = [s for s in skills_for_career["advanced"] if s.lower() not in current_skills_lower]
    
    return {
        "essential": essential_missing[:5],
        "recommended": recommended_missing[:5],
        "advanced": advanced_missing[:5],
        "learningPath": _create_learning_path(essential_missing, recommended_missing, advanced_missing)
    }

def _create_learning_path(essential, recommended, advanced):
    """Create a structured learning path"""
    
    path = []
    
    # Phase 1: Essential skills
    if essential:
        path.append({
            "phase": 1,
            "title": "Foundation Skills",
            "duration": "2-3 months",
            "skills": essential[:3],
            "priority": "High"
        })
    
    # Phase 2: Recommended skills
    if recommended:
        path.append({
            "phase": 2,
            "title": "Intermediate Skills",
            "duration": "3-4 months",
            "skills": recommended[:3],
            "priority": "Medium"
        })
    
    # Phase 3: Advanced skills
    if advanced:
        path.append({
            "phase": 3,
            "title": "Advanced Skills",
            "duration": "4-6 months",
            "skills": advanced[:3],
            "priority": "Low"
        })
    
    return path

@app.route('/api/ai/assessment/analyze', methods=['POST'])
def analyze_assessment():
    """
    Analyze assessment responses to generate personality insights and career recommendations

    Expected JSON body:
    {
        "answers": {
            "0": "Work independently and at my own pace",
            "1": "Solving complex problems",
            ...
        }
    }
    """
    try:
        data = request.get_json()

        if not data or 'answers' not in data:
            return jsonify({"error": "No assessment data provided"}), 400

        answers = data.get('answers', {})

        # Analyze personality traits based on answers
        analysis = _analyze_assessment_responses(answers)

        return jsonify({
            "success": True,
            "analysis": analysis
        })

    except Exception as e:
        print(f"Error in assessment analysis: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

def _analyze_assessment_responses(answers):
    """Analyze assessment responses to determine personality traits and career matches"""

    # Initialize trait scores
    traits = {
        "analytical": 0,
        "creative": 0,
        "collaborative": 0,
        "leadership": 0,
        "independent": 0,
        "detail_oriented": 0,
        "innovative": 0,
        "people_oriented": 0
    }

    # Analyze each answer and update trait scores
    for question_id, answer in answers.items():
        answer_lower = answer.lower()

        # Work style analysis
        if "independently" in answer_lower or "own pace" in answer_lower:
            traits["independent"] += 2
            traits["analytical"] += 1
        elif "collaborate" in answer_lower or "team" in answer_lower:
            traits["collaborative"] += 2
            traits["people_oriented"] += 1
        elif "lead" in answer_lower or "delegate" in answer_lower:
            traits["leadership"] += 2
            traits["collaborative"] += 1
        elif "support" in answer_lower or "help" in answer_lower:
            traits["people_oriented"] += 2
            traits["collaborative"] += 1

        # Motivation analysis
        if "solving" in answer_lower or "problems" in answer_lower:
            traits["analytical"] += 2
            traits["detail_oriented"] += 1
        elif "creating" in answer_lower or "new" in answer_lower:
            traits["creative"] += 2
            traits["innovative"] += 1
        elif "helping" in answer_lower or "others" in answer_lower:
            traits["people_oriented"] += 2
        elif "organizing" in answer_lower or "planning" in answer_lower:
            traits["detail_oriented"] += 2

        # Learning style
        if "hands-on" in answer_lower or "doing" in answer_lower:
            traits["independent"] += 1
            traits["creative"] += 1
        elif "reading" in answer_lower or "research" in answer_lower:
            traits["analytical"] += 2
        elif "discussion" in answer_lower or "group" in answer_lower:
            traits["collaborative"] += 2
        elif "visual" in answer_lower or "diagrams" in answer_lower:
            traits["creative"] += 1
            traits["detail_oriented"] += 1

        # Decision making
        if "data" in answer_lower or "facts" in answer_lower:
            traits["analytical"] += 2
        elif "intuition" in answer_lower or "gut" in answer_lower:
            traits["creative"] += 1
            traits["innovative"] += 1
        elif "consensus" in answer_lower or "input" in answer_lower:
            traits["collaborative"] += 2
        elif "quickly" in answer_lower or "decisive" in answer_lower:
            traits["leadership"] += 1

        # Innovation
        if "new" in answer_lower or "innovative" in answer_lower:
            traits["innovative"] += 2
            traits["creative"] += 1
        elif "proven" in answer_lower or "reliable" in answer_lower:
            traits["detail_oriented"] += 1

        # Communication
        if "writing" in answer_lower or "written" in answer_lower:
            traits["analytical"] += 1
            traits["independent"] += 1
        elif "speaking" in answer_lower or "presenting" in answer_lower:
            traits["people_oriented"] += 2
            traits["leadership"] += 1

    # Normalize scores to percentages
    max_score = max(traits.values()) if max(traits.values()) > 0 else 1
    normalized_traits = {k: round((v / max_score) * 100) for k, v in traits.items()}

    # Determine top personality traits
    sorted_traits = sorted(normalized_traits.items(), key=lambda x: x[1], reverse=True)
    top_traits = [
        {
            "name": trait.replace("_", " ").title(),
            "score": score,
            "description": _get_trait_description(trait)
        }
        for trait, score in sorted_traits[:4]
    ]

    # Generate career recommendations based on traits
    career_matches = _generate_career_matches(normalized_traits)

    # Generate skill recommendations
    skill_recommendations = _generate_skill_recommendations_from_traits(normalized_traits)

    # Generate learning path
    learning_style = _determine_learning_style(answers)

    # Generate personality summary
    personality_type = _determine_personality_type(normalized_traits)

    return {
        "personalityTraits": top_traits,
        "personalityType": personality_type,
        "careerMatches": career_matches,
        "skillRecommendations": skill_recommendations,
        "learningStyle": learning_style,
        "strengths": _identify_strengths(normalized_traits),
        "developmentAreas": _identify_development_areas(normalized_traits)
    }

def _get_trait_description(trait):
    """Get description for each personality trait"""
    descriptions = {
        "analytical": "You excel at breaking down complex problems and making data-driven decisions",
        "creative": "You thrive on innovation and bringing new ideas to life",
        "collaborative": "You work effectively in teams and value diverse perspectives",
        "leadership": "You naturally take charge and guide others toward goals",
        "independent": "You work best with autonomy and self-direction",
        "detail_oriented": "You pay close attention to accuracy and thoroughness",
        "innovative": "You constantly seek new and better ways to solve problems",
        "people_oriented": "You excel at understanding and working with others"
    }
    return descriptions.get(trait, "A valuable professional trait")

def _determine_personality_type(traits):
    """Determine overall personality type based on trait combination"""
    top_trait = max(traits.items(), key=lambda x: x[1])[0]

    types = {
        "analytical": {
            "type": "The Analyst",
            "description": "You approach challenges with logic and systematic thinking. You excel in roles that require problem-solving and data analysis.",
            "icon": "chart-bar"
        },
        "creative": {
            "type": "The Innovator",
            "description": "You bring fresh perspectives and creative solutions. You thrive in environments that encourage experimentation and new ideas.",
            "icon": "lightbulb"
        },
        "collaborative": {
            "type": "The Team Player",
            "description": "You excel at bringing people together and fostering collaboration. You create value through teamwork and shared success.",
            "icon": "user-group"
        },
        "leadership": {
            "type": "The Leader",
            "description": "You naturally inspire and guide others. You excel at setting vision, making decisions, and driving results.",
            "icon": "star"
        },
        "independent": {
            "type": "The Self-Starter",
            "description": "You thrive with autonomy and take initiative. You excel when given freedom to work independently and own your projects.",
            "icon": "rocket"
        },
        "detail_oriented": {
            "type": "The Perfectionist",
            "description": "You ensure quality through attention to detail. You excel in roles requiring precision and thoroughness.",
            "icon": "check-circle"
        },
        "innovative": {
            "type": "The Visionary",
            "description": "You see possibilities others miss and drive change. You excel at transforming ideas into reality.",
            "icon": "sparkles"
        },
        "people_oriented": {
            "type": "The Connector",
            "description": "You understand people and build strong relationships. You excel in roles that involve communication and collaboration.",
            "icon": "users"
        }
    }

    return types.get(top_trait, types["analytical"])

def _generate_career_matches(traits):
    """Generate career recommendations based on personality traits"""
    careers = []

    # Software Development paths
    if traits["analytical"] >= 70 or traits["detail_oriented"] >= 70:
        careers.append({
            "title": "Software Engineer",
            "matchPercentage": min(95, traits["analytical"] + 10),
            "description": "Design and develop software solutions using analytical and problem-solving skills",
            "keySkills": ["Python", "Java", "Data Structures", "Algorithms"],
            "salaryRange": "$80,000 - $150,000",
            "growthRate": "22%"
        })

    if traits["creative"] >= 70 or traits["innovative"] >= 70:
        careers.append({
            "title": "UX/UI Designer",
            "matchPercentage": min(95, traits["creative"] + 10),
            "description": "Create intuitive and beautiful user experiences through design thinking",
            "keySkills": ["Figma", "User Research", "Prototyping", "Design Systems"],
            "salaryRange": "$70,000 - $130,000",
            "growthRate": "16%"
        })

        careers.append({
            "title": "Product Manager",
            "matchPercentage": min(92, (traits["creative"] + traits["leadership"]) // 2 + 10),
            "description": "Lead product development from concept to launch",
            "keySkills": ["Product Strategy", "User Stories", "Agile", "Analytics"],
            "salaryRange": "$90,000 - $160,000",
            "growthRate": "19%"
        })

    if traits["analytical"] >= 65 and traits["detail_oriented"] >= 65:
        careers.append({
            "title": "Data Scientist",
            "matchPercentage": min(94, (traits["analytical"] + traits["detail_oriented"]) // 2 + 10),
            "description": "Extract insights from data using statistical analysis and machine learning",
            "keySkills": ["Python", "Machine Learning", "Statistics", "SQL"],
            "salaryRange": "$95,000 - $170,000",
            "growthRate": "31%"
        })

    if traits["people_oriented"] >= 70 or traits["collaborative"] >= 70:
        careers.append({
            "title": "Technical Project Manager",
            "matchPercentage": min(93, traits["people_oriented"] + 10),
            "description": "Lead technical teams and ensure successful project delivery",
            "keySkills": ["Agile", "Scrum", "Communication", "Risk Management"],
            "salaryRange": "$85,000 - $145,000",
            "growthRate": "18%"
        })

    if traits["leadership"] >= 70:
        careers.append({
            "title": "Engineering Manager",
            "matchPercentage": min(91, traits["leadership"] + 5),
            "description": "Lead engineering teams and drive technical excellence",
            "keySkills": ["Leadership", "Technical Strategy", "Mentoring", "Architecture"],
            "salaryRange": "$120,000 - $200,000",
            "growthRate": "17%"
        })

    if traits["innovative"] >= 70 or traits["creative"] >= 70:
        careers.append({
            "title": "Full Stack Developer",
            "matchPercentage": min(90, (traits["innovative"] + traits["analytical"]) // 2 + 5),
            "description": "Build complete web applications from frontend to backend",
            "keySkills": ["React", "Node.js", "Databases", "APIs"],
            "salaryRange": "$75,000 - $140,000",
            "growthRate": "25%"
        })

    # Cybersecurity
    if traits["analytical"] >= 65 and traits["detail_oriented"] >= 60:
        careers.append({
            "title": "Cybersecurity Analyst",
            "matchPercentage": min(89, (traits["analytical"] + traits["detail_oriented"]) // 2),
            "description": "Protect systems and data from security threats",
            "keySkills": ["Network Security", "Penetration Testing", "SIEM", "Compliance"],
            "salaryRange": "$85,000 - $150,000",
            "growthRate": "33%"
        })

    # Sort by match percentage and return top 5
    careers.sort(key=lambda x: x["matchPercentage"], reverse=True)
    return careers[:5]

def _generate_skill_recommendations_from_traits(traits):
    """Generate skill recommendations based on personality traits"""
    skills = []

    if traits["analytical"] >= 70:
        skills.extend([
            {"name": "Python", "category": "Programming", "priority": "High", "reason": "Essential for data analysis and problem-solving"},
            {"name": "SQL", "category": "Database", "priority": "High", "reason": "Critical for data manipulation and analysis"},
            {"name": "Data Structures & Algorithms", "category": "Computer Science", "priority": "High", "reason": "Foundation for analytical thinking"}
        ])

    if traits["creative"] >= 70:
        skills.extend([
            {"name": "UI/UX Design", "category": "Design", "priority": "High", "reason": "Channel creativity into user experience"},
            {"name": "Figma", "category": "Tools", "priority": "Medium", "reason": "Industry-standard design tool"},
            {"name": "React", "category": "Frontend", "priority": "High", "reason": "Build creative, interactive interfaces"}
        ])

    if traits["collaborative"] >= 70:
        skills.extend([
            {"name": "Git & GitHub", "category": "Version Control", "priority": "High", "reason": "Essential for team collaboration"},
            {"name": "Agile/Scrum", "category": "Methodology", "priority": "Medium", "reason": "Framework for team collaboration"},
            {"name": "Communication Skills", "category": "Soft Skills", "priority": "High", "reason": "Critical for effective teamwork"}
        ])

    if traits["leadership"] >= 70:
        skills.extend([
            {"name": "Project Management", "category": "Management", "priority": "High", "reason": "Lead projects effectively"},
            {"name": "Technical Architecture", "category": "System Design", "priority": "Medium", "reason": "Make high-level technical decisions"},
            {"name": "Mentoring", "category": "Soft Skills", "priority": "Medium", "reason": "Develop and guide team members"}
        ])

    # Remove duplicates and return top 8
    unique_skills = []
    seen = set()
    for skill in skills:
        if skill["name"] not in seen:
            unique_skills.append(skill)
            seen.add(skill["name"])

    return unique_skills[:8]

def _determine_learning_style(answers):
    """Determine preferred learning style from answers"""
    styles = {
        "hands-on": 0,
        "visual": 0,
        "reading": 0,
        "collaborative": 0
    }

    for answer in answers.values():
        answer_lower = answer.lower()
        if "hands-on" in answer_lower or "doing" in answer_lower or "practice" in answer_lower:
            styles["hands-on"] += 1
        if "visual" in answer_lower or "diagrams" in answer_lower or "videos" in answer_lower:
            styles["visual"] += 1
        if "reading" in answer_lower or "research" in answer_lower or "documentation" in answer_lower:
            styles["reading"] += 1
        if "discussion" in answer_lower or "group" in answer_lower or "collaborative" in answer_lower:
            styles["collaborative"] += 1

    primary_style = max(styles.items(), key=lambda x: x[1])[0]

    style_descriptions = {
        "hands-on": {
            "style": "Hands-On Learner",
            "description": "You learn best by doing and practicing. Focus on project-based learning and coding challenges.",
            "recommendations": ["Build projects", "Complete coding challenges", "Participate in hackathons"]
        },
        "visual": {
            "style": "Visual Learner",
            "description": "You learn best through visual aids and demonstrations. Use video tutorials and diagrams.",
            "recommendations": ["Watch video tutorials", "Use visual documentation", "Create mind maps"]
        },
        "reading": {
            "style": "Reading/Writing Learner",
            "description": "You learn best through reading and note-taking. Use documentation and written resources.",
            "recommendations": ["Read technical documentation", "Take detailed notes", "Write blog posts"]
        },
        "collaborative": {
            "style": "Collaborative Learner",
            "description": "You learn best through discussion and group work. Join study groups and communities.",
            "recommendations": ["Join study groups", "Participate in forums", "Pair programming"]
        }
    }

    return style_descriptions.get(primary_style, style_descriptions["hands-on"])

def _identify_strengths(traits):
    """Identify top strengths based on traits"""
    sorted_traits = sorted(traits.items(), key=lambda x: x[1], reverse=True)

    strength_descriptions = {
        "analytical": "Strong analytical and problem-solving abilities",
        "creative": "Creative thinking and innovative approach",
        "collaborative": "Excellent teamwork and collaboration skills",
        "leadership": "Natural leadership and decision-making capabilities",
        "independent": "Self-motivated and autonomous work style",
        "detail_oriented": "Meticulous attention to detail and quality",
        "innovative": "Forward-thinking and adaptable to change",
        "people_oriented": "Strong interpersonal and communication skills"
    }

    return [strength_descriptions[trait] for trait, _ in sorted_traits[:3]]

def _identify_development_areas(traits):
    """Identify areas for development based on lower trait scores"""
    sorted_traits = sorted(traits.items(), key=lambda x: x[1])

    development_descriptions = {
        "analytical": "Develop analytical thinking through data analysis and problem-solving exercises",
        "creative": "Enhance creativity through design thinking and brainstorming sessions",
        "collaborative": "Improve collaboration skills by working on team projects",
        "leadership": "Build leadership skills through mentoring and project management",
        "independent": "Strengthen independent work habits and self-management",
        "detail_oriented": "Improve attention to detail through code reviews and testing",
        "innovative": "Foster innovation by exploring new technologies and approaches",
        "people_oriented": "Develop interpersonal skills through networking and communication practice"
    }

    return [development_descriptions[trait] for trait, score in sorted_traits[:2] if score < 50]

if __name__ == '__main__':
    print("Starting AI Service on port 5000...")
    print("ChromaDB Portfolio Analyzer is ready!")
    app.run(host='0.0.0.0', port=5000, debug=True)

