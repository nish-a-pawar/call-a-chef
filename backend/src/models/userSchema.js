import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["User", "Chef", "Admin"],
    default: "User",
  },
  location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    default: [0, 0],
  },
},
});

// ✅ Add 2dsphere index to enable location queries
userSchema.index({ location: "2dsphere" });
export default mongoose.model("User", userSchema);
