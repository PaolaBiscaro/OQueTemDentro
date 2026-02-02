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


textarea.addEventListener("keydown", (e) => {
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

        enviarListaIngredientes();

        textarea.value = "";
        previewWrapper.style.display = "none";
        previewImagem.innerHTML = "";
        previewImagem.src = "";
        window.imagemSelecionadaUrl = null;


    }
});


async function enviarListaIngredientes() {
    const listaIngredientes = textarea.value.trim();
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
            listaIngredientes
        })
    });

    const dados = await resposta.json();
    document.getElementById("resultado-ia").innerText = dados.resultado;
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
