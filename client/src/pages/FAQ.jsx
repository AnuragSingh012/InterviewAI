import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { faqs } from "../constants/index.js";

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

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Collapsible>
        <CollapsibleTrigger
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer font-semibold text-lg shadow-sm w-full transition duration-200"
        >
          <h2>{question}</h2>
          <img
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={isOpen ? "up-arrow-icon-url" : "down-arrow-icon-url"}
            alt={isOpen ? "Collapse" : "Expand"}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={`p-4 bg-white rounded-md shadow-md mt-2 transition duration-200 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <p className="text-gray-700">{answer}</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FAQ;
