import express from "express";
import authController from "../controllers/authController.js";
import {
  signupValidation,
  loginValidation,
} from "../validations/authValidation.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post("/register", signupValidation, validate, authController.register);
router.get("/verify/:token", authController.verify);
router.post("/login", loginValidation, validate, authController.login);

export default router;
