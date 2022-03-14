const express = require('express');
const bodyparser = require('body-parser')
const app = express();

const rotasPedido = require('../controller/pedidosController')
const rotasFront = require('../controller/dashboardController')

app.use(bodyparser.urlencoded({extended: false})) //dados simples
app.use(bodyparser.json()) //apenas aceita json 

//configurando headers
app.use( (req, res, next) => {
    res.header( 'Acces-Control-Allow-Origin', '*')
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status (200).send ({});
    }

    next()
 })

//rotas
app.use(rotasPedido)
app.use(rotasFront)


// Quando não encontra rota, entra aqui:
    app.use( (req, res, next) => {
    const erro = new Error('não encontrado');
    erro.status = 404;
    next(erro);
    });

    app.use( (error, req, res, next) => {
        res.status(error.status || 500);
        return res.send ({
            erro: {
                mensagem: error.message,
                body: error.body
            }
        });
    });

module.exports = app