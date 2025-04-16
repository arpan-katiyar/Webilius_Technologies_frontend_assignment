// src/pages/HomePage.jsx
import JobSearchBar from "../components/JobSearchBar";
import ResumeUpload from "../components/ResumeUpload";
import AIResults from "../components/AIResults";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">AI-Powered Job Board</h1>
      
      <JobSearchBar />
      <ResumeUpload />
      <AIResults />
    </div>
  );
}

export default HomePage;
