export type Candidate = {
  id: string;
  name: string;
  skills: string[];
  yearsExperience: number;
  location?: string;
};

export type Job = {
  id: string;
  title: string;
  requiredSkills: string[];
  minYearsExperience: number;
  location?: string;
};

export type MatchRequestBody = {
  jobId: string;
  minScore?: number;
};
