// src/components/AIResults.jsx
import { useEffect, useState } from "react";
import mockJobs from "../utils/mockAI"; // We'll create this next

function AIResults() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Simulate fetching AI job matches
    setTimeout(() => {
      setJobs(mockJobs);
    }, 1000);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">AI Suggested Jobs</h2>
      {jobs.length === 0 ? (
        <p>Loading suggestions...</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 rounded hover:bg-gray-50 transition"
            >
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIResults;
