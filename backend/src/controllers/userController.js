import { loginUser, registerUser } from "../services/userServices.js";
import User from "../models/userSchema.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role ,location} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser({
      name,
      email,
      password,
      role,
      location
    });

    return res.status(201).json({
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const { user, token } = await loginUser({ email, password });

    
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // send over HTTPS only in prod
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "You've been successfully logged in!",
        user,
        token,
      });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry to past date
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "You've been successfully logged out!" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
