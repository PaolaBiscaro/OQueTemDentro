let popoverInstance = null

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnPopover")
  const template = document.getElementById("popup-template")
  const textarea = document.getElementById("pesquisa")
  const previewImagem = document.getElementById("previewImagem")
  const previewWrapper = document.querySelector(".preview-wrapper")

  if (!btn || !template) return

  popoverInstance = new bootstrap.Popover(btn, {
    html: true,
    sanitize: false,
    placement: "top",
    trigger: "click",
    container: "body",
    content: template.innerHTML,
    offset: [0, 12]
  })

  btn.addEventListener("shown.bs.popover", () => {
    const popover = document.querySelector(".popover")
    if (!popover) return

    const btnGaleria = popover.querySelector("#btnGaleria")
    const inputImagem = popover.querySelector("#inputImagem")

    if (!btnGaleria || !inputImagem) return

    btnGaleria.onclick = () => inputImagem.click()

    inputImagem.onchange = async () => {
      const arquivo = inputImagem.files[0]
      if (!arquivo) return

      const imagemUrl = URL.createObjectURL(arquivo)

      // OCR
      const textoExtraido = await extrairTextoImagem(imagemUrl)
      textarea.value = textoExtraido.trim()

      // preview
      previewImagem.src = imagemUrl
      previewWrapper.style.display = "block"

      atualizarPlaceholder()
      popoverInstance.hide()
    }
  })
})

document.addEventListener("click", (e) => {
  const btn = document.getElementById("btnPopover")
  const popover = document.querySelector(".popover")

  if (btn?.contains(e.target)) return
  if (popover?.contains(e.target)) return

  popoverInstance?.hide()
})

console.log(extrairTextoImagem)
