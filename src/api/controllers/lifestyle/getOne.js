import Lifestyle from "../../models/lifestyle";

export const getOneLifestyle = async (req, res, next) => {
  const lifestyleId = req.body.data;

  try {
    const lifestyle = await Lifestyle.findById(lifestyleId);
    if (!lifestyle) {
      const error = new Error("Lifestyle not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ lifestyle: lifestyle });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
