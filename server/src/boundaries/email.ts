import CONFIG from "../config";
import nodemailer from "nodemailer";

let transporter: any;

interface SendMail {
  html: string;
  to: string;
  subject: string;
}

export const init = () => {
  try {
    transporter = nodemailer.createTransport({
      pool: true,
      host: CONFIG.SMTP.HOST,
      port: CONFIG.SMTP.PORT,
      secure: false,
      auth: {
        user: CONFIG.SMTP.AUTH_USER,
        pass: CONFIG.SMTP.AUTH_PASS,
      },
    });
  } catch (err) {
    console.log(`error occurred while setting smtp: ${err.message}`);
  }
};

/**
 * Get application information.
 *
 */
export const sendMail = async (data: SendMail) => {
  if (!transporter) {
    throw new Error("SMTP not set");
  }
  const response = await transporter.sendMail({
    to: data.to,
    from: CONFIG.SMTP.FROM,
    subject: data.subject,
    text: data.html.replace(/<\/?[^>]+(>|$)/g, ""),
    html: data.html,
  });
};
