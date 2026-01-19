import {Router} from "express";
import {questaoController} from "../controllers/geminiController.js";

const router = Router();

router.get("/perguntas", questaoController)

export default router;
