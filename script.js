function fnMontarCardProduto(produto) {
    let cartao = `
            <div class="overflow-hidden flex flex-col rounded-xl border-4 transition-all hover:-translate-y-2 border-blue-100 hover:border-blue-300 shadow shadow-blue-700/40 bg-slate-700">
                <img class="aspect-video object-cover" src="${produto.foto}"
                    class="" alt="${produto.nome}">
                <div class="flex-1 p-4 text-white">
                    <h5 class="text-2xl">${produto.titulo}</h5>
                    <p class="text-lg whitespace-pre-line">${produto.descricao}</p>
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
    const existe_ordem = parametros.has('ordem')

    let ordem = ''
    let categoria = ''
    let rota_categoria = ""
    let rota_ordem = ""

    if (existe_categoria) {
        categoria = parametros.get('categoria')
        rota_categoria = categoria + "/"
        const filtros = `
            <span>Ordenar por: </span>
            <a href="/?categoria=${categoria}&ordem=preco">preço</a>
            <a href="/?categoria=${categoria}&ordem=titulo">titulo</a>
        `
        document.querySelector('#filtros').innerHTML = filtros
    } else {
        const filtros = `
            <span>Ordenar por: </span>
            <a href="/?ordem=preco">preço</a>
            <a href="/?ordem=titulo">titulo</a>
        `
        document.querySelector('#filtros').innerHTML = filtros
    }

    if (existe_ordem) {
        ordem = parametros.get('ordem')
        rota_ordem = ordem + "/"
    }

    let url = 'http://localhost:3000/api/produtos/'
    if (existe_categoria) {
        url += rota_categoria + rota_ordem
    } else if (existe_ordem) {
        url += '?ordem=' + ordem
    }

    fetch(url, { method: 'GET' })
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