import express from "express";
import Interview from "./src/models/interview.js";
import Feedback from "./src/models/feedback.js";
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/api/dashboard/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const interviews = await Interview.find({ createdBy: id });
    if (interviews) return res.status(200).json(interviews);
    return res.send("No Interviews found");
  } catch (error) {
    return console.error(error);
  }
});

app.get("/api/interview/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const interview = await Interview.findById(id);
    if (interview) return res.status(200).json(interview);
    return res.send("Interview not found");
  } catch (error) {
    return console.error(error);
  }
});

app.post("/api/saveQuestion", async (req, res) => {
  const {
    jobRole,
    skills,
    experience_level,
    interviewFocus,
    numberOfQuestions,
    questions,
    createdBy,
  } = req.body;

  try {
    const newInterview = new Interview({
      jobRole,
      skills,
      experience_level,
      interviewFocus,
      number_of_questions: numberOfQuestions,
      questions,
      createdBy,
    });

    const savedInterview = await newInterview.save();
    res
      .status(201)
      .json({ id: savedInterview._id, message: "Saved Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/interview/:id/feedback", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Invalid interview ID" });
  }

  try {
    const interviewFeedback = await Feedback.find({ interviewId: id });

    if (!interviewFeedback || interviewFeedback.length === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json(interviewFeedback);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving feedback" });
  }
});

app.post("/api/interview/:id/feedback", async (req, res) => {
  const feedbackData = req.body;
  const interviewId = req.params.id;

  try {
    const newFeedback = new Feedback({
      interviewId,
      feedbacks: feedbackData,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({
      id: savedFeedback._id,
      message: "Feedback records inserted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("App is running");
});

export default app;
