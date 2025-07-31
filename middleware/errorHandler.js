const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "SequelizeDatabaseError") {
    return res
      .status(400)
      .json({ error: "Invalid input type or malformed query" });
  }
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = errorHandler