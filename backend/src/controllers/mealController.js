import { createMealServ } from "../services/mealService.js"

export async function createMeal(req, res) {
    try {
        const meal = req.body
        const result = await createMealServ(meal);
        console.log("meal from cntrl", result)
        res.status(201).json({
            success: true,
            message: "Meal created successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}