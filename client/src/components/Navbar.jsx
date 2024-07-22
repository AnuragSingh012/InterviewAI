import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();

  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive((current) => !current);
  };

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
        <nav className="hidden md:flex">
          <ul className="md:flex items-center gap-8 font-inter">
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
        <div className="hidden md:flex">
          <SignedIn>
            <UserButton className="flex items-center gap-2" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </SignedOut>
        </div>
        <div className="md:hidden pr-6 cursor-pointer" onClick={handleClick}>
          <FontAwesomeIcon className="cursor-pointer" icon={faBars} />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 right-0 w-[300px] h-screen bg-white shadow-lg transform transition-transform ${
          isActive ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="p-8 flex justify-end text-[25px] text-slate-gray"
          onClick={handleClick}
        >
          <FontAwesomeIcon className="cursor-pointer" icon={faTimes} />
        </div>
        <div className="px-6 text-lg py-4">
          <div className="flex justify-end pb-4">
            <SignedIn>
              <UserButton className="flex items-center gap-2" />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">
                <Button onClick={handleClick}>Sign In</Button>
              </Link>
            </SignedOut>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                onClick={handleClick}
                to="/dashboard"
                className="text-lg font-semibold hover:text-gray-600 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                onClick={handleClick}
                to="/about-us"
                className="text-lg font-semibold hover:text-gray-600 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                onClick={handleClick}
                to="/faq"
                className="text-lg font-semibold hover:text-gray-600 transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
