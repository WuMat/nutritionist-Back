import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: false },
    category: { type: String, required: false },
    timePrepare: { type: Number, required: false },
    portion: { type: Number, required: false },
    // stepsPrepare: [{ id: String, val: String, required: false }],
    // ingredient: [
    //   {
    //     id: String,
    //     val: String,
    //     ingredients: [{ id: String, ingredient: String }],
    //     required: false
    //   }
    // ],
    image: { type: String }
  },
  { timestamps: true }
);

const recipes = mongoose.model("Recipe", recipeSchema);
export default recipes;
