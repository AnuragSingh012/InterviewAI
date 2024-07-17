import express from "express";
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

app.get("/", (req, res) => {
  res.send("App is running");
});

export default app;
