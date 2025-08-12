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
      required: true,
      default: "Point"
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
      validate: {
        validator: function(arr) {
          return (
            Array.isArray(arr) &&
            arr.length === 2 &&
            arr.every((num) => typeof num === "number" && !isNaN(num))
          );
        },
        message: "Coordinates must be an array of two numbers [lng, lat]",
      },
    },
  },

  city: {
    type: String,
    required: false,
    default: "Unknown",
  },
});

export default mongoose.model("User", userSchema);
