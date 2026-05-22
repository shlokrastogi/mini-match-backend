import { z } from "zod";

export const CandidateSchema = z.object({
  name: z.string().min(1),
  skills: z.array(z.string()),
  yearsExperience: z.number().min(0),
  location: z.string().optional(),
});
