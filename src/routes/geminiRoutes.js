import {Router} from "express";
import {questaoController} from "../controllers/geminiController.js";

const router = Router();

router.get("/", questaoController)

export default router;
