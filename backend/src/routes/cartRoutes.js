// cartRoutes.js
import express from "express";
const router = express.Router();
import Cart from "../models/Cart.js"; // a Mongoose model

// GET cart by user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD item to cart
router.post("/", async (req, res) => {
  const { userId, productId, name, price, image, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(i => i.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, image, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE item quantity
router.put("/:itemId", async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { "items._id": req.params.itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REMOVE item from cart
router.delete("/:itemId", async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { "items._id": req.params.itemId },
      { $pull: { items: { _id: req.params.itemId } } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
