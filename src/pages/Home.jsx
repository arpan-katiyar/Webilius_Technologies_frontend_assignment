import { useState } from "react";
import { mockJobs } from "../utils/mockJobs";
import { matchJobs } from "../utils/matchJobs";
import { extractSkills } from "../utils/extractSkills";
import { extractExperience } from "../utils/extractExperience";
import ResumeUpload from "../components/ResumeUpload";
import JobList from "../components/JobList";
import { parseResumeFromPDF } from "../utils/pdfParser";

const Home = () => {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputType, setInputType] = useState("pdf"); // "pdf" or "text"

  const processResume = async (resumeContent) => {
    setIsLoading(true);
    setError(null);

    try {
      const skills = extractSkills(resumeContent);
      const experience = extractExperience(resumeContent);

      // Removed the error check here

      const jobs = matchJobs(mockJobs, skills, experience);
      setMatchedJobs(jobs || []);
    } catch (error) {
      console.error("Error processing resume:", error);
      setError(error.message || "Failed to process resume");
      setMatchedJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    try {
      const resumeText = await parseResumeFromPDF(file);
      await processResume(resumeText);
    } catch (error) {
      setError(error.message || "Failed to process PDF");
    }
  };

  const handleTextSubmit = (text) => {
    if (!text.trim()) {
      setError("Please enter your resume text");
      return;
    }
    processResume(text);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-center">AI-Powered Job Board</h1>

      <div className="flex mb-4 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            inputType === "pdf"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setInputType("pdf")}
        >
          Upload PDF
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            inputType === "text"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setInputType("text")}
        >
          Paste Text
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {inputType === "pdf" ? (
          <ResumeUpload onUpload={handleFileUpload} />
        ) : (
          <div>
            <textarea
              className="w-full p-3 border rounded-md min-h-[200px]"
              placeholder="Paste your resume text here..."
              onBlur={(e) => handleTextSubmit(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={(e) =>
                handleTextSubmit(e.target.previousElementSibling.value)
              }
            >
              Analyze Text
            </button>
          </div>
        )}
      </div>

      {/* Results section remains the same */}
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Analyzing your resume...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      ) : error ? (
        <div className="mt-6 p-4 bg-red-50 rounded-md text-red-600">
          {error}
        </div>
      ) : matchedJobs.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Top Matches ({matchedJobs.length})
          </h2>
          <JobList jobs={matchedJobs} />
        </div>
      ) : (
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            {inputType === "pdf"
              ? "Upload your PDF resume to discover matching jobs"
              : "Paste your resume text to discover matching jobs"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
