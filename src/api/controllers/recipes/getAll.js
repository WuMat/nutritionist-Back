import Recipe from "../../models/recipe";

export const getAllRecipe = async (req, res, next) => {
  console.log("wchodzi do alla");
  try {
    const recipe = await Recipe.find().select(
      "title category description_short main_img _id"
    );
    if (!recipe) {
      const error = new Error("Przepisow nie znaleziono");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      succes: true,
      recipes: recipe,
      type: 1
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
