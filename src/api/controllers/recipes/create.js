import { validationResult } from "express-validator/check";

import Recipe from "../../models/recipe";

export const createRecipe = async (req, res, next) => {
  const data = { ...req.body };
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error("Validation failed");
    //   error.statusCode = 422;
    //   throw error;
    // }
    if (!req.files) {
      const error = new Error("no image provider");
      error.statusCode = 422;
      throw error;
    }
    console.warn(data.imagesName);

    const recipe = new Recipe({
      title: data.title,
      timePrepare: data.timePrepare,
      portion: data.portion,
      category: data.category,
      description_short: data.description_short,
      stepsPrepare: JSON.parse(data.stepsPrepare),
      ingredient: JSON.parse(data.ingredient),
      main_img: data.main_img,
      imagesName: JSON.parse(data.imagesName),
      note: [],
      rate: 0
    });

    await recipe.save();
    return res.status(200).json({
      message: "Recipe is Created",
      succes: true
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
