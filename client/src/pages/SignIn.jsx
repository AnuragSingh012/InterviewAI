import React from "react";
import { SignIn } from "@clerk/clerk-react";
import logo from "../assets/logo.png";
import checked from "../assets/checked.png";

const SignInPage = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen bg-gray-50">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center items-start w-full lg:w-1/2 h-full p-8 space-y-8">
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img className="w-6 h-6" src={checked} alt="Checked" />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#6c5ce7]">
              Personalized Interview Questions
            </h2>
            <p className="text-sm text-gray-600">
              Receive tailored questions based on your job role, skills, and
              experience level.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img className="w-6 h-6" src={checked} alt="Checked" />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#6c5ce7]">
              Real-time Feedback
            </h2>
            <p className="text-sm text-gray-600">
              Get instant feedback on your responses to help you improve and
              refine your answers.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img className="w-6 h-6" src={checked} alt="Checked" />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#6c5ce7]">
              Mock Interviews
            </h2>
            <p className="text-sm text-gray-600">
              Simulate real interview scenarios to practice and boost your
              confidence.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img className="w-6 h-6" src={checked} alt="Checked" />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#6c5ce7]">
              Customizable Settings
            </h2>
            <p className="text-sm text-gray-600">
              Adjust the difficulty level, number of questions, and interview
              focus areas to suit your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
};

export default SignInPage;
