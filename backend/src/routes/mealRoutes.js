import express from 'express';
import { createMeal } from '../controllers/mealController.js';

const mealRouter = express.Router();

mealRouter.post('/', createMeal);

export default mealRouter;