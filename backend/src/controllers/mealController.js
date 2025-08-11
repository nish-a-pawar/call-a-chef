import {
    createMealServ,
    getMealsServ,
    updateMealServ,
    deleteMealServ
} from "../services/mealService.js";

// Create meal
export async function createMeal(req, res) {
    try {
        const result = await createMealServ(req.body);
        res.status(201).json({
            success: true,
            message: "Meal created successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get all meals
export async function getMeals(req, res) {
    try {
        const meals = await getMealsServ();
        res.status(200).json({
            success: true,
            data: meals
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update meal
export async function updateMeal(req, res) {
    try {
        const updatedMeal = await updateMealServ(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            data: updatedMeal
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Delete meal
export async function deleteMeal(req, res) {
    try {
        await deleteMealServ(req.params.id);
        res.status(200).json({
            success: true,
            message: "Meal deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
