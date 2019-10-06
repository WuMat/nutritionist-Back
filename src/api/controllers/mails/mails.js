import nodemailer from "nodemailer";
import sendgirdTransport from "nodemailer-sendgrid-transport";

const transporter = nodemailer.createTransport(
  sendgirdTransport({
    auth: {
      api_key:
        "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"
    }
  })
);

export const mails = async (req, res, next) => {
  console.log("siema");
  const data = { ...req.body };

  try {
    transporter
      .sendMail({
        to: "najutube6@gmail.com",
        from: "test@test.pl",
        subject: "cos",
        html: "<h1>POSZLO</h1>"
      })
      .then(response => {
        console.log(response);
        return res.status(200).json({
          succes: true
        });
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
