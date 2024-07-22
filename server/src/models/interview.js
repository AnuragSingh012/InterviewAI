import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  jobRole: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  experience_level: {
    type: String,
    required: true,
  },
  interviewFocus: [
    {
      type: String,
      required: true,
    },
  ],
  number_of_questions: {
    type: Number,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
