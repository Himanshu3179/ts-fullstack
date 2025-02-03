import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// Use CORS middleware
app.use(cors());

// Define a GET route for "/"
app.get("/", (req: Request, res: Response) => {
  res.json("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
