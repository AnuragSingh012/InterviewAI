import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl px-6 m-auto py-3 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10">
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl text-[#6c47ff] font-inter font-bold">
              InterviewAI
            </h1>
          </div>
        </Link>
        <nav>
          <ul className="hidden md:flex items-center gap-8 font-inter">
            <li>
              <Link
                to="/dashboard"
                className={`text-sm font-semibold hover:text-gray-600 transition-colors ${
                  location.pathname === "/dashboard"
                    ? "text-gray-700"
                    : "text-gray-500"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="text-sm font-semibold text-gray-500 hover:text-gray-600 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-sm font-semibold text-gray-500 hover:text-gray-600 transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <SignedIn>
            <UserButton className="flex items-center gap-2" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">
              <Button>
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
