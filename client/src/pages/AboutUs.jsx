// AboutUs.js
import React from "react";
import Feature from "@/components/Feature";
import { feature } from "../constants/index";

const AboutUs = () => {
  return (
    <div className="p-6 font-inter bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#6c5ce7] mb-8 mt-4 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          At InterviewAI, we are dedicated to helping you excel in your job
          interviews. Our platform is designed to provide you with personalized,
          real-time feedback, and a user-friendly experience to make your
          interview preparation stress-free and effective.
        </p>

        <div className="space-y-10">
          {feature.map((feat, index) => (
            <Feature
              key={index}
              title={feat.title}
              description={feat.description}
              icon={feat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
