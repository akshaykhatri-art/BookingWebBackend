import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import transporter from "../utils/mailer.js";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    await authModel.register({
      firstName,
      lastName,
      email,
      password: hashed,
      token,
    });

    // const verifyUrl = `${process.env.API_URL}/api/auth/verify/${token}`;

    const protocol = req.protocol;
    const host = req.get("host");
    const verifyUrl = `${protocol}://${host}/api/auth/verify/${token}`;

    await transporter.sendMail({
      from: '"Booking App" <emailauthorization22@gmail.com>',
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
    });

    res
      .status(200)
      .json({ message: "Registered. Check email for verification link." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const verify = async (req, res) => {
  try {
    await authModel.verify(req.params.token);
    res.status(200).send("Email verified! You can now log in.");
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await authModel.login(email);

    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.IsVerified !== 1)
      return res.status(403).json({ error: "User not verified" });

    const match = await bcrypt.compare(password, user.Password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { userId: user.PersonId, email: user.LoginId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user.PersonId,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { register, verify, login };
