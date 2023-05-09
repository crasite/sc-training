import { router, publicProcedure } from "./trpc";
import mongoose from "mongoose";
import { z } from "zod";

const kittySchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Kitten = mongoose.model("Kitten", kittySchema);

const addKitten = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    const newKitten = new Kitten({ name: input, age: 0 });
    await newKitten.save();
    return newKitten.toJSON();
  });

export const dbRouter = router({
  addKitten,
});
