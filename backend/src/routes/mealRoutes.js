import express from 'express';
import {
    createMeal,
    getMeals,
    getMealById,
    updateMeal,
    deleteMeal
} from '../controllers/mealController.js';
import { protect } from '../middlewares/authMiddlewares.js';
import { authorizeRoles } from '../middlewares/authorizedRoles.js';

const mealRouter = express.Router();
mealRouter.use(protect);
mealRouter.use(authorizeRoles('Chef'));

// Create a meal
mealRouter.post('/', createMeal);

// Get all meals
mealRouter.get('/', getMeals);

// ✅ Get a meal by ID
mealRouter.get('/:id', getMealById);

// Update a meal by ID
mealRouter.put('/:id', updateMeal);

// Delete a meal by ID
mealRouter.delete('/:id', deleteMeal);

export default mealRouter;
