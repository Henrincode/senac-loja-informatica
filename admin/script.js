function fnMontarTabela(produto) {
    let linha = `
            <tr>
                <td>
                <img class="aspect-video object-cover w-10" src="${produto.foto}">
                </td>
                <td>
                    ${produto.id}
                </td>
                <td>
                    ${produto.titulo}
                </td>
                <td>
                    ${produto.descricao.slice(0, 50)}
                </td>
                <td>
                    ${produto.categoria}
                </td>
                <td>
                    ${produto.preco}
                </td>
                <td class="estrelas">
                    ${estrelas(produto.avaliacao)}
                </td>
                <td>
                <a href="/admin/produto/?id=${produto.id}">🔎</a>
                <a href="#">✒️</a>
                <a href="#">🗑️</a>
                </td>
            </tr>
    `
    document.querySelector("#lista-produtos").innerHTML += linha
}

fnCarregarDados()

function fnCarregarDados() {
    fetch('http://localhost:3000/api/produtos/', { method: 'GET' })
        .then(response => response.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarTabela(produto)
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