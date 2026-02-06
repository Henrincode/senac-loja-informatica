function fnMontarCardProduto(produto) {
    let cartao = `
            <div class="overflow-hidden flex flex-col rounded-xl border-4 border-blue-100 hover:border-blue-300 shadow shadow-blue-700/40 bg-slate-700">
                <img class="aspect-video object-cover" src="${produto.foto}"
                    class="" alt="${produto.nome}">
                <div class="flex-1 p-4 text-white">
                    <h5 class="text-2xl">${produto.titulo}</h5>
                    <p class="text-lg">${produto.descricao}</p>
                    <div class="flex flex-row justify-between mt-2">
                        <span class="text-xl">R$ ${produto.preco}</span>
                        <div class="flex flex-row items-center gap-2 text-yellow-300">
                            ${estrelas(produto.avaliacao)}
                            <small class="text-white">(${produto.avaliacao})</small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-between items-center p-2 bg-gray-500">
                    <button class="px-3 py-1 rounded-md text-white bg-blue-600 hover:bg-blue-300 cursor-pointer">Comprar</button>
                    <button class="flex justify-center items-center px-2 py-1 border border-gray-800 hover:border-gray-50 rounded-md hover:text-white hover:bg-gray-400 cursor-pointer"><i class="bi bi-heart"></i></button>
                </div>
            </div>
    `
    document.querySelector("#listaProdutos").innerHTML += cartao
}

function fnCarregarDados() {

}

function fnCarregarDados() {

    const parametros = new URLSearchParams(window.location.search)
    const existe_categoria = parametros.has('categoria')

    let rota_categoria = ""

    if (existe_categoria) {
        rota_categoria = parametros.get('categoria') + "/"
    }

    console.log(rota_categoria)

    fetch('http://localhost:3000/produtos/' + rota_categoria, { method: 'GET' })
        .then(response => response.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarCardProduto(produto)
            });
        })
        .catch(erro => console.log(erro.message))
}


function estrelas(e) {
    let estrelas = ''
    for (i = 1; i <= 5; i++) {
        if (i <= e) {
            estrelas += `<i class="bi bi-star-fill text-warning"></i> `
        } else {
            estrelas += `<i class="bi bi-star text-warning"></i> `
        }
    }
    return estrelas
}

fnCarregarDados()