"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    name: zod_1.z
        .string()
        .toUpperCase()
        .transform((n) => n.length),
    age: zod_1.z.number().refine((n) => n > 0 && n <= 50, "Age must be between 0 - 50"),
});
const lineSchema = zod_1.z.object({
    message: zod_1.z.string().max(1000),
});
app.get("/", (req, res) => {
    const rt = {
        age: 30,
        name: 2,
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
app.post("/line", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = lineSchema.safeParse(req.body);
    if (!input.success) {
        res.json(input.error);
        return;
    }
    const formData = new FormData();
    formData.append("message", input.data.message);
    yield fetch("https://notify-api.line.me/api/notify", {
        method: "POST",
        headers: {
            Authorization: `Bearer rRNFMLCc3KAK1EXd7Tu0CpEKy6aQPnGJH2gADm8LOcm`,
        },
        body: formData,
    })
        .then((v) => v.json())
        .then((v) => res.json(v))
        .catch((e) => res.json(e));
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
