const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const ejs = require('ejs');
const service = require('../../service/pedidosService')

//are reservada apenas para o front para nao confundir com o controller da api
router.get('/edicao/pedido',(req,res,next) => {
    res.render(path.join(__dirname,'../../views/pedidos/cadastrar.ejs'), {pedido: {}});
})
router.get('/edicao/pedido/:id',(req,res,next) => {
    const id = parseInt(req.params.id)
    const pedido = service.findById(id)
    //manda o pedido para o front
    res.render(path.join(__dirname,'../../views/pedidos/cadastrar.ejs'), { pedido:pedido });
})


module.exports = router