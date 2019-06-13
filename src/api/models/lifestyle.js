import mongoose, { Schema } from "mongoose";

const lifestyleSchema = new Schema(
  {
    title: { type: String, required: false },
    description_short: { type: String, required: false },
    paragraf: [{ description: String }],
    mainImage: { type: String, required: false },
    epik: [
      {
        title: String,
        paragraf: [
          {
            description: String,
            img: String,
            list: [{ type: String }]
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

const lifestyle = mongoose.model("Lifestyle", lifestyleSchema);
export default lifestyle;
