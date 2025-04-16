// src/components/JobList.jsx
import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default JobList;
