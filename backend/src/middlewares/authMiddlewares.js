import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";



export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ First try cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
   
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
