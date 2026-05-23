import express from "express";
import { matchCandidates } from "../controllers/match";

const router = express.Router();

router.post("/", matchCandidates);

export default router;
