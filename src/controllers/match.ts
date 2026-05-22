import { Request, Response } from "express";
import { candidates, jobs } from "../data/store";
import { calculateScore } from "../services/scoring";
import { MatchRequestBody } from "../types/type";

export const matchCandidates = (
  req: Request<{}, {}, MatchRequestBody>,
  res: Response,
) => {
  const { jobId, minScore } = req.body;

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  let results = candidates.map((candidate) => {
    const score = calculateScore(candidate, job);
    return { candidate, ...score };
  });

  if (minScore !== undefined) {
    results = results.filter((r) => r.totalScore >= minScore);
  }

  results.sort((a, b) => b.totalScore - a.totalScore);

  res.json(results);
};
