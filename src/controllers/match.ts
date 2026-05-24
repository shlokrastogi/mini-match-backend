import { z } from "zod";
import { Request, Response } from "express";
import { candidates, jobs } from "../data/store";
import { calculateScore } from "../services/scoring";
import { MatchSchema } from "../schemas/MatchSchema";

export const matchCandidates = (req: Request, res: Response) => {
  const parsed = MatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: z.treeifyError(parsed.error),
    });
  }

  const { jobId, minScore } = parsed.data;

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  const results = candidates
    .map((candidate) => {
      const score = calculateScore(candidate, job);
      return { candidate, ...score };
    })
    .filter((r) => (minScore !== undefined ? r.totalScore >= minScore : true))
    .sort((a, b) => b.totalScore - a.totalScore);

  return res.json(results);
};
