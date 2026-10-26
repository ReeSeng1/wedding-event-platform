import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { requireVendor } from "../middleware/authMiddleware.js";

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
router.get("/vendors/me", requireVendor, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as {
            vendorId: number;
            role: string;
        };
        const vendor = await prisma.vendor.findUnique({
            where: { id: decoded.vendorId },
            select: {
                id: true,
                businessName: true,
                ownerName: true,
                email: true,
                phoneNumber: true,
                category: true,
                location: true,
                description: true,
                serviceName: true,
                serviceDescription: true,
                servicePrice: true,
                status: true,
            },
        });
        
        if (!vendor) {
            res.status(404).json({
                success: false,
                message: "Vendor not found.",
            });
            return;
        } 
        res.status(200).json({
            success: true,
            vendor,
        });
    } catch (error) {
        console.error("Failed to fetch vendor profile:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch vendor profile.",
        });
    }
});
router.put("/vendors/me", requireVendor, async (req, res) => {
    try {
        const authHeader = req.headers.authorization!;
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as {
            vendorId: number;
            role: string;
        };
        const {
            businessName,
            ownerName,
            email,
            phoneNumber,
            category,
            location,
            description,
            serviceName,
            serviceDescription,
            servicePrice,
        } = req.body;
        if (
            !businessName?.trim() ||
            !ownerName?.trim() ||
            !email?.trim() ||
            !phoneNumber?.trim() ||
            !category?.trim()
        ) {
            res.status(400).json({
                success: false,
                message: "Please fill in all required fields.",
            });
            return;
        }
        const updatedVendor = await prisma.vendor.update({
            where: { id: decoded.vendorId },
            data: {
                businessName: businessName.trim(),
                ownerName: ownerName.trim(),
                email: email.trim(),
                phoneNumber: phoneNumber.trim(),
                category: category.trim(),
                location: location.trim() || "",
                description: description?.trim() || "",
                serviceName: serviceName?.trim() || "",
                serviceDescription: serviceDescription?.trim() || "",
                servicePrice: servicePrice?.trim() || "",
            },
            select: {
               id: true,
               businessName: true,
               ownerName: true,
               email: true,
               phoneNumber: true,
               category: true,
               location: true,
               description: true,
               serviceName: true,
               serviceDescription: true,
               servicePrice: true,
               status: true, 
            },
        });
        res.status(200).json({
            success: true,
            message: "Vendor profile updated successfully.",
            vendor: updatedVendor,
        });
    } catch (error) {
        console.error("Failed to update vendor profile:", error);
        res.status(500).json({
            success: false,
            message: "Unable to update vendor profile.",
        });
    }
});
router.put("/vendors/me/services", requireVendor, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as {
            vendorId: number;
            role: string;
        };
        const { serviceName, serviceDescription, servicePrice } = req.body;
        const vendor = await prisma.vendor.update({
            where: { id: decoded.vendorId },
            data: {
                serviceName: serviceName?.trim() || "",
                serviceDescription: serviceDescription?.trim() || "",
                servicePrice: servicePrice?.toString().trim() || "",
            },
            select: {
                id: true,
                serviceName: true,
                serviceDescription: true,
                servicePrice: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "Services saved successfully.",
            vendor,
        });
    } catch (error) {
        console.error("Failed to save vendor services:", error);
        res.status(500).json({
            success: false,
            message: "Unable to save services.",
        });
    }
});
export default router;