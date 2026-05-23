import express from "express";
import { candidates } from "../data/store";
import { CandidateSchema } from "../schemas/CandidateSchema";

const router = express.Router();

router.post("/", (req, res) => {
  const result = CandidateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  const newCandidate = {
    id: Date.now().toString(),
    ...result.data,
  };

  candidates.push(newCandidate);

  res.status(201).json(newCandidate);
});

export default router;
