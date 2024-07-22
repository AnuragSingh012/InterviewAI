import React from "react";

const Feature = ({ title, description, icon }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="text-3xl">{icon}</div>
      <div>
        <h2 className="text-2xl font-semibold text-[#6c5ce7] mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
