import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import geminiRoutes from "./geminiRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.use("/api/categoria", categoriaRoutes);


export default router;


