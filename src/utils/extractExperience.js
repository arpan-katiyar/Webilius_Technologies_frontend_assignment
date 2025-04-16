export function extractExperience(resumeText) {
  if (!resumeText || typeof resumeText !== "string") {
    console.warn("Invalid resume text provided");
    return 0;
  }

  try {
    // ✅ Normalize resume text before section extraction
    const normalizedResumeText = resumeText
      .replace(
        /\b(currently?|present(ly)?|now|till\s+date|ongoing|presently)\b/gi,
        "Present"
      )
      .replace(/\s+/g, " ")
      .replace(/[\u2013\u2014—]/g, "-") // Normalize en-dash/em-dash to regular dash
      .replace(/\b(\d{1,2})(?:st|nd|rd|th)\b/g, "$1");

    const experienceSection = getExperienceSection(normalizedResumeText);

    if (!experienceSection) {
      console.warn("No experience section found in resume");
      return 0;
    }

    // Continue with already-normalized section
    const normalizedText = experienceSection;

    // Try explicit experience mention first
    const explicitMatch = normalizedText.match(
      /(\d+(?:\.\d+)?)\s*(?:years?|yrs?|years of experience|yoe)\b/i
    );
    if (explicitMatch) {
      return parseFloat(explicitMatch[1]);
    }

    const dateRangePattern =
      /(?:\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}|\b\d{1,2}[\/\-]\d{4}|\b\d{4}|\b(?:Q[1-4]|Quarter [1-4])\s+\d{4})\s*(?:-|to|–|until|till|\s)\s*(?:\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{1,2}[\/\-]\d{4}|\d{4}|Present|current(?:ly)?|now|till\s+date|ongoing|presently)\b)/gi;

    let totalExperience = 0;
    let hasValidRange = false;
    const seenRanges = new Set();

    for (const range of normalizedText.matchAll(dateRangePattern)) {
      const rangeStr = range[0];
      if (seenRanges.has(rangeStr)) continue;
      seenRanges.add(rangeStr);

      const [startPart, endPart] = rangeStr.split(
        /\s*(?:-|to|–|until|till)\s*/
      );

      try {
        const startDate = parseDate(startPart.trim());
        const endDate = parseDate(endPart.trim());

        if (!isNaN(startDate.getTime())) {
          const endTime = !isNaN(endDate.getTime()) ? endDate : new Date();
          const diffYears =
            (endTime - startDate) / (1000 * 60 * 60 * 24 * 365.25);

          if (diffYears > 0) {
            totalExperience += diffYears;
            hasValidRange = true;
          }
        }
      } catch (e) {
        console.warn("Couldn't parse date range:", rangeStr, e);
      }
    }

    if (hasValidRange) {
      return parseFloat(totalExperience.toFixed(1));
    }

    // Fallback: detect seniority levels
    const seniorityMatch = normalizedText.match(
      /(?:senior|sr\.|lead|principal|manager|director|head of|staff)\b/gi
    );
    if (seniorityMatch) {
      return seniorityMatch.length >= 2 ? 8 : 5;
    }

    return 0;
  } catch (error) {
    console.error("Error in extractExperience:", error);
    return 0;
  }
}

// Helper: Get only the "Experience" section
function getExperienceSection(originalText) {
  const lowerText = originalText.toLowerCase();
  const sectionHeaders = [
    "experience",
    "experiences",
    "work experience",
    "job experience",
    "employment history",
    "professional experience",
    "professional background",
    "work history",
  ];

  for (const header of sectionHeaders) {
    const headerPos = lowerText.indexOf(header.toLowerCase());
    if (headerPos === -1) continue;

    const sectionEnd = findSectionEnd(
      originalText,
      lowerText,
      headerPos + header.length
    );
    return originalText.substring(headerPos + header.length, sectionEnd).trim();
  }

  return null;
}

// Helper: Find where the Experience section ends (when next section starts)
function findSectionEnd(originalText, lowerText, startPos) {
  const endMarkers = [
    "education",
    "skills",
    "projects",
    "certifications",
    "summary",
    "interests",
    "hobbies",
  ];

  let earliestEnd = originalText.length;
  for (const marker of endMarkers) {
    const pos = lowerText.indexOf(marker.toLowerCase(), startPos);
    if (pos !== -1 && pos < earliestEnd) {
      earliestEnd = pos;
    }
  }

  return earliestEnd;
}

// Helper: Parse many types of date formats
function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") {
    throw new Error("Invalid date input");
  }

  const cleaned = dateStr
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s\/\-]/gi, ""); // remove symbols

  if (/^(present(ly)?|current(ly)?|now|till\s+date|ongoing)$/i.test(cleaned)) {
    return new Date();
  }

  const monthMap = {
    jan: "01",
    january: "01",
    feb: "02",
    february: "02",
    mar: "03",
    march: "03",
    apr: "04",
    april: "04",
    may: "05",
    jun: "06",
    june: "06",
    jul: "07",
    july: "07",
    aug: "08",
    august: "08",
    sep: "09",
    sept: "09",
    september: "09",
    oct: "10",
    october: "10",
    nov: "11",
    november: "11",
    dec: "12",
    december: "12",
  };

  const formats = [
    /(\b[a-z]{3,9})[\s\-]+(\d{4})\b/i, // October 2024 or Oct-2024
    /(\d{1,2})[\/\-](\d{4})/, // 03/2024, 3-2024
    /^\d{4}$/, // Just year: 2024
    /(?:Q|Quarter )([1-4])\s+(\d{4})/i, // Q1 2023
  ];

  for (const pattern of formats) {
    const match = cleaned.match(pattern);
    if (!match) continue;

    if (pattern === formats[0]) {
      const rawMonth = match[1].slice(0, 3); // Ensure it's a valid prefix
      const year = match[2];
      const month = monthMap[rawMonth];
      if (month && year) {
        return new Date(`${year}-${month}-01`);
      }
    } else if (pattern === formats[1]) {
      const [_, month, year] = match;
      return new Date(`${year}-${month.padStart(2, "0")}-01`);
    } else if (pattern === formats[2]) {
      return new Date(`${match[0]}-01-01`);
    } else if (pattern === formats[3]) {
      const quarter = parseInt(match[1]);
      const year = match[2];
      const month = String((quarter - 1) * 3 + 1).padStart(2, "0");
      return new Date(`${year}-${month}-01`);
    }
  }

  // Fallback: try to extract any recognizable year-month pattern manually
  const fallbackMatch = cleaned.match(/(\d{4})/);
  if (fallbackMatch) {
    return new Date(`${fallbackMatch[1]}-01-01`);
  }

  throw new Error("Unrecognized date format: " + dateStr);
}
