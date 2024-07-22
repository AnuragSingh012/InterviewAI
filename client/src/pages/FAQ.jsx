import React, { useState } from "react";
import { faqs } from "../constants/index.js";
import FAQItem from "@/components/FAQItem.jsx";

const FAQ = () => {
  return (
    <div className="p-6 font-inter bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#6c5ce7] mb-8 mt-4 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
