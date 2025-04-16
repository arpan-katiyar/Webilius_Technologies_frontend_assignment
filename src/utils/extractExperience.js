export function extractExperience(resumeText) {
  // Try to find explicit experience mentions first
  const explicitMatch = resumeText.match(
    /(\d+(?:\.\d+)?)\s*(?:years?|yrs?|years of experience|yoe)/i
  );
  if (explicitMatch) {
    return parseFloat(explicitMatch[1]);
  }

  // Try to calculate from date ranges (more comprehensive)
  const dateRanges = resumeText.matchAll(
    /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\s*(?:-|to|–)\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}|Present/gi
  );

  let totalExperience = 0;
  let hasValidRange = false;

  for (const range of dateRanges) {
    const [startDateStr, endDateStr] = range[0].split(/\s*(?:-|to|–)\s*/);
    
    try {
      const startDate = new Date(startDateStr);
      const endDate = endDateStr.toLowerCase() === 'present' ? new Date() : new Date(endDateStr);
      
      if (!isNaN(startDate) && !isNaN(endDate)) {
        const diffTime = Math.abs(endDate - startDate);
        const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
        totalExperience += diffYears;
        hasValidRange = true;
      }
    } catch (e) {
      console.warn("Couldn't parse date range:", range[0]);
    }
  }

  if (hasValidRange) {
    return parseFloat(totalExperience.toFixed(1));
  }

  // Fallback: look for implicit experience indicators
  const implicitMatch = resumeText.match(
    /(?:senior|sr\.|lead|principal|manager|director)\b/i
  );
  if (implicitMatch) {
    return 5; // Assume senior-level experience if these terms appear
  }

  return 0; // Default for no experience found
}