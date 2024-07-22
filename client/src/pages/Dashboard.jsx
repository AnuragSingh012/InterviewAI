import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [interviewData, setInterviewData] = useState([]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get("/api/interview");
        console.log(response.data);
        setInterviewData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterview();
  }, []);

  return (
    <div className="max-w-5xl p-10 m-auto font-inter">
      <h1 className="text-3xl font-extrabold text-[#925dd8] mb-6">
        Recent Interviews
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
            <div className="mt-6">
              <Link to={`/interview/${interview._id}/feedback`}>
                <button className="bg-[#925dd8] text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Check Feedback
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
