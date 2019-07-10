import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: false },
    timePrepare: { type: Number, required: false },
    portion: { type: Number, required: false },
    category: { type: String, required: false },
    main_img: { type: String, required: false },
    description_short: { type: String, required: false },
    stepsPrepare: [{ id: String, val: String, required: false }],
    note: [{ nick: String, comment: String }],
    rate: Number,
    rateClick: Number,
    rateSum: Number,
    type: Number,
    ingredient: [
      {
        id: String,
        val: String,
        ingredients: [{ id: String, ingredient: String }],
        required: false
      }
    ],
    imagesName: [String]
  },
  { timestamps: true }
);

const recipes = mongoose.model("Recipe", recipeSchema);
export default recipes;
