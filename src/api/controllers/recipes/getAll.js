import Recipe from "../../models/recipe";

export const getAllRecipe = async (req, res, next) => {
  const dataReq = req.body;
  try {
    let recipe = null;
    let count = null;
    if (dataReq.filter.length > 1) {
      recipe = await Recipe.find({ category: dataReq.filter })
        .select("title category description_short main_img _id rate rateClick")
        .limit(4);
      count = await Recipe.countDocuments();
    } else {
      recipe = await Recipe.find()
        .select("title category description_short main_img _id rate rateClick")
        .limit(4);
      count = await Recipe.countDocuments();
    }

    if (!recipe) {
      const error = new Error("Przepisow nie znaleziono");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      succes: true,
      recipes: recipe,
      count
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
