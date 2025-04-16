// src/components/JobSearchBar.jsx
import { useState } from "react";

function JobSearchBar() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", keyword, location);
    // Optional: Update state or trigger a mock search
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Job title or keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}

export default JobSearchBar;
