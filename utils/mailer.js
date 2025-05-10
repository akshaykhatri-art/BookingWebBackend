import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "emailauthorization22@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter;
