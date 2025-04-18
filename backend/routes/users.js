import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

//  📌 Protected Route: Get User Profile
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//  📌 Protected Route: Update User Profile
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, address, city } = req.body;

    // Validate inputs
    if (!name || !email || !phone || !address || !city) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email or phone is already in use by another user
    const existingUser = await User.findOne({
      $or: [
        { email, _id: { $ne: req.params.id } },
        { phone, _id: { $ne: req.params.id } }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email
          ? "Email is already in use"
          : "Phone number is already in use"
      });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, city },
      {
        new: true,
        runValidators: true,
        select: "-password"
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or phone must be unique" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

export default router;