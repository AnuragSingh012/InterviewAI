import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  userAnswer: { type: String, required: true },
  rating: { type: Number, required: true },
  feedback: { type: String, required: true },
  improvedAnswer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const interviewFeedbackSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  feedbacks: [feedbackSchema],
});

const Feedback = mongoose.model("Feedback", interviewFeedbackSchema);
export default Feedback;
