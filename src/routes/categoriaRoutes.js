import {Router} from "express";
import {questaoController} from "../controllers/geminiController.js"

const router = Router();

router.post('/analisar', questaoController);

export default router
