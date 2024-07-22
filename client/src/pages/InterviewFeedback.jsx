import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import down from "../assets/down.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import spinner from "../assets/tube-spinner1.svg";

const InterviewFeedback = () => {
  const { id } = useParams();
  const [feedbacks, setFeedBacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterviewFeedback = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/interview/${id}/feedback`);
        setFeedBacks(response.data[0].feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviewFeedback();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={spinner} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="p-6 font-inter bg-gray-50 min-h-screen">
      <div>
        {feedbacks.length === 0 ? (
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-[#6c5ce7] mb-8 mt-4">
              No Feedback available
            </h2>
            <Link to={`/interview/${id}`}>
              <Button variant="outline">Start Interview</Button>
            </Link>
          </div>
        ) : (
          <h2 className="text-3xl font-bold text-[#6c5ce7] mb-8 mt-4">
            Feedback
          </h2>
        )}
      </div>
      <div className="space-y-6">
        {feedbacks.map((feedback, index) => (
          <div key={index}>
            <Collapsible>
              <CollapsibleTrigger className="flex justify-between items-center px-6 py-3 text-left bg-slate-100 hover:bg-gray-50 rounded-lg cursor-pointer font-semibold text-lg shadow-md w-full transition duration-200">
                <h2 className="flex-1">{feedback.questionText}</h2>
                <img className="w-5 h-5" src={down} alt="down" />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-6 bg-white rounded-lg shadow-lg mt-3 transition duration-200">
                <div className="text-gray-700 mb-2">
                  <strong>Your Answer:</strong> {feedback.userAnswer}
                </div>
                <div className="text-gray-700 mb-2">
                  <strong>Rating:</strong> {feedback.rating}
                </div>
                <div className="text-gray-700 mb-2">
                  <strong>Feedback:</strong> {feedback.feedback}
                </div>
                <div className="text-gray-700">
                  <strong>Improved Answer:</strong> {feedback.improvedAnswer}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewFeedback;
