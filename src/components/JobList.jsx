import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default JobList;
