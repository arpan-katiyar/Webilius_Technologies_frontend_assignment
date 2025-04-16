const ResumeUpload = ({ onUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };
  return (
    <div className="transition-all duration-300 hover:scale-[1.01]">
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500
          file:transition file:duration-300
          file:hover:bg-blue-100 file:hover:scale-105
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700"
      />
      <p className="mt-1 text-sm text-gray-500">
        Upload your resume in PDF format
      </p>
    </div>
  );
};
export default ResumeUpload;
