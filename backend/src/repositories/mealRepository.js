import Meal from "../Schemas/productSchema.js";

// Create a meal
export const createMealRepo = async (meal) => {
    try {
        return await Meal.create(meal);
    } catch (error) {
        throw new Error(`Error creating meal: ${error.message}`);
    }
};

// Get all meals
export const getMealsRepo = async () => {
    try {
        return await Meal.find().lean();
    } catch (error) {
        throw new Error(`Error fetching meals: ${error.message}`);
    }
};

// Get a single meal by ID
export const findMealByIdRepo = async (id) => {
    try {
        return await Meal.findById(id).lean();
    } catch (error) {
        throw new Error(`Error fetching meal: ${error.message}`);
    }
};

// Update a meal
export const updateMealRepo = async (id, data) => {
    try {
        return await Meal.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }).lean();
    } catch (error) {
        throw new Error(`Error updating meal: ${error.message}`);
    }
};

// Delete a meal
export const deleteMealRepo = async (id) => {
    try {
        return await Meal.findByIdAndDelete(id).lean();
    } catch (error) {
        throw new Error(`Error deleting meal: ${error.message}`);
    }
};
