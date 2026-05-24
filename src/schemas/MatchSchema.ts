import { z } from "zod";

export const MatchSchema = z.object({
  jobId: z.string().min(1),
  minScore: z.number().min(0).max(1).optional(),
});

export type MatchRequestBody = z.infer<typeof MatchSchema>;
