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
    name: zod_1.z.string(),
    lastName: zod_1.z.string(),
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
