import express from 'express'
import { createConnection } from 'mysql'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const conexao = createConnection({
    host: '108.179.193.209',
    user: 'gutoxa27_alunos',
    password: 'JD_eXLNHp1ZG',
    database: 'gutoxa27_bd_loja'
})

conexao.connect((erro) => {
    if (erro) {
        console.log('Deu ruim na conexão')
        throw erro
    } else {
        console.log('Conexão deu bom')
    }
})

// Hello Word
app.get('/api', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('ZecaInfo')
})

// get all products
app.get("/api/produtos", function (req, res) {
    const ordem = req.query.ordem
    conexao.query(`SELECT * FROM produtos ${ordem ? `order by ${ordem}` : "order by id desc"}`, ((erro, lista_produtos, campos) => {
        // console.log(lista_produtos)
        res.send(lista_produtos)
    }))
})

// pegar lista de categorias
app.get("/api/lista/categorias", function (req, res) {
    conexao.query(`SELECT distinct categoria FROM produtos`, ((erro, lista_categorias, campos) => {
        res.send(lista_categorias)
    }))
})

// filtrar categorias
app.get("/api/produtos/:categoria", function (req, res) {
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos where categoria = '${categoria}'`, ((erro, lista_produtos, campos) => {
        res.send(lista_produtos)
    }))
})

// filtrar com ordem
app.get("/api/produtos/:categoria/:ordem", function (req, res) {
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    conexao.query(`SELECT * FROM produtos where categoria = '${categoria}' order by ${ordem}`, ((erro, lista_produtos, campos) => {
        res.send(lista_produtos)
    }))
})

// get units
app.get("/api/unidades", function (req, res) {
    conexao.query("SELECT * FROM unidades order by id desc", ((erro, lista_produtos, campos) => {
        res.send(lista_produtos)
    }))
})

// creat product
app.post("/api/produto", function (req, res) {

    const data = req.body

    conexao.query('INSERT INTO produtos set ?', [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro)
            }
            res.send(resultado.insertId)
        })
})

// creat unit
app.post("/api/unidades", function (req, res) {

    const data = req.body

    conexao.query('INSERT INTO unidades set ?', [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro)
            }
            res.send(resultado.insertId)
        })
})

// LOGIN
app.post("/api/login", (req, res) => {
    const usuario = req.body.usuario
    const senha = req.body.senha

    conexao.query(`
        select * from usuarios
        where usuario = '${usuario}' and senha = '${senha}'
    `, (erro, resultado, campos) => {
        if (erro) {
            res.send(erro)
        } else {
            if (resultado.length > 0) {
                res.status(200).send('Sucesso!')
            } else {
                res.status(401).send('Inválido')
            }
        }
    })
})

app.listen(3000)