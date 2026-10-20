import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/admin/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
            return;
        }
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || user.role !== "ADMIN") {
            res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
            return;
        }
        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordMatches) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({
                success: false,
                message: "Server authentication is not configured.",
            });
            return;
        }
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            jwtSecret,
            { expiresIn:"1h" }
        );
        res.json({
            success: true,
            message: "Admin login successful",
            token,
            user: {
                id: user.id,
                email:user.email,
                role:user.role,
            },
        });
    } catch (error) {
        console.error("Admin login failed:", error);
        res.status(500).json({
            success: false,
            message: "An unexpected error occured.",
        });
    }
    });  
    router.get("/admin/protected", requireAdmin, (req,res) => {
        res.json({
            success: true,
            message: "Welcome, Admin! Access granted.",
        });
    });
export default router;