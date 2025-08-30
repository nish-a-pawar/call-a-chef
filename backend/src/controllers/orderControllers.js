import { createOrderServ } from "../services/orderServices.js";
import Order from "../models/orderSchema.js";
import Cart from "../models/Cart.js";
import { getOrdersByChef } from "../repositories/orderRepository.js";
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress, paymentMethod } = req.body;

    // 1. Create new order
    const order = await Order.create({
      user: req.user._id,
      chef: items[0].chef,  
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: "Pending",
    });

    // 2. Clear the cart for this user
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [], totalPrice: 0 } }
    );

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateOrderStatusCtrl = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await updateOrderStatusRepo(req.params.id, status);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await updateOrderStatusRepo(orderId, "Accepted");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order accepted successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchChefOrders = async (req, res) => {
  try {
    const { chefId } = req.params; // 👈 from route
    const orders = await getOrdersByChef(chefId);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error("Error fetching chef orders:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chef orders",
    });
  }
};