import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/vendors/register", async (requestAnimationFrame, res) => {
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
        } = requestAnimationFrame.body;
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
export default router;