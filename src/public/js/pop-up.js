let popoverInstance = null

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnPopover")
    const template = document.getElementById("popup-template")

    if (!btn || !template) return

    popoverInstance = new bootstrap.Popover(btn, {
        html: true,
        sanitize: false,
        placement: 'top',
        trigger: 'click',
        content: template.innerHTML,
        container: 'body',
        offset: [ 80, 8 ] 
    })
})

document.addEventListener("click", (event) => {
    const btn = document.getElementById("btnPopover")
    const popover = document.querySelector(".popover")

    if (btn.contains(event.target)) return

    if (popover && popover.contains(event.target)) return

    if (popoverInstance) {
        popoverInstance.hide()
    }

    if (event.target.classList.contains("acao-adicionar")) {
        alert("Adicionar clicado")
        popoverInstance.hide()
    }
})
