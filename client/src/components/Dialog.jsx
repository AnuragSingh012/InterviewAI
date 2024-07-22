import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import spinner from "../assets/tube-spinner.svg";
import { chatSession } from "@/api/GeminiApi";
import axios from "axios";

const Dialog = () => {
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [interviewFocus, setInterviewFocus] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [generating, setGenerating] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const { isSignedIn, userId } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setError(null);

    const skillsArray = skills.split(",").map((skill) => skill.trim());
    const interviewFocusArray = interviewFocus
      .split(",")
      .map((focus) => focus.trim());
    const prompt = JSON.stringify({
      job_role: jobRole,
      skills: skillsArray,
      experience_level: parseInt(experience, 10),
      interview_focus: interviewFocusArray,
      number_of_questions: parseInt(numberOfQuestions, 10),
      first_question: "Tell me about yourself",
      output_format: "JSON",
      example_format: [
        { question: "Tell me about yourself" },
        { question: "Next question here" },
      ],
      instructions:
        "Please provide the questions in the specified JSON format.",
    });

    console.log(prompt);

    try {
      const data = await chatSession.sendMessage(prompt);
      const questionResponse = await data.response.text();
      const formattedResponse = questionResponse
        .replace("```json", "")
        .replace("```", "");
      const parsedResponse = JSON.parse(formattedResponse);
      setQuestions(parsedResponse);
      console.log(parsedResponse);

      // Prepare questions in the required format for the database
      const questionsFormatted = parsedResponse.map((q) => ({
        questionText: q.question,
      }));

      // Save the generated questions to the backend
      const response = await axios.post("/api/saveQuestion", {
        jobRole,
        skills: skillsArray,
        experience_level: experience,
        interviewFocus: interviewFocusArray,
        numberOfQuestions,
        questions: questionsFormatted,
        createdBy: userId,
      });

      console.log(response.data.id);
      navigate(`/interview/${response.data.id}`);
    } catch (err) {
      setError("Failed to generate questions. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleButtonClick = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
    }
  };

  return (
    <div>
      <UIDialog>
        <DialogTrigger asChild>
          {!isSignedIn ? (
            <Button className="my-6" onClick={handleButtonClick}>
              Get Started
            </Button>
          ) : (
            <Button className="my-6">Start Interview</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Profile</DialogTitle>
            <DialogDescription>
              <p>
                Fill out the form below to set up your personalized interview
                experience
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 mt-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="jobTitle" className="font-semibold">
                    Preferred Job Title/Role
                  </label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="e.g., Front-End Developer, Data Analyst"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="skills" className="font-semibold">
                    Skills/Tech Stack
                  </label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="e.g., JavaScript, Python, React, Node.js"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="experience" className="font-semibold">
                    Experience Level (Years)
                  </label>
                  <Input
                    id="experience"
                    name="experience"
                    placeholder="e.g., 2, 5, 10"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="focus" className="font-semibold">
                    Interview Focus
                  </label>
                  <Input
                    id="focus"
                    name="focus"
                    placeholder="e.g., System Design, Behavioral Questions, General"
                    value={interviewFocus}
                    onChange={(e) => setInterviewFocus(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="questions" className="font-semibold">
                    Number of Questions
                  </label>
                  <Input
                    id="questions"
                    name="questions"
                    placeholder="e.g., 5, 10, 15"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex justify-end mt-4">
                  <Button type="submit" disabled={generating}>
                    {generating ? (
                      <>
                        <img
                          src={spinner}
                          alt="Generating..."
                          className="w-5 h-5"
                        />
                        <span className="ml-2">Generating...</span>
                      </>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </UIDialog>
    </div>
  );
};

export default Dialog;
