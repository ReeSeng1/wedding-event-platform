import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./lib/prisma.js";
import authRouter from "./routes/auth.js";
import vendorRouter from "./routes/vendor.js";

dotenv.config();

const app = express();
const PORT =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", vendorRouter);
app.get("/", (req, res) => {
    res.send("EverAfter backend is running!");
});
app.listen(PORT, () => {
    console.log(`EverAfter backend running on port $(PORT)`);
});
app.get("/api/health/db", async (req, res) => {
    try {
        await prisma.$connect();

        res.json({
            success: true,
            message: "Database connected successfully!",
        });
    } catch (error) {
        console.error("Database connection failed:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed.",
        });
    }
});