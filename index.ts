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

const lineSchema = z.object({
  message: z.string().max(1000),
});

app.get("/", (req, res) => {
  const rt: z.infer<typeof schema> = {
    age: 30,
    name: 2,
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

app.post("/line", async (req, res) => {
  const input = lineSchema.parse(req.body);
  const formData = new FormData();
  formData.append("message", input.message);
  await fetch("https://notify-api.line.me/api/notify", {
    method: "POST",
    headers: {
      Authorization: `Bearer xrRNFMLCc3KAK1EXd7Tu0CpEKy6aQPnGJH2gADm8LOcm`,
    },
    body: formData,
  })
    .then((v) => v.json())
    .then((v) => res.json(v))
    .catch((e) => res.json(e));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
