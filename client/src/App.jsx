import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import SignInPage from "./pages/SignIn";
import Questions from "./components/Questions";
import InterviewFeedback from "./pages/InterviewFeedback";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl m-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview/:id" element={<Interview />} />
          <Route path="/interview/:id/start" element={<Questions />} />
          <Route
            path="/interview/:id/feedback"
            element={<InterviewFeedback />}
          />
          <Route element={<ProtectedRoute />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
