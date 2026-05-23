import { Candidate, Job } from "../types/type";

export function calculateScore(candidate: Candidate, job: Job) {
  let skillScore = 1;

  if (job.requiredSkills.length > 0) {
    const candidateSkills = candidate.skills.map((s) => s.toLowerCase());
    const requiredSkills = job.requiredSkills.map((s) => s.toLowerCase());

    const common = requiredSkills.filter((skill) =>
      candidateSkills.includes(skill),
    );

    skillScore = common.length / requiredSkills.length;
  }

  let expScore = 1;

  if (job.minYearsExperience > 0) {
    expScore = candidate.yearsExperience / job.minYearsExperience;
    expScore = Math.min(expScore, 1);
  }

  let locationScore = 0;

  if (!candidate.location || !job.location) {
    locationScore = 0.5;
  } else if (
    candidate.location.toLowerCase() === "remote" ||
    job.location.toLowerCase() === "remote"
  ) {
    locationScore = 1;
  } else if (candidate.location === job.location) {
    locationScore = 1;
  } else {
    locationScore = 0;
  }

  const totalRaw = 0.6 * skillScore + 0.3 * expScore + 0.1 * locationScore;

  const total = Number(totalRaw.toFixed(2));

  return {
    totalScore: total,
    breakdown: {
      skill: skillScore,
      experience: expScore,
      location: locationScore,
    },
  };
}
