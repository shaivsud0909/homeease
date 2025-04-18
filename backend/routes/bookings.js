import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Import middleware

const router = express.Router();

// 📌 Protected Route: Create a Booking (Requires Token)
router.post("/", verifyToken, async (req, res) => {
    try {
        const { workerId, service, city, date } = req.body;

        // Ensure the user is logged in (middleware already verified the token)
        if (!req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const newBooking = new Booking({
            userId: req.user.userId, // ✅ Get user ID from decoded token
            workerId,
            service,
            city,
            date,
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful!" });
    } catch (error) {
        console.error("❌ Booking Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// 📌 Protected Route: Get Bookings (For Users & Workers)
router.get("/", verifyToken, async (req, res) => {
    try {
        const { userId, workerId } = req.query;

        let query = {};
        if (userId) query.userId = new mongoose.Types.ObjectId(userId);
        if (workerId) query.workerId = new mongoose.Types.ObjectId(workerId); // ✅ Fix here

        const bookings = await Booking.find(query).sort({ date: -1 });
        res.json(bookings);
    } catch (error) {
        console.error("❌ Fetch Bookings Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 📌 Protected Route: Update Booking Status 
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Ensure the user is a worker
        if (req.user.role !== "worker") {
            return res.status(403).json({ error: "Unauthorized: Only workers can update booking status" });
        }

        // Find the booking by ID
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Ensure the worker is the one assigned to the booking
        if (booking.workerId.toString() !== req.user.workerId.toString()) {
            return res.status(403).json({ error: "Unauthorized: You can only update your own bookings" });
        }

        // Update the booking status
        booking.status = status;
        await booking.save();

        res.json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        console.error("❌ Update Booking Status Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
