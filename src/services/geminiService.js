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

Formato OBRIGATORIO da resposta:
Retorne EXCLUSIVAMENTE um JSON válido, sem texto adicional, sem comenttários e sem formatação.
Estrutura exata do JSON:

{
  "resultado": [
    {
      "ingrediente": "nome do ingrediente em português",
      "descricao": "descrição objetiva da função do ingrediente no produto"
    }
  ],
  "fontes": [
    "link1",
    "link2"
  ]
}

Restrições:
- Um objeto por ingrediente
- A resposta deve ter no máximo 2 linhas para cada ingrediente
- Cada explicação deve ser a mais completa possível dentro do limite estabelecido
- Não emitir opiniões, recomendações ou citar marcas
- Focar exclusivamente na função do ingrediente dentro da categoria do produto
- Caso a lista contenha ingredientes tipicamente farmacêuticos (ex: medicamentos), ou os ingredientes não forem compativeis com a categoria, retornar apenas a mensagem:
  {
  "erro": "A lista informada não condiz com a categoria do produto"
}
- Utilizar linguagem neutra e informativa
- As respostas devem ser o mais explicadas possivel

Fontes:
- Preferencialmente sites técnicos ou científicos

`;

    //console.log(TEXT_PROMPT)
    return await questaoGemini(TEXT_PROMPT);
  }
}
