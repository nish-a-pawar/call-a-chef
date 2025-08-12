import bcrypt from "bcryptjs";
import fetch from "node-fetch";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { generateToken } from "../utils/generateToken.js";

async function getCityFromCoords(lat, lng) {
  const apiKey = "ac589f25702949919c08f3e09ce8597e"
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&key=${apiKey}`
  );
  const data = await res.json();
  return (
    data.address.city ||
    data.address.town ||
    data.address.village ||
    "Unknown"
  );
}

// REGISTER
export const registerUser = async ({ name, email, password, role, location }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Get city name from lat/lng
  const cityName = await getCityFromCoords(location.lat, location.lng);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role: role || "User",
    location: { city: cityName }
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    location: user.location
  };
};

// LOGIN
export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
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
      location: user.location 
    },
    token,
  };
};
