import * as geminiService from "../services/geminiService.js";

export async function questaoController(req, res) {
    const { categoria, listaIngredientes } = req.body;

    console.log("Servidor recebeu Lista:", listaIngredientes);
    console.log("Servidor recebeu Categoria:", categoria);

    const resultado = await geminiService.processar(categoria, listaIngredientes);

    res.json({ resultado });
};


