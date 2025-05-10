const checkAllowedFields = (allowedFields) => (req, res, next) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({
      errors: [{ msg: "Request body is missing or invalid" }],
    });
  }

  const extraFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (extraFields.length > 0) {
    return res.status(400).json({
      errors: [{ msg: `Unexpected fields: ${extraFields.join(", ")}` }],
    });
  }

  next();
};

export default checkAllowedFields;
