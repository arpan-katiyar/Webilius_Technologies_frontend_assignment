// extractSkills.js
const knownSkills = [
  "react",
  "javascript",
  "html",
  "css",
  "node.js",
  "express",
  "mongodb",
  "tailwind",
  "python",
  "django",
  "flask",
  "fastapi",
  "sql",
  "mysql",
  "postgresql",
  "java",
  "c++",
  "c#",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "git",
  "figma",
  "typescript",
  "redux",
  "vue.js",
  "next.js",
  "rest",
  "api",
  "graphql",
  "pandas",
  "numpy",
  "scikit-learn",
  "tensorflow",
  "openai",
  "huggingface",
  "powerbi",
  "react native",
  "android",
  "ios",
];

export function extractSkills(resumeText) {
  const foundSkills = new Set();

  // Create regex patterns for each skill with word boundaries and case insensitivity
  const skillPatterns = knownSkills.map((skill) => {
    // Escape special regex characters and handle multi-word skills
    const escapedSkill = skill
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // Escape regex special chars
      .replace(/\s+/g, "\\s+"); // Handle spaces in multi-word skills

    return new RegExp(`\\b${escapedSkill}\\b`, "gi");
  });

  // Match against original text with case insensitivity
  skillPatterns.forEach((pattern, index) => {
    const matches = resumeText.match(pattern);
    if (matches) {
      foundSkills.add(knownSkills[index]); // Preserve original casing from library
    }
  });

  return Array.from(foundSkills);
}
