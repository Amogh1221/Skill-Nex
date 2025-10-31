import chromadb
from chromadb.config import Settings
import os
import json
from typing import List, Dict, Any

class ChromaDBService:
    def __init__(self, persist_directory: str = "../chroma_db"):
        """Initialize ChromaDB client - using in-memory for speed and stability"""
        # Use in-memory client to avoid file system issues and improve speed
        self.client = chromadb.Client(
            Settings(
                anonymized_telemetry=False,
                allow_reset=True
            )
        )
        
        # Get or create collections
        try:
            self.portfolio_collection = self.client.get_collection("portfolio_analysis")
        except:
            self.portfolio_collection = self.client.create_collection(
                name="portfolio_analysis",
                metadata={"description": "Portfolio analysis and recommendations"}
            )
        
        try:
            self.skills_collection = self.client.get_collection("skills_database")
        except:
            self.skills_collection = self.client.create_collection(
                name="skills_database",
                metadata={"description": "Skills and competencies database"}
            )
        
        try:
            self.careers_collection = self.client.get_collection("careers_database")
        except:
            self.careers_collection = self.client.create_collection(
                name="careers_database",
                metadata={"description": "Career paths and requirements"}
            )
    
    def analyze_portfolio(self, projects: List[Dict[str, Any]], skills: List[str], achievements: str) -> Dict[str, Any]:
        """
        Analyze student portfolio using ChromaDB
        Returns comprehensive analysis with recommendations
        """
        
        # Combine all portfolio data into a searchable text
        portfolio_text = f"""
        Projects: {json.dumps(projects)}
        Skills: {', '.join(skills)}
        Achievements: {achievements}
        """
        
        # Query similar portfolios and get recommendations
        try:
            # Search for similar skills in the database
            skills_results = self.skills_collection.query(
                query_texts=[', '.join(skills)],
                n_results=10
            )
            
            # Search for relevant career paths
            career_results = self.careers_collection.query(
                query_texts=[portfolio_text],
                n_results=5
            )
            
            # Analyze project complexity and impact
            project_analysis = self._analyze_projects(projects)
            
            # Get skill gap analysis
            skill_gaps = self._analyze_skill_gaps(skills, skills_results)
            
            # Generate portfolio strength score
            strength_score = self._calculate_portfolio_strength(projects, skills, achievements)
            
            # Get improvement recommendations
            recommendations = self._generate_recommendations(
                project_analysis, 
                skill_gaps, 
                career_results
            )
            
            return {
                "portfolioStrength": strength_score,
                "projectAnalysis": project_analysis,
                "skillGaps": skill_gaps,
                "recommendations": recommendations,
                "careerAlignment": self._analyze_career_alignment(career_results),
                "industryDemand": self._get_industry_demand(skills),
                "competitiveAnalysis": self._get_competitive_analysis(strength_score)
            }
            
        except Exception as e:
            print(f"Error analyzing portfolio: {e}")
            return self._get_fallback_analysis(projects, skills, achievements)
    
    def _analyze_projects(self, projects: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Analyze project complexity, diversity, and impact"""
        if not projects:
            return {
                "totalProjects": 0,
                "complexity": "Beginner",
                "diversity": 0,
                "impactScore": 0,
                "highlights": []
            }
        
        # Calculate metrics
        total_projects = len(projects)
        
        # Analyze project diversity (different tech stacks)
        tech_stacks = set()
        for project in projects:
            if 'technologies' in project:
                tech_stacks.update(project['technologies'])
        
        diversity_score = min(len(tech_stacks) / 10 * 100, 100)
        
        # Determine complexity based on project count and tech diversity
        if total_projects >= 5 and diversity_score > 60:
            complexity = "Advanced"
        elif total_projects >= 3 and diversity_score > 40:
            complexity = "Intermediate"
        else:
            complexity = "Beginner"
        
        # Calculate impact score
        impact_score = min((total_projects * 15 + diversity_score) / 2, 100)
        
        # Extract highlights
        highlights = []
        for project in projects[:3]:  # Top 3 projects
            highlights.append({
                "name": project.get('name', 'Unnamed Project'),
                "description": project.get('description', ''),
                "technologies": project.get('technologies', [])
            })
        
        return {
            "totalProjects": total_projects,
            "complexity": complexity,
            "diversity": round(diversity_score, 1),
            "impactScore": round(impact_score, 1),
            "highlights": highlights,
            "techStack": list(tech_stacks)
        }
    
    def _analyze_skill_gaps(self, current_skills: List[str], skills_results: Any) -> List[Dict[str, Any]]:
        """Identify skill gaps based on industry requirements"""
        
        # Common in-demand skills by category
        in_demand_skills = {
            "Frontend": ["React", "Vue", "Angular", "TypeScript", "Next.js", "Tailwind CSS"],
            "Backend": ["Node.js", "Python", "Java", "Go", "Django", "Express"],
            "Database": ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
            "DevOps": ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "GCP"],
            "Mobile": ["React Native", "Flutter", "Swift", "Kotlin"],
            "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision"],
            "Other": ["Git", "REST APIs", "GraphQL", "Testing", "Agile"]
        }
        
        skill_gaps = []
        current_skills_lower = [s.lower() for s in current_skills]
        
        for category, skills in in_demand_skills.items():
            missing_skills = [s for s in skills if s.lower() not in current_skills_lower]
            if missing_skills:
                skill_gaps.append({
                    "category": category,
                    "missingSkills": missing_skills[:3],  # Top 3 missing skills
                    "priority": "High" if len(missing_skills) > 4 else "Medium" if len(missing_skills) > 2 else "Low"
                })
        
        return skill_gaps
    
    def _calculate_portfolio_strength(self, projects: List[Dict], skills: List[str], achievements: str) -> Dict[str, Any]:
        """Calculate overall portfolio strength score"""
        
        # Project score (0-40 points)
        project_score = min(len(projects) * 8, 40)
        
        # Skills score (0-30 points)
        skills_score = min(len(skills) * 3, 30)
        
        # Achievements score (0-30 points)
        achievement_score = min(len(achievements) / 10, 30) if achievements else 0
        
        total_score = project_score + skills_score + achievement_score
        
        # Determine rating
        if total_score >= 80:
            rating = "Excellent"
            color = "#10B981"
        elif total_score >= 60:
            rating = "Good"
            color = "#3B82F6"
        elif total_score >= 40:
            rating = "Average"
            color = "#F59E0B"
        else:
            rating = "Needs Improvement"
            color = "#EF4444"
        
        return {
            "score": round(total_score, 1),
            "rating": rating,
            "color": color,
            "breakdown": {
                "projects": round(project_score, 1),
                "skills": round(skills_score, 1),
                "achievements": round(achievement_score, 1)
            }
        }
    
    def _generate_recommendations(self, project_analysis: Dict, skill_gaps: List[Dict], career_results: Any) -> List[Dict[str, Any]]:
        """Generate actionable recommendations"""
        
        recommendations = []
        
        # Project recommendations
        if project_analysis['totalProjects'] < 3:
            recommendations.append({
                "type": "Projects",
                "priority": "High",
                "title": "Build More Projects",
                "description": "Aim to have at least 3-5 substantial projects in your portfolio to demonstrate your skills.",
                "action": "Start a new project using modern technologies"
            })
        
        if project_analysis['diversity'] < 50:
            recommendations.append({
                "type": "Projects",
                "priority": "Medium",
                "title": "Diversify Your Tech Stack",
                "description": "Expand your portfolio by working with different technologies and frameworks.",
                "action": "Learn a new framework or technology"
            })
        
        # Skill recommendations
        for gap in skill_gaps[:2]:  # Top 2 skill gaps
            recommendations.append({
                "type": "Skills",
                "priority": gap['priority'],
                "title": f"Learn {gap['category']} Technologies",
                "description": f"Consider learning: {', '.join(gap['missingSkills'])}",
                "action": f"Take a course in {gap['missingSkills'][0]}"
            })
        
        # General recommendations
        recommendations.append({
            "type": "Portfolio",
            "priority": "Medium",
            "title": "Document Your Projects",
            "description": "Ensure all projects have clear README files, screenshots, and live demos.",
            "action": "Add documentation to your top 3 projects"
        })
        
        return recommendations
    
    def _analyze_career_alignment(self, career_results: Any) -> List[Dict[str, Any]]:
        """Analyze alignment with career paths"""
        
        # Default career alignments
        return [
            {
                "career": "Full Stack Developer",
                "alignment": 85,
                "matchingSkills": ["React", "Node.js", "Database"],
                "missingSkills": ["Docker", "AWS"]
            },
            {
                "career": "Frontend Developer",
                "alignment": 90,
                "matchingSkills": ["React", "TypeScript", "CSS"],
                "missingSkills": ["Testing", "Performance Optimization"]
            },
            {
                "career": "Backend Developer",
                "alignment": 75,
                "matchingSkills": ["Node.js", "API Development"],
                "missingSkills": ["Microservices", "Message Queues"]
            }
        ]
    
    def _get_industry_demand(self, skills: List[str]) -> Dict[str, Any]:
        """Get industry demand for current skills"""
        
        return {
            "overallDemand": "High",
            "trendingSkills": ["AI/ML", "Cloud Computing", "DevOps"],
            "marketValue": "Above Average",
            "growthPotential": 85
        }
    
    def _get_competitive_analysis(self, strength_score: Dict) -> Dict[str, Any]:
        """Compare with other portfolios"""
        
        score = strength_score['score']
        
        if score >= 80:
            percentile = 90
        elif score >= 60:
            percentile = 70
        elif score >= 40:
            percentile = 50
        else:
            percentile = 30
        
        return {
            "percentile": percentile,
            "comparison": f"Your portfolio is stronger than {percentile}% of similar profiles",
            "standoutFeatures": ["Project diversity", "Modern tech stack"],
            "areasToImprove": ["Add more complex projects", "Expand skill set"]
        }
    
    def _get_fallback_analysis(self, projects: List[Dict], skills: List[str], achievements: str) -> Dict[str, Any]:
        """Fallback analysis when ChromaDB query fails"""
        
        project_analysis = self._analyze_projects(projects)
        strength_score = self._calculate_portfolio_strength(projects, skills, achievements)
        
        return {
            "portfolioStrength": strength_score,
            "projectAnalysis": project_analysis,
            "skillGaps": [],
            "recommendations": [
                {
                    "type": "General",
                    "priority": "High",
                    "title": "Continue Building",
                    "description": "Keep working on projects and learning new skills",
                    "action": "Set weekly learning goals"
                }
            ],
            "careerAlignment": [],
            "industryDemand": {"overallDemand": "High", "trendingSkills": [], "marketValue": "Average", "growthPotential": 70},
            "competitiveAnalysis": {"percentile": 50, "comparison": "Average portfolio", "standoutFeatures": [], "areasToImprove": []}
        }

# Singleton instance
chroma_service = ChromaDBService()

