import express from 'express';
import {
    createMeal,
    getMeals,
    updateMeal,
    deleteMeal
} from '../controllers/mealController.js';

const mealRouter = express.Router();

// Create a meal
mealRouter.post('/', createMeal);

// Get all meals
mealRouter.get('/', getMeals);

// Update a meal by ID
mealRouter.put('/:id', updateMeal);

// Delete a meal by ID
mealRouter.delete('/:id', deleteMeal);

export default mealRouter;
