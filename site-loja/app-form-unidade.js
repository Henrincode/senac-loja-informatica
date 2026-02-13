function fnMontarCardUnidades(unidade){
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${unidade.foto} class="card-img-top""
                        class="card-img-top" alt="${unidade.nome_da_loja}">
                    <div class="card-body">
                        <h5 class="card-title"><strong>${unidade.nome_da_loja}</strong></h5>
                        <p class="card-text"><strong>Endereço:</strong> ${unidade.endereco}</p>
                        <p class="card-text"><strong>E-mail:</strong> ${unidade.email}</p>
                        <p class="card-text"><strong>Telefone:</strong> ${unidade.telefone}</p>
                        ${gmap(unidade.latitude, unidade.longitude)}
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light">
                        <button class="btn btn-primary btn-sm">Comprar</button>
                        <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-heart"></i></button>
                    </div>
                </div>
            </div>
    `
    document.querySelector(".unidades").innerHTML += cartao
}
 
function fnCarregarDados(){
    fetch('http://localhost:3000/unidades/', { method: 'GET'})
    .then(response => response.json ())
    .then((unidades) => {
        unidades.forEach(unidade => {
            fnMontarCardUnidades(unidade)
        });
    })
    .catch(erro => console.log(erro.message))
}
 
function gmap(lat, lng) {
    return`
        <iframe
        class="aspect-video"
        src="https://www.google.com/maps?q=${lat},${lng}&output=embed"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>    
    `
}
 
 
function fnAlterarFoto(){
    if (foto.value != ''){
        document.getElementById("fundo-imagem").style.backgroundImage = `url(${foto.value})`
    }else{
        document.getElementById("fundo-imagem").style.backgroundImage = `url(https://realtime1.com.br/wp-content/uploads/2025/02/Ze-Pilintra.jpg)`
    }
    console.log(foto.value)
}
 
function fnLimparCampos(){
    document.getElementById("form-produtos").reset()
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
    console.log(formDados)
 
    fetch('http://localhost:3000/unidades/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        budy: JSON.stringify(formDados)
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
 
 
fnCarregarDados()