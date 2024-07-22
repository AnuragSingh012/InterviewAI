import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import SpeechToText from "../components/SpeechToText";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Questions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [qaList, setQaList] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);


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

  const increaseIndex = () => {
    if (index < questions.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setHasAnswered(false);
    }
  };

  const handleEndInterview = async () => {
    try {
      await axios.post(`/api/interview/${id}/feedback`, qaList);
      navigate(`/interview/${id}/feedback`);
    } catch (err) {
      toast("Error while getting feedback");
    }
  };

  return (
    <div className="overflow-hidden p-4">
      <div className="font-inter flex flex-col-reverse md:flex-row mt-6 md:mt-14 justify-between gap-6">
        <div className="flex-1 flex flex-col p-6 bg-white rounded-lg shadow-sm">
          <div className="font-semibold text-sm text-blue-600 mb-4">
            Question {index + 1} out of {questions.length}
          </div>
          <div className="mb-4 text-lg font-semibold text-gray-800">
            {questions[index]?.questionText || "Loading..."}
          </div>
          <div className="flex gap-2">
            {generating ? (
              <h2>Generating Feedback ...</h2>
            ) : (
              <>
                {index < questions.length - 1 ? (
                  <Button
                    disabled={!hasAnswered}
                    onClick={increaseIndex}
                    className="transition-transform w-full md:w-auto transform hover:scale-105"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    disabled={!hasAnswered}
                    onClick={handleEndInterview}
                    className="transition-transform transform hover:scale-105"
                  >
                    End Interview
                  </Button>
                )}
              </>
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
          <div className="flex gap-2 mt-4 justify-center">
            <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-sm">
              <SpeechToText
                questions={questions}
                index={index}
                key={index}
                generating={generating}
                setGenerating={setGenerating}
                setQaList={setQaList}
                setHasAnswered={setHasAnswered}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
