import {
    createMealServ,
    getMealsServ,
    getMealByIdServ, 
    updateMealServ,
    deleteMealServ,
    getMealsByChefServ
} from "../services/mealService.js";

// Create meal
export async function createMeal(req, res) {
    try {
        const mealData = { 
      ...req.body, 
      chefId: req.user._id  
    };

    const meal = await createMealServ(mealData);

        res.status(201).json({ success: true, message: "Meal created", data: meal });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

// Get all meals
export async function getMeals(req, res) {
    try {
        const meals = await getMealsServ();
        res.status(200).json({ success: true, data: meals });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
}

// Get meal by ID
export async function getMealById(req, res) {
    try {
        const meal = await getMealByIdServ(req.params.id);
        res.status(200).json({ success: true, data: meal });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
}

// Update meal
export async function updateMeal(req, res) {
    try {
        const meal = await updateMealServ(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Meal updated", data: meal });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

// Delete meal
export async function deleteMeal(req, res) {
    try {
        await deleteMealServ(req.params.id);
        res.status(200).json({ success: true, message: "Meal deleted" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
//getmealbychef
export async function getMyMeals(req, res) {
  try {
    const meals = await getMealsByChefServ(req.user._id);

    if (!meals || meals.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No meals found for this chef",
        data: []
      });
    }

    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
