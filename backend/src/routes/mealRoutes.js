import express from "express";
import {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getMyMeals,
} from "../controllers/mealController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";

const mealRouter = express.Router();

/**
 * Public routes
 */
mealRouter.get("/", getMeals);               // Get all meals (public)

/**
 * Protected routes
 */
mealRouter.use(protect);

// Specific chef’s meals must come BEFORE "/:id"
mealRouter.get("/my-meals", authorizeRoles("chef"), getMyMeals); 

// Create a meal (Chef only)
mealRouter.post("/", authorizeRoles("chef"), createMeal);

// Update meal by ID (Chef only)
mealRouter.put("/:id", authorizeRoles("chef"), updateMeal);

// Delete meal by ID (Chef only)
mealRouter.delete("/:id", authorizeRoles("chef"), deleteMeal);

// Get meal by ID (public but moved at last to avoid conflict)
mealRouter.get("/:id", getMealById);

export default mealRouter;
