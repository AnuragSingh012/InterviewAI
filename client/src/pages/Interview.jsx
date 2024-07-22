import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import disabledVideo from "../assets/disabledvideo.png";
import video from "../assets/video.png";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Interview = () => {
  const { id } = useParams();
  const [interviewData, setInterviewData] = useState({});
  const [enableWebcam, setEnableWebcam] = useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(`/api/interview/${id}`);
        console.log(response.data);
        setInterviewData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterview();
  }, [id]);

  const handleVideo = () => {
    setEnableWebcam((prevEnableWebcam) => !prevEnableWebcam);
  };

  return (
    <div className="overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Get Started</h1>
      <p className="text-md text-red-500 mb-4">
        {!enableWebcam &&
          "Note: Please turn on your webcam before starting the interview"}
      </p>
      <div className="font-inter flex flex-col-reverse md:flex-row mt-6 md:mt-14 justify-between gap-4">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-md">
              <h2 className="font-semibold">Job Role:</h2>
              <p>{interviewData.jobRole}</p>
            </div>
            <div className="flex gap-2 text-md">
              <h2 className="font-semibold">Experience Level:</h2>
              <p>{interviewData.experience_level}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <h2 className="font-semibold">Skills:</h2>
              {interviewData.skills?.map((skill, index) => (
                <div key={index}>{`${skill}${
                  index < interviewData.skills.length - 1 ? "," : ""
                }`}</div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <h2 className="font-semibold">Interview Focus:</h2>
              {interviewData.interviewFocus?.map((focus, index) => (
                <div key={index}>{`${focus}${
                  index < interviewData.interviewFocus.length - 1 ? "," : ""
                }`}</div>
              ))}
            </div>
            <Link className="mt-6" to={`/interview/${id}/start`}>
              <Button>Start Interview</Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col w-full">
          <div className="w-full h-[20rem] md:h-[25rem] bg-[#1f2023] rounded-lg overflow-hidden flex items-center justify-center">
            {!enableWebcam ? (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white">Webcam Disabled</p>
              </div>
            ) : (
              <Webcam
                className="w-full h-full object-cover"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
              />
            )}
          </div>
          <div className="flex gap-2 mt-2 justify-center">
            <Button
              onClick={handleVideo}
              variant="outline"
              className="flex gap-2 px-1 pr-4 py-6 justify-center items-center rounded-full"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex justify-center items-center">
                <img
                  className="w-6 h-6"
                  src={enableWebcam ? video : disabledVideo}
                  alt="Video"
                />
              </div>
              {enableWebcam ? "ON" : "OFF"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
