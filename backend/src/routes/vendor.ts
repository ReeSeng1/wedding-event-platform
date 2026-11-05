import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { requireVendor } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

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

router.post("/vendors/login", async (req, res) => {
    try {
        const { email, password } =req.body;
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
                portfolioTitle: true,
                portfolioDescription: true,
                portfolioImage: true,
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
router.put("/vendors/me/portfolio", requireVendor, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as {
            vendorId:number;
            role: string;
        };
        const { portfolioTitle, portfolioDescription, portfolioImage} = req.body;
        const vendor = await prisma.vendor.update({
            where: { id: decoded.vendorId },
            data: {
                portfolioTitle: portfolioTitle?.trim() || "",
                portfolioDescription: portfolioDescription?.trim() || "",
                portfolioImage: portfolioImage?.trim() || "",
            },
            select: {
                id: true,
                portfolioTitle: true,
                portfolioDescription: true,
                portfolioImage: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "Portfolio saved successfully.",
            vendor,
        });
    } catch (error) {
        console.error("Failed to save vendor portfolio:", error);
        res.status(500).json({
            success: false,
            message: "Unable to save portfolio.",
        });
    }
});
router.post("/requests", async (req, res) => {
    try {
        const {
            clientName,
            clientEmail,
            phoneNumber,
            eventType,
            eventDate,
            eventLocation,
            guestCount,
            budget,
            message,
            selectedVendors,
        } = req.body;

        if (
            !clientName ||
            !phoneNumber ||
            !eventType ||
            !eventDate ||
            !Array.isArray(selectedVendors) ||
            selectedVendors.length === 0
        ) {
            res.status(400).json({
                success: false,
                message: "Please provide event details and select at least one vendor.",
            });
            return;
        }
        const vendorConnections = [];
        for (const selected of selectedVendors) {
            const vendor = await prisma.vendor.findFirst({
                where: {
                    businessName: selected.businessName,
                    category: selected.category,
                },
                select: {
                    id: true,
                },
            });
            if (!vendor) {
                res.status(404).json({
                    success: false,
                    message: `Selected vendor ${selected.businessName} was not found.`,
                });
                return;
            }
            vendorConnections.push({
                vendorId: vendor.id,
                category: selected.category,
            });
        }
        const request = await prisma.eventRequest.create({
            data: {
                clientName,
                clientEmail,
                phoneNumber,
                eventType,
                eventDate,
                eventLocation: eventLocation || "",
                guestCount: String(guestCount || ""),
                budget: String(budget || ""),
                message: message || "",
                SelectedVendors: {
                    create: vendorConnections.map((vendor) => ({
                        category: vendor.category,
                        vendor: {
                            connect: {
                                id: vendor.vendorId,
                            },
                        },
                    })),
                },
            },
        });
        res.status(201).json({
            success: true,
            message: "Booking request submitted successfully.",
            request,
        });
    } catch (error) {
        console.error("Failed to create booking request:", error);
        res.status(500).json({
            success: false,
            message: "Unable to submit booking request.",
        });
    }
});
router.get("/vendors/requests", requireVendor, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as {
            vendorId: number;
            role: string;
        };
        const VendorRequests = await prisma.selectedVendor.findMany({
            where: {
                vendorId: decoded.vendorId,
            },
            include: {
                eventRequest: true,
            },
            orderBy: {
                eventRequest: {
                    createdAt: "desc",
                },
            },
        });
        const requests = VendorRequests.map((item: (typeof VendorRequests)[number]) => {
            const {
                phoneNumber,
                clientEmail,
                ...requestDetails
            } = item.eventRequest;
            return {
                ...requestDetails,
                category: item.category,

                ...(item.eventRequest.status === "Approved"
                    ? {
                        phoneNumber,
                        clientEmail,
                    }
                : {}),
            };
        });
             
        
        res.status(200).json({
            success: true,
            requests,
        });
    } catch (error) {
        console.error("Failed to fetch vendor requests:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch vendor requests.",        
        });
    }
});
router.put("/vendors/me/settings", requireVendor, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as {
            vendorId: number;
            role: string;
        };
        const {
            email,
            currentPassword,
            newPassword,
            confirmPassword,
        } = req.body;
        if (!email || !email.trim()) {
            res.status(400).json({
                success: false,
                message: "Email address is required.",
            });
            return;
        }
        const vendor = await prisma.vendor.findUnique({
            where: { id: decoded.vendorId },
        });
        if (!vendor) {
            res.status(404).json({
                success: false,
                message: "Vendor not found.",
            });
            return;
        }
        const existingEmail = await prisma.vendor.findUnique({
            where: { email: email.trim() },
        });
        if (existingEmail && existingEmail.id !== vendor.id) {
            res.status(409).json({
                success: false,
                message: "This email address is already in use.",
            });
            return;
        }
        const updateData: {
            email: string;
            password?: string;
        } = {
            email: email.trim(),
        };
        if (currentPassword || newPassword || confirmPassword) {
            if (!currentPassword || !newPassword || !confirmPassword) {
                res.status(400).json({
                    success: false,
                    message: "Please complete all password fields.",
                });
                return;
            }
            if (newPassword !== confirmPassword) {
                res.status(400).json({
                    success: false,
                    message: "New password and confirmation do not match.",
                });
                return;
            }
            if (newPassword.length < 8) {
                res.status(400).json({
                    success: false,
                    message: "New password must be at least 8 characters.",
                });
                return;
            }
            const passwordMatches = await bcrypt.compare(
                currentPassword,
                vendor.password
            );
            if (!passwordMatches) {
                res.status(400).json({
                    success: false,
                    message: "Current password is incorrect.",
                });
                return;
            }
            updateData.password = await bcrypt.hash(newPassword, 10);
        }
        const updatedVendor = await prisma.vendor.update({
            where: {
                id: decoded.vendorId
            },
            data: updateData,
            select: {
                id: true,
                businessName: true,
                ownerName: true,
                email: true,
                phoneNumber: true,
                category: true,
                location: true,
                description: true,
                status: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "Settings updated successfully.",
            vendor: updatedVendor,
        });    
    } catch (error) {
        console.error("Failed to update vendor settings:", error);
        res.status(500).json({
            success: false,
            message: "Unable to update settings.",
        });
    }
});
router.get("/vendors/public", async (req, res) => {
    try {
        const vendors = await prisma.vendor.findMany({
            where: {
                status: "Approved",
            },
            select: {
                id: true,
                businessName: true,
                category: true,
                location: true,
                description: true,
                serviceName: true,
                serviceDescription: true,
                servicePrice: true,
                portfolioTitle: true,
                portfolioDescription: true,
                portfolioImage: true,
            },
            orderBy: {
                businessName: "asc",
            },
        });
        res.status(200).json({
            success: true,
            vendors,
        });
    } catch (error) {
        console.error("Failed to fetch approved vendors:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch vendors.",
        });
    }
});
router.get("/vendors/public/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <=0) {
            res.status(400).json({
                success: false,
                message: "Invalid vendor ID.",
            });
            return;
        }
        const vendor = await prisma.vendor.findFirst({
            where: {
                id,
                status: "Approved",
            },
            select: {
                id: true,
                businessName: true,
                category: true,
                location: true,
                description: true,
                serviceName: true,
                serviceDescription: true,
                servicePrice: true,
                portfolioTitle: true,
                portfolioDescription: true,
                portfolioImage: true,
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
        console.error("Failed to fetch vendor:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch vendor.",
        });
    }
});
router.get("/admin/vendors", requireAdmin, async (requireAdmin, res) => {
    try {
        const vendors = await prisma.vendor.findMany({
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
              portfolioTitle: true,
              portfolioDescription: true,
              portfolioImage: true,
              status: true,
              createdAt: true,
             },
             orderBy: {
                createdAt: "desc",
             },
        });
        res.status(200).json({
          success: true,
          vendors,
        });
    } catch (error) {
        console.error("Failed to fetch admin vendors:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch vendors.",
        });
    }
    });
    router.put("/admin/vendors/:id/status", requireAdmin, async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;

            if (!Number.isInteger(id) || id<=0) {
                res.status(400).json({
                    success: false,
                    message: "Invalid vendor ID.",
                });
                return;
            }
            if (status !== "Approved" && status !== "Rejected") {
                res.status(400).json({
                    success: false,
                    message: "Invalid vendor status.",
                });
                return;
            }
            const existingVendor = await prisma.vendor.findUnique({
                where: { id },  
            });
            if (!existingVendor) {
                res.status(404).json({
                    success: false,
                    message: "Vendor not found.",
                });
                return;
            }
            const vendor = await prisma.vendor.update({
                where: { id },
                data: { status },
                select: {
                    id: true,
                    businessName: true,
                    status: true,
                },
            });
            res.status(200).json({
                success: true,
                message: `Vendor ${status.toLowerCase()} successfully.`,
                vendor,
            });
        } catch (error) {
            console.error("Failed to update vendor status:", error);
            res.status(500).json({
                success: false,
                message: "Unable to update vendor status.",
            });
        }
    });
    router.get("/admin/requests", requireAdmin, async (req, res) => {
        try {
            const requests = await prisma.eventRequest.findMany({
                include: {
                    SelectedVendors: {
                        include: {
                            vendor: {
                                select: {
                                    id: true,
                                    businessName: true,
                                    category: true,
                                    location: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            res.status(200).json({
                success: true,
                requests,
            });
        } catch (error) {
            console.error("Failed to fetch client requests:", error);

            res.status(500).json({
                success: false,
                message: "Unable to fetch client requests.",
            });
        }
    });
    router.put("/admin/requests/:id/status", requireAdmin, async (req, res) => {
        try {
            const id = req.params.id;
            const { status } = req.body;

            if (status !== "Approved" && status !== "Rejected") {
                res.status(400).json({
                    success: false,
                    message: "Invalid request status.",
                });
                return;
            }
            const existingRequest = await prisma.eventRequest.findUnique({
                where: { id },
            });
            if (!existingRequest) {
                res.status(404).json({
                    success: false,
                    message: "Booking request not found.",
                });
                return;
            }
            const request = await prisma.eventRequest.update({
                where: { id },
                data: { status },
            });
            res.status(200).json({
                success: true,
                message: `Booking request ${status.toLowerCase()} successfully.`,
                request,
            });
        } catch (error) {
            console.error("Failed to update client request:", error);
            res.status(500).json({
                success: false,
                message: "Unable to update booking request status.",
            });
        }
    });
router.post("/requests/track", async (req, res) => {
    try {
        const { bookingId, phoneNumber } = req.body;

        if (!bookingId || !phoneNumber) {
            res.status(400).json({
                success: false,
                message: "Booking reference and phone number are required.",
            });
            return;
        }
        const request = await prisma.eventRequest.findUnique({
            where: {
                id: bookingId,
            },
            select: {
                id: true,
                phoneNumber: true,
                eventType: true,
                eventDate: true,
                status: true,
                createdAt: true,
            },
        });
        if (!request || request.phoneNumber !== phoneNumber.trim()) {
            res.status(404).json({
                success: false,
                message: "Booking not found. Please check your details.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            booking: request,
        });

    } catch (error) {
        console.error("Failed to track booking:", error);

        res.status(500).json({
            success: false,
            message: "Unable to check booking status.",
        });
    }
});
export default router;