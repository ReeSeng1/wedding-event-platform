import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

async function createAdmin() {
    try {
        const email = "admin@everafter.com";
        const password = "ChangeMe123!";
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });
        if (existingUser) {
            console.log("An account with this email already exists.");
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await prisma.user.create({
            data: {
                email,
                password:hashedPassword,
                role:"ADMIN",
            },
        });

        console.log("Admin account created successfully!");
        console.log("Email:", admin.email);
        console.log("Temporary password: ChangeMe123!");
        console.log("Please change this password before using the app in production.");
    }catch (error) {
        console.error("Failed to create admin account:", error);
    }finally {
        await prisma.$disconnect();
    }
}
createAdmin();