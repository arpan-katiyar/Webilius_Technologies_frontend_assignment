// src/components/JobCard.jsx
import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="border p-4 rounded-md shadow-md mb-4">
      <h3 className="text-2xl font-bold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="mt-2">{job.description}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Skills Required:</h4>
        <ul className="list-disc pl-5 text-sm">
          {job.skillsRequired.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold">Experience Required:</h4>
        <p>{job.experienceRequired} years</p>
      </div>
    </div>
  );
};

export default JobCard;
