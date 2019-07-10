import Recipe from "../../models/recipe";
import Lifestyle from "../../models/lifestyle";

export const getHomView = async (req, res, next) => {
  console.log("HOME VIUWE");
  try {
    const recipeHome = await Recipe.aggregate([
      {
        $project: {
          _id: "$_id",
          title: "$title",
          main_img: "$main_img",
          type: "$type",
          description: "$description_short",
          rate: "$rate",
          category: "$category",
          create: "$createdAt"
        }
      }
    ]);
    const lifestyleHome = await Lifestyle.aggregate([
      {
        $project: {
          _id: "$_id",
          title: "$title",
          main_img: "$mainImage",
          type: "$type",
          description: "$description_short",
          create: "$createdAt"
        }
      }
    ]);
    console.log(lifestyleHome);
    return res.status(200).json({
      succes: true,
      lifestyle: lifestyleHome,
      recipe: recipeHome
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
