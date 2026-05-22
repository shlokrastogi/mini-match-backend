import express, { Request, Response } from "express";
import cors from "cors";

import { candidates, jobs } from "./data/store";
import { matchCandidates } from "./controllers/match";
import { CandidateSchema } from "./schemas/CandidateSchema";
import { MatchSchema } from "./schemas/MatchSchema";
import { Candidate } from "./types/type";

const app = express();

app.use(cors());
app.use(express.json());

// GET jobs
app.get("/jobs", (req: Request, res: Response) => {
  res.json(jobs);
});

// POST candidates
app.post("/candidates", (req: Request, res: Response) => {
  const result = CandidateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  const newCandidate: Candidate = {
    id: Date.now().toString(),
    ...result.data,
  };

  candidates.push(newCandidate);

  res.status(201).json(newCandidate);
});

// POST match
app.post("/match", (req: Request, res: Response) => {
  const result = MatchSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  matchCandidates(req, res);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
