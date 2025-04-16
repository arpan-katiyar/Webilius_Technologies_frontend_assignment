// A basic skills library (can be extended anytime)
const knownSkills = [
    "react", "javascript", "html", "css", "node.js", "express", "mongodb",
    "tailwind", "python", "django", "flask", "fastapi", "sql", "mysql",
    "postgresql", "java", "c++", "c#", "docker", "kubernetes", "aws",
    "azure", "git", "figma", "typescript", "redux", "vue.js", "next.js",
    "rest", "api", "graphql", "pandas", "numpy", "scikit-learn", "tensorflow",
    "openai", "huggingface", "powerbi", "react native", "android", "ios"
  ];
  
  export function extractSkills(resumeText) {
    const lowerText = resumeText.toLowerCase();
    const foundSkills = new Set();
  
    knownSkills.forEach(skill => {
      if (lowerText.includes(skill)) {
        foundSkills.add(skill);
      }
    });
  
    return Array.from(foundSkills);
  }
  