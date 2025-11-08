const authService = require("../services/auth.service");

const handleError = (res, error) => {
  console.error("Error:", error);
  return res.status(error.status).json({ message: error.message });
};

exports.signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const result = await authService.signUp({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(201).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.signIn({
      email,
      password,
    });

    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};
