import Recipe from "../../models/recipe";
import Lifestyle from "../../models/lifestyle";

export const getImagesBottom = async (req, res, next) => {
  try {
    const recipeRandom = await Recipe.aggregate([
      { $sample: { size: 5 } },
      { $project: { _id: "$_id", main_img: "$main_img", type: "$type" } }
    ]);
    const lifestyleRandom = await Lifestyle.aggregate([
      { $sample: { size: 5 } },
      { $project: { _id: "$_id", main_img: "$mainImage", type: "$type" } }
    ]);

    return res.status(200).json({
      succes: true,
      lifestyle: lifestyleRandom,
      recipe: recipeRandom
    });
  } catch (error) {
    // error = {
    //   message: { succes: false }
    // };
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
