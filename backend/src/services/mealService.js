import {
    createMealRepo,
    getMealsRepo,
    updateMealRepo,
    deleteMealRepo
} from "../repositories/mealRepository.js";

// Create a meal
export async function createMealServ(meal) {
    const res = await createMealRepo(meal);
    if (!res) {
        throw new Error("Couldn't create meal");
    }
    return res;
}

// Get all meals
export async function getMealsServ() {
    const res = await getMealsRepo();
    if (!res) {
        throw new Error("No meals found");
    }
    return res;
}

// Update a meal
export async function updateMealServ(id, data) {
    const res = await updateMealRepo(id, data);
    if (!res) {
        throw new Error("Meal not found or update failed");
    }
    return res;
}

// Delete a meal
export async function deleteMealServ(id) {
    const res = await deleteMealRepo(id);
    if (!res) {
        throw new Error("Meal not found or delete failed");
    }
    return res;
}
