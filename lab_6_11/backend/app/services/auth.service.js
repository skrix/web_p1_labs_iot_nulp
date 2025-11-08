const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "24h";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateRequired = (fields) => {
  const missing = [];
  for (const [key, value] of Object.entries(fields)) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      missing.push(key);
    }
  }
  return missing;
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const sanitizeUser = (user) => {
  const { password, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const signUp = async ({ email, password, firstName, lastName }) => {
  const missing = validateRequired({ email, password });
  if (missing.length > 0) {
    throw {
      status: 400,
      message: `Missing required fields: ${missing.join(", ")}`
    };
  }

  if (!validateEmail(email)) {
    throw {
      status: 400,
      message: "Invalid email format"
    };
  }

  if (!validatePassword(password)) {
    throw {
      status: 400,
      message: "Password must be at least 6 characters long"
    };
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw {
      status: 400,
      message: "User with this email already exists"
    };
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName: firstName || "",
    lastName: lastName || "",
  });

  const token = generateToken(user.id);

  return {
    user: sanitizeUser(user),
    token,
  };
};

const signIn = async ({ email, password }) => {
  const missing = validateRequired({ email, password });
  if (missing.length > 0) {
    throw {
      status: 400,
      message: `Missing required fields: ${missing.join(", ")}`
    };
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw {
      status: 401,
      message: "Invalid email or password"
    };
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw {
      status: 401,
      message: "Invalid email or password"
    };
  }

  const token = generateToken(user.id);

  return {
    user: sanitizeUser(user),
    token,
  };
};

module.exports = {
  signUp,
  signIn
};
