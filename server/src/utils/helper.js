export const errorHandler = (req, res, error) => {
  console.error(error.message);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: error.message });
};

export const validateRequiredFields = (fields) => {
  return fields.every((field) => field != null && field !== "");
};
