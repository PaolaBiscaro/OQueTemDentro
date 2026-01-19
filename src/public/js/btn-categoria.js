async function selecionar(elemento) {
    const botoes = document.querySelectorAll('.btn-selecionado');
    botoes.forEach(btn => btn.classList.remove('active'));

    elemento.classList.add('active');

    const categoria = elemento.innerText.trim()
    localStorage.setItem('categoriaSelecionada', categoria);

    console.log(`Categoria ${categoria} guardada na memória.`);
}
