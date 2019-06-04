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

    const imagesReq = req.files;
    const mainImg = imagesReq
      .filter(el => el.originalname.slice(0, -4) === "Main image")[0]
      .path.replace("\\", "/");

    const imagesOther = imagesReq.filter(
      el => el.originalname.slice(0, -4) !== "Main image"
    );
    const changePath = imagesOther.map(el => el.path.replace("\\", "/"));
    const recipe = new Recipe({
      title: data.title,
      timePrepare: data.timePrepare,
      portion: data.portion,
      stepsPrepare: data.stepsPrepare,
      ingredient: data.ingredient,
      main_img: mainImg,
      images: changePath
    });

    await recipe.save();
    return res.status(200).json({
      message: "Recipe is Created",
      recipe: recipe
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
