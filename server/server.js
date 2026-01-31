import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./src/inngest";
import { serve } from "./inngest/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
