import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import down from "../assets/down.png";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Collapsible>
        <CollapsibleTrigger
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center px-4 py-3 text-left rounded-md cursor-pointer font-semibold text-lg shadow-sm w-full transition duration-200"
        >
          <h2>{question}</h2>
          <img
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={down}
            alt="Collapse"
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

export default FAQItem;
