import express from "express";
import Worker from "../models/Worker.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

//  📌 Protected Route: 🔹 Get Workers based on service and city
router.get("/", async (req, res) => {
    try {
        const { service, city } = req.query;

        if (!service || !city) {
            return res.status(400).json({ error: "Service and city are required" });
        }
        const normalizedCity = city.trim().toLowerCase();

        const workers = await Worker.find({
            services: service,
            cities: { $regex: new RegExp(`^${normalizedCity}$`, "i") },
        }).populate("userId", "name phone address city"); // Added additional fields

        res.json(workers);
    } catch (err) {
        console.error("Error fetching workers:", err);
        res.status(500).json({ error: "Server error" });
    }
});

//  📌 Protected Route: 🔹 Get Worker Profile by Worker ID
router.get("/:workerId", async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.workerId)
            .populate("userId", "name email phone address city");
        if (!worker) return res.status(404).json({ error: "Worker not found" });

        res.json(worker);
    } catch (error) {
        console.error("❌ Error fetching worker details:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//  📌 Protected Route: 🔹 Get Worker Profile by User ID
router.get("/user/:userId", verifyToken, async (req, res) => {
    try {
        const worker = await Worker.findOne({ userId: req.params.userId });
        if (!worker) return res.status(404).json({ error: "Worker not found" });

        res.json(worker);
    } catch (error) {
        console.error("❌ Error fetching worker:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//  📌 Protected Route: 🔹 Update Worker Profile
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) return res.status(404).json({ error: "Worker not found" });

        if (worker.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const updatedWorker = await Worker.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedWorker);
    } catch (error) {
        console.error("❌ Error updating worker:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
