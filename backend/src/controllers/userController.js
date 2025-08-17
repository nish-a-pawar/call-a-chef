import { loginUser, registerUser } from "../services/userServices.js";
import User from "../models/userSchema.js";

export const signup = async (req, res) => {
  console.log("Signup route hit with body:", req.body);

  try {
    const { name, email, password, role, location } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    if (
      !location ||
      !Array.isArray(location.coordinates) ||
      location.coordinates.length !== 2 ||
      typeof location.coordinates[0] !== "number" ||
      typeof location.coordinates[1] !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "Valid location with lat and lng is required" });
    }
    console.log("Before calling registerUser");
    const user = await registerUser({
      name,
      email,
      password,
      role,
      location, // { lat, lng }
    });

    return res.status(201).json({
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const { user, token } = await loginUser({ email, password });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // send over HTTPS only in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "You've been successfully logged in!",
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Past date to clear cookie
      sameSite: isProduction ? "none" : "none", // "none" for cross-site, "lax" for local dev
      secure: false
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
