import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/vendors/register", async (req, res) => {
    try {
        const {
            businessName,
            ownerName,
            email,
            phoneNumber,
            password,
            category,
            location,
            description,
        } = req.body;
        if(
            !businessName ||
            !ownerName ||
            !email ||
            !phoneNumber ||
            !password ||
            !category 
        ) {
            res.status(400).json({
                success: false,
                message: "Please fill in all required fields.",
            });
            return;
        }
        const existingVendor = await prisma.vendor.findUnique({
            where: { email },
        });
        if (existingVendor) {
            res.status(409).json({
                success: false,
                message: "A vendor with this email already exists.",
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const vendor = await prisma.vendor.create({
            data: {
                businessName,
                ownerName,
                email,
                phoneNumber,
                password: hashedPassword,
                category,
                location: location || "",
                description: description || "",
            },
        });
        res.status(201).json({
            success: true,
            message: "Vendor registered successfully.",
            vendor: {
                id: vendor.id,
                businessName: vendor.businessName,
                ownerName: vendor.ownerName,
                email: vendor.email,
                phoneNumber: vendor.phoneNumber,
                category: vendor.category,
                location: vendor.location,
                description: vendor.description,
                status: vendor.status,
            },
        });
    } catch (error) {
        console.error("Vendor registration failed:", error);
        res.status(500).json({
            success: false,
            message: "Unable to register vendor.",
        });
    }
});

router.post("/vendors/login", async (requestAnimationFrame, res) => {
    try {
        const { email, password } =requestAnimationFrame.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
            return;
        }
        const vendor = await prisma.vendor.findUnique({
            where: { email:email.trim() },
        });
        if (!vendor) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
            return;
        }
        const passwordMatches = await bcrypt.compare(
            password,
            vendor.password
        );
        if (!passwordMatches) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
            return;
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({
                success: false,
                message: "Server authentication is not configured.",
            });
            return;
        }
        const token = jwt.sign(
            {
                vendorId: vendor.id,
                role: "VENDOR",
            },
            secret,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            success: true,
            message: "Vendor login successful.",
            token,
            vendor: {
                id: vendor.id,
                businessName: vendor.businessName,
                ownerName: vendor.ownerName,
                email: vendor.email,
                phoneNumber: vendor.phoneNumber,
                category: vendor.category,
                location: vendor.location,
                description: vendor.description,
                status: vendor.status,
            },
        });
    } catch (error) {
        console.error("Vendor login failed:", error);
        res.status(500).json({
            success: false,
            message: "Unable to log in. Please try again.",
        });
    }
});
export default router;