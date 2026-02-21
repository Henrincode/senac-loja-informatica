const listaProdutos = document.querySelector("#lista-produtos")

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
                <button type='button' onClick="fnExcluirProdutoDB(this, ${produto.id})"
                class="
                    cursor-pointer
                ">🗑️</button>
                </td>
            </tr>
    `
    listaProdutos.innerHTML += linha
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

function fnExcluirProdutoDB(e, id) {
    fetch('http://localhost:3000/api/produto/' + id, { method: 'DELETE' })
        .then(() => {
            alerta('Produto apagado')
                e.closest('tr').remove()
        })
        .catch(erro => console.log(erro.message))
}

alerta('teste')

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

function alerta(msg) {
    const menssagem = document.querySelector('#menssagem')

    const div = document.createElement('div')
    div.classList.add('opacity-0', 'duration-300', 'bg-green-200', 'px-4', 'py-2', 'rounded-full')

    div.innerHTML = msg

    menssagem.append(div)

    setTimeout(() => {
        div.classList.remove('opacity-0')
    }, 100)

    setTimeout(() => {
        div.classList.add('opacity-0')
    }, 5000)

    setTimeout(() => {
        div.remove()
    }, 6000)
}