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
    city: {
      type: String,
      required:false 
    }
  }
});


export default mongoose.model("User", userSchema);
