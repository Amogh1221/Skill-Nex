import requests
import json
import time

# Test data
test_portfolio = {
    "projects": [
        {
            "name": "E-commerce Website",
            "description": "Built a full-stack e-commerce platform",
            "technologies": ["React", "Node.js", "MongoDB"],
            "url": "https://github.com/test/ecommerce",
            "highlights": ["Payment integration", "User authentication", "Admin dashboard"]
        },
        {
            "name": "Weather App",
            "description": "Mobile weather application",
            "technologies": ["React Native", "API Integration"],
            "url": "",
            "highlights": ["Real-time weather data", "Location services"]
        }
    ],
    "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Python", "Git"],
    "achievements": "AWS Certified Developer, Published 2 npm packages"
}

print("Testing Portfolio Analyzer API...")
print("=" * 50)

# Test 1: Health Check
print("\n1. Testing Health Endpoint...")
try:
    start = time.time()
    response = requests.get('http://localhost:5000/api/ai/health')
    elapsed = time.time() - start
    print(f"   ✓ Health check passed ({elapsed:.2f}s)")
    print(f"   Response: {response.json()}")
except Exception as e:
    print(f"   ✗ Health check failed: {e}")

# Test 2: Portfolio Analysis
print("\n2. Testing Portfolio Analysis Endpoint...")
try:
    start = time.time()
    response = requests.post(
        'http://localhost:5000/api/ai/portfolio/analyze',
        json=test_portfolio,
        headers={'Content-Type': 'application/json'}
    )
    elapsed = time.time() - start
    
    if response.status_code == 200:
        data = response.json()
        if data.get('success'):
            print(f"   ✓ Analysis completed successfully ({elapsed:.2f}s)")
            analysis = data['analysis']
            print(f"\n   Portfolio Strength: {analysis['portfolioStrength']['score']}/100")
            print(f"   Rating: {analysis['portfolioStrength']['rating']}")
            print(f"   Total Projects: {analysis['projectAnalysis']['totalProjects']}")
            print(f"   Complexity: {analysis['projectAnalysis']['complexity']}")
            print(f"   Recommendations: {len(analysis['recommendations'])} items")
        else:
            print(f"   ✗ Analysis failed: {data.get('error')}")
    else:
        print(f"   ✗ Request failed with status {response.status_code}")
        print(f"   Response: {response.text}")
except Exception as e:
    print(f"   ✗ Analysis request failed: {e}")

# Test 3: Project Suggestions
print("\n3. Testing Project Suggestions Endpoint...")
try:
    start = time.time()
    response = requests.post(
        'http://localhost:5000/api/ai/portfolio/suggestions',
        json={"skillLevel": "intermediate"},
        headers={'Content-Type': 'application/json'}
    )
    elapsed = time.time() - start
    
    if response.status_code == 200:
        data = response.json()
        if data.get('success'):
            print(f"   ✓ Suggestions retrieved successfully ({elapsed:.2f}s)")
            print(f"   Suggestions: {len(data['suggestions'])} projects")
        else:
            print(f"   ✗ Suggestions failed: {data.get('error')}")
    else:
        print(f"   ✗ Request failed with status {response.status_code}")
except Exception as e:
    print(f"   ✗ Suggestions request failed: {e}")

# Test 4: Skill Recommendations
print("\n4. Testing Skill Recommendations Endpoint...")
try:
    start = time.time()
    response = requests.post(
        'http://localhost:5000/api/ai/skills/recommend',
        json={"careerGoal": "Full Stack Developer"},
        headers={'Content-Type': 'application/json'}
    )
    elapsed = time.time() - start
    
    if response.status_code == 200:
        data = response.json()
        if data.get('success'):
            print(f"   ✓ Skill recommendations retrieved successfully ({elapsed:.2f}s)")
            print(f"   Recommendations: {len(data['recommendations'])} skills")
        else:
            print(f"   ✗ Recommendations failed: {data.get('error')}")
    else:
        print(f"   ✗ Request failed with status {response.status_code}")
except Exception as e:
    print(f"   ✗ Recommendations request failed: {e}")

print("\n" + "=" * 50)
print("Testing complete!")

