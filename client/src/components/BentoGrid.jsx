import React from "react";

const BentoGrid = () => {
  return (
    <div className="p-4 mb-20 mt-8">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-2 font-inter">
        <div className="md:col-span-2 bg-gray-100 p-8 flex flex-col items-start justify-start rounded-xl">
          <div className="text-left flex flex-col gap-2">
            <div className="text-3xl font-bold text-[#925dd8]">
              Personalized Interview Questions
            </div>
            <div className="text-sm max-w-sm">
              Receive tailored questions based on your job role, skills, and
              experience level
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-8 md:row-span-2 flex items-start justify-start text-left rounded-xl">
          <div className="text-left flex flex-col gap-2">
            <div className="text-3xl font-bold text-[#925dd8]">
              Real-time Feedback
            </div>
            <div className="text-sm max-w-sm">
              Get instant feedback on your responses to help you improve and
              refine your answers
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-8 flex items-start justify-start text-left rounded-xl">
          <div className="text-left flex flex-col gap-2">
            <div className="text-3xl font-bold text-[#925dd8]">
              User-friendly Interface
            </div>
            <div className="text-sm max-w-sm">
              Enjoy a seamless and intuitive interface designed to make your
              interview preparation stress-free
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-8 flex items-start justify-start text-left rounded-xl">
          <div className="text-left flex flex-col gap-2">
            <div className="text-3xl font-bold text-[#925dd8]">
              Customizable Settings
            </div>
            <div className="text-sm max-w-sm">
              Adjust the difficulty level, number of questions, and interview
              focus areas to suit your needs
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-8 flex items-center justify-start text-left rounded-xl">
          <div className="text-left flex flex-col gap-2">
            <div className="text-3xl font-bold text-[#925dd8]">
              24/7 Availability
            </div>
            <div className="text-sm max-w-sm">
              Prepare for your interviews anytime, anywhere, with 24/7 access to
              the platform
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-8 flex items-start justify-start text-left rounded-xl">
          <div className="text-left flex flex-col gap-2">
            <div className="text-3xl font-bold text-[#925dd8]">
              Mock Interviews
            </div>
            <div className="text-sm max-w-sm">
              Simulate real interview scenarios to practice and boost your
              confidence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
