import User from "../models/userSchema.js";

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.log(error)
  }
};

export const createUser = async (userData) => {
  return await User.create(userData);
};
