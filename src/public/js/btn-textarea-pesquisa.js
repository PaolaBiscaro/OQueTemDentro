const textarea = document.getElementById("pesquisa");
const placeholder = document.querySelector(".placeholder-fake");
const previewImagem = document.getElementById("previewImagem");

function atualizarPlaceholder() {
  const temTexto = textarea.value.trim() !== "";
  const temImagem =
    previewImagem &&
    previewImagem.src &&
    previewImagem.offsetWidth > 0 &&
    previewImagem.offsetHeight > 0;

  if (temTexto || temImagem) {
    placeholder.style.display = "none";
  } else {
    placeholder.style.display = "block";
  }
}


textarea.addEventListener("input", atualizarPlaceholder);


atualizarPlaceholder();
