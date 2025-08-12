import bcrypt from "bcryptjs";
import fetch from "node-fetch";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { generateToken } from "../utils/generateToken.js";

async function getCityFromCoords(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      "Unknown"
    );
  } catch (error) {
    console.error("Error fetching city:", error);
    return "Unknown";
  }
}

// REGISTER
export const registerUser = async ({ name, email, password, role, location }) => {
  console.log("Received location:", location);

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Validate location and convert coordinates to numbers
 console.log("Received location object:", location);

if (
  !location ||
  !Array.isArray(location.coordinates) ||
  location.coordinates.length !== 2
) {
  console.error("Invalid location structure:", location);
  throw new Error("Valid location with lat and lng is required");
}

const lng = Number(location.coordinates[0]);
const lat = Number(location.coordinates[1]);

console.log("Parsed lat, lng:", lat, lng);

if (Number.isNaN(lng) || Number.isNaN(lat)) {
  console.error("Lat or Lng is NaN:", lat, lng);
  throw new Error("Valid location with lat and lng is required");
}

  // Use the converted and validated coordinates
  const geoLocation = {
    type: "Point",
    coordinates: [lng, lat],
  };

  // Optionally fetch city from lat/lng
  const cityName = await getCityFromCoords(lat, lng);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role: role || "User",
    location: geoLocation,
    city: cityName,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    location: user.location,
    city: user.city,
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
      location: user.location,
      city: user.city,
    },
    token,
  };
};
