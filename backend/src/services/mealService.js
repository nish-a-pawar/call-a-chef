import {
    createMealRepo,
    getMealsRepo,
    findMealByIdRepo,
    updateMealRepo,
    deleteMealRepo
} from "../repositories/mealRepository.js";

export async function createMealServ(meal) {
    const res = await createMealRepo(meal);
    if (!res) throw new Error("Couldn't create meal");
    return res;
}

export async function getMealsServ() {
    const res = await getMealsRepo();
    if (!res || res.length === 0) throw new Error("No meals found");
    return res;
}

export async function getMealByIdServ(id) {
    const res = await findMealByIdRepo(id);
    if (!res) throw new Error("Meal not found");
    return res;
}

export async function updateMealServ(id, data) {
    const res = await updateMealRepo(id, data);
    if (!res) throw new Error("Meal not found or update failed");
    return res;
}

export async function deleteMealServ(id) {
    const res = await deleteMealRepo(id);
    if (!res) throw new Error("Meal not found or delete failed");
    return res;
}
