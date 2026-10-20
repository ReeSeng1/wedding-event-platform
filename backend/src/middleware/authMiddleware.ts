import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

interface AdminTokenPayload {
    userId: number;
    role: string;
}
export async function requireAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Authenication token is required.",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            res.status(500).json({
                success: false,
                message: "Server authenication is not configured.",
            });
            return;
        }
        const decoded = jwt.verify(
            token,
            jwtSecret
        ) as AdminTokenPayload;

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if(!user || user.role !== "ADMIN") {
            res.status(403).json({
                success: false,
                message: "Admin access required.",
            });
            return;
        }
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token.",
        });
    }
}