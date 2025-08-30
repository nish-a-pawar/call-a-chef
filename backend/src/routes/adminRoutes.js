import express from "express";
import { countMealsController, countUsersController, fetchAUsersController, fetchMealsController } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";

const adminRouter = express.Router();

adminRouter.get("/countMeals", protect, authorizeRoles("admin"), countMealsController);
adminRouter.get("/fetchMeals", protect, authorizeRoles("admin"), fetchMealsController);

adminRouter.get("/fetchUsers", protect, authorizeRoles("admin"), fetchAUsersController);
adminRouter.get("/countUsers", protect, authorizeRoles("admin"), countUsersController);

export default adminRouter;