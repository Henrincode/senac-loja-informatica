fnCarregarDados()

function fnCarregarDados() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id') + "/"
    fetch('http://localhost:3000/api/produto/' + id, { method: 'GET' })
        .then((resposta) => resposta.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarProduto(produto)
            })
        })
        .catch(err => console.log(err.message))
}

function fnMontarProduto(produto) {
    const imagem = document.querySelector('#p-imagem')
    const titulo = document.querySelector('#p-titulo')
    const preco = document.querySelector('#p-preco')
    const avaliacao = document.querySelector('#p-estrelas')
    const descricao = document.querySelector('#p-descricao')

    imagem.innerHTML = `
        <img src="${produto.foto}"
        alt="Product" class="img-fluid rounded mb-3 product-image" id="mainImage">
    `
    titulo.innerHTML = produto.titulo
    preco.innerHTML = produto.preco

    avaliacao.innerHTML = estrelas(produto.avaliacao)
    descricao.innerHTML = produto.descricao
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