import { validationResult } from "express-validator/check";

import Lifestyle from "../../models/lifestyle";

export const createLifestyle = async (req, res, next) => {
  console.log(req.body);
  const data = { ...req.body };
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error("Validation failed");
    //   error.statusCode = 422;
    //   throw error;
    // }
    // if (!req.files) {
    //   const error = new Error("no image provider");
    //   error.statusCode = 422;
    //   throw error;
    // }

    const lifestyle = new Lifestyle({
      title: data.title,
      description_short: data.description_short,
      mainImage: data.mainImage,
      paragraf: JSON.parse(data.paragraf),
      epik: JSON.parse(data.epik),
      type: 2
    });

    await lifestyle.save();
    return res.status(200).json({
      message: "lifestyle is Created",
      lifestyle: lifestyle
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
