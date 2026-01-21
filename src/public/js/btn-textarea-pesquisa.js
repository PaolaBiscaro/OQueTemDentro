const campo = document.getElementById("pesquisa");

campo.addEventListener("input", () => {
    campo.style.height = "auto";
    campo.style.height = Math.min(campo.scrollHeight, 120) + "px";
});
