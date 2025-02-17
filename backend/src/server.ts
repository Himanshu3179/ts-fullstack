// FILEPATH: /Users/apple/Desktop/company/cron-job/backend/src/server.ts

import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { startCronJob } from "./config/cron";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/rssFeeds";

// Use CORS middleware
app.use(cors());

// Define a GET route for "/"
app.get("/", (req: Request, res: Response) => {
  res.json("Hello, world!");
});

// Connect to MongoDB with increased timeout settings
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startCronJob(); // Start the cron job when the server starts
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
