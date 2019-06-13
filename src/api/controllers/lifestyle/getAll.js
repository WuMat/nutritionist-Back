import Lifestyle from "../../models/lifestyle";

export const getAllLifestyle = async (req, res, next) => {
  console.log("wchodzi do alla");
  try {
    const lifestyle = await Lifestyle.find().select(
      "title description_short mainImage _id"
    );
    if (!lifestyle) {
      const error = new Error("Artykulu nie znaleziono");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      succes: true,
      lifestyles: lifestyle,
      type: 2
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
