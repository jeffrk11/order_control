const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const ejs = require('ejs');
const service = require('../../service/pedidosService')
const ref_service = require('../../service/referenciasService')

//are reservada apenas para o front para nao confundir com o controller da api
router.get('/edicao/pedido',(req,res,next) => {
    res.render(path.join(__dirname,'../../views/pedidos/cadastrar.ejs'), {pedido: {}});
})
router.get('/edicao/pedido/:id',(req,res,next) => {
    const id = parseInt(req.params.id)
    const pedido = service.findById(id)
    // const refs = pedido.referencias.map( e => { 
    //     return e.referencia
    // })
    const referencias = ref_service.findAll()
    //manda o pedido para o front
    res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'),
        {
            content: '../pedidos/cadastrar.ejs',
            pedido:pedido,
            referencias:referencias
        });
    //res.render(path.join(__dirname,'../../views/pedidos/cadastrar.ejs'), { pedido:pedido, referencias:referencias });
})
module.exports = router