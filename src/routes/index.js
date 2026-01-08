import { Router } from "express";
import geminiApiRoutes from "./geminiRoutes.js"

const router = Router();

router.use(geminiApiRoutes);

export default router;


