import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { questaoController } from "../controllers/geminiController.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post("/analisar", questaoController);

export default router;
