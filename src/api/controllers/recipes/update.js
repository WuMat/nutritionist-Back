import Recipe from "../../models/recipe";

export const updateRecipe = async (req, res, next) => {
  const data = { ...req.body };
  const recipeId = data.id;
  try {
    // const recipe = await Recipe.findById(placeId);
    // if (!recipe) {
    //   console.log("wchodzi do ifa");
    //   const error = new Error("Recipe not found");
    //   error.statusCode = 404;
    //   throw error;
    // }
    console.log("wchodzi przed update");
    if (data.note) {
      await Recipe.updateOne({ _id: recipeId }, { $push: { note: data.note } });
    }
    if (data.rate) {
      const recipeRecord = await Recipe.find({ _id: recipeId });
      const ratingUpdate =
        (recipeRecord[0].rateSum + data.rate) / (recipeRecord[0].rateClick + 1);

      await Recipe.updateOne(
        { _id: recipeId },
        {
          $inc: { rateClick: 1, rateSum: data.rate },
          $set: { rate: ratingUpdate }
        }
      );
    }
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    console.log("ERROR");
    if (error.statusCode) {
      error.statusCode = 500;
    }
  }
};
