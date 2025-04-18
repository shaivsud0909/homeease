import jwt from "jsonwebtoken";
import Worker from "../models/Worker.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data

        // If the user is a worker, fetch their workerId
        if (req.user.role === "worker") {
            const worker = await Worker.findOne({ userId: req.user.userId });
            if (!worker) {
                return res.status(404).json({ error: "Worker profile not found" });
            }
            req.user.workerId = worker._id; // Attach workerId to req.user
        }

        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error);
        return res.status(403).json({ error: "Invalid Token" });
    }
};