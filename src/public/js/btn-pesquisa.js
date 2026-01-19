document.addEventListener('DOMContentLoaded', () => {
    const inputPesquisa = document.getElementById('pesquisa');

    if (inputPesquisa) {
        inputPesquisa.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                enviarListaIngredientes();
            }
        });
    }
});


async function enviarListaIngredientes() {
    const campoPesquisa = document.getElementById('pesquisa');
    const listaIngredientes = campoPesquisa.value.trim();

    const categoriaSalva = localStorage.getItem(`categoriaSelecionada`)


    if (!categoriaSalva || !listaIngredientes) {
        alert("Por favor, selecione uma categoria e digite os ingredientes!");
        return;
    }


    const resposta = await fetch('/api/categoria/analisar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoria: categoriaSalva,
            listaIngredientes: listaIngredientes
        })
    });


    const dados = await resposta.json();
    document.getElementById('resultado-ia').innerText = dados.resultado;
}