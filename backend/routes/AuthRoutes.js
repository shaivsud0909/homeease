import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Worker from "../models/Worker.js";

const router = express.Router();

// Helper function for consistent error responses
const errorResponse = (res, status, message) => {
  return res.status(status).json({ 
    success: false,
    message,
    timestamp: new Date().toISOString()
  });
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address, city, role, services, cities, experience } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !address || !city || !role) {
      return errorResponse(res, 400, "All basic fields are required");
    }

    if (role === "worker" && (!services || !cities || experience === undefined)) {
      return errorResponse(res, 400, "Worker details are required");
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, "Email already in use");
    }

    // Check if phone exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return errorResponse(res, 409, "Phone number already in use");
    }

    // Create new user
    const newUser = new User({ 
      name, 
      email, 
      password, 
      phone,
      address,
      city, 
      role 
    });
    await newUser.save();

    if (role === "worker") {
      const workerData = {
        userId: newUser._id,
        services: services.split(",").map(s => s.trim()),
        cities: cities.split(",").map(c => c.trim()),
        experience: Number(experience),
      };

      const newWorker = new Worker(workerData);
      await newWorker.save();
    }

    res.status(201).json({ 
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    console.error("Registration error:", error);
    errorResponse(res, 500, "Registration failed. Please try again.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Basic validation
    if (!email || !password || !role) {
      return errorResponse(res, 400, "All fields are required");
    }

    // Find user
    const user = await User.findOne({ email, role });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    // Check password 
    if (user.password !== password) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    res.json({ 
      success: true,
      token, 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    errorResponse(res, 500, "Login failed. Please try again.");
  }
});

export default router;