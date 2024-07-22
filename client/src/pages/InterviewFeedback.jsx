import React, { useEffect, useState } from "react";
import down from "../assets/down.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const InterviewFeedback = () => {
  const { id } = useParams();
  const [feedbacks, setFeedBacks] = useState([]);
  console.log(id);

  useEffect(() => {
    const fetchInterviewFeedback = async () => {
      const response = await axios.get(`/api/interview/${id}/feedback`);
      console.log("response=", response.data[0].feedbacks);
      setFeedBacks(response.data[0].feedbacks);
    };
    fetchInterviewFeedback();
  }, [id]);

  return (
    <div className="p-6 font-inter bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold text-[#6c5ce7] mb-8 mt-4">
        Feedback
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
