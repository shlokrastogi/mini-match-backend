import express from "express";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import matchRoutes from "./routes/matchRoutes";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/jobs", jobRoutes);
app.use("/candidates", candidateRoutes);
app.use("/match", matchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
