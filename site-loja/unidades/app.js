function fnMontarCardUnidade(u){
    
    let cartao = `
        <li class="overflow-hidden rounded-xl border-4 border-blue-100 hover:border-blue-300 shadow shadow-blue-700/40 bg-slate-700">
            <img class="aspect-video object-cover" src="${u.foto}">
            ${gmap(u.latitude, u.longitude)}
            <ul class="flex flex-col gap-1 px-3 py-2 text-white">
                <li class="border-b-2 border-gray-400/20 font-semibold text-xl text-center">
                    ${u.nome_da_loja}
                </li>
                <li>
                    ☎ ${u.telefone}
                </li>
                <li>
                    📧 ${u.email}
                </li>
                <li>
                    🗺 ${u.endereco}
                </li>
            </ul>
        </li>
    `
    document.querySelector("#listaUnidades").innerHTML += cartao
}

function fnCarregarDados(){
    fetch('http://localhost:3000/unidades/', { method: 'GET'})
    .then(response => response.json ())
    .then((unidades) => {
        unidades.forEach(unidade => {
            fnMontarCardUnidade(unidade)
        });
    })
    .catch(erro => console.log(erro.message))
}

function gmap(lat, lng) {
    return `
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

fnCarregarDados()