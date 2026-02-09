const textarea = document.getElementById("pesquisa");
const placeholder = document.querySelector(".placeholder-fake");
const previewImagem = document.getElementById("previewImagem");
const previewWrapper = document.getElementById("previewWrapper");


function atualizarPlaceholder() {
    const temTexto = textarea.value.trim() !== "";
    const temImagem = previewWrapper.style.display !== "none";

    placeholder.style.display = (temTexto || temImagem) ? "none" : "block";
}

textarea.addEventListener("input", atualizarPlaceholder);


textarea.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        const pesquisaIngredientes = textarea.value.trim();
        const categoria = localStorage.getItem("categoriaSelecionada");

        console.log("Categoria enviada:", categoria);

        if (!pesquisaIngredientes) return;

        adicionarMensagemUsuario(pesquisaIngredientes, window.imagemSelecionadaUrl)
        const conteudoIncial = document.getElementById("conteudoInicial");
        if (conteudoIncial) {
            conteudoIncial.style.display = "none";
        }

        textarea.value = "";
        previewWrapper.style.display = "none";
        previewImagem.innerHTML = "";
        previewImagem.src = "";
        window.imagemSelecionadaUrl = null;

        exibirIndicadorDigitando();

        const dados = await enviarListaIngredientes(pesquisaIngredientes);

        removerIndicadorDigitando();

        if (dados?.resultado) {
            adicionarRespostaApi(
                "Resultado da pesquisa dos ingredientes:",
                dados.resultado
            );
        }
    }
});


async function enviarListaIngredientes(listaIngredientes) {
    const categoriaSalva = localStorage.getItem("categoriaSelecionada");

    console.log("Categoria enviada:", categoriaSalva);
    console.log("Ingredientes enviados:", listaIngredientes);


    if (!categoriaSalva || !listaIngredientes) {
        alert("Por favor, selecione uma categoria e digite os ingredientes!");
        return;
    }

    const resposta = await fetch("/analisar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            categoria: categoriaSalva,
            listaIngredientes: listaIngredientes
        })
    });

    const dados = await resposta.json();
    console.log("Resposta da API:", dados);
    if (typeof dados.resultado === "string") {
        const jsonLimpo = dados.resultado
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(jsonLimpo);
    }

    return dados;
}


function adicionarMensagemUsuario(texto, imagemUrl) {
    const chat = document.getElementById("pesquisaUsuario");

    const linha = document.createElement("div");
    linha.classList.add("row", "mb-2");

    const colunaVazia = document.createElement("div");
    colunaVazia.classList.add("col-5");

    const colunaMensagem = document.createElement("div");
    colunaMensagem.classList.add("col-7", "justify-content-end", "d-flex");

    const bolha = document.createElement("div");
    bolha.classList.add("balaoMensagem");



    if (imagemUrl) {
        const img = document.createElement("img");
        img.src = imagemUrl;
        img.classList.add("img-chat");
        bolha.appendChild(img);
    }

    if (texto) {
        const p = document.createElement("p");
        p.innerText = texto;
        bolha.appendChild(p);
    }


    colunaMensagem.appendChild(bolha);
    linha.appendChild(colunaVazia);
    linha.appendChild(colunaMensagem);

    chat.appendChild(linha);
    chat.scrollTop = chat.scrollHeight;
}


function adicionarRespostaApi(texto, lista) {
    const chat = document.getElementById("pesquisaUsuario");

    const hr = document.createElement("hr");

    const linha = document.createElement("div");
    linha.classList.add("row", "mb-2");

    const colunaMensagem = document.createElement("div");
    colunaMensagem.classList.add("col-12", "text-md-start");

    const bolha = document.createElement("div");
    bolha.classList.add("balaoResposta");

    const p = document.createElement("p");
    p.innerText = texto;

    const tabela = document.createElement("table");
    tabela.classList.add("table", "table-sm");

    const thead = document.createElement("thead");

    const tbody = document.createElement("tbody");

    lista.forEach(item => {
        const tr = document.createElement("tr");

        const tdIngrediente = document.createElement("td");
        tdIngrediente.innerText = item.ingrediente;
        tdIngrediente.classList.add("fonte-ingrediente")

        const tdResultado = document.createElement("td");
        tdResultado.innerText = item.descricao;
        tdResultado.style.color = "#ffffffce";
        tdResultado.classList.add("fonte-resposta")

        tr.appendChild(tdIngrediente);
        tr.appendChild(tdResultado);
        tbody.appendChild(tr);
    });

    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    bolha.appendChild(p);
    bolha.appendChild(tabela);

    colunaMensagem.appendChild(bolha);
    linha.appendChild(colunaMensagem);

    chat.appendChild(hr);
    chat.appendChild(linha);
    chat.scrollTop = chat.scrollHeight;
}


function exibirIndicadorDigitando(){
    const chat = document.getElementById("pesquisaUsuario");
    const indicador = document.createElement("div");
    indicador.id = "digitando-ia";
    indicador.className = "row mb-2";
    indicador.innerHTML = `
        <div class="col-12 d-flex justify-content-start">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chat.appendChild(indicador);
    chat.scrollTop = chat.scrollHeight;
}

function removerIndicadorDigitando(){
    const indicador = document.getElementById("digitando-ia");
    if(indicador){
        indicador.remove();
    }
}
