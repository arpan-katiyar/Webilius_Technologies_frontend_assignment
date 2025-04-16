export function matchJobs(jobs, extractedSkills, resumeExperience) {
  // Convert all extracted skills to lowercase for comparison
  const lowerExtractedSkills = extractedSkills.map(skill => skill.toLowerCase());
  
  return jobs.filter(job => {
    // Skill matching
    const matchedSkills = job.skillsRequired.filter(skill =>
      lowerExtractedSkills.includes(skill.toLowerCase())
    );

    // Experience matching with more flexible logic
    let experienceMatch = true;
    
    if (job.experienceRequired) {
      // If no experience found in resume, be more lenient
      if (resumeExperience === 0) {
        experienceMatch = job.experienceRequired <= 1; // Only match entry-level
      } else {
        // Allow some flexibility (candidate can have slightly less experience)
        const requiredExp = job.experienceRequired;
        experienceMatch = resumeExperience >= requiredExp * 0.8; // 80% match
      }
    }

    // Require at least 2 matching skills AND experience match
    return matchedSkills.length >= 2 && experienceMatch;
  });
}