import express from "express";
import { z } from "zod";
const app = express();
app.use(express.json());
const port = 3000;

const schema = z.object({
  name: z.string(),
  lastName: z.string(),
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  const input = schema.parse(req.body);
  res.send(`Hello ${input.name} + ${input.lastName}!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
