let btn_salvar = document.getElementById("btn-cadastrar")

btn_salvar.addEventListener("click", function () {
    fnCadastrarProdutos()
})

function fnLimparCampos() {
    document.getElementById("form-cadastrar").reset()
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
}

function fnCadastrarProdutos() {

    let formDados = {
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        permissao: document.getElementById("permissao").value
    }

    console.dir(formDados)

    fetch('http://localhost:3000/api/usuario/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            fnLimparCampos()
            alerta('Usuário cadastrado')
        })
        .catch(erro => console.log('deu erro', erro.message))
}