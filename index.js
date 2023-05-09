"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const router_1 = require("./router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const schema = zod_1.z.object({
    name: zod_1.z
        .string()
        .toUpperCase()
        .transform((n) => n.length),
    age: zod_1.z.number().refine((n) => n > 0 && n <= 50, "Age must be between 0 - 50"),
});
app.get("/", (req, res) => {
    const rt = {
        age: 30,
        name: router_1.a,
    };
    res.json(rt);
});
app.post("/", (req, res) => {
    const input = schema.safeParse(req.body);
    if (input.success) {
        res.send(`Hello ${input.data.name} ${input.data.age}!`);
    }
    else {
        res.json(input.error);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
