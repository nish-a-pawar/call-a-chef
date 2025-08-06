import { createMealRepo } from "../repositories/mealRepository.js";

export async function createMealServ (meal) {
    const res = await createMealRepo(meal)
    if(!res) {
        throw new Error("Couldn't find meal")
    }
    return res
}