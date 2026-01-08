import {questaoGemini} from "../data/geminiData.js"

const TEXT_PROMPT = `
Me envie uma frase dita por um filosofo, apenas a frase sem qualquer outro texto.
`;

export async function procesarPrompt() {
    return await questaoGemini(TEXT_PROMPT);
}