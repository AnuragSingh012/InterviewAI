import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b">
      <div className="max-w-7xl px-4 m-auto py-2 flex items-center justify-between">
        <Link to="/">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8">
              <img src={logo} alt="logo" />
            </div>
            <h1 className="text-xl text-[#6c47ff] font-inter font-bold">
              InterviewAI
            </h1>
          </div>
        </Link>
        <div>
          <ul className="flex items-center justify-center gap-8 font-inter">
            <Link to="/dashboard">
              <li
                className={`text-sm font-bold cursor-pointer hover:text-gray-600 ${
                  location.pathname == "/dashboard" && "text-gray-700"
                }`}
              >
                Dashboard
              </li>
            </Link>
            <Link to="/about-us">
              <li className="text-sm font-bold cursor-pointer hover:text-gray-600">
                About Us
              </li>
            </Link>
            <Link to="/faq">
              <li className="text-sm font-bold cursor-pointer hover:text-gray-600">
                FAQ
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
