import React from "react";

const JobCard = ({ job }) => {
  return (
    <div
      className="border p-4 rounded-md shadow-md mb-4 
       hover:shadow-lg transition-all duration-300
       bg-white hover:bg-blue-50"
    >
      <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
      <p className="text-gray-600 mt-1">{job.company}</p>
      <p className="mt-3 text-gray-700">{job.description}</p>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-800">Skills Required:</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {job.skillsRequired.map((skill, index) => (
            <li key={index} className="text-gray-600">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-800">Experience Required:</h4>
        <p className="text-gray-600">{job.experienceRequired} years</p>
      </div>
    </div>
  );
};

export default JobCard;
