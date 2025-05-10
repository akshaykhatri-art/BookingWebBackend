import { body } from "express-validator";

export const signupValidation = [
  body().custom((value, { req }) => {
    const allowedFields = ["firstName", "lastName", "email", "password"];
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );
    if (extraFields.length > 0) {
      throw new Error(`Unexpected fields: ${extraFields.join(", ")}`);
    }
    return true;
  }),

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isAlpha()
    .withMessage("First Name must contain only letters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required")
    .isAlpha()
    .withMessage("Last Name must contain only letters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

export const loginValidation = [
  body().custom((value, { req }) => {
    const allowedFields = ["email", "password"];
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );
    if (extraFields.length > 0) {
      throw new Error(`Unexpected fields: ${extraFields.join(", ")}`);
    }
    return true;
  }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];
