import { procesarPrompt } from "../services/geminiService.js";

export async function questaoController(req, res) {
    const resultado = await procesarPrompt();

    res.status(200).json({
        status: "Ok",
        resposta: resultado
    });
}

