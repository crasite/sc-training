"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const schema = zod_1.z.object({
    name: zod_1.z.string().toUpperCase(),
    age: zod_1.z.number().gt(0).lt(200).or(zod_1.z.string().max(3)),
});
app.get("/", (req, res) => {
    res.send("Hello World!");
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
