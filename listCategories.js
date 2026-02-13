async function carregarListaCat() {
    try {
        const data = await fetch('http://localhost:3000/lista/categorias', {method: 'GET'})
        const categorias = await data.json()

        console.log(categorias)

    } catch(error){
        console.error(error)
    }
}

carregarListaCat()