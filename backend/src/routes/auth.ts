import { Router } from "express";

const router = Router();

router.post("/admin/login", async (req, res) => {
    res.json({
        success: true,
        message: "Admin login endpoint is ready!",
    });
});
export default router;