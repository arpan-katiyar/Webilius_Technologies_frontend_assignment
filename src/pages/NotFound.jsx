import NotFound404 from "/404.gif";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-4">
        <img
          src={NotFound404}
          alt="Page not found"
          className="w-80 sm:w-96 md:w-[450px] lg:w-[600px] xl:w-[700px] max-w-full max-h-[70vh] object-contain"
        />
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-white text-black rounded shadow-md hover:bg-gray-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
