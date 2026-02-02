let popoverInstance = null;
let cropper = null;
window.imagemSelecionadaUrl = null;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnPopover");
  const template = document.getElementById("popup-template");

  if (!btn || !template) return;

  popoverInstance = new bootstrap.Popover(btn, {
    html: true,
    sanitize: false,
    placement: "top",
    trigger: "click",
    container: "body",
    content: template.innerHTML,
    offset: [0, 12]
  });

  // 👉 Quando o popover abrir
  btn.addEventListener("shown.bs.popover", () => {
    const popover = document.querySelector(".popover");
    if (!popover) return;

    const btnGaleria = popover.querySelector("#btnGaleria");
    const btnTirarFoto = popover.querySelector("#btnTirarFoto");
    const inputImagem = popover.querySelector("#inputImagem");

    if (!btnGaleria || !btnTirarFoto || !inputImagem) return;

    btnGaleria.onclick = () => {
      inputImagem.removeAttribute("capture");
      inputImagem.click();
    };

    btnTirarFoto.onclick = () => {
      inputImagem.setAttribute("capture", "environment");
      inputImagem.click();
    };

    inputImagem.onchange = () => {
      const arquivo = inputImagem.files[0];
      if (!arquivo) return;

      const imagemUrl = URL.createObjectURL(arquivo);
      const img = document.getElementById("imagemParaCorte");
      img.src = imagemUrl;

      const modalEl = document.getElementById("modalCrop");
      const modal = new bootstrap.Modal(modalEl);
      modal.show();

      modalEl.addEventListener(
        "shown.bs.modal",
        () => {
          if (cropper) cropper.destroy();

          cropper = new Cropper(img, {
            viewMode: 1,
            autoCropArea: 1,
            movable: true,
            zoomable: true,
            scalable: true,
            responsive: true,
          });


        },
        { once: true }
      );
    };
  });
});

// 👉 Botão confirmar corte 
document.getElementById("btnConfirmarCorte").onclick = async () => {
  if (!cropper || typeof cropper.getCroppedCanvas !== "function") {
    console.error("Cropper não inicializado corretamente", cropper);
    return;
  }

  const canvas = cropper.getCroppedCanvas({
    imageSmoothingQuality: "high",
  });

  window.imagemSelecionadaUrl = canvas.toDataURL("image/jpeg");

  const previewImagem = document.getElementById("previewImagem");
  const previewWrapper = document.querySelector(".preview-wrapper");
  const textarea = document.getElementById("pesquisa");

  previewImagem.src = window.imagemSelecionadaUrl;
  previewWrapper.style.display = "block";

  const textoExtraido = await extrairTextoImagem(window.imagemSelecionadaUrl);
  textarea.value = textoExtraido.trim();
  textarea.dispatchEvent(new Event("input"));

  atualizarPlaceholder();

  cropper.destroy();
  cropper = null;

  bootstrap.Modal.getInstance(
    document.getElementById("modalCrop")
  ).hide();

  popoverInstance.hide();
};
