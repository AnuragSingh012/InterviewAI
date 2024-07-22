import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import SpeechToText from "../components/SpeechToText";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const Questions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(`/api/interview/${id}`);
        setQuestions(response.data.questions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterview();
  }, [id]);

  useEffect(() => {
    if (questions.length > 0) {
      const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      };

      speak(questions[index]?.questionText);
    }
  }, [questions, index]);

  const handleSaveFeedback = (feedback) => {
    setFeedbackList((prevFeedbackList) => {
      const updatedFeedbackList = [...prevFeedbackList];
      updatedFeedbackList[index] = feedback;
      return updatedFeedbackList;
    });
  };

  const decreaseIndex = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const increaseIndex = () => {
    if (index < questions.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleEndInterview = async () => {
    console.log(feedbackList);
    try {
      await axios.post(`/api/interview/${id}/feedback`, { feedbackList });
      navigate(`/interview/${id}/feedback`);
    } catch (err) {
      console.error("Error saving feedback", err);
    }
  };

  return (
    <div className="overflow-hidden p-4">
      <div className="font-inter flex flex-col-reverse md:flex-row mt-6 md:mt-14 justify-between gap-4">
        <div className="flex-1 flex flex-col p-6">
          <div className="font-semibold text-sm text-blue-600 mb-4">
            Question {index + 1} out of {questions.length}
          </div>
          <div className="mb-4 text-lg font-semibold">
            {questions[index]?.questionText || "Loading..."}
          </div>
          <div className="flex gap-2">
            {index > 0 && <Button onClick={decreaseIndex}>Previous</Button>}
            {index < questions.length - 1 ? (
              <Button onClick={increaseIndex}>Next</Button>
            ) : (
              <Button onClick={handleEndInterview}>End Interview</Button>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col w-full">
          <div className="w-full h-[20rem] md:h-[25rem] bg-[#1f2023] rounded-lg overflow-hidden flex items-center justify-center">
            <Webcam
              className="w-full h-full object-cover"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user",
              }}
            />
          </div>
          <div className="flex gap-2 mt-2 justify-center">
            <div className="flex justify-center items-center">
              <SpeechToText
                questions={questions}
                index={index}
                onSaveFeedback={handleSaveFeedback}
                key={index} // Adding key to reset component state
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
