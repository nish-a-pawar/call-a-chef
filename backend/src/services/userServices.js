import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async ({
  name,
  email,
  password,
  mobileNumber,
  role,
}) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,

    role: role || "user", // default role is 'user'
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log("❌ User not found");
      throw new Error("Invalid email or password");
    }

    console.log("🔑 Input password:", password);
    console.log("🔒 DB password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ bcrypt match:", isMatch);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id);
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.log("🔥 Login error:", error.message);
    throw error;
  }
};
