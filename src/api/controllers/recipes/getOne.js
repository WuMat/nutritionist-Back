import Recipe from "../../models/recipe";

export const getOneRecipe = async (req, res, next) => {
  const recipeId = req.body.data;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      const error = new Error("Place not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ recipe: recipe });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
