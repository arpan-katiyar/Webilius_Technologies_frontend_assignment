// src/components/ResumeUpload.jsx
import { useState } from "react";

function ResumeUpload() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      // You can pass it to AI logic or show a toast
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <label className="block text-sm font-medium mb-2">
        Upload Resume (PDF):
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none"
      />
      {fileName && <p className="mt-2 text-green-600">Uploaded: {fileName}</p>}
    </div>
  );
}

export default ResumeUpload;
