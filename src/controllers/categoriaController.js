import * as geminiService from "../services/geminiService.js";

export async function processarCategoria(req, res) {
    const { categoria } = req.body;
    console.log("Servidor processando a categoria:", categoria);

    const resultado = await geminiService.processar(categoria);

   res.json({ resultado });
}