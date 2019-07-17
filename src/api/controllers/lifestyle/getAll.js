import Lifestyle from "../../models/lifestyle";

export const getAllLifestyle = async (req, res, next) => {
  const data = req.body;
  try {
    const lifestyle = await Lifestyle.find()
      .sort({ $natural: -1 })
      .select("title description_short mainImage _id")
      .skip((data.page - 1) * 4)
      .limit(4);
    const count = await Lifestyle.countDocuments();
    if (!lifestyle) {
      const error = new Error("Artykulu nie znaleziono");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      succes: true,
      lifestyles: lifestyle,
      count,
      type: 2
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
