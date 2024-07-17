import React from "react";
import { SignIn } from "@clerk/clerk-react";
import logo from "../assets/logo.png";
import checked from "../assets/checked.png";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen gap-20 mx-10">
      <div className="hidden lg:flex flex-col justify-center items-center w-[50%] h-full">
        <div className="flex flex-col mt-6">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex justify-center items-center gap-2">
              <img className="w-4 h-4" src={checked} alt="" />
              <h2 className="text-xl font-bold text-[#925dd8]">
                Personalized Interview Questions
              </h2>
            </div>
            <div className="text-sm max-w-sm">
              Receive tailored questions based on your job role, skills, and
              experience level
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex justify-center items-center gap-2">
              <img className="w-4 h-4" src={checked} alt="" />
              <h2 className="text-xl font-bold text-[#925dd8]">
                Real-time Feedback
              </h2>
            </div>
            <div className="text-sm max-w-sm">
              Get instant feedback on your responses to help you improve and
              refine your answers
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex justify-center items-center gap-2">
              <img className="w-4 h-4" src={checked} alt="" />
              <h2 className="text-xl font-bold text-[#925dd8]">
                Mock Interviews
              </h2>
            </div>
            <div className="text-sm max-w-sm">
              Simulate real interview scenarios to practice and boost your
              confidence
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex justify-center items-center gap-2">
              <img className="w-4 h-4" src={checked} alt="" />
              <h2 className="text-xl font-bold text-[#925dd8]">
                Customizable Settings
              </h2>
            </div>
            <div className="text-sm max-w-sm">
              Adjust the difficulty level, number of questions, and interview
              focus areas to suit your needs
            </div>
          </div>
        </div>
      </div>
      <div>
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
};

export default SignInPage;
