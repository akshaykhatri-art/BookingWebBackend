import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }
  next();
};

export default validate;
