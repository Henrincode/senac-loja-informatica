const mysql = require('mysql')
const express = require('express')
const app = express()


app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send ('ZecaInfo')
})

// const lista_produtos = [
//     {
//         "titulo": "Red Nike",
//         "foto":"https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzaG9lfGVufDB8MHx8fDE3MjEwNDEzNjd8MA&ixlib=rb-4.0.3&q=80&w=1080",
//         "descricao": "Tênis leve, com design versátil e acabamento moderno, perfeito para acompanhar sua rotina.",
//         "preco": 499.00,
//         "avaliacao": 5
//     },
//     {
//         "titulo": "Blue Nike",
//         "foto":"https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Modelo confortável, resistente e ideal para quem busca um visual urbano sem abrir mão do bem-estar.",
//         "preco": 699.00,
//         "avaliacao": 3
//     },
//     {
//         "titulo": "Black Nike",
//         "foto":"https://images.unsplash.com/photo-1643584549066-fc993fc9cb43?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Tênis com ajuste confortável, visual clean e solado que garante estabilidade em cada passo.",
//         "preco": 799.00,
//         "avaliacao": 4
//     }
// ]


const conexao = mysql.createConnection({
    host: '108.179.193.209',
    user: 'gutoxa27_alunos',
    password: 'JD_eXLNHp1ZG',
    database: 'gutoxa27_bd_loja'
})

conexao.connect((erro) =>  {
    if(erro){
        console.log('Deu ruim na conexão')
        throw erro
    } else {
        console.log('Conexão deu bom')
    }
})

// get all products
app.get("/produtos", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    const ordem = req.query.ordem
    conexao.query(`SELECT * FROM produtos ${ordem && `order by ${ordem}`}`, ((erro, lista_produtos, campos) => {
        // console.log(lista_produtos)
        res.send(lista_produtos)
    }))
})

// get all products witch filter
// app.get("/produtos/:ordem", function (req, res){
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     const ordem = req.params.ordem
//     conexao.query(`SELECT * FROM produtos order by ${ordem}`, ((erro, lista_produtos, campos) => {
//         // console.log(lista_produtos)
//         res.send(lista_produtos)
//     }))
// })

// filtrar categorias
app.get("/produtos/:categoria/", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos where categoria = '${categoria}'`, ((erro, lista_produtos, campos) => {
        // console.log(lista_produtos)
        res.send(lista_produtos)
    }))
})

// filtrar com ordem
app.get("/produtos/:categoria/:ordem", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    console.log(ordem)
    conexao.query(`SELECT * FROM produtos where categoria = '${categoria}' order by ${ordem}`, ((erro, lista_produtos, campos) => {
        // console.log(lista_produtos)
        res.send(lista_produtos)
    }))
})

// pegar lista de categorias
app.get("/lista/categorias", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    conexao.query(`SELECT distinct categoria FROM produtos`, ((erro, lista_categorias, campos) => {
        // console.log(lista_categorias)
        res.send(lista_categorias)
    }))
})

// get units
app.get("/unidades", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    // res.send(lista_produtos)
    conexao.query("SELECT * FROM unidades", ((erro, lista_produtos, campos) => {
        // console.log(lista_produtos)
        res.send(lista_produtos)
    }))
})

app.listen (3000)