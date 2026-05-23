import express from "express";
import { jobs } from "../data/store";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(jobs);
});

export default router;
