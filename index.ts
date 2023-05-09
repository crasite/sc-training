import express from "express";
import { z } from "zod";
const app = express();
app.use(express.json());
const port = 3000;

const schema = z.object({
  name: z
    .string()
    .toUpperCase()
    .transform((n) => n.length),
  age: z.number().refine((n) => n > 0 && n <= 50, "Age must be between 0 - 50"),
});

app.get("/", (req, res) => {
  const rt: z.infer<typeof schema> = {
    age: 30,
    name: 4,
  };
  res.json(rt);
});

app.post("/", (req, res) => {
  const input = schema.safeParse(req.body);
  if (input.success) {
    res.send(`Hello ${input.data.name} ${input.data.age}!`);
  } else {
    res.json(input.error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
