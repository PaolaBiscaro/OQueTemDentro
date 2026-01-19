import { questaoGemini } from "../data/geminiData.js"


export async function processar(categoria, listaIngredientes) {
  console.log(categoria);

  if (!listaIngredientes || !categoria) {
    console.error("Erro: Categoria ou Lista de Ingredientes não foram fornecidas.");

    return "Erro: Por favor, selecione uma categoria e digite os ingredientes.";

  } else {

    console.log
    const TEXT_PROMPT = `
Contexto:
Sou um consumidor que deseja entender a função dos ingredientes de um produto antes de comprá-lo.

Tarefa:
Explique o significado e a finalidade de cada ingrediente da lista ${listaIngredientes}, considerando que o produto pertence á categoria ${categoria}.
Para cada ingrediente, responda:
- Por que ele está presente nesse tipo de produto?
- Qual sua função?
- Como ele contribui para o obejtivo do produto, com base na categoria informada?

Formato da resposta:
- Um ingrediente por linha
- Estrutura obrigatoria: ingrediente; finalidade resumida e objetiva
- Caso o nome do ingrediente esteja em outro idioma que não seja o português-br, você deve traduzi-lo.

Restrições:
- A resposta deve ter no máximo 3 linhas no total
- Cada explicação deve ser a mais completa possível dentro do limite estabelecido
- Não emitir opiniões, recomendações ou citar marcas
- Focar exclusivamente na função do ingrediente dentro da categoria do produto
- Caso a lista contenha ingredientes tipicamente farmacêuticos (ex: medicamentos), retornar apenas a mensagem:
  "A lista informada não condiz com a categoria do produto"
- Utilizar linguagem neutra e informativa
- As respostas devem ser o mais explicadas possivel

Fontes:
- Informar as fontes de pesquisa ao final da resposta, em formato de links
- Preferencialmente sites técnicos ou científicos

`;
    //console.log(TEXT_PROMPT)
    return await questaoGemini(TEXT_PROMPT);
  }





}
