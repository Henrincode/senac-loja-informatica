function fnAlterarFoto(){
    if (foto.value != ''){
        document.getElementById("fundo-imagem").style.backgroundImage = `url(${foto.value})`
    }else{
        document.getElementById("fundo-imagem").style.backgroundImage = `url(https://realtime1.com.br/wp-content/uploads/2025/02/Ze-Pilintra.jpg)`
    }
}
 
function fnLimparCampos(){
    document.getElementById("form-unidade").reset()
}
 
function fnCadastrarUnidades(){
    let formDados = {
        nome_da_loja: document.getElementById("nome_da_loja").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
        foto: document.getElementById("foto").value
    }
    console.log('c1', formDados)
 
    fetch('http://localhost:3000/api/unidades/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formDados)
    })
    .then(resposta => resposta.json())
    .then((dados) => {
        fnLimparCampos()
        console.log(dados)
    })
    .catch(erro => console.log(erro.message))
}
 
let foto = document.getElementById("foto")
let btn_salvar = document.getElementById("btn-salvar-undiade")
 
foto.addEventListener("blur", function(){
    fnAlterarFoto()
    console.log('mudou')
})
 
btn_salvar.addEventListener("click", function(){
    fnCadastrarUnidades()
})