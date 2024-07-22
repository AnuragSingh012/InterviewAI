import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { chatSession } from "@/api/GeminiApi";
import mic from "../assets/mic.svg";
import disableMic from "../assets/disableMic.svg";

export default function SpeechToText({ questions, index, onSaveFeedback }) {
  const [userAnswer, setUserAnswer] = useState("");

  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAnswer) => prevAnswer + result.transcript);
    });
  }, [results]);

  useEffect(() => {
    const processUserAnswer = async () => {
      if (!isRecording && userAnswer) {
        const feedbackPrompt = `Question: ${questions[index].questionText} User Answer: ${userAnswer} Please evaluate the user's answer based on the given interview question. Provide a rating from 0 to 5 (0 being the lowest and 5 being the highest). Additionally, provide an improved answer directly if necessary. Format the response in JSON with "rating", "feedback", and "improvedAnswer" fields. Ensure the feedback is concise and within 3 to 5 lines. Example: {"rating": 4, "feedback": "Your answer is good but could include more details about your specific role in the project.", "improvedAnswer": "Your improved answer here."}`;

        try {
          const data = await chatSession.sendMessage(feedbackPrompt);
          const feedbackResponse = await data.response.text();
          const formattedFeedbackResponse = feedbackResponse
            .replace("```json", "")
            .replace("```", "");
          const parsedFeedbackResponse = JSON.parse(formattedFeedbackResponse);

          onSaveFeedback({
            questionText: questions[index].questionText,
            userAnswer,
            ...parsedFeedbackResponse,
          });

          toast("Answer Recorded Successfully!");
        } catch (error) {
          toast("Error while sending Answer to the API");
        }
      }
    };

    processUserAnswer();
  }, [isRecording, userAnswer, questions, index, onSaveFeedback]);

  useEffect(() => {
    setUserAnswer(""); // Reset user answer when question index changes
  }, [index]);

  const handleButtonClick = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      startSpeechToText();
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <Button variant="outline" onClick={handleButtonClick}>
        {isRecording ? (
          <div className="flex gap-2 justify-center items-center">
            <img className="w-4 h-4" src={disableMic} alt="disableMic" />
            <span className="text-red-600 font-semibold">Stop Recording</span>
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <img className="w-4 h-4" src={mic} alt="mic" />
            <span>Record Answer</span>
          </div>
        )}
      </Button>
    </div>
  );
}
