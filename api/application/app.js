const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express();
const path = require('path')

app.use(cors()) //habilitando cors na aplicacao

const rotasPedido = require('../controller/pedidosController')
const rotasReferencia = require('../controller/referenciasController')
const frontPedidos = require('../front/pedidos/pedidos')
const frontReferencias = require('../front/referencias/referencia')
const frontDashboard = require('../front/dashboard/dashboard')

//app.set('views', '../views');
app.use(express.static(path.join(__dirname,'/../views')))


app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: false})) //dados simples
app.use(bodyparser.json()) //apenas aceita json 

//configurando headers
app.use( (req, res, next) => {
    // res.header( 'Acces-Control-Allow-Origin', '*')
    // res.header(
    //     'Acces-Control-Allow-Header',
    //     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    // )

    // if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //     return res.status (200).send ({});
    //}

    next()
 

})

//rotas
app.use(rotasPedido)
app.use(rotasReferencia)
app.use(frontPedidos)
app.use(frontReferencias)
app.use(frontDashboard)

app.get('/',(req, res) => {
    res.render(path.join(__dirname,'../views/index.ejs'));
});

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