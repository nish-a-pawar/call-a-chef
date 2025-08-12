import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  console.log("JWT_SECRET is:", process.env.JWT_SECRET);
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};