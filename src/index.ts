import express from "express";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import matchRoutes from "./routes/matchRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobRoutes);
app.use("/candidates", candidateRoutes);
app.use("/match", matchRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
