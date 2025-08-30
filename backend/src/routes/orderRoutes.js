import express from 'express'
import { protect } from "../middlewares/authMiddlewares.js";

import {
    createOrder,
    acceptOrderController,  fetchChefOrders
} from '../controllers/orderControllers.js'

const orderRouter = express.Router();
orderRouter.post("/create-order", protect, createOrder);

// Chef accepts order
 orderRouter.put("/:orderId/accept", protect, acceptOrderController);

//getallorders for a chef
orderRouter.get("/chef/:chefId", protect, fetchChefOrders);

export default orderRouter;
