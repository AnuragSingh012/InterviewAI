import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import spinner from "../assets/tube-spinner1.svg";

const Dashboard = () => {
  const [interviewData, setInterviewData] = useState([]);
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/dashboard/${userId}`);
        setInterviewData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={spinner} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl p-10 m-auto font-inter">
      <h1 className="text-3xl font-extrabold text-[#925dd8] mb-6">
        {interviewData.length === 0 ? (
          <div>No Recent Interviews</div>
        ) : (
          "Recent Interviews"
        )}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewData.map((interview, index) => (
          <div
            className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105"
            key={index}
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {interview.jobRole}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {interview.experience_level} years of Experience
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {interview.skills.map((skill, skillIndex) => (
                <span
                  className="bg-purple-600 text-white text-xs font-medium py-1 px-2 rounded-full"
                  key={skillIndex}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <Link to={`/interview/${interview._id}/feedback`}>
                <button className="bg-[#925dd8] text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Check Feedback
                </button>
              </Link>
              <Link to={`/interview/${interview._id}`}>
                <button className="border border-[#925dd8] text-[#925dd8] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 hover:text-puple-700 transition-colors">
                  Start Interview
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
