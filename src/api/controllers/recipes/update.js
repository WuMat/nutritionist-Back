import Recipe from "../../models/recipe";

export const updateRecipe = async (req, res, next) => {
  const data = { ...req.body };
  const recipeId = data.id;
  console.log(data);
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
      await Recipe.updateOne({ _id: recipeId }, { $inc: { rateClick: 1 } });
      const dataaa = await Recipe.find({ _id: recipeId });
      console.log(dataaa);
      console.log("RATING", typeof dataaa[0].rate);
    }
    console.log("za update");
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    console.log("ERROR");
    if (error.statusCode) {
      error.statusCode = 500;
    }
  }
};
