import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
